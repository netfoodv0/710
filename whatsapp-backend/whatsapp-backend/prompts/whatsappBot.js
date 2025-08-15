/**
 * Configurações de prompts para o bot WhatsApp com IA Gemini
 */

const WHATSAPP_BOT_PROMPTS = {
  // Prompt principal do sistema
  systemPrompt: `Você é um assistente virtual profissional que responde mensagens no WhatsApp para uma empresa.

INSTRUÇÕES OBRIGATÓRIAS:
- Responda SEMPRE em português brasileiro
- Seja educado, profissional e prestativo
- Mantenha as respostas concisas (máximo 2-3 frases)
- NUNCA use emojis em suas respostas
- Use linguagem formal mas acessível
- Se não souber algo específico, seja honesto e ofereça ajuda geral
- Adapte seu tom à situação mantendo sempre o profissionalismo
- Nunca forneça informações pessoais ou sensíveis
- Se perguntarem sobre você, diga que é um assistente virtual da empresa

ESTILO DE COMUNICAÇÃO:
- Tom profissional e cordial
- Respostas diretas e objetivas
- Sem emojis ou símbolos decorativos
- Linguagem clara e compreensível
- Foco em resolver as necessidades do cliente

CONTEXTO:
- Você está respondendo via WhatsApp corporativo
- Represente a empresa de forma profissional
- Mantenha a conversa focada e produtiva`,

  // Prompts específicos por tipo de interação
  greetingPrompt: `Responda de forma cordial e profissional. Pergunte como pode ajudar.`,
  
  questionPrompt: `Responda à pergunta de forma clara e direta. Se não souber a resposta específica, seja honesto e ofereça ajuda alternativa.`,
  
  complaintPrompt: `Responda com empatia e profissionalismo. Demonstre que a empresa valoriza o feedback e está disposta a resolver a situação.`,
  
  orderPrompt: `Seja prestativo para ajudar com pedidos. Forneça informações claras sobre como proceder.`,
  
  infoPrompt: `Forneça informações de forma organizada e clara. Use linguagem acessível.`,

  // Mensagens de fallback (sem IA)
  fallbackMessages: [
    'Olá! Obrigado pela sua mensagem. Estou aqui para te ajudar.',
    'Oi! Recebi sua mensagem. Como posso te auxiliar hoje?',
    'Olá! Sua mensagem foi recebida com sucesso. Em que posso ajudar?',
    'Oi! Obrigado por entrar em contato. Estou disponível para te ajudar.',
    'Olá! Recebi sua mensagem. Vou te responder o mais rápido possível.',
    'Oi! Sua mensagem chegou até mim. Como posso ser útil?',
    'Olá! Estou online e pronto para te atender.',
    'Oi! Que bom falar com você. Como posso ajudar hoje?'
  ],

  // Mensagens de erro técnico
  errorMessages: [
    'Desculpe, estou com dificuldades técnicas no momento. Tente novamente em instantes.',
    'Ops! Algo deu errado por aqui. Pode repetir sua mensagem, por favor?',
    'Estou passando por uma atualização rápida. Aguarde um momento e tente novamente.',
    'Desculpe pela demora! Estou voltando ao normal. Como posso ajudar?',
    'Sistema temporariamente instável. Sua mensagem é importante, tente novamente.'
  ],

  // Configurações de geração
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 200,
    stopSequences: []
  },

  // Filtros de segurança
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
};

/**
 * Gera prompt contextualizado baseado nas informações do contato
 * @param {object} contactInfo - Informações do contato
 * @returns {string} - Prompt personalizado
 */
function buildContextualPrompt(contactInfo) {
  const contactName = contactInfo.name || 'Cliente';
  
  return `${WHATSAPP_BOT_PROMPTS.systemPrompt}

INFORMAÇÕES DO CONTATO:
- Nome do contato: ${contactName}
- Número: ${contactInfo.number || 'Não informado'}

INSTRUÇÕES ADICIONAIS:
- Trate o cliente pelo nome quando apropriado
- Mantenha registro do contexto da conversa
- Seja consistente com o tom profissional estabelecido`;
}

/**
 * Gera prompt baseado no tipo de mensagem
 * @param {string} messageType - Tipo da mensagem (greeting, question, complaint, etc.)
 * @param {string} userMessage - Mensagem do usuário
 * @param {object} contactInfo - Informações do contato
 * @returns {string} - Prompt específico para o tipo
 */
function buildTypedPrompt(messageType, userMessage, contactInfo) {
  const basePrompt = buildContextualPrompt(contactInfo);
  const specificPrompt = WHATSAPP_BOT_PROMPTS[`${messageType}Prompt`] || WHATSAPP_BOT_PROMPTS.questionPrompt;
  
  return `${basePrompt}

TIPO DE INTERAÇÃO: ${messageType.toUpperCase()}
INSTRUÇÃO ESPECÍFICA: ${specificPrompt}

MENSAGEM DO CLIENTE: "${userMessage}"

Responda de acordo com as instruções acima:`;
}

/**
 * Detecta o tipo de mensagem baseado no conteúdo
 * @param {string} message - Mensagem do usuário
 * @returns {string} - Tipo detectado
 */
function detectMessageType(message) {
  const lowerMessage = message.toLowerCase();
  
  // Saudações
  if (lowerMessage.match(/^(oi|olá|ola|hey|bom dia|boa tarde|boa noite)/)) {
    return 'greeting';
  }
  
  // Reclamações
  if (lowerMessage.match(/(reclamação|problema|erro|ruim|péssimo|horrível|insatisfeito)/)) {
    return 'complaint';
  }
  
  // Pedidos
  if (lowerMessage.match(/(pedido|pedir|quero|gostaria|delivery|entrega)/)) {
    return 'order';
  }
  
  // Perguntas
  if (lowerMessage.match(/(\?|como|quando|onde|por que|porque|qual|quem)/)) {
    return 'question';
  }
  
  // Solicitação de informações
  if (lowerMessage.match(/(informação|info|horário|endereço|telefone|contato)/)) {
    return 'info';
  }
  
  // Default
  return 'question';
}

/**
 * Obtém mensagem de fallback aleatória
 * @returns {string} - Mensagem de fallback
 */
function getFallbackMessage() {
  const messages = WHATSAPP_BOT_PROMPTS.fallbackMessages;
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Obtém mensagem de erro aleatória
 * @returns {string} - Mensagem de erro
 */
function getErrorMessage() {
  const messages = WHATSAPP_BOT_PROMPTS.errorMessages;
  return messages[Math.floor(Math.random() * messages.length)];
}

module.exports = {
  WHATSAPP_BOT_PROMPTS,
  buildContextualPrompt,
  buildTypedPrompt,
  detectMessageType,
  getFallbackMessage,
  getErrorMessage
};
