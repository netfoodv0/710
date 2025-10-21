import React, { useState, useEffect } from 'react';
import { ModalGlobal } from '../../../components/modals/ModalGlobal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/input';
import { ComplementosService } from '../../../pages/PaginaComplementos/services/complementosService';
import { ComplementoFormData } from '../../../pages/PaginaComplementos/types/complementos.types';
import { useCardapioModals } from '../../../context/CardapioModalsContext';
import { auth } from '../../../lib/firebase';

// ===== TIPOS =====
interface ModalNovoComplementoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  complementoParaEditar?: any | null;
  categoriaPreSelecionada?: string; // Nova prop para categoria pré-selecionada
}

interface AbaComplemento {
  id: string;
  label: string;
}

interface AbaComplementoConfig {
  id: AbaComplemento['id'];
  label: AbaComplemento['label'];
}

// ===== CONSTANTES =====
const abas: AbaComplementoConfig[] = [
  { id: 'essenciais', label: 'Campos Essenciais' },
  { id: 'importantes', label: 'Campos Importantes' }
];

export function ModalNovoComplemento({ isOpen, onClose, onConfirm, complementoParaEditar, categoriaPreSelecionada }: ModalNovoComplementoProps) {
  // ===== ESTADOS =====
  // Campos essenciais
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState<'ativo' | 'inativo'>('ativo');
  
  // Campos importantes
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState<'obrigatorio' | 'opcional'>('opcional');
  const [maxSelecoes, setMaxSelecoes] = useState('');
  const [minSelecoes, setMinSelecoes] = useState('');
  
  // Estados de controle
  const [categorias, setCategorias] = useState<any[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<AbaComplemento['id']>('essenciais');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // ===== HOOKS =====
  const { triggerComplementoCriado } = useCardapioModals();

  // ===== FUNÇÕES AUXILIARES =====
  const clearError = () => setError(null);

  // ===== EFFECTS =====
  // Carregar categorias quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      carregarCategorias();
    }
  }, [isOpen]);

  // Carregar dados do complemento quando estiver editando
  useEffect(() => {
    if (complementoParaEditar && isOpen) {
      setNome(complementoParaEditar.nome || '');
      setDescricao(complementoParaEditar.descricao || '');
      setPreco(complementoParaEditar.preco?.toString() || '');
      setCategoria(complementoParaEditar.categoria || '');
      setStatus(complementoParaEditar.status || 'ativo');
      setTipo(complementoParaEditar.tipo || 'opcional');
      setMaxSelecoes(complementoParaEditar.maxSelecoes?.toString() || '');
      setMinSelecoes(complementoParaEditar.minSelecoes?.toString() || '');
    }
  }, [complementoParaEditar, isOpen]);

  // Definir categoria pré-selecionada quando modal abrir (apenas para criação, não edição)
  useEffect(() => {
    if (isOpen && !complementoParaEditar && categoriaPreSelecionada) {
      setCategoria(categoriaPreSelecionada);
    }
  }, [isOpen, complementoParaEditar, categoriaPreSelecionada]);

  // Resetar aba ativa quando modal abrir
  useEffect(() => {
    if (isOpen) {
      setAbaAtiva('essenciais');
    }
  }, [isOpen]);

  // ===== FUNÇÕES =====
  const carregarCategorias = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !user.uid) {
        console.warn('Usuário não autenticado. Usando lista vazia.');
        setCategorias([]);
        return;
      }
      
      const categoriasCarregadas = await ComplementosService.buscarCategoriasComplementos(user.uid);
      
      // Usar APENAS as categorias do Firebase (sem categorias fictícias)
      if (categoriasCarregadas && categoriasCarregadas.length > 0) {
        setCategorias(categoriasCarregadas);
      } else {
        setCategorias([]);
      }
    } catch (error) {
      console.warn('Erro ao carregar categorias do Firebase. Usando lista vazia.', error);
      setCategorias([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !preco.trim()) {
      setError('Nome e preço são obrigatórios');
      return;
    }

    try {
      setIsLoading(true);
      clearError();
      
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const dados: ComplementoFormData = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: parseFloat(preco),
        categoria: categoria || '', // Não usar categoria padrão
        status,
        tipo,
        disponibilidade: {
          dias: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'],
          horarios: [{ inicio: '08:00', fim: '18:00' }]
        }
      };

      // Adicionar campos opcionais apenas se preenchidos
      if (maxSelecoes && maxSelecoes.trim()) {
        dados.maxSelecoes = parseInt(maxSelecoes);
      }
      if (minSelecoes && minSelecoes.trim()) {
        dados.minSelecoes = parseInt(minSelecoes);
      }

      if (complementoParaEditar) {
        // Modo edição
        await ComplementosService.atualizarComplemento(complementoParaEditar.id, dados);
        alert('Complemento atualizado com sucesso!');
        
        // Disparar callback para atualizar lista de complementos
        triggerComplementoCriado();
        
        // Fechar modal após edição
        onClose();
      } else {
        // Modo criação
        await ComplementosService.criarComplemento(user.uid, dados);
        alert('Complemento criado com sucesso!');
        
        // Disparar callback para atualizar lista de complementos
        triggerComplementoCriado();
        
        // Reset form e fechar modal após criação
        resetForm();
        onClose();
      }
      
      // Callback opcional
      if (onConfirm) {
        onConfirm();
      }
    } catch (error) {
      console.error('Erro ao salvar complemento:', error);
      setError(error instanceof Error ? error.message : 'Erro ao salvar complemento');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setPreco('');
    setCategoria('');
    setStatus('ativo');
    setTipo('opcional');
    setMaxSelecoes('');
    setMinSelecoes('');
    setAbaAtiva('essenciais');
  };

  const handleClose = () => {
    resetForm();
    clearError();
    onClose();
  };

  // ===== RENDERIZAÇÃO DAS ABAS =====

  // Renderizar conteúdo da aba essenciais
  const renderAbaEssenciais = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Complemento *
          </label>
          <Input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Queijo Extra, Bacon"
            required
          />
        </div>

        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-2">
            Preço *
          </label>
          <Input
            id="preco"
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nome}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'ativo' | 'inativo')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Renderizar conteúdo da aba importantes
  const renderAbaImportantes = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição do complemento..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as 'obrigatorio' | 'opcional')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="opcional">Opcional</option>
            <option value="obrigatorio">Obrigatório</option>
          </select>
        </div>

        <div>
          <label htmlFor="minSelecoes" className="block text-sm font-medium text-gray-700 mb-2">
            Mín. Seleções
          </label>
          <Input
            id="minSelecoes"
            type="number"
            min="0"
            value={minSelecoes}
            onChange={(e) => setMinSelecoes(e.target.value)}
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="maxSelecoes" className="block text-sm font-medium text-gray-700 mb-2">
            Máx. Seleções
          </label>
          <Input
            id="maxSelecoes"
            type="number"
            min="1"
            value={maxSelecoes}
            onChange={(e) => setMaxSelecoes(e.target.value)}
            placeholder="1"
          />
        </div>
      </div>
    </div>
  );

  // ===== FOOTER =====
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
          disabled={!nome.trim() || !preco.trim() || isLoading}
        >
          {isLoading ? 'Salvando...' : (complementoParaEditar ? 'Atualizar' : 'Criar Complemento')}
        </Button>
      </div>
    </div>
  );

  // ===== RENDERIZAÇÃO PRINCIPAL =====
  return (
    <ModalGlobal
      isOpen={isOpen}
      onClose={handleClose}
      title={complementoParaEditar ? 'Editar Complemento' : 'Novo Complemento'}
      size="md"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Abas */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {abas.map((aba) => (
              <button
                key={aba.id}
                type="button"
                onClick={() => setAbaAtiva(aba.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === aba.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {aba.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo das abas */}
        <div className="min-h-[300px]">
          {abaAtiva === 'essenciais' && renderAbaEssenciais()}
          {abaAtiva === 'importantes' && renderAbaImportantes()}
        </div>
      </form>
    </ModalGlobal>
  );
}