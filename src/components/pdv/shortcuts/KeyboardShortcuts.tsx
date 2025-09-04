import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNotifications } from '../notifications/NotificationSystem';

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
  modifier?: 'ctrl' | 'alt' | 'shift';
}

interface ShortcutContextType {
  registerShortcut: (shortcut: Shortcut) => void;
  unregisterShortcut: (key: string) => void;
  showShortcutsHelp: () => void;
}

const ShortcutContext = createContext<ShortcutContextType | undefined>(undefined);

export const useShortcuts = () => {
  const context = useContext(ShortcutContext);
  if (!context) {
    throw new Error('useShortcuts deve ser usado dentro de ShortcutProvider');
  }
  return context;
};

interface ShortcutProviderProps {
  children: ReactNode;
}

export const ShortcutProvider: React.FC<ShortcutProviderProps> = ({ children }) => {
  const { addNotification } = useNotifications();
  const shortcuts = new Map<string, Shortcut>();

  const registerShortcut = (shortcut: Shortcut) => {
    shortcuts.set(shortcut.key, shortcut);
  };

  const unregisterShortcut = (key: string) => {
    shortcuts.delete(key);
  };

  const showShortcutsHelp = () => {
    const shortcutsList = Array.from(shortcuts.values())
      .map(s => `${s.modifier ? `${s.modifier}+` : ''}${s.key}: ${s.description}`)
      .join('\n');

    addNotification({
      type: 'info',
      title: 'Atalhos de Teclado',
      message: shortcutsList,
      duration: 5000
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Atalho global para mostrar ajuda
      if (event.ctrlKey && event.key === '?') {
        event.preventDefault();
        showShortcutsHelp();
        return;
      }

      // Verificar atalhos registrados
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey ? 'ctrl' : event.altKey ? 'alt' : event.shiftKey ? 'shift' : undefined;
      
      for (const [shortcutKey, shortcut] of shortcuts) {
        if (shortcutKey === key && shortcut.modifier === modifier) {
          event.preventDefault();
          shortcut.action();
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  const value: ShortcutContextType = {
    registerShortcut,
    unregisterShortcut,
    showShortcutsHelp
  };

  return (
    <ShortcutContext.Provider value={value}>
      {children}
    </ShortcutContext.Provider>
  );
};

// Hook para usar atalhos específicos
export const useKeyboardShortcut = (key: string, action: () => void, description: string, modifier?: 'ctrl' | 'alt' | 'shift') => {
  const { registerShortcut, unregisterShortcut } = useShortcuts();

  useEffect(() => {
    const shortcut: Shortcut = { key, action, description, modifier };
    registerShortcut(shortcut);

    return () => unregisterShortcut(key);
  }, [key, action, description, modifier]);
};

// Componente para mostrar atalhos disponíveis
export const ShortcutsHelp: React.FC = () => {
  const { showShortcutsHelp } = useShortcuts();

  return (
    <button
      onClick={showShortcutsHelp}
      className="fixed bottom-4 right-4 z-40 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      title="Mostrar atalhos de teclado (Ctrl+?)"
    >
      <span className="text-sm font-medium">?</span>
    </button>
  );
};
