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
    <div className="bg-white rounded-lg p-4 mb-6" style={{ border: '1px solid #cfd1d3' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontSize: '12px' }}>
          Distribuição por Categoria
        </h3>
      </div>
      
      <div className="mt-6 flex justify-between gap-6 flex-wrap w-full">
        {categorias.map((categoria, index) => (
          <div 
            key={categoria}
            className="bg-white rounded-lg relative flex-1 overflow-hidden"
            style={{ minWidth: '160px', height: '200px', border: '1px solid #cfd1d3' }}
          >
            {/* Linha verde dinâmica baseada no percentual com efeito de água */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-b-lg transition-all duration-2000 ease-out"
              style={{ 
                height: `${Math.max(alturasAnimadas[index] || 0, 5)}%`,
                minHeight: '10px',
                animation: mostrarAnimacoes && alturasAnimadas[index] > 0
                  ? `ondulacaoSuperficie ${3 + index * 0.3}s ease-in-out infinite`
                  : 'none',
                transform: `translateY(${alturasAnimadas[index] > 0 ? 0 : 100}%)`,
                transition: 'transform 0.8s ease-out'
              }}
            >
              {/* Bolhas flutuando na água */}
              {mostrarAnimacoes && alturasAnimadas[index] > 0 && (
                <>
                  {[1, 2, 3, 4, 5, 6].map((bolhaIndex) => (
                    <div 
                      key={bolhaIndex}
                      className="absolute rounded-full border-2 border-white"
                      style={{
                        width: `${20 - bolhaIndex * 2}px`,
                        height: `${20 - bolhaIndex * 2}px`,
                        left: `${20 + bolhaIndex * 10}%`,
                        bottom: `${20 + bolhaIndex * 10}%`,
                        zIndex: 8,
                        animation: `bolhaSubindo${bolhaIndex} ${4 + bolhaIndex}s ease-in-out infinite`
                      }}
                    />
                  ))}
                </>
              )}
            </div>
                                          
            {/* Nome da categoria */}
            <div className="absolute top-2 left-4 text-xs text-gray-600 font-medium">
              {categoria}
            </div>
              
            {/* Percentual */}
            <div className="absolute bottom-2 left-2 text-xs font-bold">
              <div className="text-black">
                {Math.round(alturasAnimadas[index] || 0)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
