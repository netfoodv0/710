export { default as SideBar } from './SideBar';
export { default as ConversationDetails } from './ConversationDetails';
export { default as ConversationList } from './ConversationList';
export { default as MessageBalloon } from './MessageBalloon';
export { default as Avatar } from './Avatar';
export { ConversationProvider, ConversationContext } from './context/ConversationContext';
export { WhatsAppConnection } from './WhatsAppConnection';
export { WhatsAppAuth } from './WhatsAppAuth';
export type { Message, Conversation, ConversationListData } from './types/Conversation';

// Componentes do robô
export * from './bot';
