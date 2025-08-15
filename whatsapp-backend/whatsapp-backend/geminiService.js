const fetch = require('node-fetch');
const { 
  buildContextualPrompt, 
  buildTypedPrompt, 
  detectMessageType, 
  getFallbackMessage, 
  getErrorMessage,
  WHATSAPP_BOT_PROMPTS 
} = require('./prompts/whatsappBot');

class GeminiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    this.conversationHistory = new Map(); // Armazenar histórico por chatId
    this.maxHistoryLength = 10; // Máximo de mensagens no histórico
  }

  /**
   * Gera uma resposta usando a API do Gemini
   * @param {string} userMessage - Mensagem do usuário
   * @param {string} chatId - ID do chat para manter contexto
   * @param {object} contactInfo - Informações do contato
   * @returns {Promise<string>} - Resposta gerada pela IA
   */
  async generateResponse(userMessage, chatId, contactInfo = {}) {
    try {
      // Obter histórico da conversa
      const history = this.getConversationHistory(chatId);
      
      // Detectar tipo da mensagem e preparar prompt apropriado
      const messageType = detectMessageType(userMessage);
      const conversationContext = this.buildConversationContext(history, userMessage);
      
      // Usar prompt tipado ou contextual baseado na situação
      const contextPrompt = history.length > 0 
        ? buildContextualPrompt(contactInfo) 
        : buildTypedPrompt(messageType, userMessage, contactInfo);
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${contextPrompt}\n\n${conversationContext}`
              }
            ]
          }
        ],
        generationConfig: WHATSAPP_BOT_PROMPTS.generationConfig,
        safetySettings: WHATSAPP_BOT_PROMPTS.safetySettings
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('Nenhuma resposta foi gerada pela IA');
      }

      const aiResponse = data.candidates[0].content.parts[0].text.trim();
      
      // Atualizar histórico da conversa
      this.updateConversationHistory(chatId, userMessage, aiResponse);
      
      return aiResponse;

    } catch (error) {
      console.error('❌ Erro na API Gemini:', error);
      throw error;
    }
  }

  // Método removido - agora usa os prompts do arquivo de configuração

  /**
   * Constrói o contexto da conversa com histórico
   */
  buildConversationContext(history, currentMessage) {
    let context = '';
    
    if (history.length > 0) {
      context += 'HISTÓRICO DA CONVERSA:\n';
      history.forEach((msg, index) => {
        context += `${msg.type}: ${msg.message}\n`;
      });
      context += '\n';
    }
    
    context += `NOVA MENSAGEM DO USUÁRIO: ${currentMessage}\n\n`;
    context += 'Responda à mensagem atual considerando o contexto da conversa:';
    
    return context;
  }

  /**
   * Obtém o histórico da conversa
   */
  getConversationHistory(chatId) {
    return this.conversationHistory.get(chatId) || [];
  }

  /**
   * Atualiza o histórico da conversa
   */
  updateConversationHistory(chatId, userMessage, aiResponse) {
    let history = this.conversationHistory.get(chatId) || [];
    
    // Adicionar nova mensagem do usuário e resposta da IA
    history.push({ type: 'USUÁRIO', message: userMessage });
    history.push({ type: 'ASSISTENTE', message: aiResponse });
    
    // Manter apenas as últimas mensagens
    if (history.length > this.maxHistoryLength * 2) {
      history = history.slice(-this.maxHistoryLength * 2);
    }
    
    this.conversationHistory.set(chatId, history);
  }

  /**
   * Limpa o histórico de uma conversa específica
   */
  clearConversationHistory(chatId) {
    this.conversationHistory.delete(chatId);
  }

  /**
   * Limpa todo o histórico de conversas
   */
  clearAllHistory() {
    this.conversationHistory.clear();
  }

  /**
   * Obtém estatísticas do serviço
   */
  getStats() {
    return {
      activeConversations: this.conversationHistory.size,
      totalMessages: Array.from(this.conversationHistory.values())
        .reduce((total, history) => total + history.length, 0)
    };
  }

  /**
   * Gera uma resposta de fallback quando a IA falha
   */
  getFallbackResponse() {
    return getFallbackMessage();
  }

  /**
   * Valida se a API key está configurada
   */
  isConfigured() {
    return !!this.apiKey && this.apiKey.length > 10;
  }
}

module.exports = GeminiService;
