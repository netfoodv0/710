import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Copy, Trash2 } from 'lucide-react';
import { Categoria } from '../../types/categoria';

interface MenuAcoesCategoriaProps {
  categoria: Categoria;
  onEdit: (categoria: Categoria) => void;
  onDuplicate: (categoria: Categoria) => void;
  onDelete: (categoria: Categoria) => void;
}

export function MenuAcoesCategoria({ categoria, onEdit, onDuplicate, onDelete }: MenuAcoesCategoriaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
        title="Mais opções"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <div className="py-1">
            <button
              onClick={() => handleAction(() => onEdit(categoria))}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4 text-blue-500" />
              Editar categoria
            </button>
            
            <button
              onClick={() => handleAction(() => onDuplicate(categoria))}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Copy className="w-4 h-4 text-green-500" />
              Duplicar categoria
            </button>
            
            <div className="border-t border-gray-100 my-1" />
            
            <button
              onClick={() => handleAction(() => onDelete(categoria))}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Excluir categoria
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
