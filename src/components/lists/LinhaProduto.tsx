import React from 'react';
import { Produto } from '../../features/cardapio/types/cardapio.types';
import { StatusBadge } from '../StatusBadge';
import { Eye, EyeOff } from 'lucide-react';
import { EditIcon, TrashIcon, DuplicateIcon } from '../ui';

interface ListaProdutosRowProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDuplicate: (id: string) => void;
  onToggleStatus: (produto: Produto) => void;
  onDelete: (id: string) => void;
}

export function ListaProdutosRow({
  produto,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDelete
}: ListaProdutosRowProps) {
  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  // Determinar o status baseado no campo 'ativo'
  const getStatus = (ativo: boolean) => {
    return ativo ? 'ativo' : 'inativo';
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {produto.imagem && (
            <img 
              src={produto.imagem} 
              alt={produto.nome}
              className="w-10 h-10 rounded-sm object-cover mr-3"
            />
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
            {produto.descricao && (
              <div className="text-sm text-gray-500 truncate max-w-xs">
                {produto.descricao}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">{produto.categoria}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">
          {formatarPreco(produto.preco)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge 
          status={getStatus(produto.ativo)} 
          size="sm"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onToggleStatus(produto)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title={produto.ativo ? 'Desativar' : 'Ativar'}
          >
            {produto.ativo ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
          <button
            onClick={() => onEdit(produto)}
            className="p-1 text-blue-400 hover:text-blue-600 transition-colors"
            title="Editar"
          >
            <EditIcon size={16} color="#60a5fa" />
          </button>
          <button
            onClick={() => onDuplicate(produto.id)}
            className="p-1 text-green-400 hover:text-green-600 transition-colors"
            title="Duplicar"
          >
            <DuplicateIcon size={24} color="#10b981" />
          </button>
          <button
            onClick={() => onDelete(produto.id)}
            className="p-1 text-red-400 hover:text-red-600 transition-colors"
            title="Excluir"
          >
            <TrashIcon size={24} color="#ef4444" />
          </button>
        </div>
      </td>
    </tr>
  );
} 