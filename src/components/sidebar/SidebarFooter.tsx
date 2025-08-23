import React from 'react';
import { LogOut } from 'lucide-react';

interface SidebarFooterProps {
  onLogout: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ onLogout }) => {
  return (
    <div className="sidebar-footer expanded p-3 border-t border-slate-100">
      <div className="bg-slate-50 rounded-xl p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-[#525866]">Sistema Online</span>
        </div>
        <p className="text-xs text-[#525866] mb-3">Última sincronização: agora</p>
        <button
          onClick={onLogout}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-[#525866] hover:bg-slate-100 transition-colors"
        >
          <LogOut className="w-6 h-6 text-[#525866]" />
          Sair
        </button>
      </div>
    </div>
  );
};
