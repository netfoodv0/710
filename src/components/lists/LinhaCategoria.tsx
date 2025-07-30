import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical, Edit, Copy, Trash2, Package, Clock } from 'lucide-react';
import { Categoria, CategoriaAdicional } from '../../types';

interface ListaCategoriasRowProps {
  categoria: Categoria | CategoriaAdicional;
  tipo: 'produtos' | 'adicionais';
  onEdit: (categoria: Categoria | CategoriaAdicional) => void;
  onDuplicate: (id: string) => void;
  onToggleStatus: (categoria: Categoria | CategoriaAdicional) => void;
  onDelete: (id: string) => void;
}

export function ListaCategoriasRow({ 
  categoria, 
  tipo, 
  onEdit, 
  onDuplicate, 
  onToggleStatus, 
  onDelete 
}: ListaCategoriasRowProps) {
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
    if (dropdownOpen) {
      setDropdownOpen(false);
      setDropdownPosition(null);
    } else {
      const button = event.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        x: rect.right - 192, // 192px = largura do dropdown (w-48)
        y: rect.top - 8 // 8px acima do botão
      });
      setDropdownOpen(true);
    }
  };

  const getStatusColor = (status: Categoria['status'] | CategoriaAdicional['status']) => {
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

  const getStatusText = (status: Categoria['status'] | CategoriaAdicional['status']) => {
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

  const getTipoText = (tipo: 'padrao' | 'pizza') => {
    switch (tipo) {
      case 'padrao':
        return 'Padrão';
      case 'pizza':
        return 'Pizza';
      default:
        return tipo;
    }
  };

  const getTipoAdicionalText = (tipo: 'padrao' | 'obrigatorio') => {
    switch (tipo) {
      case 'padrao':
        return 'Padrão';
      case 'obrigatorio':
        return 'Obrigatório';
      default:
        return tipo;
    }
  };

  const getTipoSelecaoText = (tipoSelecao: 'unica' | 'multipla' | 'somavel') => {
    switch (tipoSelecao) {
      case 'unica':
        return 'Opção Única';
      case 'multipla':
        return 'Opção Múltipla';
      case 'somavel':
        return 'Opção Somável';
      default:
        return 'Desconhecido';
    }
  };

  const formatarData = (data: Date) => {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(data);
    } catch (error) {
      return 'Data inválida';
    }
  };

  const formatarDisponibilidade = (categoria: Categoria | CategoriaAdicional) => {
    // ✅ CORREÇÃO: Verificar se é categoria adicional (que tem disponibilidade)
    if (tipo === 'produtos') {
      return 'Não aplicável'; // Categorias de produtos não têm disponibilidade
    }
    
    if (!categoria.disponibilidade) return 'Não configurado';
    
    // ✅ CORREÇÃO: Usar os campos corretos do tipo DisponibilidadeCategoria com verificações de segurança
    const diasAtivos = [
      categoria.disponibilidade.segunda && 'Seg',
      categoria.disponibilidade.terca && 'Ter',
      categoria.disponibilidade.quarta && 'Qua',
      categoria.disponibilidade.quinta && 'Qui',
      categoria.disponibilidade.sexta && 'Sex',
      categoria.disponibilidade.sabado && 'Sáb',
      categoria.disponibilidade.domingo && 'Dom'
    ].filter(Boolean);
    
    if (diasAtivos.length === 0) return 'Nenhum dia selecionado';
    
    const horarioInicio = categoria.disponibilidade.horarioInicio || '00:00';
    const horarioFim = categoria.disponibilidade.horarioFim || '23:59';
    
    return `${diasAtivos.length} dias • ${horarioInicio} - ${horarioFim}`;
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-900">
              {categoria.nome || 'Sem nome'}
            </span>
          </div>
          {categoria.descricao && (
            <p className="text-xs text-gray-500 truncate max-w-xs">
              {categoria.descricao}
            </p>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-xs text-gray-900">
          {tipo === 'produtos' && 'tipo' in categoria && categoria.tipo && (
            getTipoText(categoria.tipo)
          )}
          {tipo === 'adicionais' && 'tipo' in categoria && categoria.tipo && (
            <>
              {getTipoAdicionalText(categoria.tipo)}
              {tipo === 'adicionais' && 'tipoSelecao' in categoria && categoria.tipoSelecao && (
                <> • {getTipoSelecaoText(categoria.tipoSelecao)}</>
              )}
              {tipo === 'adicionais' && 'quantidadeMinima' in categoria && 'quantidadeMaxima' in categoria && 
               categoria.tipoSelecao !== 'unica' && categoria.quantidadeMinima && categoria.quantidadeMaxima && (
                <> • <span className="text-gray-500">{categoria.quantidadeMinima}-{categoria.quantidadeMaxima} unid.</span></>
              )}
            </>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(categoria.status || 'ativo')}`}>
          {getStatusText(categoria.status || 'ativo')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Clock size={12} className="mr-1 text-gray-400" />
          <span className="text-xs text-gray-500">
            {formatarDisponibilidade(categoria)}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-xs text-gray-500">
          {formatarData(categoria.dataCriacao || new Date())}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
        <div className="relative" ref={dropdownRef}>
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
              className="fixed w-48 bg-white rounded shadow-lg border z-[9999]"
              style={{
                left: dropdownPosition.x,
                top: dropdownPosition.y
              }}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(categoria);
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
                    onDuplicate(categoria.id || '');
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
                    onToggleStatus(categoria);
                    setDropdownOpen(false);
                    setDropdownPosition(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                >
                  <Package size={12} className="mr-2" />
                  {(categoria.status || 'ativo') === 'ativo' ? 'Desativar' : 'Ativar'}
                </button>
                <button
                  onClick={() => {
                    onDelete(categoria.id || '');
                    setDropdownOpen(false);
                    setDropdownPosition(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50"
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