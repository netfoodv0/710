import React, { useState } from 'react';
import { ModalGlobal } from '../../../components/modals/ModalGlobal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/input';
import { FormSwitch } from '../../../components/forms/FormSwitch';
import { useCategoriaService } from '../../../hooks/useCategoriaService';
import { DadosNovaCategoria } from '../../../types/cardapio/categoriaModal';

interface ModalNovaCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (categoriaId: string) => void;
}

export function ModalNovaCategoria({ isOpen, onClose, onConfirm }: ModalNovaCategoriaProps) {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState<'ativo' | 'inativo' | 'em falta'>('ativo');
  const [agendamentoPrevio, setAgendamentoPrevio] = useState({
    ativo: false,
    valor: 1,
    unidade: 'horas' as 'minutos' | 'horas' | 'dias'
  });
  
  const { criarCategoria, isLoading, error, clearError } = useCategoriaService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      return;
    }

    try {
      clearError();
      
      const dados: DadosNovaCategoria = {
        nome: nome.trim(),
        status,
        agendamentoPrevio
      };

      const categoriaId = await criarCategoria(dados);
      
      // Reset form
      setNome('');
      setStatus('ativo');
      setAgendamentoPrevio({
        ativo: false,
        valor: 1,
        unidade: 'horas'
      });
      
      // Callback opcional
      if (onConfirm) {
        onConfirm(categoriaId);
      }
      
      onClose();
    } catch (error) {
      // Erro já é tratado pelo hook
      console.error('Erro ao criar categoria:', error);
    }
  };

  const handleClose = () => {
    // Reset form ao fechar
    setNome('');
    setStatus('ativo');
    setAgendamentoPrevio({
      ativo: false,
      valor: 1,
      unidade: 'horas'
    });
    clearError();
    onClose();
  };

  const footer = (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          disabled={!nome.trim() || isLoading}
        >
          {isLoading ? 'Criando...' : 'Criar Categoria'}
        </Button>
      </div>
    </div>
  );

  return (
    <ModalGlobal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nova Categoria"
      size="sm"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Categoria
          </label>
          <Input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Pizzas, Bebidas, Sobremesas"
            required
          />
        </div>

                 <div>
           <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
             Status
           </label>
           <select
             id="status"
             value={status}
             onChange={(e) => setStatus(e.target.value as 'ativo' | 'inativo' | 'em falta')}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
           >
             <option value="ativo">Ativo</option>
             <option value="inativo">Inativo</option>
             <option value="em falta">Em Falta</option>
           </select>
         </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agendamento Prévio
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ativar Agendamento</span>
              <FormSwitch
                name="agendamentoPrevio"
                label=""
                checked={agendamentoPrevio.ativo}
                onChange={(checked) => setAgendamentoPrevio(prev => ({ ...prev, ativo: checked }))}
                className="mb-0"
              />
            </div>
            
            {agendamentoPrevio.ativo && (
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  min="1"
                  value={agendamentoPrevio.valor}
                  onChange={(e) => setAgendamentoPrevio(prev => ({ 
                    ...prev, 
                    valor: parseInt(e.target.value) || 1 
                  }))}
                  className="w-20"
                />
                <select
                  value={agendamentoPrevio.unidade}
                  onChange={(e) => setAgendamentoPrevio(prev => ({ 
                    ...prev, 
                    unidade: e.target.value as 'minutos' | 'horas' | 'dias' 
                  }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="minutos">Minutos</option>
                  <option value="horas">Horas</option>
                  <option value="dias">Dias</option>
                </select>
                <span className="text-sm text-gray-600">de antecedência</span>
              </div>
            )}
          </div>
        </div>
      </form>
    </ModalGlobal>
  );
}
