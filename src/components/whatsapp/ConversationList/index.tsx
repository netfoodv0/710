import { useContext, useState } from "react";
import { ConversationContext } from "../context/ConversationContext";
import Avatar from "../Avatar";
import { ConversationListData } from "../types/Conversation";
import { Check, CheckCheck, User } from "lucide-react";


interface ConversationListProps {
  isFirstConversation?: boolean;
  data: ConversationListData;
  onClick?: () => void;
}

export default function ConversationList(props: ConversationListProps) {
  const { isFirstConversation, data, onClick } = props;
  const { setConversation, selectChat } = useContext(ConversationContext);
  const { contactName, lastMessage, lastTime, image, unreadCount: dataUnreadCount, isGroup, chatId, isLastMessageFromMe } = data;
  const borderHeight = isFirstConversation ? "0px" : "1px"


  // Usar dados reais quando disponíveis
  const hasUnread = (dataUnreadCount || 0) > 0;
  const unreadCount = dataUnreadCount || 0;



  const handleConversationClick = () => {
    console.log('🖱️ ConversationList - Clique na conversa:', contactName);
    
    // Apenas atualizar o contexto da conversa
    // O contexto vai automaticamente chamar selectChat
    setConversation(data);
    
    // Chamar o onClick personalizado se existir
    onClick?.();
  };

  return (
    <div 
      className="flex items-center w-full h-[3.5rem] bg-[#111B21] pl-2 pr-3 hover:bg-[#2A3942] cursor-pointer transition-colors"
      onClick={handleConversationClick}
    >
      <div className="flex w-[3.5rem] relative">
        <Avatar width="w-9" height="h-9" image={image} name={contactName} />
      </div>
      
      <div className="flex flex-col w-full min-w-0 flex-1">
        <hr style={{borderTop: `${borderHeight} solid rgba(134,150,160,0.15)`}} />
        <div className="flex py-1.5 min-w-0">
          <div className="flex flex-col w-full h-full min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-white text-sm font-medium flex-1 min-w-0">
                {contactName}
              </span>
              {isGroup && (
                <div className="w-3 h-3 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="8" height="8" className="text-white">
                    <path fill="currentColor" d="M12 12.75c1.63 0 3.07.39 4.24.9c1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73C8.93 13.14 10.37 12.75 12 12.75zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85C21.93 14.21 20.99 14 20 14c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3z"/>
                  </svg>
                </div>
              )}

            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              {hasUnread ? (
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-white text-xs font-medium flex-1 min-w-0">
                  {lastMessage}
                </span>
              ) : (
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  {isLastMessageFromMe && (
                    <User className="w-3 h-3 text-[#8696a0] flex-shrink-0" />
                  )}
                  <span className={`overflow-hidden text-ellipsis whitespace-nowrap text-xs flex-1 min-w-0 ${
                    isLastMessageFromMe 
                      ? 'text-[#8696a0] italic' // Cor mais clara e itálico para suas mensagens
                      : 'text-[#aebac1]' // Cor normal para mensagens de outros
                  }`}>
                    {lastMessage}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col w-auto text-[#aebac1] items-end gap-1 flex-shrink-0 ml-2">
            <div className="flex items-center gap-1">
              <span className="text-[10px]">{lastTime}</span>
            </div>
            
            {hasUnread && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-green-500">
                  {unreadCount}
                </span>
              </div>
            )}
            
            {!hasUnread && lastMessage.includes("enviada") && (
              <div className="flex items-center gap-1">
                <CheckCheck className="w-2.5 h-2.5 text-blue-400" />
              </div>
            )}
            

          </div>
        </div>
      </div>
    </div>
  )
}