import React from 'react';
import clsx from 'clsx';
import { FormSwitch } from '../forms/FormSwitch';
import { EditIcon, TrashIcon, DragIcon, DuplicateIcon } from '../ui';

// Novo componente ComplementoCard com altura fixa de 98px
export function ComplementoCard({ 
  nome, 
  preco, 
  categoria,
  status, 
  tipo,
  descricao,
  onToggleStatus, 
  onEditar, 
  onExcluir,
  onDuplicar,
  dragHandleProps,
  className 
}: {
  nome: string;
  preco: number;
  categoria: string;
  status: 'ativo' | 'inativo';
  tipo: 'obrigatorio' | 'opcional';
  descricao?: string;
  onToggleStatus: (status: 'ativo' | 'inativo') => void;
  onEditar: () => void;
  onExcluir: () => void;
  onDuplicar: () => void;
  dragHandleProps?: {
    attributes: any;
    listeners: any;
  };
  className?: string;
}) {
  // Mapear status para boolean ativo
  const ativo = status === 'ativo';

  const handleToggleStatus = () => {
    const novoStatus = ativo ? 'inativo' : 'ativo';
    onToggleStatus(novoStatus);
  };

  return (
    <div className={clsx('bg-white border rounded-lg h-98 p-3 border-dashboard', className)}>
      <div className="flex items-center gap-3 h-full">
        {/* Toggle de Status e Ícone de Arrastar - Mesma linha */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Ícone de arrastar */}
          {dragHandleProps && (
            <div 
              {...dragHandleProps.attributes} 
              {...dragHandleProps.listeners}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-grab active:cursor-grabbing"
            >
              <DragIcon size={24} color="#9ca3af" />
            </div>
          )}
          
          {/* Toggle de Status */}
          <div className="flex items-center gap-2">
            <FormSwitch
              name="status"
              label=""
              checked={ativo}
              onChange={(checked) => {
                handleToggleStatus();
              }}
              className="mb-0"
            />
            {/* Texto estável que não muda durante toggle */}
            <span className="text-xs text-gray-600 font-medium w-12 text-center">
              {ativo ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        {/* Ícone do complemento com layout estável */}
        <div className="flex-shrink-0 w-[70px] h-[70px]">
          <div className="w-full h-full bg-purple-100 rounded-sm overflow-hidden flex items-center justify-center">
            <span className="text-purple-600 text-2xl">🍽️</span>
          </div>
        </div>

        {/* Informações do complemento com layout estável */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
            {nome}
          </h3>
          <p className="text-xs text-gray-600 truncate mb-1">
            {categoria}
          </p>
          <p className="text-lg font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(preco)}
          </p>
        </div>

        {/* Badge do tipo */}
        <div className="flex-shrink-0">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            tipo === 'obrigatorio'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {tipo === 'obrigatorio' ? 'Obrigatório' : 'Opcional'}
          </span>
        </div>

        {/* Botões de ação com layout estável */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onDuplicar}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Duplicar"
          >
            <DuplicateIcon size={16} color="#9ca3af" />
          </button>
          
          <button
            onClick={onEditar}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Editar"
          >
            <EditIcon size={16} color="#9ca3af" />
          </button>
          
          <button
            onClick={onExcluir}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Excluir"
          >
            <TrashIcon size={16} color="#9ca3af" />
          </button>
        </div>
      </div>
    </div>
  );
}
