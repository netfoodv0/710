import React from 'react';
import { Package, DollarSign, Tag, Clock } from 'lucide-react';

interface ComplementoInfoProps {
  complemento?: any;
}

export function ComplementoInfo({ complemento }: ComplementoInfoProps) {
  if (!complemento) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Selecione um complemento
          </h3>
          <p className="text-gray-600">
            Clique em um complemento na lista para ver os detalhes
          </p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{complemento.nome}</h3>
            <p className="text-sm text-gray-600">{complemento.categoria}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            complemento.status === 'ativo'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {complemento.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </span>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            complemento.tipo === 'obrigatorio'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {complemento.tipo === 'obrigatorio' ? 'Obrigatório' : 'Opcional'}
          </span>
        </div>
      </div>

      {complemento.descricao && (
        <div className="mb-4">
          <p className="text-gray-700">{complemento.descricao}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Preço</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(complemento.preco)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Tag className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Categoria</p>
            <p className="text-lg font-semibold text-gray-900">
              {complemento.categoria}
            </p>
          </div>
        </div>
      </div>

      {complemento.disponibilidade && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Disponibilidade
          </h4>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600 mb-1">Dias da semana:</p>
              <div className="flex flex-wrap gap-1">
                {complemento.disponibilidade.dias.map((dia: string) => (
                  <span 
                    key={dia}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                  </span>
                ))}
              </div>
            </div>
            
            {complemento.disponibilidade.horarios && complemento.disponibilidade.horarios.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Horários:</p>
                <div className="space-y-1">
                  {complemento.disponibilidade.horarios.map((horario: any, index: number) => (
                    <span 
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded mr-2"
                    >
                      {horario.inicio} - {horario.fim}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}







