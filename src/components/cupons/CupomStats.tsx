import React from 'react';
import { CheckCircle, X, BarChart3 } from 'lucide-react';
import { CouponIcon } from '../ui';
import { Cupom } from '../../types/cupons';
import { FormSection } from '../forms/FormSection';

interface CupomStatsProps {
  cupons: Cupom[];
}

export function CupomStats({ cupons }: CupomStatsProps) {
  const totalCupons = cupons.length;
  const cuponsAtivos = cupons.filter(c => c.ativo).length;
  const cuponsInativos = cupons.filter(c => !c.ativo).length;
  const totalUsos = cupons.reduce((acc, cupom) => acc + cupom.usosAtuais, 0);

  return (
    <FormSection
      title="Estatísticas dos Cupons"
      description="Visão geral dos cupons e seu desempenho"
      icon={<BarChart3 className="w-5 h-5" />}
      className="mt-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: 'rgb(207 209 211)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Cupons</p>
              <p className="text-2xl font-bold text-gray-900">{totalCupons}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <CouponIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4" style={{ borderColor: 'rgb(207 209 211)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cupons Ativos</p>
              <p className="text-2xl font-bold text-green-600">{cuponsAtivos}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4" style={{ borderColor: 'rgb(207 209 211)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Usos</p>
              <p className="text-2xl font-bold text-blue-600">{totalUsos}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <CouponIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4" style={{ borderColor: 'rgb(207 209 211)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cupons Inativos</p>
              <p className="text-2xl font-bold text-red-600">{cuponsInativos}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <X className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
}