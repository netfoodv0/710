import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Edit, Copy, Trash2, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { Produto, ModalProdutoProps } from '../../types/produtos';
import { FormularioProduto } from './FormularioProduto';
import { ScoreQualidade } from '../../types/produtos';
import { useCategoriasFirebase } from '../../hooks/useCategoriasFirebase';
import { useCategoriasAdicionaisFirebase } from '../../hooks/useCategoriasAdicionaisFirebase';

export const ModalProduto: React.FC<ModalProdutoProps> = ({
  isOpen,
  onClose,
  produto,
  onSave,
  onEdit,
  onDelete,
  onDuplicate,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState<'formulario' | 'preview' | 'score'>('formulario');
  const [formData, setFormData] = useState<Partial<Produto>>({});
  const [scoreQualidade, setScoreQualidade] = useState<ScoreQualidade | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { categorias } = useCategoriasFirebase();
  const { categorias: categoriasAdicionais } = useCategoriasAdicionaisFirebase();

  const isEditing = !!produto;

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    } else {
      setFormData({
        nome: '',
        descricao: '',
        preco: 0,
        categoria: '',
        categoriaId: '',
        ativo: true,
        status: 'ativo',
        tempoPreparoMinutos: 20,
        ingredientes: [],
        extras: [],
        tamanhoPorcao: 1,
        agendamentoObrigatorio: false,
        destacado: false,
        galeriaFotos: [],
        complementos: [],
        tags: [],
        vendasTotais: 0,
        avaliacaoMedia: 0,
        numeroAvaliacoes: 0,
        sincronizadoComIfood: false
      });
    }
  }, [produto]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        nome: '',
        descricao: '',
        preco: 0,
        categoria: '',
        categoriaId: '',
        ativo: true,
        status: 'ativo',
        tempoPreparoMinutos: 20,
        ingredientes: [],
        extras: [],
        tamanhoPorcao: 1,
        agendamentoObrigatorio: false,
        destacado: false,
        galeriaFotos: [],
        complementos: [],
        tags: [],
        vendasTotais: 0,
        avaliacaoMedia: 0,
        numeroAvaliacoes: 0,
        sincronizadoComIfood: false
      });
      setScoreQualidade(null);
      setActiveTab('formulario');
    }
  }, [isOpen]);

  const handleSubmit = async (data: Partial<Produto>) => {
    if (isEditing && onEdit) {
      await onEdit(produto!.id, data);
    } else {
      await onSave(data as Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>);
    }
    onClose();
  };

  const handleDelete = async () => {
    if (produto && onDelete) {
      await onDelete(produto.id);
      onClose();
    }
  };

  const handleDuplicate = async () => {
    if (produto && onDuplicate) {
      await onDuplicate(produto.id);
      onClose();
    }
  };

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            {produto && (
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(produto.status)}`}>
                  {getStatusText(produto.status)}
                </span>
                {produto.destacado && (
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Destacado
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        {isEditing && (
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('preview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('score')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'score'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Score de Qualidade
              </button>
            </nav>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {activeTab === 'formulario' && (
            <FormularioProduto
              produto={produto}
              categorias={categorias}
              categoriasAdicionais={categoriasAdicionais}
              onSubmit={handleSubmit}
              onCancel={onClose}
              loading={loading}
              formRef={formRef}
            />
          )}

          {activeTab === 'preview' && produto && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Preview do Produto</h3>
                
                {/* Card do produto */}
                <div className="bg-white rounded-lg shadow-sm border p-4 max-w-md">
                  {produto.imagem && (
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">{produto.nome}</h4>
                    <p className="text-gray-600 text-sm">{produto.descricao}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {produto.tempoPreparoMinutos} min
                      </span>
                    </div>
                    
                    {produto.destacado && (
                      <div className="flex items-center text-yellow-600">
                        <Star size={16} className="mr-1" />
                        <span className="text-sm">Destacado</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'score' && produto && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Score de Qualidade</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Score Total */}
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Score Total</h4>
                      <span className={`text-2xl font-bold ${getScoreColor(scoreQualidade?.total || 0)}`}>
                        {scoreQualidade?.total || 0}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (scoreQualidade?.total || 0) >= 80 ? 'bg-green-500' :
                          (scoreQualidade?.total || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${scoreQualidade?.total || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Categorias */}
                  <div className="bg-white rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3">Categorias</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Informações</span>
                        <span>{scoreQualidade?.categorias.informacoes || 0}/25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mídia</span>
                        <span>{scoreQualidade?.categorias.midia || 0}/25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Classificações</span>
                        <span>{scoreQualidade?.categorias.classificacoes || 0}/25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Disponibilidade</span>
                        <span>{scoreQualidade?.categorias.disponibilidade || 0}/25</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sugestões */}
                {scoreQualidade && scoreQualidade.sugestoes.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Sugestões de Melhoria</h4>
                    <div className="space-y-2">
                      {scoreQualidade.sugestoes.map((sugestao, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                          {sugestao}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="flex space-x-2">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} className="mr-1" />
                Excluir
              </button>
            )}
            {isEditing && onDuplicate && (
              <button
                type="button"
                onClick={handleDuplicate}
                className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Copy size={16} className="mr-1" />
                Duplicar
              </button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
            {activeTab === 'formulario' && (
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={16} className="mr-1" />
                {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 