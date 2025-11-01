import React, { useState } from 'react';
import { ComplementosLayout } from './components';
import { useComplementos, useComplementosActions } from './hooks';
import { Complemento, ComplementoFormData } from './types';

export default function Complementos() {
  const {
    complementos,
    categorias,
    filtros,
    stats,
    isLoading,
    error,
    setFiltros,
    refreshData
  } = useComplementos();

  const {
    createComplemento,
    updateComplemento,
    deleteComplemento,
    toggleStatus,
    duplicateComplemento
  } = useComplementosActions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComplemento, setEditingComplemento] = useState<Complemento | null>(null);

  // Filtrar complementos baseado nos filtros
  const filteredComplementos = complementos.filter(complemento => {
    if (filtros.busca && !complemento.nome.toLowerCase().includes(filtros.busca.toLowerCase())) {
      return false;
    }
    if (filtros.categoria && complemento.categoria !== filtros.categoria) {
      return false;
    }
    if (filtros.status && complemento.status !== filtros.status) {
      return false;
    }
    if (filtros.tipo && complemento.tipo !== filtros.tipo) {
      return false;
    }
    return true;
  });

  const handleCreateComplemento = () => {
    setEditingComplemento(null);
    setIsModalOpen(true);
  };

  const handleEditComplemento = (complemento: Complemento) => {
    setEditingComplemento(complemento);
    setIsModalOpen(true);
  };

  const handleSaveComplemento = async (data: ComplementoFormData) => {
    try {
      if (editingComplemento) {
        await updateComplemento(editingComplemento.id, data);
      } else {
        await createComplemento(data);
      }
      setIsModalOpen(false);
      setEditingComplemento(null);
      await refreshData();
    } catch (error) {
      console.error('Erro ao salvar complemento:', error);
    }
  };

  const handleDeleteComplemento = async (id: string) => {
    try {
      await deleteComplemento(id);
      await refreshData();
    } catch (error) {
      console.error('Erro ao excluir complemento:', error);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id);
      await refreshData();
    } catch (error) {
      console.error('Erro ao alternar status:', error);
    }
  };

  const handleDuplicateComplemento = async (id: string) => {
    try {
      await duplicateComplemento(id);
      await refreshData();
    } catch (error) {
      console.error('Erro ao duplicar complemento:', error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <ComplementosLayout />
  );
}
















