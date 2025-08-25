import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ScoreQualidade } from '../../types/produtos';

interface ModalProdutoScoreProps {
  scoreQualidade: ScoreQualidade | null;
}

export function ModalProdutoScore({ scoreQualidade }: ModalProdutoScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-purple-600';
    if (score >= 60) return 'text-gray-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Score de Qualidade</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Total */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Score Total</h4>
              <span className={`text-2xl font-bold ${getScoreColor(scoreQualidade?.total || 0)}`}>
                {scoreQualidade?.total || 0}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  (scoreQualidade?.total || 0) >= 80 ? 'bg-purple-500' :
                  (scoreQualidade?.total || 0) >= 60 ? 'bg-gray-500' : 'bg-gray-400'
                }`}
                style={{ width: `${scoreQualidade?.total || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Categorias */}
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-semibold mb-3">Categorias</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Informações</span>
                <span>{scoreQualidade?.categorias.informacoes || 0}/25</span>
              </div>
              <div className="flex justify-between">
                <span>Mídia</span>
                <span>{scoreQualidade?.categorias.midia || 0}/25</span>
              </div>
              <div className="flex justify-between">
                <span>Classificações</span>
                <span>{scoreQualidade?.categorias.classificacoes || 0}/25</span>
              </div>
              <div className="flex justify-between">
                <span>Disponibilidade</span>
                <span>{scoreQualidade?.categorias.disponibilidade || 0}/25</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sugestões */}
        {scoreQualidade && scoreQualidade.sugestoes.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Sugestões de Melhoria</h4>
            <div className="space-y-2">
              {scoreQualidade.sugestoes.map((sugestao, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <AlertTriangle size={16} className="mr-2 text-gray-500" />
                  {sugestao}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 