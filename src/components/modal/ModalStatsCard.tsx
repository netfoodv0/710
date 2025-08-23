import React from 'react';
import { Card } from '../ui';
import { ModalStats } from '../../types/modal';

interface ModalStatsCardProps {
  stats: ModalStats;
}

export const ModalStatsCard: React.FC<ModalStatsCardProps> = ({ stats }) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Estatísticas
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Total de Modais</span>
            <span className="font-semibold text-slate-800">{stats.totalModais}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Modais Ativos</span>
            <span className="font-semibold text-green-600">{stats.modaisAtivos}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Modais Inativos</span>
            <span className="font-semibold text-red-600">{stats.modaisInativos}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
