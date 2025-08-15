import Avatar from "../Avatar";
import ConversationList from "../ConversationList";
import { useState, useEffect, useContext, useRef } from "react";
import { ConversationContext } from "../context/ConversationContext";
import { LogOut, User, Settings, MessageCircle, RefreshCw, WifiOff, Bot } from "lucide-react";
import { useLoja } from "../../../context/lojaContext";
import { useWhatsAppConnection } from "../../../hooks/useWhatsAppConnection";
import BotSettingsModal from "../BotSettingsModal";
import "./SideBar.css";

export default function SideBar() {
  const { loja } = useLoja();
  const { 
    chats, 
    loading, 
    error, 
    loadChats, 
    selectChat, 
    isConnected: chatsConnected 
  } = useContext(ConversationContext);
  const { connectionState, disconnect } = useWhatsAppConnection();
  
  const [search, setSearch] = useState("");
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showBotSettings, setShowBotSettings] = useState(false);
  
  // Remover useEffect problemático que causava loops
  // O hook useWhatsAppChats já cuida de carregar as conversas automaticamente
  
  const filteredChats = search.length > 0
    ? chats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase()))
    : chats;

  // Log apenas quando necessário (não a cada render)
  const shouldLog = useRef(false);
  if (!shouldLog.current) {
    console.log('🔍 Filtro de conversas:', {
      search,
      totalChats: chats.length,
      filteredCount: filteredChats.length,
      isConnected: connectionState.isConnected,
      chatsConnected: chats.length > 0
    });
    shouldLog.current = true;
  }


  const handleDisconnect = async () => {
    console.log("Desconectando WhatsApp e fechando terminal...");
    setShowMenuDropdown(false);
    
    try {
      await disconnect();
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  };

  const handleProfile = () => {
    console.log("Abrindo perfil...");
    setShowMenuDropdown(false);
  };

  const handleSettings = () => {
    console.log("Abrindo configurações...");
    setShowMenuDropdown(false);
  };



  const formatLastTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('pt-BR', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  return (
    <div className="flex flex-col w-[290px] h-full bg-[#202c33] overflow-hidden" style={{borderRight: "1px solid rgba(134,150,160,0.15)"}}>
      {/* Header com status e notificações */}
      <div className="flex items-center justify-between w-full px-3 py-3 bg-[#111b21] border-b border-[rgba(134,150,160,0.15)] min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex cursor-pointer">
            <Avatar width="w-8" height="h-8" image="" name={loja?.nomeLoja || 'WhatsApp'} />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-white text-xs font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {connectionState.clientInfo?.pushname || loja?.nomeLoja || 'WhatsApp'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-1 flex-shrink-0">
          
          {/* Menu com dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowMenuDropdown(!showMenuDropdown)}
              className="flex cursor-pointer w-8 h-8 items-center justify-center hover:bg-[#2a3942] rounded-lg transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" className="text-[#AEBAC1]">
                <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
              </svg>
            </button>
            
            {/* Dropdown do menu */}
            {showMenuDropdown && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-[#2a3942] rounded-lg shadow-lg border border-[#8696a0] z-50">
                <div className="py-1">
                  <button
                    onClick={handleProfile}
                    className="flex items-center gap-3 w-full px-4 py-2 text-white text-sm hover:bg-[#3a4952] transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Perfil</span>
                  </button>
                  
                  <button
                    onClick={handleSettings}
                    className="flex items-center gap-3 w-full px-4 py-2 text-white text-sm hover:bg-[#3a4952] transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowBotSettings(true);
                      setShowMenuDropdown(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-green-400 text-sm hover:bg-[#3a4952] transition-colors"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Configurações do Robô</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      console.log('🔄 Testando cache...');
                      console.log('📊 Estado atual:', { chats: chats.length, loading, error });
                      if (typeof (window as any).testCache === 'function') {
                        (window as any).testCache();
                      }
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-blue-400 text-sm hover:bg-[#3a4952] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Testar Cache</span>
                  </button>
                  
                  <div className="border-t border-[#8696a0] my-1"></div>
                  
                  <button
                    onClick={handleDisconnect}
                    className="flex items-center gap-3 w-full px-4 py-2 text-red-400 text-sm hover:bg-[#3a4952] transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Desconectar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>





      {/* Error display */}
      {error && (
        <div className="flex items-center justify-between px-3 py-2 bg-red-900/20 border-b border-red-500/20">
          <span className="text-red-400 text-xs">{error}</span>
        </div>
      )}



      {/* Barra de pesquisa melhorada */}
      <div className="flex bg-[#111b21] w-full h-max px-3 py-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AEBAC1]">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
              </path>
            </svg>
          </div>
          <input 
            className="w-full h-8 rounded-lg bg-[#202c33] text-white text-xs pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
            placeholder="Pesquisar conversas..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <div className="flex items-center justify-center ml-2">
          <svg viewBox="0 0 24 24" width="16" height="16" className="text-[#778690]">
            <path fill="currentColor" d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z">
            </path>
          </svg>
        </div>
      </div>

      {/* Lista de conversas */}
      <div className="flex flex-col w-full overflow-y-auto overflow-x-hidden scrollbar-dark" id="conversation">

        
        {!loading && filteredChats.length > 0 ? (
          (() => {
            console.log('📋 Renderizando conversas:', filteredChats.length);
            return filteredChats.map((chat, index) => {
              // Verificar se a última mensagem foi enviada por você
              const isLastMessageFromMe = chat.lastMessage?.fromMe || false;
              const lastMessageText = chat.lastMessage?.body || 'Sem mensagens';
              
              // Formatar a mensagem baseado em quem enviou
              const formattedLastMessage = isLastMessageFromMe 
                ? `Você: ${lastMessageText}`
                : lastMessageText;
              
              const conversationData = {
                contactName: chat.name,
                lastMessage: formattedLastMessage,
                lastTime: formatLastTime(chat.timestamp),
                image: chat.profilePicUrl || 'avatar.jpg',
                messageHistory: [], // Será carregado quando selecionado
                chatId: chat.id,
                isGroup: chat.isGroup,
                unreadCount: chat.unreadCount,
                isLastMessageFromMe: isLastMessageFromMe
              };
              

              

              
              return (
                <ConversationList 
                  key={chat.id} 
                  isFirstConversation={index === 0} 
                  data={conversationData}
                />
              );
            });
          })()
        ) : !loading && connectionState.isConnected ? (
          <div className="flex flex-col items-center justify-center py-8 text-[#AEBAC1]">
            <MessageCircle className="w-8 h-8 mb-3 opacity-50" />
            <span className="text-xs">
              {search ? 'Nenhuma conversa encontrada' : 'Nenhuma conversa disponível'}
            </span>
            <span className="text-[10px] opacity-75 text-center px-4">
              {search ? 'Tente ajustar sua pesquisa' : 'Suas conversas do WhatsApp aparecerão aqui'}
            </span>
          </div>
        ) : !connectionState.isConnected ? (
          <div className="flex flex-col items-center justify-center py-8 text-[#AEBAC1]">
            <WifiOff className="w-8 h-8 mb-3 opacity-50" />
            <span className="text-xs">WhatsApp não conectado</span>
            <span className="text-[10px] opacity-75 text-center px-4">
              Conecte seu WhatsApp para ver as conversas
            </span>
          </div>
        ) : null}
      </div>
      
      {/* Modal de configurações do robô */}
      <BotSettingsModal 
        isOpen={showBotSettings} 
        onClose={() => setShowBotSettings(false)} 
      />
    </div>
  );
}