const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, orderBy, limit, getDocs, onSnapshot } = require('firebase/firestore');

class FirebaseGeminiService {
  constructor() {
    // Configuração do Firebase (mesma do frontend)
    const firebaseConfig = {
      apiKey: "AIzaSyC2I0Cy3olXowdUmDRFIKoqMS6Tgy4PqPQ",
      authDomain: "vault-v2-ef6d6.firebaseapp.com",
      projectId: "vault-v2-ef6d6",
      storageBucket: "vault-v2-ef6d6.firebasestorage.app",
      messagingSenderId: "848566827539",
      appId: "1:848566827539:web:9004fa618db6534501dde6",
      measurementId: "G-ZELND5C5HC"
    };

    // Inicializar Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    
    console.log('🔥 Firebase Gemini Service inicializado');
  }

  /**
   * Salva configurações da IA no Firebase
   * @param {object} config - Configurações da IA
   */
  async saveGeminiConfig(config) {
    try {
      const configRef = doc(this.db, 'whatsapp_gemini_config', 'main');
      
      const configData = {
        ...config,
        updatedAt: new Date(),
        version: '1.0'
      };

      await setDoc(configRef, configData, { merge: true });
      
      console.log('✅ Configurações da IA salvas no Firebase');
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao salvar configurações no Firebase:', error);
      throw error;
    }
  }

  /**
   * Carrega configurações da IA do Firebase
   */
  async loadGeminiConfig() {
    try {
      const configRef = doc(this.db, 'whatsapp_gemini_config', 'main');
      const configSnap = await getDoc(configRef);
      
      if (configSnap.exists()) {
        const config = configSnap.data();
        console.log('✅ Configurações da IA carregadas do Firebase');
        return config;
      } else {
        console.log('⚠️ Configurações não encontradas no Firebase, usando padrões');
        return null;
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar configurações do Firebase:', error);
      throw error;
    }
  }

  /**
   * Salva histórico de conversa no Firebase
   * @param {string} chatId - ID do chat
   * @param {array} history - Histórico da conversa
   */
  async saveConversationHistory(chatId, history) {
    try {
      const historyRef = doc(this.db, 'whatsapp_conversations', chatId);
      
      const historyData = {
        chatId,
        history,
        lastUpdated: new Date(),
        messageCount: history.length
      };

      await setDoc(historyRef, historyData, { merge: true });
      
      console.log(`💾 Histórico da conversa ${chatId} salvo no Firebase`);
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao salvar histórico no Firebase:', error);
      throw error;
    }
  }

  /**
   * Carrega histórico de conversa do Firebase
   * @param {string} chatId - ID do chat
   */
  async loadConversationHistory(chatId) {
    try {
      const historyRef = doc(this.db, 'whatsapp_conversations', chatId);
      const historySnap = await getDoc(historyRef);
      
      if (historySnap.exists()) {
        const data = historySnap.data();
        console.log(`📖 Histórico da conversa ${chatId} carregado do Firebase`);
        return data.history || [];
      } else {
        console.log(`📝 Nova conversa iniciada para ${chatId}`);
        return [];
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar histórico do Firebase:', error);
      return [];
    }
  }

  /**
   * Registra estatísticas de uso da IA
   * @param {object} stats - Estatísticas de uso
   */
  async logAIUsage(stats) {
    try {
      const usageRef = collection(this.db, 'whatsapp_ai_usage');
      
      const usageData = {
        ...stats,
        timestamp: new Date(),
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
      };

      await addDoc(usageRef, usageData);
      
      console.log('📊 Estatísticas de uso da IA registradas');
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao registrar uso da IA:', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas de uso da IA
   * @param {string} period - Período ('today', 'week', 'month')
   */
  async getAIUsageStats(period = 'today') {
    try {
      const usageRef = collection(this.db, 'whatsapp_ai_usage');
      
      let startDate = new Date();
      switch (period) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(startDate.getMonth() - 1);
          break;
      }

      const q = query(
        usageRef,
        where('timestamp', '>=', startDate),
        orderBy('timestamp', 'desc'),
        limit(1000)
      );

      const querySnapshot = await getDocs(q);
      const stats = [];
      
      querySnapshot.forEach((doc) => {
        stats.push({ id: doc.id, ...doc.data() });
      });

      console.log(`📈 ${stats.length} registros de estatísticas carregados (${period})`);
      return stats;
      
    } catch (error) {
      console.error('❌ Erro ao obter estatísticas:', error);
      return [];
    }
  }

  /**
   * Limpa histórico de conversas antigas
   * @param {number} daysOld - Dias para considerar "antigo"
   */
  async cleanupOldConversations(daysOld = 30) {
    try {
      const conversationsRef = collection(this.db, 'whatsapp_conversations');
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const q = query(
        conversationsRef,
        where('lastUpdated', '<', cutoffDate)
      );

      const querySnapshot = await getDocs(q);
      let deletedCount = 0;

      for (const docSnapshot of querySnapshot.docs) {
        await docSnapshot.ref.delete();
        deletedCount++;
      }

      console.log(`🧹 ${deletedCount} conversas antigas limpas (>${daysOld} dias)`);
      return deletedCount;
      
    } catch (error) {
      console.error('❌ Erro ao limpar conversas antigas:', error);
      throw error;
    }
  }

  /**
   * Salva mensagem individual para auditoria
   * @param {object} messageData - Dados da mensagem
   */
  async logMessage(messageData) {
    try {
      const messagesRef = collection(this.db, 'whatsapp_messages_log');
      
      const logData = {
        ...messageData,
        timestamp: new Date(),
        processed: true
      };

      await addDoc(messagesRef, logData);
      
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao registrar mensagem:', error);
      throw error;
    }
  }

  /**
   * Monitora mudanças nas configurações em tempo real
   * @param {function} callback - Função chamada quando configuração muda
   */
  watchConfigChanges(callback) {
    try {
      const configRef = doc(this.db, 'whatsapp_gemini_config', 'main');
      
      const unsubscribe = onSnapshot(configRef, (doc) => {
        if (doc.exists()) {
          console.log('🔄 Configurações da IA atualizadas em tempo real');
          callback(doc.data());
        }
      });

      console.log('👀 Monitoramento de configurações ativado');
      return unsubscribe;
      
    } catch (error) {
      console.error('❌ Erro ao monitorar configurações:', error);
      throw error;
    }
  }

  /**
   * Salva status do bot (online/offline)
   * @param {object} status - Status do bot
   */
  async updateBotStatus(status) {
    try {
      const statusRef = doc(this.db, 'whatsapp_bot_status', 'current');
      
      const statusData = {
        ...status,
        lastUpdated: new Date(),
        timestamp: Date.now()
      };

      await setDoc(statusRef, statusData, { merge: true });
      
      console.log('🟢 Status do bot atualizado no Firebase');
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao atualizar status do bot:', error);
      throw error;
    }
  }

  /**
   * Obtém configurações padrão para inicialização
   */
  getDefaultConfig() {
    return {
      gemini: {
        apiKey: process.env.GEMINI_API_KEY || 'AIzaSyBrcL1JE8Oww4i4EIiPrfJDEKAuDZ0orXU',
        model: 'gemini-2.0-flash',
        maxTokens: 200,
        temperature: 0.7,
        enabled: true
      },
      bot: {
        autoReply: {
          enabled: true,
          useAI: true,
          delay: {
            min: 2000,
            max: 5000
          },
          fallbackMessages: [
            'Olá! Obrigado pela sua mensagem. Estou aqui para te ajudar.',
            'Oi! Recebi sua mensagem. Como posso te auxiliar hoje?',
            'Olá! Sua mensagem foi recebida com sucesso. Em que posso ajudar?',
            'Oi! Obrigado por entrar em contato. Estou disponível para te ajudar.',
            'Olá! Recebi sua mensagem. Vou te responder o mais rápido possível.',
            'Oi! Sua mensagem chegou até mim. Como posso ser útil?',
            'Olá! Estou online e pronto para te atender.',
            'Oi! Que bom falar com você. Como posso ajudar hoje?'
          ]
        }
      }
    };
  }
}

module.exports = FirebaseGeminiService;
