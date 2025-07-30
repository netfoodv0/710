import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical, Star, Edit, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { Produto } from '../../types/produtos';

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setDropdownPosition(null);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDropdownToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (dropdownOpen) {
      setDropdownOpen(false);
      setDropdownPosition(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        x: rect.right - 160, // 160px = largura do dropdown (w-40)
        y: rect.bottom + window.scrollY
      });
      setDropdownOpen(true);
    }
  };

  const getStatusColor = (status: Produto['status']) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-gray-100 text-gray-800';
      case 'em_falta':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Produto['status']) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'inativo':
        return 'Inativo';
      case 'em_falta':
        return 'Em Falta';
      default:
        return status;
    }
  };

  const formatarPreco = (preco: number): string => {
    return preco.toFixed(2).replace('.', ',');
  };

  const formatarData = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR').format(data);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {produto.imagem && (
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="h-8 w-8 rounded object-cover mr-3"
            />
          )}
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-900">
                {produto.nome}
              </span>
              {produto.destacado && (
                <Star size={12} className="text-yellow-500" />
              )}
            </div>
            <p className="text-xs text-gray-500 truncate max-w-xs">
              {produto.descricao}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-xs text-gray-900">{produto.categoria}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-xs font-medium text-gray-900">
          R$ {formatarPreco(produto.preco)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(produto.status)}`}>
          {getStatusText(produto.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-xs text-gray-900">{produto.vendasTotais}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-xs text-gray-500">
          {formatarData(produto.dataCriacao)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={handleDropdownToggle}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreVertical size={14} />
          </button>
          
          {dropdownOpen && dropdownPosition && createPortal(
            <div 
              ref={dropdownRef}
              className="fixed w-40 bg-white rounded shadow-lg border z-[9999]"
              style={{
                left: dropdownPosition.x,
                top: dropdownPosition.y
              }}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(produto);
                    setDropdownOpen(false);
                    setDropdownPosition(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                >
                  <Edit size={12} className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => {
                    onDuplicate(produto.id);
                    setDropdownOpen(false);
                    setDropdownPosition(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                >
                  <Copy size={12} className="mr-2" />
                  Duplicar
                </button>
                <button
                  onClick={() => {
                    onToggleStatus(produto);
                    setDropdownOpen(false);
                    setDropdownPosition(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                >
                  {produto.status === 'ativo' ? (
                    <>
                      <EyeOff size={12} className="mr-2" />
                      Desativar
                    </>
                  ) : (
                    <>
                      <Eye size={12} className="mr-2" />
                      Ativar
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    onDelete(produto.id);
                    setDropdownOpen(false);
                    setDropdownPosition(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-xs text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={12} className="mr-2" />
                  Excluir
                </button>
              </div>
            </div>,
            document.body
          )}
        </div>
      </td>
    </tr>
  );
} 