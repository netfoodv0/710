import React from 'react';

interface DistribuicaoCategoriaProps {
  categorias: string[];
  percentuais: number[];
  alturasAnimadas: number[];
  mostrarAnimacoes: boolean;
}

export const DistribuicaoCategoria: React.FC<DistribuicaoCategoriaProps> = ({
  categorias,
  percentuais,
  alturasAnimadas,
  mostrarAnimacoes
}) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 cupons-chart-wrapper" style={{ border: '1px solid #cfd1d3' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900" style={{ fontSize: '16px' }}>
          Distribuição por Categoria
        </h3>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-between">
        {categorias.map((categoria, index) => (
          <div 
            key={categoria}
            className="bg-white rounded-lg relative overflow-hidden cupons-chart-card flex-1"
            style={{ 
              height: '200px',
              border: '1px solid #cfd1d3' 
            }}
          >
            {/* Linha verde dinâmica baseada no percentual com efeito de água */}
            <div 
              className="absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-2000 ease-out"
              style={{ 
                backgroundColor: '#1ac136',
                height: `${Math.max(alturasAnimadas[index] || 0, 5)}%`,
                minHeight: '10px',
                animation: mostrarAnimacoes && alturasAnimadas[index] > 0
                  ? `ondulacaoSuperficie ${3 + index * 0.3}s ease-in-out infinite`
                  : 'none',
                transform: `translateY(${alturasAnimadas[index] > 0 ? 0 : 100}%)`,
                transition: 'transform 0.8s ease-out'
              }}
            />
                                          
            {/* Nome da categoria */}
            <div className="absolute top-2 left-2 sm:left-4 text-xs text-gray-600 font-medium">
              {categoria}
            </div>
              
            {/* Percentual */}
            <div className="absolute bottom-2 left-2 text-xs font-bold">
              <div className="text-white">
                {Math.round(alturasAnimadas[index] || 0)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
