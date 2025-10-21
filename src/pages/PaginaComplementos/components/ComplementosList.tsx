import React from 'react';
import { Package, Edit, Trash2, Copy, MoreVertical } from 'lucide-react';
import { Complemento, CategoriaComplemento } from '../types';
import { ActionButton } from '../../../components/ui';

interface ComplementosListProps {
  complementos?: Complemento[];
  categorias?: CategoriaComplemento[];
  isLoading?: boolean;
  onEdit?: (complemento: Complemento) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export function ComplementosList({ 
  complementos = [], 
  categorias = [],
  isLoading = false,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus
}: ComplementosListProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (complementos.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-12 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum complemento encontrado
          </h3>
          <p className="text-gray-600">
            Crie seu primeiro complemento para começar a organizar seus produtos.
          </p>
        </div>
      </div>
    );
  }

  const getCategoriaNome = (categoriaNome: string) => {
    const categoria = categorias.find(c => c.nome === categoriaNome);
    return categoria?.nome || categoriaNome;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Lista de Complementos ({complementos.length})
        </h3>
        
        <div className="space-y-4">
          {complementos.map((complemento) => (
            <div 
              key={complemento.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                complemento.status === 'ativo' 
                  ? 'border-gray-200 bg-white hover:bg-gray-50' 
                  : 'border-gray-100 bg-gray-50 opacity-75'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {complemento.nome}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      complemento.status === 'ativo'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {complemento.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      complemento.tipo === 'obrigatorio'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {complemento.tipo === 'obrigatorio' ? 'Obrigatório' : 'Opcional'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-gray-600">
                      {getCategoriaNome(complemento.categoria)}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(complemento.preco)}
                    </p>
                    {complemento.descricao && (
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {complemento.descricao}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {onToggleStatus && (
                  <ActionButton
                    label={complemento.status === 'ativo' ? 'Desativar' : 'Ativar'}
                    onClick={() => onToggleStatus(complemento.id)}
                    variant="secondary"
                    size="sm"
                  />
                )}
                
                {onEdit && (
                  <ActionButton
                    label="Editar"
                    onClick={() => onEdit(complemento)}
                    variant="secondary"
                    size="sm"
                    icon={<Edit className="w-4 h-4" />}
                  />
                )}
                
                {onDuplicate && (
                  <ActionButton
                    label="Duplicar"
                    onClick={() => onDuplicate(complemento.id)}
                    variant="secondary"
                    size="sm"
                    icon={<Copy className="w-4 h-4" />}
                  />
                )}
                
                {onDelete && (
                  <ActionButton
                    label="Excluir"
                    onClick={() => onDelete(complemento.id)}
                    variant="danger"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}







