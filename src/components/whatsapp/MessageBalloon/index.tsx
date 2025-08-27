import { useEffect, useState } from "react";
import { Check, CheckCheck, Clock } from "lucide-react";
import { Message } from "../types/Conversation";
import { 
  ImageMessage, 
  AudioMessage, 
  VideoMessage, 
  DocumentMessage, 
  StickerMessage, 
  LocationMessage, 
  ContactMessage 
} from "./MediaComponents";

interface MessageBalloonProps {
  me: boolean;
  message: string;
  timestamp?: string;
  type?: string;
  contact?: {
    id: string;
    name: string;
    number: string;
  };
  // Propriedades adicionais para mídia
  hasMedia?: boolean;
  media?: Message['media'];
  mediaError?: string;
  location?: Message['location'];
  vcard?: Message['vcard'];
  isSticker?: boolean;
}

export default function MessageBalloon(props: MessageBalloonProps) {
  const [time, setTime] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<'sending' | 'sent' | 'delivered' | 'read'>('sent');
  const { 
    me, 
    message, 
    timestamp, 
    type, 
    contact, 
    hasMedia, 
    media, 
    mediaError, 
    location, 
    vcard, 
    isSticker 
  } = props;
  
  const flexAlignItems = me ? "items-end" : "items-start";
  const backgroundColor = me ? "bg-[#005c4b]" : "bg-[#202c33]";
  const borderRounded = me ? "rounded-tr-none" : "rounded-tl-none";

  useEffect(() => {
    // Usar timestamp real se fornecido, senão usar tempo atual
    setTime(timestamp || refreshTime());
    
    // Simular status de entrega para mensagens enviadas
    if (me) {
      setDeliveryStatus('sending');
      setTimeout(() => setDeliveryStatus('sent'), 1000);
      setTimeout(() => setDeliveryStatus('delivered'), 2000);
      setTimeout(() => setDeliveryStatus('read'), 4000);
    }
  }, [timestamp])

  function refreshTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const getDeliveryIcon = () => {
    switch (deliveryStatus) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    // Stickers têm prioridade
    if (isSticker && media) {
      return <StickerMessage media={media} body={message} mediaError={mediaError} />;
    }

    // Localização
    if (type === 'location' && location) {
      return <LocationMessage location={location} body={message} />;
    }

    // Contato (vCard)
    if (type === 'vcard' && vcard) {
      return <ContactMessage vcard={vcard} body={message} />;
    }

    // Mídia
    if (hasMedia && media) {
      const mimetype = media.mimetype.toLowerCase();

      if (mimetype.startsWith('image/')) {
        return <ImageMessage media={media} body={message} mediaError={mediaError} />;
      }

      if (mimetype.startsWith('audio/') || 
          mimetype.includes('ogg') || 
          mimetype.includes('mp3') || 
          mimetype.includes('wav') || 
          mimetype.includes('m4a') || 
          mimetype.includes('aac') ||
          type === 'ptt' || // Push to talk (áudio do WhatsApp)
          type === 'audio') {
        return <AudioMessage media={media} body={message} mediaError={mediaError} />;
      }

      if (mimetype.startsWith('video/')) {
        return <VideoMessage media={media} body={message} mediaError={mediaError} />;
      }

      // Qualquer outro tipo de arquivo
      return <DocumentMessage media={media} body={message} mediaError={mediaError} />;
    }

    // Mensagem de texto simples
    return (
      <div className="flex flex-col w-full break-words">
        <span className="text-sm leading-relaxed">{message}</span>
      </div>
    );
  };

  // Ajustar layout para stickers (não precisam de background)
  const isSpecialMessage = isSticker || (type === 'location' && location);
  const containerClasses = isSpecialMessage 
    ? `flex flex-col ${flexAlignItems} w-full h-max mb-3`
    : `flex flex-col ${flexAlignItems} w-full h-max mb-3`;
  
  const balloonClasses = isSpecialMessage
    ? "flex flex-col min-w-[5%] max-w-[65%] h-max"
    : `flex flex-col min-w-[5%] max-w-[65%] h-max ${backgroundColor} p-3 text-white rounded-lg ${borderRounded} shadow-sm`;

  return (
    <div className={containerClasses}>
      <div className={balloonClasses}>
        {renderMessageContent()}
        
        {/* Timestamp e status - apenas para mensagens não especiais */}
        {!isSpecialMessage && (
          <div className={`flex items-center justify-end mt-2 space-x-1 ${
            me ? 'text-green-100' : 'text-gray-500'
          }`}>
            <span className="text-xs">{time}</span>
            {me && (
              <div className="flex items-center ml-1">
                {getDeliveryIcon()}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Timestamp separado para mensagens especiais */}
      {isSpecialMessage && (
        <div className={`flex ${me ? 'justify-end' : 'justify-start'} mt-1`}>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
            me ? 'text-green-100' : 'text-gray-400'
          }`}>
            <span>{time}</span>
            {me && getDeliveryIcon()}
          </div>
        </div>
      )}
    </div>
  )
}
