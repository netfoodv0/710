module.exports = {
  // Configurações do servidor
  server: {
    port: process.env.PORT || 3001,
    cors: {
      origins: [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000"
      ],
      credentials: true
    }
  },

  // Configurações do WhatsApp Web.js
  whatsapp: {
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--incognito',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-background-networking',
        '--disable-ipc-flooding-protection',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-default-apps',
        '--disable-sync',
        '--no-default-browser-check',
        '--no-first-run',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor,AudioServiceOutOfProcess'
      ]
    },
    webVersionCache: {
      type: 'remote',
      remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
  },

  // Configurações de sessão
  session: {
    cleanupPaths: [
      '.wwebjs_auth',
      'session',
      'sessions',
      '.session',
      'whatsapp-session',
      'wwebjs_cache',
      'wwebjs_auth',
      'wwebjs_sessions'
    ],
    tempBrowserPrefix: 'temp-browser-'
  },

  // Configurações do bot
  bot: {
    autoReply: {
      enabled: true, // Habilitar/desabilitar resposta automática
      useAI: true, // Usar IA Gemini para respostas inteligentes
      delay: {
        min: 2000, // Delay mínimo em ms (2 segundos para IA)
        max: 5000  // Delay máximo em ms (5 segundos para IA)
      },
      // Mensagens de fallback caso a IA falhe
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
  },

  // Configurações da IA Gemini
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || 'AIzaSyBrcL1JE8Oww4i4EIiPrfJDEKAuDZ0orXU',
    model: 'gemini-2.0-flash',
    maxTokens: 200,
    temperature: 0.7,
    enabled: true
  }
};
