const express = require('express');
const { Client, NoAuth } = require('whatsapp-web.js');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const GeminiService = require('./geminiService');
const FirebaseGeminiService = require('./firebaseGeminiService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: config.server.cors.origins,
    methods: ["GET", "POST"],
    credentials: config.server.cors.credentials
  }
});

app.use(cors({
  origin: config.server.cors.origins,
  credentials: config.server.cors.credentials
}));
app.use(express.json());

let whatsappClient = null;
let isClientReady = false;
let botStartTime = null; // Timestamp de quando o bot foi iniciado

// Inicializar serviços
let geminiService = null;
let firebaseService = null;

// Inicializar Firebase
async function initializeServices() {
  try {
    firebaseService = new FirebaseGeminiService();
    console.log('🔥 Firebase Service inicializado');
    
    // Carregar configurações do Firebase
    const firebaseConfig = await firebaseService.loadGeminiConfig();
    if (firebaseConfig) {
      // Mesclar configurações do Firebase com as locais
      Object.assign(config, firebaseConfig);
      console.log('⚙️ Configurações carregadas do Firebase');
    } else {
      // Salvar configurações padrão no Firebase
      await firebaseService.saveGeminiConfig(config);
      console.log('💾 Configurações padrão salvas no Firebase');
    }
    
    // Inicializar Gemini com configurações atualizadas
    if (config.gemini.enabled && config.gemini.apiKey) {
      geminiService = new GeminiService(config.gemini.apiKey);
      
      // Modificar GeminiService para usar Firebase para persistência
      geminiService.saveConversationHistory = async (chatId, history) => {
        return await firebaseService.saveConversationHistory(chatId, history);
      };
      
      geminiService.loadConversationHistory = async (chatId) => {
        return await firebaseService.loadConversationHistory(chatId);
      };
      
      console.log('🤖 Serviço Gemini inicializado com Firebase!');
    } else {
      console.log('⚠️ Gemini não configurado. Usando mensagens de fallback.');
    }
    
    // Monitorar mudanças de configuração
    firebaseService.watchConfigChanges(async (newConfig) => {
      console.log('🔄 Configurações atualizadas via Firebase');
      Object.assign(config, newConfig);
      
      // Reinicializar Gemini se necessário
      if (newConfig.gemini && newConfig.gemini.enabled && newConfig.gemini.apiKey) {
        geminiService = new GeminiService(newConfig.gemini.apiKey);
        console.log('🔄 Serviço Gemini reinicializado');
      }
      
      // Broadcast para todos os clientes
      io.emit('config-updated', newConfig);
    });
    
    // Atualizar status do bot
    await firebaseService.updateBotStatus({
      isOnline: true,
      whatsappConnected: isClientReady,
      geminiEnabled: !!geminiService,
      startedAt: new Date()
    });
    
  } catch (error) {
    console.error('❌ Erro ao inicializar serviços:', error);
    // Fallback para configurações locais
    if (config.gemini.enabled && config.gemini.apiKey) {
      geminiService = new GeminiService(config.gemini.apiKey);
      console.log('🤖 Serviço Gemini inicializado (fallback local)');
    }
  }
}

// Inicializar serviços na inicialização do servidor
initializeServices();

// Função para limpar processos órfãos do Puppeteer (sem afetar Chrome do usuário)
const cleanupPuppeteerProcesses = () => {
  console.log('🧹 Limpeza de processos Puppeteer (não afeta Chrome do usuário)');
  // Esta função foi removida para evitar fechar o Chrome do usuário
  // O Puppeteer gerencia seus próprios processos automaticamente
};

// Função para limpar completamente as sessões
const clearAllSessions = () => {
  console.log('🧹 Iniciando limpeza completa de sessões...');
  
  // Limpeza segura (sem afetar Chrome do usuário)
  cleanupPuppeteerProcesses();
  
  // Remover pasta .wwebjs_auth
  const sessionPath = path.join(__dirname, '.wwebjs_auth');
  if (fs.existsSync(sessionPath)) {
    try {
      fs.rmSync(sessionPath, { recursive: true, force: true });
      console.log('🗑️ Sessão .wwebjs_auth removida');
    } catch (error) {
      console.log('⚠️ Erro ao remover .wwebjs_auth:', error.message);
    }
  }
  
  // Remover outras possíveis pastas de sessão
  const possiblePaths = config.session.cleanupPaths.map(sessionPath => 
    path.join(__dirname, sessionPath)
  );
  
  possiblePaths.forEach(sessionPath => {
    if (fs.existsSync(sessionPath)) {
      try {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        console.log(`🗑️ Sessão ${path.basename(sessionPath)} removida`);
      } catch (error) {
        console.log(`⚠️ Erro ao remover ${path.basename(sessionPath)}:`, error.message);
      }
    }
  });
  
  // Remover pastas temporárias do navegador
  try {
    const files = fs.readdirSync(__dirname);
    const tempBrowserFolders = files.filter(file => file.startsWith(config.session.tempBrowserPrefix));
    
    tempBrowserFolders.forEach(folder => {
      const folderPath = path.join(__dirname, folder);
      try {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`🗑️ Pasta temporária ${folder} removida`);
      } catch (error) {
        console.log(`⚠️ Erro ao remover ${folder}:`, error.message);
      }
    });
    
    // Remover outras pastas temporárias comuns
    const otherTempFolders = files.filter(file => 
      file.startsWith('temp-') || 
      file.startsWith('tmp-') || 
      file.includes('browser') ||
      file.includes('session')
    );
    
    otherTempFolders.forEach(folder => {
      const folderPath = path.join(__dirname, folder);
      try {
        if (fs.statSync(folderPath).isDirectory()) {
          fs.rmSync(folderPath, { recursive: true, force: true });
          console.log(`🗑️ Pasta temporária ${folder} removida`);
        }
      } catch (error) {
        console.log(`⚠️ Erro ao remover ${folder}:`, error.message);
      }
    });
    
  } catch (error) {
    console.log('⚠️ Erro ao limpar pastas temporárias:', error.message);
  }
  
  console.log('✅ Limpeza de sessões concluída!');
};

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'WhatsApp Backend Server está rodando!', 
    status: isClientReady ? 'Conectado' : 'Desconectado',
    timestamp: new Date().toISOString()
  });
});

// Rota para verificar status
app.get('/status', (req, res) => {
  try {
    const geminiStats = geminiService ? geminiService.getStats() : null;
    
    // Verificar se as configurações estão disponíveis
    const botConfig = {
      autoReplyEnabled: config.bot?.autoReply?.enabled || false,
      useAI: config.bot?.autoReply?.useAI || false,
      fallbackMessages: config.bot?.autoReply?.fallbackMessages?.length || 0,
      delayRange: config.bot?.autoReply?.delay || { min: 2000, max: 5000 }
    };
    
    res.json({
      connected: isClientReady,
      clientInfo: whatsappClient?.info || null,
      botConfig: botConfig,
      gemini: {
        enabled: config.gemini?.enabled || false,
        configured: geminiService?.isConfigured() || false,
        model: config.gemini?.model || 'gemini-2.0-flash',
        stats: geminiStats
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Erro na rota /status:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Rota para habilitar/desabilitar resposta automática
app.post('/bot/auto-reply/toggle', (req, res) => {
  try {
    const { enabled } = req.body;
    
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'O campo "enabled" deve ser um boolean'
      });
    }
    
    config.bot.autoReply.enabled = enabled;
    
    console.log(`🤖 Resposta automática ${enabled ? 'habilitada' : 'desabilitada'}`);
    
    res.json({
      success: true,
      autoReplyEnabled: config.bot.autoReply.enabled,
      message: `Resposta automática ${enabled ? 'habilitada' : 'desabilitada'} com sucesso!`
    });
    
    // Broadcast para todos os clientes conectados
    io.emit('bot-config-updated', {
      autoReplyEnabled: config.bot.autoReply.enabled
    });
    
  } catch (error) {
    console.error('❌ Erro ao alterar configuração do bot:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para atualizar mensagens de resposta automática (fallback)
app.post('/bot/auto-reply/messages', (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'O campo "messages" deve ser um array não vazio'
      });
    }
    
    // Validar se todas as mensagens são strings não vazias
    const validMessages = messages.filter(msg => typeof msg === 'string' && msg.trim().length > 0);
    
    if (validMessages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Todas as mensagens devem ser strings não vazias'
      });
    }
    
    config.bot.autoReply.fallbackMessages = validMessages;
    
    console.log(`🤖 ${validMessages.length} mensagens de fallback atualizadas`);
    
    res.json({
      success: true,
      messages: config.bot.autoReply.fallbackMessages,
      count: config.bot.autoReply.fallbackMessages.length,
      message: 'Mensagens de fallback atualizadas com sucesso!'
    });
    
    // Broadcast para todos os clientes conectados
    io.emit('bot-config-updated', {
      fallbackMessages: config.bot.autoReply.fallbackMessages
    });
    
  } catch (error) {
    console.error('❌ Erro ao atualizar mensagens do bot:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para alternar entre IA e mensagens pré-definidas
app.post('/bot/ai/toggle', (req, res) => {
  try {
    const { useAI } = req.body;
    
    if (typeof useAI !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'O campo "useAI" deve ser um boolean'
      });
    }
    
    // Verificar se a IA está configurada
    if (useAI && (!geminiService || !geminiService.isConfigured())) {
      return res.status(400).json({
        success: false,
        error: 'IA Gemini não está configurada. Verifique a API key.'
      });
    }
    
    config.bot.autoReply.useAI = useAI;
    
    console.log(`🤖 Modo IA ${useAI ? 'habilitado' : 'desabilitado'}`);
    
    res.json({
      success: true,
      useAI: config.bot.autoReply.useAI,
      message: `Modo IA ${useAI ? 'habilitado' : 'desabilitado'} com sucesso!`
    });
    
    // Broadcast para todos os clientes conectados
    io.emit('bot-config-updated', {
      useAI: config.bot.autoReply.useAI
    });
    
  } catch (error) {
    console.error('❌ Erro ao alterar modo IA:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para limpar histórico de conversas da IA
app.post('/bot/ai/clear-history', async (req, res) => {
  try {
    const { chatId } = req.body;
    
    if (!geminiService) {
      return res.status(400).json({
        success: false,
        error: 'Serviço Gemini não está disponível'
      });
    }
    
    if (chatId) {
      // Limpar histórico de uma conversa específica
      if (firebaseService) {
        await firebaseService.saveConversationHistory(chatId, []);
      }
      geminiService.clearConversationHistory(chatId);
      console.log(`🧹 Histórico da conversa ${chatId} limpo`);
      
      res.json({
        success: true,
        message: `Histórico da conversa limpo com sucesso!`
      });
    } else {
      // Limpar todo o histórico
      if (firebaseService) {
        await firebaseService.cleanupOldConversations(0); // Limpar todas
      }
      geminiService.clearAllHistory();
      console.log('🧹 Todo histórico de conversas limpo');
      
      res.json({
        success: true,
        message: 'Todo histórico de conversas limpo com sucesso!'
      });
    }
    
  } catch (error) {
    console.error('❌ Erro ao limpar histórico:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para salvar configurações no Firebase
app.post('/bot/config/save', async (req, res) => {
  try {
    const { config: newConfig } = req.body;
    
    if (!firebaseService) {
      return res.status(500).json({
        success: false,
        error: 'Serviço Firebase não está disponível'
      });
    }
    
    // Validar configurações básicas
    if (newConfig.gemini && newConfig.gemini.apiKey && newConfig.gemini.apiKey.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'API Key inválida'
      });
    }
    
    await firebaseService.saveGeminiConfig(newConfig);
    
    console.log('💾 Configurações salvas no Firebase');
    
    res.json({
      success: true,
      message: 'Configurações salvas com sucesso!'
    });
    
  } catch (error) {
    console.error('❌ Erro ao salvar configurações:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para obter estatísticas de uso da IA
app.get('/bot/ai/stats', async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    
    if (!firebaseService) {
      return res.status(500).json({
        success: false,
        error: 'Serviço Firebase não está disponível'
      });
    }
    
    const stats = await firebaseService.getAIUsageStats(period);
    
    // Processar estatísticas
    const processedStats = {
      totalMessages: stats.length,
      aiResponses: stats.filter(s => s.isAIResponse).length,
      fallbackResponses: stats.filter(s => !s.isAIResponse).length,
      averageResponseTime: stats.reduce((acc, s) => acc + (s.responseTime || 0), 0) / stats.length || 0,
      uniqueChats: [...new Set(stats.map(s => s.chatId))].length,
      period: period
    };
    
    res.json({
      success: true,
      stats: processedStats,
      rawData: stats
    });
    
  } catch (error) {
    console.error('❌ Erro ao obter estatísticas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado:', socket.id);
  
  // Enviar status atual para o cliente que acabou de conectar
  socket.emit('connection-status', {
    connected: isClientReady,
    clientInfo: whatsappClient?.info || null
  });

  socket.on('connect-whatsapp', async () => {
    console.log('📱 Iniciando conexão WhatsApp...');
    console.log('🔍 Estado atual - whatsappClient:', !!whatsappClient, 'isClientReady:', isClientReady);
    
    // Forçar limpeza completa antes de qualquer coisa
    if (whatsappClient) {
      console.log('⚠️ Cliente já existe, destruindo completamente...');
      try {
        // Fechar navegador primeiro
        if (whatsappClient.pupBrowser) {
          console.log('🌐 Fechando navegador Puppeteer...');
          await whatsappClient.pupBrowser.close();
          console.log('✅ Navegador fechado');
        }
        console.log('🗑️ Destruindo cliente WhatsApp...');
        await whatsappClient.destroy();
        console.log('✅ Cliente destruído');
        // Aguardar para garantir que tudo foi fechado
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('⏳ Aguardou 1 segundo após destruição');
      } catch (error) {
        console.log('❌ Erro ao destruir cliente anterior:', error.message);
      }
    }

    // Resetar variáveis
    console.log('🔄 Resetando variáveis de estado...');
    whatsappClient = null;
    isClientReady = false;
    console.log('✅ Variáveis resetadas');

    try {
      socket.emit('status-update', { message: 'Limpando sessões anteriores...', type: 'info' });

      // Limpar TODAS as sessões existentes
      console.log('🧹 Limpando todas as sessões...');
      clearAllSessions();
      
      // Aguardar um pouco após limpeza
      console.log('⏳ Aguardando após limpeza...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Aguardou após limpeza');
      
      socket.emit('status-update', { message: 'Inicializando novo cliente WhatsApp...', type: 'info' });

      console.log('🔧 Criando novo cliente WhatsApp...');
      whatsappClient = new Client({
        authStrategy: new NoAuth(), // Não salva sessão
        puppeteer: {
          headless: config.whatsapp.puppeteer.headless,
          args: [
            ...config.whatsapp.puppeteer.args,
            '--user-data-dir=' + path.join(__dirname, config.session.tempBrowserPrefix + Date.now()),
            '--disable-blink-features=AutomationControlled',
            '--disable-features=VizDisplayCompositor'
          ]
        },
        webVersionCache: config.whatsapp.webVersionCache,
        // Configurações para melhor performance e estabilidade
        qrMaxRetries: 5,
        takeoverOnConflict: true,
        takeoverTimeoutMs: 0
      });
      console.log('✅ Cliente WhatsApp criado');

      // Evento QR Code
      whatsappClient.on('qr', (qr) => {
        console.log('📱 QR Code recebido!');
        console.log('Escaneie o QR code abaixo com seu WhatsApp:');
        qrcode.generate(qr, { small: true });
        
        socket.emit('qr-code', qr);
        socket.emit('status-update', { 
          message: 'QR Code gerado! Escaneie com seu WhatsApp.', 
          type: 'info' 
        });
      });

      // Evento de autenticação
      whatsappClient.on('authenticated', () => {
        console.log('✅ WhatsApp autenticado!');
        socket.emit('status-update', { 
          message: 'WhatsApp autenticado! Conectando...', 
          type: 'success' 
        });
      });

      // Evento de cliente pronto
      whatsappClient.on('ready', () => {
        console.log('🚀 Cliente WhatsApp está pronto!');
        console.log('Conectado como:', whatsappClient.info);
        
        // Marcar o momento em que o bot ficou pronto (só responde mensagens após este momento)
        botStartTime = Math.floor(Date.now() / 1000); // Timestamp em segundos
        console.log(`⏰ Bot iniciado em: ${new Date(botStartTime * 1000).toLocaleString()}`);
        console.log(`🤖 Bot só responderá mensagens recebidas após este momento`);
        
        isClientReady = true;
        
        // 💓 Heartbeat para manter conexão estável
        const heartbeatInterval = setInterval(() => {
          if (whatsappClient && isClientReady) {
            console.log('💓 Heartbeat - Conexão ativa');
          } else {
            console.log('💔 Heartbeat - Conexão perdida, limpando interval');
            clearInterval(heartbeatInterval);
          }
        }, 30000); // A cada 30 segundos
        socket.emit('connected', whatsappClient.info);
        socket.emit('status-update', { 
          message: `Conectado como: ${whatsappClient.info.pushname}`, 
          type: 'success' 
        });
        
        // Broadcast para todos os clientes conectados
        io.emit('whatsapp-ready', whatsappClient.info);
      });

      // Evento de falha na autenticação
      whatsappClient.on('auth_failure', (msg) => {
        console.error('❌ Falha na autenticação:', msg);
        isClientReady = false;
        socket.emit('auth-error', msg);
        socket.emit('status-update', { 
          message: `Falha na autenticação: ${msg}`, 
          type: 'error' 
        });
      });

      // Evento de desconexão
      whatsappClient.on('disconnected', (reason) => {
        console.log('🔌 Cliente desconectado:', reason);
        isClientReady = false;
        socket.emit('disconnected', reason);
        socket.emit('status-update', { 
          message: `Desconectado: ${reason}`, 
          type: 'warning' 
        });
        
        // Broadcast para todos os clientes
        io.emit('whatsapp-disconnected', reason);
      });

      // Evento de mensagem recebida
      whatsappClient.on('message', async (message) => {
        // ⚡ FILTRO RÁPIDO: Ignorar mensagens antigas ANTES de processar
        // COMENTADO: Bot agora responde a todas as mensagens
        // if (botStartTime && message.timestamp < botStartTime) {
        //   // Mensagem muito antiga - ignorar completamente (sem logs para não poluir)
        //   return;
        // }
        
        console.log('📩 Nova mensagem:', {
          body: message.body?.substring(0, 50),
          fromMe: message.fromMe,
          timestamp: message.timestamp,
          type: message.type
        });
        
        try {
          // Buscar informações do contato
          const contact = await message.getContact();
          const chat = await message.getChat();

          // 🤖 RESPOSTA AUTOMÁTICA - Responder a todas as mensagens
          const isNewMessage = true; // Bot agora responde a todas as mensagens
          
          // Log para debug detalhado
          console.log('🔍 DEBUG - Verificando mensagem:', {
            fromMe: message.fromMe,
            type: message.type,
            hasBody: !!message.body,
            bodyLength: message.body?.length || 0,
            autoReplyEnabled: config.bot.autoReply.enabled,
            messageBody: message.body?.substring(0, 100)
          });
          
          // Verificar se a mensagem deve ser respondida
          const shouldReply = !message.fromMe && message.body && config.bot.autoReply.enabled;
          console.log('🤖 Deve responder?', shouldReply, {
            fromMe: message.fromMe,
            hasBody: !!message.body,
            autoReplyEnabled: config.bot.autoReply.enabled
          });
          
                    if (!message.fromMe && message.body && config.bot.autoReply.enabled) {
            console.log('🤖 Iniciando processamento de resposta automática...');
            
            let respostaFinal = '';
            let isAIResponse = false;
            
            // Tentar usar IA Gemini se habilitada
            if (config.bot.autoReply.useAI && geminiService && geminiService.isConfigured()) {
              try {
                console.log('🧠 Gerando resposta com IA Gemini...');
                
                const contactInfo = {
                  name: contact.name || contact.pushname || contact.number,
                  number: contact.number
                };
                
                respostaFinal = await geminiService.generateResponse(
                  message.body, 
                  chat.id._serialized, 
                  contactInfo
                );
                
                isAIResponse = true;
                console.log('✅ Resposta IA gerada:', respostaFinal.substring(0, 100) + '...');
                
              } catch (aiError) {
                console.error('❌ Erro na IA Gemini:', aiError.message);
                
                // Fallback para mensagem pré-definida
                const fallbackMessages = config.bot.autoReply.fallbackMessages;
                respostaFinal = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
                isAIResponse = false;
                
                console.log('🔄 Usando resposta fallback:', respostaFinal);
              }
            } else {
              // Usar mensagens de fallback pré-definidas
              const fallbackMessages = config.bot.autoReply.fallbackMessages;
              respostaFinal = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
              isAIResponse = false;
              
              console.log('📝 Usando resposta pré-definida:', respostaFinal);
            }
            
            try {
              // Aguardar um tempo aleatório baseado na configuração para parecer mais natural
              const delayMin = config.bot.autoReply.delay.min;
              const delayMax = config.bot.autoReply.delay.max;
              const delay = delayMin + Math.random() * (delayMax - delayMin);
              
              console.log(`⏳ Aguardando ${Math.round(delay/1000)}s antes de responder...`);
              const startTime = Date.now();
              await new Promise(resolve => setTimeout(resolve, delay));
              
              // Enviar resposta automática
              await message.reply(respostaFinal);
              const responseTime = Date.now() - startTime;
              console.log(`✅ Resposta ${isAIResponse ? 'IA' : 'pré-definida'} enviada:`, respostaFinal);
              
              // Registrar estatísticas no Firebase
              if (firebaseService) {
                try {
                  await firebaseService.logAIUsage({
                    chatId: chat.id._serialized,
                    originalMessage: message.body.substring(0, 100), // Limitar tamanho
                    responseMessage: respostaFinal.substring(0, 100),
                    isAIResponse: isAIResponse,
                    responseTime: responseTime,
                    contactName: contact.name || contact.pushname || 'Desconhecido',
                    contactNumber: contact.number,
                    messageLength: message.body.length,
                    responseLength: respostaFinal.length
                  });
                  
                  // Registrar mensagem para auditoria
                  await firebaseService.logMessage({
                    chatId: chat.id._serialized,
                    type: 'auto_reply',
                    originalMessage: message.body,
                    botResponse: respostaFinal,
                    isAIResponse: isAIResponse,
                    contactInfo: {
                      name: contact.name || contact.pushname,
                      number: contact.number
                    }
                  });
                } catch (logError) {
                  console.error('⚠️ Erro ao registrar estatísticas:', logError);
                }
              }
              
              // Emitir evento para o frontend informando sobre a resposta automática
              io.emit('auto-reply-sent', {
                chatId: chat.id._serialized,
                originalMessage: message.body,
                autoReply: respostaFinal,
                isAIResponse: isAIResponse,
                responseTime: responseTime,
                timestamp: Date.now(),
                contact: {
                  name: contact.name || contact.pushname || contact.number,
                  number: contact.number
                }
              });
              
            } catch (replyError) {
              console.error('❌ Erro ao enviar resposta automática:', replyError);
              
              // Registrar erro no Firebase
              if (firebaseService) {
                try {
                  await firebaseService.logMessage({
                    chatId: chat.id._serialized,
                    type: 'auto_reply_error',
                    originalMessage: message.body,
                    error: replyError.message,
                    contactInfo: {
                      name: contact.name || contact.pushname,
                      number: contact.number
                    }
                  });
                } catch (logError) {
                  console.error('⚠️ Erro ao registrar erro:', logError);
                }
              }
              
              // Emitir erro para o frontend
              io.emit('auto-reply-error', {
                chatId: chat.id._serialized,
                originalMessage: message.body,
                error: replyError.message,
                timestamp: Date.now()
              });
            }
          }
          
          // Emitir para o socket específico
          socket.emit('message-received', {
            id: message.id._serialized,
            from: message.from,
            to: message.to,
            body: message.body,
            timestamp: message.timestamp,
            type: message.type,
            fromMe: message.fromMe,
            contact: {
              id: contact.id._serialized,
              name: contact.name || contact.pushname || contact.number,
              number: contact.number,
              profilePicUrl: await contact.getProfilePicUrl().catch(() => null)
            },
            chat: {
              id: chat.id._serialized,
              name: chat.name,
              isGroup: chat.isGroup,
              unreadCount: chat.unreadCount
            }
          });
          
          // Broadcast para todos os clientes conectados
          console.log('📡 Broadcasting nova mensagem para todos os clientes');
          
          const broadcastMessage = {
            id: message.id._serialized,
            body: message.body,
            timestamp: message.timestamp,
            fromMe: message.fromMe,
            type: message.type,
            hasMedia: message.hasMedia,
            contact: {
              id: contact.id._serialized,
              name: contact.name || contact.pushname || contact.number,
              number: contact.number
            }
          };

          // Processar mídia para mensagens em tempo real se necessário
          if (message.hasMedia) {
            try {
              console.log('📎 Processando mídia para nova mensagem em tempo real');
              const media = await message.downloadMedia();
              if (media) {
                broadcastMessage.media = {
                  mimetype: media.mimetype,
                  data: media.data,
                  filename: media.filename || `file_${Date.now()}`,
                  filesize: media.data ? Buffer.from(media.data, 'base64').length : 0
                };
                console.log(`✅ Mídia processada em tempo real: ${media.mimetype}`);
              }
            } catch (mediaError) {
              console.error('❌ Erro ao processar mídia em tempo real:', mediaError);
              broadcastMessage.mediaError = 'Erro ao carregar mídia';
            }
          }

          // Processar tipos especiais
          switch (message.type) {
            case 'location':
              if (message.location) {
                broadcastMessage.location = {
                  latitude: message.location.latitude,
                  longitude: message.location.longitude,
                  description: message.location.description
                };
              }
              break;
            case 'vcard':
              broadcastMessage.vcard = message.vCards;
              break;
            case 'sticker':
              broadcastMessage.isSticker = true;
              break;
          }

          io.emit('new-message', {
            chatId: chat.id._serialized,
            message: broadcastMessage
          });
        } catch (error) {
          console.error('❌ Erro ao processar nova mensagem:', error);
        }
      });

      // Inicializar cliente
      console.log('🚀 Inicializando cliente WhatsApp...');
      await whatsappClient.initialize();
      console.log('✅ Cliente WhatsApp inicializado com sucesso!');

    } catch (error) {
      console.error('❌ Erro ao inicializar cliente:', error);
      socket.emit('connection-error', error.message);
      socket.emit('status-update', { 
        message: `Erro: ${error.message}`, 
        type: 'error' 
      });
    }
  });

  // Buscar conversas
  socket.on('get-chats', async () => {
    console.log('📋 Buscando conversas...');
    
    if (!whatsappClient || !isClientReady) {
      socket.emit('chats-data', { success: false, error: 'Cliente não está conectado' });
      return;
    }

    try {
      const chats = await whatsappClient.getChats();
      console.log(`📋 Encontradas ${chats.length} conversas`);
      
      const chatsData = await Promise.all(
        chats.slice(0, 10).map(async (chat) => { // Limitar a 10 conversas para performance
          try {
            const lastMessage = chat.lastMessage;
            let contact = null;
            
            if (!chat.isGroup) {
              contact = await chat.getContact();
            }
            
            return {
              id: chat.id._serialized,
              name: chat.name || (contact ? (contact.name || contact.pushname || contact.number) : 'Contato'),
              isGroup: chat.isGroup,
              unreadCount: chat.unreadCount,
              timestamp: chat.timestamp,
              profilePicUrl: chat.isGroup ? null : await contact?.getProfilePicUrl().catch(() => null),
              lastMessage: lastMessage ? {
                id: lastMessage.id._serialized,
                body: lastMessage.body,
                timestamp: lastMessage.timestamp,
                fromMe: lastMessage.fromMe,
                type: lastMessage.type
              } : null,
              participants: chat.isGroup ? chat.participants.length : null
            };
          } catch (error) {
            console.error('Erro ao processar chat:', error);
            return null;
          }
        })
      );
      
      const validChats = chatsData.filter(chat => chat !== null);
      socket.emit('chats-data', { success: true, chats: validChats });
      
    } catch (error) {
      console.error('❌ Erro ao buscar conversas:', error);
      socket.emit('chats-data', { success: false, error: error.message });
    }
  });

  // Buscar mensagens de uma conversa
  socket.on('get-messages', async (data) => {
    console.log('📨 Buscando mensagens para:', data.chatId);
    console.log('📊 Dados recebidos:', data);
    console.log('🔌 Status do cliente:', {
      whatsappClient: !!whatsappClient,
      isClientReady,
      clientId: whatsappClient?.id
    });
    
    if (!whatsappClient || !isClientReady) {
      console.log('❌ Cliente não está conectado ou pronto');
      socket.emit('messages-data', { success: false, error: 'Cliente não está conectado' });
      return;
    }

    try {
      console.log('🔍 Buscando chat por ID:', data.chatId);
      const chat = await whatsappClient.getChatById(data.chatId);
      console.log('✅ Chat encontrado:', {
        id: chat.id._serialized,
        name: chat.name,
        isGroup: chat.isGroup
      });
      
      console.log('📨 Buscando mensagens com limite:', data.limit || 20);
      const messages = await chat.fetchMessages({ limit: data.limit || 20 });
      
      console.log(`📨 Encontradas ${messages.length} mensagens`);
      console.log('📨 Primeira mensagem (timestamp):', messages[0]?.timestamp);
      console.log('📨 Última mensagem (timestamp):', messages[messages.length - 1]?.timestamp);
      console.log('📨 Ordem das mensagens:', messages.map(m => ({ 
        timestamp: m.timestamp, 
        fromMe: m.fromMe, 
        body: m.body?.substring(0, 30) 
      })));
      
      const messagesData = await Promise.all(
        messages.map(async (message, index) => {
          try {
            console.log(`📝 Processando mensagem ${index + 1}/${messages.length}:`, {
              id: message.id._serialized,
              body: message.body?.substring(0, 50) + '...',
              timestamp: message.timestamp,
              fromMe: message.fromMe,
              type: message.type
            });
            
            const contact = await message.getContact();
            
            const messageData = {
              id: message.id._serialized,
              body: message.body,
              timestamp: message.timestamp,
              fromMe: message.fromMe,
              type: message.type,
              hasMedia: message.hasMedia,
              contact: {
                id: contact.id._serialized,
                name: contact.name || contact.pushname || contact.number,
                number: contact.number
              }
            };

            // Processar mídia se existir
            if (message.hasMedia) {
              try {
                console.log(`📎 Processando mídia para mensagem ${index + 1}:`, {
                  type: message.type,
                  hasMedia: message.hasMedia
                });
                
                const media = await message.downloadMedia();
                if (media) {
                  messageData.media = {
                    mimetype: media.mimetype,
                    data: media.data,
                    filename: media.filename || `file_${Date.now()}`,
                    filesize: media.data ? Buffer.from(media.data, 'base64').length : 0
                  };
                  console.log(`✅ Mídia processada: ${media.mimetype}, ${messageData.media.filesize} bytes`);
                }
              } catch (mediaError) {
                console.error(`❌ Erro ao processar mídia da mensagem ${index + 1}:`, mediaError);
                messageData.mediaError = 'Erro ao carregar mídia';
              }
            }

            // Processar informações específicas por tipo
            switch (message.type) {
              case 'location':
                if (message.location) {
                  messageData.location = {
                    latitude: message.location.latitude,
                    longitude: message.location.longitude,
                    description: message.location.description
                  };
                }
                break;
              case 'vcard':
                messageData.vcard = message.vCards;
                break;
              case 'sticker':
                messageData.isSticker = true;
                break;
            }

            return messageData;
          } catch (error) {
            console.error(`❌ Erro ao processar mensagem ${index + 1}:`, error);
            return null;
          }
        })
      );
      
      const validMessages = messagesData.filter(msg => msg !== null);
      console.log(`✅ Mensagens processadas com sucesso: ${validMessages.length}/${messages.length}`);
      
      // Ordenar mensagens por timestamp (mais antigas primeiro, mais recentes por último)
      const sortedMessages = validMessages.sort((a, b) => a.timestamp - b.timestamp);
      console.log('📊 Mensagens ordenadas por timestamp:', sortedMessages.map(m => ({
        timestamp: m.timestamp,
        fromMe: m.fromMe,
        body: m.body?.substring(0, 30)
      })));
      
      socket.emit('messages-data', { 
        success: true, 
        chatId: data.chatId,
        messages: sortedMessages 
      });
      
      console.log('📤 Mensagens enviadas para o cliente');
      
    } catch (error) {
      console.error('❌ Erro ao buscar mensagens:', error);
      console.error('❌ Stack trace:', error.stack);
      socket.emit('messages-data', { success: false, error: error.message });
    }
  });

  // Enviar mensagem
  socket.on('send-message', async (data) => {
    console.log('📤 Enviando mensagem:', data);
    
    if (!whatsappClient || !isClientReady) {
      socket.emit('message-sent', { 
        success: false, 
        error: 'Cliente não está conectado' 
      });
      return;
    }

    try {
      const { number, message, chatId: providedChatId } = data;
      
      let chatId;
      
      // Se chatId foi fornecido, usar ele diretamente
      if (providedChatId) {
        chatId = providedChatId;
      } else {
        // Formatação do número para novo chat
        chatId = number.includes('@') ? number : `${number}@c.us`;
        
        // Verificar se é um número brasileiro e ajustar formato se necessário
        if (!number.includes('@') && number.length === 11 && number.startsWith('11')) {
          chatId = `55${number}@c.us`;
        } else if (!number.includes('@') && !number.startsWith('55')) {
          chatId = `55${number}@c.us`;
        }
      }

      console.log(`📱 Enviando para: ${chatId}`);
      
      const sentMessage = await whatsappClient.sendMessage(chatId, message);
      
      console.log('✅ Mensagem enviada com sucesso!');
      socket.emit('message-sent', { 
        success: true, 
        messageId: sentMessage.id._serialized,
        chatId: chatId
      });
      
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem:', error);
      socket.emit('message-sent', { 
        success: false, 
        error: error.message 
      });
    }
  });

  // Desconectar WhatsApp
  socket.on('disconnect-whatsapp', async () => {
    console.log('🔌 Desconectando WhatsApp...');
    
    if (whatsappClient) {
      try {
        // Forçar fechamento completo do navegador
        console.log('🌐 Fechando navegador...');
        if (whatsappClient.pupBrowser) {
          await whatsappClient.pupBrowser.close();
        }
        
        await whatsappClient.destroy();
        whatsappClient = null;
        isClientReady = false;
        
        // Aguardar um pouco para garantir que tudo foi fechado
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Limpar TODAS as sessões
        console.log('🧹 Limpando todas as sessões...');
        clearAllSessions();
        
        console.log('✅ WhatsApp desconectado completamente!');
        socket.emit('disconnected', 'Desconectado pelo usuário');
        socket.emit('status-update', { 
          message: 'WhatsApp desconectado completamente!', 
          type: 'info' 
        });
        
        // Broadcast para todos os clientes
        io.emit('whatsapp-disconnected', 'Desconectado pelo usuário');
        
      } catch (error) {
        console.error('❌ Erro ao desconectar:', error);
        
        // Mesmo com erro, limpar tudo
        whatsappClient = null;
        isClientReady = false;
        clearAllSessions();
        
        socket.emit('status-update', { 
          message: `Desconectado com avisos: ${error.message}`, 
          type: 'warning' 
        });
      }
    }
  });

  // Limpar sessão sem fechar terminal (servidor continua rodando)
  socket.on('close-terminal', () => {
    console.log('🧹 Limpando sessão WhatsApp...');
    console.log('✅ WhatsApp desconectado! Servidor continua rodando...');
    
    // Resetar variáveis de estado
    whatsappClient = null;
    isClientReady = false;
    
    // Limpar sessões
    clearAllSessions();
    
    // Enviar status atualizado
    socket.emit('disconnected', 'Sessão limpa - Servidor continua rodando');
    socket.emit('status-update', { 
      message: 'Sessão limpa! Clique em "Conectar" para nova autenticação.', 
      type: 'info' 
    });
    
    // Broadcast para todos os clientes
    io.emit('whatsapp-disconnected', 'Sessão limpa - Servidor continua rodando');
    
    console.log('🔄 Servidor pronto para nova conexão!');
  });

  // Evento de desconexão do socket
  socket.on('disconnect', () => {
    console.log('🔌 Cliente desconectado:', socket.id);
  });
});

const PORT = config.server.port;
server.listen(PORT, () => {
  console.log(`🚀 Servidor WhatsApp Backend rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🔗 Socket.io disponível para conexões`);
  console.log(`🌐 CORS habilitado para: ${config.server.cors.origins.join(', ')}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor...');
  
  if (whatsappClient) {
    console.log('🔌 Desconectando WhatsApp...');
    try {
      await whatsappClient.destroy();
      
      // Limpar TODAS as sessões
      console.log('🧹 Limpando todas as sessões...');
      clearAllSessions();
      
    } catch (error) {
      console.log('Erro ao desconectar WhatsApp:', error.message);
    }
  }
  
  server.close(() => {
    console.log('✅ Servidor encerrado!');
    process.exit(0);
  });
});
