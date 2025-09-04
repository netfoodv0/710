import React from 'react';
import { DistribuicaoCategoria } from '../../../components/relatorios';
import { CuponsChartProps } from '../types';

export function CuponsChart({ 
  categorias, 
  percentuais, 
  alturasAnimadas, 
  mostrarAnimacoes 
}: CuponsChartProps) {
  return (
    <div className="cupons-chart-container">
      <DistribuicaoCategoria
        categorias={categorias}
        percentuais={percentuais}
        alturasAnimadas={alturasAnimadas}
        mostrarAnimacoes={mostrarAnimacoes}
      />
    </div>
  );
}
