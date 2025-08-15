import React from 'react';
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
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{aba.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
} 