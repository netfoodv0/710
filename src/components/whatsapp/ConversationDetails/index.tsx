import { KeyboardEvent, useContext, useEffect, useState, useRef } from "react";
import { ConversationContext } from "../context/ConversationContext";
import Avatar from "../Avatar";
import MessageBalloon from "../MessageBalloon";
import { Search, MoreVertical, Phone, Video, Smile, Paperclip, Mic, Send, Image, File, MapPin, Users, MessageCircle } from "lucide-react";
import BotToggleButton from "../BotToggleButton";
import BotStatusIndicator from "../BotStatusIndicator";

export default function ConversationDetails() {
  const { 
    conversation,
    currentChat, 
    messages, 
    loading, 
    error, 
    sendMessage, 
    clearError 
  } = useContext(ConversationContext);

  // Debug logs
  useEffect(() => {
    console.log('🔍 ConversationDetails - Estado atual:', {
      conversation: conversation,
      currentChat: currentChat,
      messagesCount: messages.length,
      loading: loading,
      error: error
    });
  }, [conversation, currentChat, messages, loading, error]);
  
  const { contactName, image, chatId, isGroup } = conversation;
  const [messageSend, setMessageSend] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const [autoUpdating, setAutoUpdating] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Limpar erro quando conversa muda
  useEffect(() => {
    clearError();
  }, [chatId, clearError]);

  // Scroll para a última mensagem quando a conversa é carregada
  useEffect(() => {
    if (messages.length > 0 && messagesContainerRef.current) {
      // Pequeno delay para garantir que as mensagens foram renderizadas
      const timer = setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [chatId, messages.length]);









  function changeHandler(evt: KeyboardEvent<HTMLInputElement>) {
    const { key } = evt;
    if (key === "Enter") {
      handleSendMessage();
    }
  }

  const handleSendMessage = async () => {
    if (messageSend.trim()) {
      try {
        await sendMessage(messageSend, chatId);
        setMessageSend("");
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  const handleTyping = (value: string) => {
    setMessageSend(value);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatLastSeen = () => {
    if (!currentChat) return 'offline';
    
    if (currentChat.isGroup) {
      return `${currentChat.participants || 0} participantes`;
    }
    
    const lastSeen = new Date(currentChat.timestamp * 1000);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastSeen.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 5) return 'online';
    if (diffMinutes < 60) return `visto há ${diffMinutes} min`;
    if (diffHours < 24) return `visto há ${diffHours}h`;
    if (diffDays === 1) return 'visto ontem';
    return `visto há ${diffDays} dias`;
  };

  const emojis = ["😊", "👍", "❤️", "🎉", "🔥", "💯", "👏", "🙏", "😎", "🤔"];

  const attachmentOptions = [
    { icon: Image, label: "Imagem", color: "text-blue-500" },
    { icon: File, label: "Documento", color: "text-green-500" },
    { icon: MapPin, label: "Localização", color: "text-red-500" },
  ];

  // Verificar se há uma conversa selecionada
  const hasSelectedConversation = conversation.contactName && conversation.chatId;

  return (
    <div className="flex flex-col w-full">
      {/* Header do chat melhorado */}
      <div className="flex justify-between w-full px-4">
        <div className="flex justify-between bg-[#202c33] w-full h-14">
          <div className="flex items-center gap-4 h-full">
            <div className="relative">
              <Avatar width="w-10" height="h-10" image={image} name={contactName} />
              {isGroup && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-white font-medium">{contactName}</h1>
                {/* Indicador do robô */}
                <BotStatusIndicator chatId={chatId} />
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  formatLastSeen() === 'online' ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-[#aebac1] text-xs">
                  {formatLastSeen()}
                </span>
                {autoUpdating && (
                  <div className="flex items-center gap-1 ml-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 text-xs">atualizando</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-[#8696a0] gap-2">
            {/* Botão toggle do robô */}
            <BotToggleButton 
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors" 
              chatId={chatId}
            />
            
            <button className="p-2 hover:bg-[#2a3942] rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-[#2a3942] rounded-full transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-[#2a3942] rounded-full transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-[#2a3942] rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Área de mensagens */}
                <div
            ref={messagesContainerRef}
            className="flex flex-col w-full h-full px-24 py-6 overflow-y-auto messages-container bg-[#0b141a] scrollbar-dark"
          >


        {/* Error */}
        {error && (
          <div className="flex items-center justify-center py-4 mb-4 bg-red-900/20 rounded-lg border border-red-500/20">
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {/* Mensagens */}
        {!loading && messages.length > 0 ? (
          messages.map((messageData, index) => {
            
            return (
              <MessageBalloon 
                key={messageData.id || index} 
                me={messageData.fromMe} 
                message={messageData.body}
                timestamp={formatTime(messageData.timestamp)}
                type={messageData.type}
                contact={messageData.contact}
                hasMedia={messageData.hasMedia}
                media={messageData.media}
                mediaError={messageData.mediaError}
                location={messageData.location}
                vcard={messageData.vcard}
                isSticker={messageData.isSticker}
              />
            );
          })
        ) : !loading && messages.length === 0 && hasSelectedConversation ? (
          <div className="flex flex-col items-center justify-center py-8 text-[#aebac1]">
            <div className="w-16 h-16 bg-[#2a3942] rounded-full flex items-center justify-center mb-4">
              {isGroup ? <Users className="w-8 h-8" /> : <Avatar width="w-8" height="h-8" image={image} name={contactName} />}
            </div>
            <span className="text-sm">Nenhuma mensagem ainda</span>
            <span className="text-xs opacity-75 text-center">
              {isGroup ? 'Comece uma conversa no grupo' : 'Envie uma mensagem para começar a conversar'}
            </span>
          </div>
        ) : !hasSelectedConversation ? (
          <div className="flex flex-col items-center justify-center py-8 text-[#aebac1]">
            <div className="w-16 h-16 bg-[#2a3942] rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <span className="text-sm">Selecione uma conversa</span>
            <span className="text-xs opacity-75 text-center">
              Escolha uma conversa na barra lateral para ver as mensagens
            </span>
          </div>
        ) : null}
        

      </div>

      {/* Footer com funcionalidades avançadas */}
      <footer className="flex items-center bg-[#202c33] w-full h-16 py-3 text-[#8696a0]">
        <div className="flex py-1 pl-5 gap-3">
          {/* Botão de emojis */}
          <div className="relative">
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
            
            {/* Picker de emojis */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 bg-[#2a3942] rounded-lg p-3 shadow-lg border border-[#8696a0] z-50">
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setMessageSend(prev => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="w-8 h-8 text-2xl hover:bg-[#3a4952] rounded transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botão de anexos */}
          <div className="relative">
            <button 
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            {/* Menu de anexos */}
            {showAttachmentMenu && (
              <div className="absolute bottom-12 left-0 bg-[#2a3942] rounded-lg p-3 shadow-lg border border-[#8696a0] min-w-[200px] z-50">
                {attachmentOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setShowAttachmentMenu(false)}
                    className="flex items-center gap-3 w-full p-2 hover:bg-[#3a4952] rounded transition-colors"
                  >
                    <option.icon className={`w-5 h-5 ${option.color}`} />
                    <span className="text-white text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input de mensagem melhorado */}
        <div className="flex w-[85%] h-12 ml-3">
          <input 
            type="text" 
            className="bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
            placeholder={hasSelectedConversation ? "Mensagem" : "Selecione uma conversa"} 
            onKeyDown={(evt) => changeHandler(evt)} 
            onChange={(evt) => handleTyping(evt.target.value)} 
            value={messageSend}
            disabled={!hasSelectedConversation}
          />
        </div>

        {/* Botão de envio/gravação */}
        <div className="flex justify-center items-center w-[5%] h-12">
          {messageSend.trim() ? (
            <button 
              onClick={handleSendMessage}
              disabled={!hasSelectedConversation}
              className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-full text-white transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button 
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors"
              disabled={!hasSelectedConversation}
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}