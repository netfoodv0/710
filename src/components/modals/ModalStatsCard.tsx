import React from 'react';
import { Card } from '../Card';

export const ModalStatsCard: React.FC = () => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Estatísticas de Modais
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-slate-600">Modais Criados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-slate-600">Em Uso</div>
          </div>
        </div>
      </div>
    </Card>
  );
};




