// Validações
export { ValidationProvider, useValidation } from '../validation/ValidationProvider';

// Notificações
export { NotificationProvider, useNotifications } from '../notifications/NotificationSystem';

// Otimização Mobile
export { 
  MobileProvider, 
  useMobile, 
  MobileMenuToggle, 
  MobileLayout, 
  MobileIndicator 
} from '../responsive/MobileOptimizer';

// Atalhos de Teclado
export { 
  ShortcutProvider, 
  useShortcuts, 
  useKeyboardShortcut, 
  ShortcutsHelp 
} from '../shortcuts/KeyboardShortcuts';

// Auditoria e Logs
export { AuditProvider, useAudit, AuditLogViewer } from '../audit/AuditLogger';
