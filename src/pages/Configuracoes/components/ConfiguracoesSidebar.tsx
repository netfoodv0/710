import React from 'react';
import '../../../components/Sidebar.css';
import { abas } from '../data/abasConfig';

interface ConfiguracoesSidebarProps {
  abaSelecionada: string;
  onAbaChange: (aba: string) => void;
}

export function ConfiguracoesSidebar({ abaSelecionada, onAbaChange }: ConfiguracoesSidebarProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      <nav className="space-y-0">
        {abas.map((aba) => {
          const Icon = aba.icon;
          return (
            <button
              key={aba.key}
              onClick={() => onAbaChange(aba.key)}
              className={`w-full flex items-center gap-4 text-left transition-colors ${
                abaSelecionada === aba.key
                  ? 'sidebar-item-active'
                  : 'sidebar-item-inactive'
              }`}
            >
              <Icon className="w-6 h-6" color={abaSelecionada === aba.key ? "#8217d5" : "#525866"} />
              <span className={`text-sm ${abaSelecionada === aba.key ? 'text-[#8217d5]' : 'text-[#525866]'}`}>{aba.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
} 