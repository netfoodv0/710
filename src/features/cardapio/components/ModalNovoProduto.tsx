import React, { useState, useEffect } from 'react';
import { ModalGlobal } from '../../../components/modals/ModalGlobal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { ImageUpload } from '../../../components/forms/ImageUpload';
import { ModalDisponibilidade } from '../../../components/modals/ModalDisponibilidade';
import { HorarioDisponibilidade } from '../../../types/cardapio/produtoModal';
import { DadosNovoProduto, AbaProduto, AbaProdutoConfig } from '../../../types/cardapio/produtoModal';
import { useCategoriaService } from '../../../hooks/useCategoriaService';
import { useProdutoService } from '../../../hooks/useProdutoService';
import { useCardapioModals } from '../../../context/CardapioModalsContext';
import { CategoriaModal } from '../../../types/cardapio/categoriaModal';
import { auth } from '../../../lib/firebase';

interface ModalNovoProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  produtoParaEditar?: ProdutoModal | null;
  categoriaPreSelecionada?: string; // Nova prop para categoria pré-selecionada
}

const abas: AbaProdutoConfig[] = [
  { id: 'essenciais', label: 'Campos Essenciais' },
  { id: 'importantes', label: 'Campos Importantes' }
];

export function ModalNovoProduto({ isOpen, onClose, onConfirm, produtoParaEditar, categoriaPreSelecionada }: ModalNovoProdutoProps) {
  const [abaAtiva, setAbaAtiva] = useState<AbaProduto>('essenciais');
  const [categorias, setCategorias] = useState<CategoriaModal[]>([]);
  const [isModalDisponibilidadeOpen, setIsModalDisponibilidadeOpen] = useState(false);
  
  // Estado para controlar visibilidade dos campos de estoque
  const [mostrarControleEstoque, setMostrarControleEstoque] = useState(false);
  const { buscarCategorias } = useCategoriaService();
  const { criarProduto, atualizarProduto, isLoading, error, clearError } = useProdutoService();
  const { triggerProdutoCriado } = useCardapioModals();

  // Carregar categorias quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      carregarCategorias();
    }
  }, [isOpen]);

  // Carregar dados do produto quando estiver editando
  useEffect(() => {
    if (produtoParaEditar && isOpen) {

      setNome(produtoParaEditar.nome || '');
      setCategoria(produtoParaEditar.categoria || '');
      setDescricao(produtoParaEditar.descricao || '');
      setPrecoVenda(produtoParaEditar.precoVenda?.toString() || '');
      setPrecoCusto(produtoParaEditar.precoCusto?.toString() || '');
      setCodigoSku(produtoParaEditar.codigoSku || '');
      setEstoqueAtual(produtoParaEditar.estoqueAtual?.toString() || '');
      setEstoqueMinimo(produtoParaEditar.estoqueMinimo?.toString() || '');
      setStatus(produtoParaEditar.status || 'ativo');
      setCodigoBarras(produtoParaEditar.codigoBarras || '');
      setUnidadeMedida(produtoParaEditar.unidadeMedida || 'unidade');
      setImagem(produtoParaEditar.imagem || '');
      
      // Ativar controle de estoque baseado no campo controleEstoque
      setMostrarControleEstoque(produtoParaEditar.controleEstoque || false);
      
      setHorariosDisponibilidade(produtoParaEditar.horariosDisponibilidade || [
        { dia: 'segunda', inicio: '08:00', fim: '18:00', ativo: false },
        { dia: 'terca', inicio: '08:00', fim: '18:00', ativo: false },
        { dia: 'quarta', inicio: '08:00', fim: '18:00', ativo: false },
        { dia: 'quinta', inicio: '08:00', fim: '18:00', ativo: false },
        { dia: 'sexta', inicio: '08:00', fim: '18:00', ativo: false },
        { dia: 'sabado', inicio: '08:00', fim: '18:00', ativo: false },
        { dia: 'domingo', inicio: '08:00', fim: '18:00', ativo: false }
      ]);
    }
  }, [produtoParaEditar, isOpen]);

  // Definir categoria pré-selecionada quando modal abrir (apenas para criação, não edição)
  useEffect(() => {
    if (isOpen && !produtoParaEditar && categoriaPreSelecionada) {
      setCategoria(categoriaPreSelecionada);
    }
  }, [isOpen, produtoParaEditar, categoriaPreSelecionada]);

  const carregarCategorias = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !user.uid) {
        console.error('Usuário não autenticado ou UID inválido');
        return;
      }
      
      const categoriasCarregadas = await buscarCategorias(user.uid);
      setCategorias(categoriasCarregadas);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleOpenModalDisponibilidade = () => {
    setIsModalDisponibilidadeOpen(true);
  };

  const handleCloseModalDisponibilidade = () => {
    setIsModalDisponibilidadeOpen(false);
  };

  const handleConfirmDisponibilidade = (novosHorarios: HorarioDisponibilidade[]) => {
    setHorariosDisponibilidade(novosHorarios);
  };
  
  // Campos Essenciais
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [codigoSku, setCodigoSku] = useState('');
  const [estoqueAtual, setEstoqueAtual] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [status, setStatus] = useState<'ativo' | 'inativo'>('ativo');
  
  // Campos Importantes
  const [codigoBarras, setCodigoBarras] = useState('');
  const [precoCusto, setPrecoCusto] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState<'unidade' | 'kg' | 'litro' | 'grama' | 'ml'>('unidade');
  const [imagem, setImagem] = useState('');
  const [horariosDisponibilidade, setHorariosDisponibilidade] = useState<HorarioDisponibilidade[]>([
    { dia: 'segunda', inicio: '08:00', fim: '18:00', ativo: false },
    { dia: 'terca', inicio: '08:00', fim: '18:00', ativo: false },
    { dia: 'quarta', inicio: '08:00', fim: '18:00', ativo: false },
    { dia: 'quinta', inicio: '08:00', fim: '18:00', ativo: false },
    { dia: 'sexta', inicio: '08:00', fim: '18:00', ativo: false },
    { dia: 'sabado', inicio: '08:00', fim: '18:00', ativo: false },
    { dia: 'domingo', inicio: '08:00', fim: '18:00', ativo: false }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !precoVenda.trim() || !precoCusto.trim() || !categoria.trim() || !descricao.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Validar campos de estoque apenas se o controle estiver ativado
    if (mostrarControleEstoque && (!estoqueAtual.trim() || !estoqueMinimo.trim())) {
      alert('Por favor, preencha os campos de controle de estoque');
      return;
    }

    try {
      clearError();
      
      const dados: DadosNovoProduto = {
        nome: nome.trim(),
        categoria: categoria.trim(),
        descricao: descricao.trim(),
        precoVenda: parseFloat(precoVenda),
        codigoSku: codigoSku.trim() || undefined,
        estoqueAtual: mostrarControleEstoque ? (parseInt(estoqueAtual) || 0) : 0,
        estoqueMinimo: mostrarControleEstoque ? (parseInt(estoqueMinimo) || 0) : 0,
        controleEstoque: mostrarControleEstoque,
        status,
        codigoBarras: codigoBarras.trim() || undefined,
        precoCusto: parseFloat(precoCusto),
        unidadeMedida,
        imagem: imagem.trim() || undefined,
        horariosDisponibilidade
      };


      if (produtoParaEditar) {
        // Modo edição
        await atualizarProduto(produtoParaEditar.id, dados);
        alert('Produto atualizado com sucesso!');
        
        // Disparar callback para atualizar lista de produtos
        triggerProdutoCriado();
        
        // Fechar modal após edição
        onClose();
      } else {
        // Modo criação
        await criarProduto(dados);
        alert('Produto criado com sucesso!');
        
        // Disparar callback para atualizar lista de produtos
        triggerProdutoCriado();
        
        // Reset form e fechar modal após criação
        resetForm();
        onClose();
      }
      
      // Callback opcional
      if (onConfirm) {
        onConfirm();
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert(error instanceof Error ? error.message : 'Erro ao salvar produto');
    }
  };

  const resetForm = () => {
    setNome('');
    setCategoria('');
    setDescricao('');
    setPrecoVenda('');
    setCodigoSku('');
    setEstoqueAtual('');
    setEstoqueMinimo('');
    setStatus('ativo');
    setCodigoBarras('');
    setPrecoCusto('');
    setUnidadeMedida('unidade');
    setImagem('');
    setMostrarControleEstoque(false);
    setHorariosDisponibilidade([
      { dia: 'segunda', inicio: '08:00', fim: '18:00', ativo: false },
      { dia: 'terca', inicio: '08:00', fim: '18:00', ativo: false },
      { dia: 'quarta', inicio: '08:00', fim: '18:00', ativo: false },
      { dia: 'quinta', inicio: '08:00', fim: '18:00', ativo: false },
      { dia: 'sexta', inicio: '08:00', fim: '18:00', ativo: false },
      { dia: 'sabado', inicio: '08:00', fim: '18:00', ativo: false },
      { dia: 'domingo', inicio: '08:00', fim: '18:00', ativo: false }
    ]);
    setAbaAtiva('essenciais');
  };

  const handleClose = () => {
    // Resetar formulário apenas se não estiver editando
    if (!produtoParaEditar) {
      resetForm();
    }
    onClose();
  };

  const isFormValid = nome.trim() && precoVenda.trim() && precoCusto.trim() && categoria.trim() && descricao.trim() && 
    (!mostrarControleEstoque || (estoqueAtual.trim() && estoqueMinimo.trim()));

  const footer = (
    <div className="flex gap-3 justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={handleClose}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        variant="primary"
        onClick={handleSubmit}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? (produtoParaEditar ? 'Atualizando...' : 'Criando...') : (produtoParaEditar ? 'Atualizar Produto' : 'Criar Produto')}
      </Button>
    </div>
  );

  return (
    <>
    <ModalGlobal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="w-full">
          <div className="text-lg font-semibold text-gray-900 mb-3">
            {produtoParaEditar ? 'Editar Produto' : 'Novo Produto'}
          </div>
          <div className="flex space-x-4">
            {abas.map((aba) => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  abaAtiva === aba.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {aba.label}
              </button>
            ))}
          </div>
        </div>
      }
      size="sm"
      footer={footer}
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-sm text-red-600">
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Aba Campos Essenciais */}
          {abaAtiva === 'essenciais' && (
            <div className="space-y-4">
                             <div className="flex gap-4 items-start">
                 <div className="flex-shrink-0">
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Imagem
                   </label>
                   <ImageUpload
                     value={imagem}
                     onChange={setImagem}
                     placeholder="Upload"
                   />
                 </div>
                 <div className="flex-1 space-y-4">
                   <div>
                     <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                       Nome do Produto *
                     </label>
                     <Input
                       id="nome"
                       type="text"
                       value={nome}
                       onChange={(e) => setNome(e.target.value)}
                       placeholder="Ex: Pizza Margherita"
                       required
                     />
                   </div>

                   <div>
                     <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                       Categoria *
                     </label>
                     <select
                       id="categoria"
                       value={categoria}
                       onChange={(e) => setCategoria(e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                       required
                     >
                       <option value="">Selecione uma categoria</option>
                       {categorias
                         .filter(cat => cat.status === 'ativo')
                         .map((cat) => (
                           <option key={cat.id} value={cat.nome}>
                             {cat.nome}
                           </option>
                         ))}
                     </select>
                   </div>

                 </div>
               </div>

               <div className="w-full">
                 <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                   Descrição *
                 </label>
                 <textarea
                   id="descricao"
                   value={descricao}
                   onChange={(e) => setDescricao(e.target.value)}
                   placeholder="Breve explicação do produto..."
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                   rows={3}
                   required
                 />
               </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="precoVenda" className="block text-sm font-medium text-gray-700 mb-2">
                    Preço de Venda *
                  </label>
                  <Input
                    id="precoVenda"
                    type="number"
                    step="0.01"
                    min="0"
                    value={precoVenda}
                    onChange={(e) => setPrecoVenda(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="precoCusto" className="block text-sm font-medium text-gray-700 mb-2">
                    Preço de Custo *
                  </label>
                  <Input
                    id="precoCusto"
                    type="number"
                    step="0.01"
                    min="0"
                    value={precoCusto}
                    onChange={(e) => setPrecoCusto(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Toggle para controle de estoque */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Controle de Estoque</h3>
                  <p className="text-xs text-gray-500">Ative para gerenciar estoque atual e mínimo</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMostrarControleEstoque(!mostrarControleEstoque)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    mostrarControleEstoque ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mostrarControleEstoque ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Campos de estoque (condicionais) */}
              {mostrarControleEstoque && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="estoqueAtual" className="block text-sm font-medium text-gray-700 mb-2">
                      Estoque Atual *
                    </label>
                    <Input
                      id="estoqueAtual"
                      type="number"
                      min="0"
                      value={estoqueAtual}
                      onChange={(e) => setEstoqueAtual(e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="estoqueMinimo" className="block text-sm font-medium text-gray-700 mb-2">
                      Estoque Mínimo *
                    </label>
                    <Input
                      id="estoqueMinimo"
                      type="number"
                      min="0"
                      value={estoqueMinimo}
                      onChange={(e) => setEstoqueMinimo(e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Campo de status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'ativo' | 'inativo')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          )}

          {/* Aba Campos Importantes */}
          {abaAtiva === 'importantes' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="codigoBarras" className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Barras (EAN/UPC)
                </label>
                <Input
                  id="codigoBarras"
                  type="text"
                  value={codigoBarras}
                  onChange={(e) => setCodigoBarras(e.target.value)}
                  placeholder="Ex: 7891234567890"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="codigoSku" className="block text-sm font-medium text-gray-700 mb-2">
                    Código/SKU
                  </label>
                  <Input
                    id="codigoSku"
                    type="text"
                    value={codigoSku}
                    onChange={(e) => setCodigoSku(e.target.value)}
                    placeholder="Ex: PIZ001"
                  />
                </div>

                <div>
                  <label htmlFor="unidadeMedida" className="block text-sm font-medium text-gray-700 mb-2">
                    Unidade de Medida
                  </label>
                  <select
                    id="unidadeMedida"
                    value={unidadeMedida}
                    onChange={(e) => setUnidadeMedida(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="unidade">Unidade</option>
                    <option value="kg">Quilograma (kg)</option>
                    <option value="litro">Litro</option>
                    <option value="grama">Grama</option>
                    <option value="ml">Mililitro (ml)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disponibilidade
                </label>
                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">
                      {horariosDisponibilidade.filter(h => h.ativo).length === 0 
                        ? "Nenhum dia configurado"
                        : `${horariosDisponibilidade.filter(h => h.ativo).length} dias configurados`
                      }
                    </div>
                    <div className="text-xs text-gray-500">
                      {horariosDisponibilidade.filter(h => h.ativo).length > 0 && (
                        <>
                          {horariosDisponibilidade
                            .filter(h => h.ativo)
                            .map(h => {
                              const diasMap: { [key: string]: string } = {
                                'segunda': 'Seg',
                                'terca': 'Ter',
                                'quarta': 'Qua',
                                'quinta': 'Qui',
                                'sexta': 'Sex',
                                'sabado': 'Sáb',
                                'domingo': 'Dom'
                              };
                              return diasMap[h.dia];
                            })
                            .join(', ')
                          }
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleOpenModalDisponibilidade}
                  >
                    Configurar
                  </Button>
                </div>
              </div>

            </div>
          )}
        </form>
      </div>
    </ModalGlobal>

    <ModalDisponibilidade
      isOpen={isModalDisponibilidadeOpen}
      onClose={handleCloseModalDisponibilidade}
      onConfirm={handleConfirmDisponibilidade}
      horariosIniciais={horariosDisponibilidade}
    />
  </>
  );
}
