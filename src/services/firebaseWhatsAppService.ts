import { db } from '../lib/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  serverTimestamp, 
  Timestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';

export interface WhatsAppStatus {
  id: string;
  isConnected: boolean;
  lastSeen: Timestamp;
  sessionInfo?: {
    deviceId?: string;
    pushName?: string;
    platform?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface WhatsAppSession {
  userId: string;
  sessionId: string;
  isActive: boolean;
  deviceInfo: {
    deviceId: string;
    pushName: string;
    platform: string;
  };
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  lastActivity: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class FirebaseWhatsAppService {
  private readonly COLLECTION_STATUS = 'whatsapp_status';
  private readonly COLLECTION_SESSIONS = 'whatsapp_sessions';
  
  /**
   * Salva ou atualiza o status de conexão do WhatsApp
   */
  async updateConnectionStatus(
    userId: string, 
    isConnected: boolean, 
    sessionInfo?: WhatsAppStatus['sessionInfo']
  ): Promise<void> {
    try {
      const statusRef = doc(db, this.COLLECTION_STATUS, userId);
      
      // Verificar se já existe e se precisa atualizar
      const existingDoc = await getDoc(statusRef);
      const existingData = existingDoc.exists() ? existingDoc.data() as WhatsAppStatus : null;
      
      // Evitar atualizações desnecessárias
      if (existingData && existingData.isConnected === isConnected) {
        // Se o status não mudou, só atualizar o lastSeen se estiver conectado
        if (!isConnected) {
          console.log('⚠️ Status não mudou e está desconectado, pulando atualização');
          return;
        }
      }
      
      const statusData: Partial<WhatsAppStatus> = {
        isConnected,
        lastSeen: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };

      if (sessionInfo) {
        statusData.sessionInfo = sessionInfo;
      }

      // Se for a primeira vez, adicionar createdAt
      if (!existingDoc.exists()) {
        statusData.id = userId;
        statusData.createdAt = serverTimestamp() as Timestamp;
      }

      await setDoc(statusRef, statusData, { merge: true });
      
      console.log('✅ Status do WhatsApp atualizado no Firebase:', { userId, isConnected });
    } catch (error) {
      console.error('❌ Erro ao atualizar status no Firebase:', error);
      throw error;
    }
  }

  /**
   * Obtém o status atual de conexão do WhatsApp
   */
  async getConnectionStatus(userId: string): Promise<WhatsAppStatus | null> {
    try {
      const statusRef = doc(db, this.COLLECTION_STATUS, userId);
      const docSnap = await getDoc(statusRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as WhatsAppStatus;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Erro ao buscar status no Firebase:', error);
      return null;
    }
  }

  /**
   * Monitora mudanças no status de conexão em tempo real
   */
  subscribeToConnectionStatus(
    userId: string, 
    callback: (status: WhatsAppStatus | null) => void
  ): () => void {
    const statusRef = doc(db, this.COLLECTION_STATUS, userId);
    
    return onSnapshot(
      statusRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const status = docSnap.data() as WhatsAppStatus;
          console.log('📡 Status atualizado em tempo real:', status);
          callback(status);
        } else {
          console.log('📡 Nenhum status encontrado');
          callback(null);
        }
      },
      (error) => {
        console.error('❌ Erro no listener de status:', error);
        callback(null);
      }
    );
  }

  /**
   * Verifica se o usuário está conectado (com timeout para considerar desconectado)
   */
  async isUserConnected(userId: string, timeoutMinutes: number = 5): Promise<boolean> {
    try {
      const status = await this.getConnectionStatus(userId);
      
      if (!status || !status.isConnected) {
        return false;
      }

      // Verificar se a última atividade foi há muito tempo
      if (!status.lastSeen) {
        // Se não tiver lastSeen, considerar desconectado
        return false;
      }
      
      const now = new Date();
      const lastSeen = status.lastSeen.toDate();
      const diffMinutes = (now.getTime() - lastSeen.getTime()) / (1000 * 60);
      
      return diffMinutes <= timeoutMinutes;
    } catch (error) {
      console.error('❌ Erro ao verificar conexão:', error);
      return false;
    }
  }

  /**
   * Gerencia sessões ativas do WhatsApp
   */
  async createSession(sessionData: Omit<WhatsAppSession, 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const sessionRef = doc(db, this.COLLECTION_SESSIONS, sessionData.sessionId);
      
      const data: WhatsAppSession = {
        ...sessionData,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };

      await setDoc(sessionRef, data);
      
      console.log('✅ Sessão criada no Firebase:', sessionData.sessionId);
    } catch (error) {
      console.error('❌ Erro ao criar sessão:', error);
      throw error;
    }
  }

  /**
   * Atualiza uma sessão existente
   */
  async updateSession(
    sessionId: string, 
    updates: Partial<Omit<WhatsAppSession, 'sessionId' | 'createdAt' | 'updatedAt'>>
  ): Promise<void> {
    try {
      const sessionRef = doc(db, this.COLLECTION_SESSIONS, sessionId);
      
      await setDoc(sessionRef, {
        ...updates,
        updatedAt: serverTimestamp() as Timestamp,
      }, { merge: true });
      
      console.log('✅ Sessão atualizada:', sessionId);
    } catch (error) {
      console.error('❌ Erro ao atualizar sessão:', error);
      throw error;
    }
  }

  /**
   * Obtém sessões ativas de um usuário
   */
  async getActiveSessions(userId: string): Promise<WhatsAppSession[]> {
    try {
      const sessionsRef = collection(db, this.COLLECTION_SESSIONS);
      const q = query(
        sessionsRef,
        where('userId', '==', userId),
        where('isActive', '==', true),
        orderBy('lastActivity', 'desc'),
        limit(5)
      );
      
      const querySnapshot = await getDocs(q);
      const sessions: WhatsAppSession[] = [];
      
      querySnapshot.forEach((doc) => {
        sessions.push(doc.data() as WhatsAppSession);
      });
      
      return sessions;
    } catch (error) {
      console.error('❌ Erro ao buscar sessões ativas:', error);
      return [];
    }
  }

  /**
   * Desconecta todas as sessões de um usuário
   */
  async disconnectAllSessions(userId: string): Promise<void> {
    try {
      // Atualizar status principal
      await this.updateConnectionStatus(userId, false);
      
      // Buscar e desativar todas as sessões ativas
      const activeSessions = await this.getActiveSessions(userId);
      
      const updatePromises = activeSessions.map(session =>
        this.updateSession(session.sessionId, {
          isActive: false,
          connectionStatus: 'disconnected'
        })
      );
      
      await Promise.all(updatePromises);
      
      console.log('✅ Todas as sessões desconectadas para usuário:', userId);
    } catch (error) {
      console.error('❌ Erro ao desconectar sessões:', error);
      throw error;
    }
  }
}

// Instância singleton do serviço
export const firebaseWhatsAppService = new FirebaseWhatsAppService();

// Função helper para obter ID do usuário (você pode adaptar conforme sua autenticação)
export const getCurrentUserId = (): string => {
  // Por enquanto, usar um ID fixo ou baseado no localStorage
  // Você pode integrar com seu sistema de autenticação
  const userId = localStorage.getItem('whatsapp_user_id') || 'default_user';
  return userId;
};

// Função helper para gerar session ID único
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};