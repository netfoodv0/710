interface MediaData {
  mimetype: string;
  data: string;
  filename: string;
  filesize: number;
}

interface LocationData {
  latitude: number;
  longitude: number;
  description?: string;
}

interface Message {
  id: string;
  body: string;
  timestamp: number;
  fromMe: boolean;
  type: string;
  hasMedia?: boolean;
  media?: MediaData;
  mediaError?: string;
  location?: LocationData;
  vcard?: any[];
  isSticker?: boolean;
  contact?: {
    id: string;
    name: string;
    number: string;
  };
}

interface WhatsAppChat {
  id: string;
  name: string;
  isGroup: boolean;
  unreadCount: number;
  timestamp: number;
  profilePicUrl?: string | null;
  lastMessage?: {
    id: string;
    body: string;
    timestamp: number;
    fromMe: boolean;
    type: string;
  } | null;
  participants?: number | null;
}

interface Conversation {
  contactName: string;
  messageHistory: Message[];
  image: string;
  chatId?: string;
  isGroup?: boolean;
  unreadCount?: number;
}

interface ConversationListData {
  contactName: string;
  lastMessage: string;
  lastTime: string;
  image: string;
  messageHistory: Message[];
  chatId?: string;
  isGroup?: boolean;
  unreadCount?: number;
  isLastMessageFromMe?: boolean;
}

// Tipos para compatibilidade com dados antigos
interface LegacyMessage {
  me: boolean;
  message: string;
}

export type { 
  Message, 
  MediaData,
  LocationData,
  WhatsAppChat, 
  Conversation, 
  ConversationListData, 
  LegacyMessage 
}