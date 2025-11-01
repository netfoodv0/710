import React, { useState, useEffect } from 'react';
import { CardMenuCategorias } from '../../../components/cards/CardMenuCategorias';
import { useCardapioModals } from '../../../context/CardapioModalsContext';
import { useCardapioContext } from '../../../context/CardapioContext';
import { useCategoriaService } from '../../../hooks/useCategoriaService';
import { ComplementosService } from '../../../pages/PaginaComplementos/services/complementosService';
import { CategoriaModal } from '../../../types/cardapio/categoriaModal';
import { Complemento } from '../../../types/cardapio/complemento';
import { auth } from '../../../lib/firebase';
// Removido uso de categorias de exemplo; exibir apenas dados do Firebase
import { useNotificationContext } from '../../../context/notificationContextUtils';

export function CardapioSidebar() {
  const { openModalNovaCategoria, openModalEditarCategoria, onCategoriaCriada, onCategoriaComplementoCriada, onComplementoCriado, openModalNovaCategoriaComplemento } = useCardapioModals();
  const { state, updateFiltros } = useCardapioContext();
  const { buscarCategorias, atualizarCategoria, excluirCategoria, duplicarCategoria, reordenarCategorias } = useCategoriaService();
  
  const categoriaSelecionada = state.filtros.categoria;
  
  const { showSuccess, showError, showInfo } = useNotificationContext();
  
  const [categorias, setCategorias] = useState<CategoriaModal[]>([]);
  
  // Estados para complementos
  const [complementos, setComplementos] = useState<Complemento[]>([]);
  const [complementoSelecionado, setComplementoSelecionado] = useState<string>();
  
  // Estado para categoria de complemento selecionada
  const [categoriaComplementoSelecionada, setCategoriaComplementoSelecionada] = useState<string>();
  
  // Estados para categorias de complementos
  const [categoriasComplementos, setCategoriasComplementos] = useState<string[]>([]);
  const [categoriasComplementosCompletas, setCategoriasComplementosCompletas] = useState<any[]>([]);

  // Função para carregar categorias
  const carregarCategorias = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn('Usuário não autenticado');
        return;
      }

      const categoriasCarregadas = await buscarCategorias(user.uid);
      setCategorias(categoriasCarregadas);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  // Função para carregar complementos
  const carregarComplementos = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn('Usuário não autenticado');
        return;
      }

      // Carregar complementos do Firebase
      const complementosCarregados = await ComplementosService.buscarComplementos(user.uid);
      setComplementos(complementosCarregados);
      
      // NÃO selecionar primeiro complemento automaticamente
      // if (complementosCarregados.length > 0 && !complementoSelecionado) {
      //   setComplementoSelecionado(complementosCarregados[0].nome);
      // }
    } catch (error) {
      console.error('Erro ao carregar complementos:', error);
      setComplementos([]);
    }
  };

  // Função para carregar categorias de complementos
  const carregarCategoriasComplementos = async (selecionarPrimeira = false) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn('Usuário não autenticado');
        return;
      }

      const categoriasCarregadas = await ComplementosService.buscarCategoriasComplementos(user.uid);
      const nomesCategorias = categoriasCarregadas.map(cat => cat.nome);
      
      setCategoriasComplementos(nomesCategorias);
      setCategoriasComplementosCompletas(categoriasCarregadas);
      
      // Sempre selecionar primeira categoria de complemento quando há categorias disponíveis
      if (categoriasCarregadas.length > 0) {
        const primeiraCategoria = categoriasCarregadas[0].nome;
        setCategoriaComplementoSelecionada(primeiraCategoria);
        
        // NÃO definir complementoSelecionado automaticamente
        // updateFiltros({ complementoSelecionado: { categoria: primeiraCategoria } });
      }
    } catch (error) {
      console.error('Erro ao carregar categorias de complementos:', error);
    }
  };

  // ===== FUNÇÕES PARA CATEGORIAS DE COMPLEMENTOS =====
  
  // Função para editar categoria de complemento
  const handleEditCategoriaComplemento = (categoria: any) => {
    // TODO: Implementar modal de edição de categoria de complemento
    console.log('Editar categoria de complemento:', categoria);
    showInfo('Funcionalidade de edição será implementada em breve!');
  };

  // Função para duplicar categoria de complemento
  const handleDuplicateCategoriaComplemento = async (categoria: any) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const nomeDuplicado = `${categoria.nome} (Cópia)`;
      await ComplementosService.criarCategoriaComplemento(user.uid, nomeDuplicado);
      await carregarCategoriasComplementos();
      showSuccess(`Categoria "${nomeDuplicado}" duplicada com sucesso!`);
    } catch (error) {
      console.error('Erro ao duplicar categoria de complemento:', error);
      showError('Erro ao duplicar categoria. Tente novamente.');
    }
  };

  // Função para excluir categoria de complemento
  const handleDeleteCategoriaComplemento = async (categoria: any) => {
    if (!confirm(`Tem certeza que deseja excluir a categoria "${categoria.nome}"? Todos os complementos desta categoria também serão excluídos.`)) {
      return;
    }

    try {
      const resultado = await ComplementosService.excluirCategoriaComplemento(categoria.id);
      await carregarCategoriasComplementos();
      
      const mensagem = resultado.complementosExcluidos > 0 
        ? `Categoria "${categoria.nome}" e ${resultado.complementosExcluidos} complemento(s) excluído(s) com sucesso!`
        : `Categoria "${categoria.nome}" excluída com sucesso!`;
      
      showSuccess(mensagem);
    } catch (error) {
      console.error('Erro ao excluir categoria de complemento:', error);
      showError('Erro ao excluir categoria. Tente novamente.');
    }
  };

  // Função para reordenar categorias de complementos
  const handleReorderCategoriasComplementos = async (categoriasOrdenadas: string[]) => {
    try {
      // TODO: Implementar reordenação de categorias de complementos
      console.log('Reordenar categorias de complementos:', categoriasOrdenadas);
      showInfo('Funcionalidade de reordenação será implementada em breve!');
    } catch (error) {
      console.error('Erro ao reordenar categorias de complementos:', error);
      showError('Erro ao reordenar categorias. Tente novamente.');
    }
  };

  // Função para alternar status da categoria de complemento
  const handleToggleStatusCategoriaComplemento = async (categoria: any) => {
    try {
      const novoStatus = categoria.status === 'ativo' ? 'inativo' : 'ativo';
      
      await ComplementosService.atualizarCategoriaComplemento(categoria.id, {
        status: novoStatus
      });
      
      await carregarCategoriasComplementos();
      showSuccess(`Status da categoria "${categoria.nome}" alterado para ${novoStatus}!`);
    } catch (error) {
      console.error('Erro ao alterar status da categoria de complemento:', error);
      showError('Erro ao alterar status da categoria. Tente novamente.');
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    carregarCategorias();
    carregarComplementos();
    carregarCategoriasComplementos();
  }, []);

  // Garantir que a primeira categoria de complementos seja selecionada quando a aba estiver ativa
  useEffect(() => {
    if (state.filtros.abaAtiva === 'complementos' && categoriasComplementos.length > 0 && !categoriaComplementoSelecionada) {
      const primeiraCategoria = categoriasComplementos[0];
      setCategoriaComplementoSelecionada(primeiraCategoria);
      // NÃO definir complementoSelecionado automaticamente
      // updateFiltros({ complementoSelecionado: { categoria: primeiraCategoria } });
    }
  }, [state.filtros.abaAtiva, categoriasComplementos, categoriaComplementoSelecionada, updateFiltros]);

  // Registrar callback para recarregar categorias quando uma nova for criada
  useEffect(() => {
    onCategoriaCriada(carregarCategorias);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas na montagem

  // Registrar callback para recarregar categorias de complemento quando uma nova for criada
  useEffect(() => {
    onCategoriaComplementoCriada(() => {
      carregarCategoriasComplementos(true); // true = selecionar primeira categoria
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas na montagem

  // Registrar callback para recarregar complementos quando um novo for criado
  useEffect(() => {
    onComplementoCriado(carregarComplementos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas na montagem

  // Função para alternar status da categoria
  const handleToggleStatus = async (categoria: any) => {
    try {
      const novoStatus = categoria.status === 'ativo' ? 'inativo' : 'ativo';
      
      await atualizarCategoria(categoria.id, {
        status: novoStatus
      });

      // Recarregar categorias para atualizar a interface
      await carregarCategorias();
    } catch (error) {
      console.error('Erro ao alterar status da categoria:', error);
    }
  };

  // Função para excluir categoria
  const handleDeleteCategoria = async (categoria: any) => {
    try {
      // Buscar produtos da categoria para mostrar na confirmação
      const { FirebaseProdutosService } = await import('../../../services/firebase/produtosService');
      const produtosService = new FirebaseProdutosService();
      const produtos = await produtosService.buscarProdutosPorCategoria(categoria.id);
      
      // Confirmar exclusão com informações sobre produtos
      const mensagem = produtos.length > 0 
        ? `Tem certeza que deseja excluir a categoria "${categoria.nome}"?\n\n⚠️ ATENÇÃO: Esta ação irá excluir ${produtos.length} produto(s) desta categoria.\n\nEsta ação não pode ser desfeita.`
        : `Tem certeza que deseja excluir a categoria "${categoria.nome}"?\n\nEsta ação não pode ser desfeita.`;

      const confirmacao = window.confirm(mensagem);

      if (!confirmacao) {
        return;
      }

      const resultado = await excluirCategoria(categoria.id);

      // Mostrar mensagem de sucesso com informações sobre produtos excluídos
      if (resultado.produtosExcluidos > 0) {
        showSuccess(`Categoria "${categoria.nome}" excluída com sucesso! ${resultado.produtosExcluidos} produto(s) também foram excluído(s).`);
      } else {
        showSuccess(`Categoria "${categoria.nome}" excluída com sucesso!`);
      }

      // Se a categoria excluída estava selecionada, selecionar primeira categoria disponível
      if (categoriaSelecionada === categoria.nome) {
        const categoriasRestantes = categorias.filter(cat => cat.id !== categoria.id);
        if (categoriasRestantes.length > 0) {
          updateFiltros({ categoria: categoriasRestantes[0].nome });
        } else {
          updateFiltros({ categoria: 'todos' });
        }
      }

      // Recarregar categorias para atualizar a interface
      await carregarCategorias();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      showError('Erro ao excluir categoria. Tente novamente.');
    }
  };

  // Função para duplicar categoria
  const handleDuplicateCategoria = async (categoria: any) => {
    try {
      await duplicarCategoria(categoria.id);
      showSuccess(`Categoria "${categoria.nome}" duplicada com sucesso!`);

      // Recarregar categorias para atualizar a interface
      await carregarCategorias();
    } catch (error) {
      console.error('Erro ao duplicar categoria:', error);
      showError('Erro ao duplicar categoria. Tente novamente.');
    }
  };

  // Função para reordenar categorias
  const handleReorderCategorias = async (novasCategorias: string[]) => {
    try {
      // Criar array de categorias com as novas posições
      const categoriasReordenadas = novasCategorias.map((nomeCategoria, index) => {
        const categoriaOriginal = categorias.find(cat => cat.nome === nomeCategoria);
        if (!categoriaOriginal) {
          throw new Error(`Categoria ${nomeCategoria} não encontrada`);
        }
        return {
          ...categoriaOriginal,
          posicao: index + 1
        };
      });

      // Atualizar posições no Firebase
      await reordenarCategorias(categoriasReordenadas);

      // Atualizar estado local
      setCategorias(categoriasReordenadas);
      showSuccess('Categorias reordenadas com sucesso!');
    } catch (error) {
      console.error('Erro ao reordenar categorias:', error);
      showError('Erro ao reordenar categorias. Tente novamente.');
      // Recarregar categorias para restaurar ordem original
      await carregarCategorias();
    }
  };

  // Função para editar categoria
  const handleEditCategoria = (categoria: any) => {
    // Encontrar a categoria completa nos dados locais
    const categoriaCompleta = categorias.find(cat => cat.id === categoria.id);
    if (categoriaCompleta) {
      openModalEditarCategoria(categoriaCompleta);
    }
  };

  // ===== FUNÇÕES PARA COMPLEMENTOS =====
  
  // Função para detectar mudança de aba
  const handleAbaChange = (aba: 'produtos' | 'complementos') => {
    updateFiltros({ abaAtiva: aba });
    
    if (aba === 'produtos') {
      // Limpar complemento selecionado quando voltar para produtos
      updateFiltros({ complementoSelecionado: null });
      setComplementoSelecionado(undefined);
    } else if (aba === 'complementos') {
      // Sempre selecionar primeira categoria de complemento quando mudar para aba de complementos
      if (categoriasComplementos.length > 0) {
        const primeiraCategoria = categoriasComplementos[0];
        setCategoriaComplementoSelecionada(primeiraCategoria);
        
        // NÃO definir complementoSelecionado automaticamente - apenas definir a categoria
        // updateFiltros({ complementoSelecionado: { categoria: primeiraCategoria } });
      }
    }
  };

  // Função para clicar em categoria de complemento
  const handleCategoriaComplementoClick = (categoria: string) => {
    setCategoriaComplementoSelecionada(categoria);
    console.log('Categoria de complemento selecionada:', categoria);
    
    // NÃO definir complementoSelecionado automaticamente - apenas categoria local
    // updateFiltros({ complementoSelecionado: { categoria } });
  };

  // Função para clicar em complemento
  const handleComplementoClick = (complemento: string) => {
    setComplementoSelecionado(complemento);
    console.log('Complemento selecionado:', complemento);
    
    // Encontrar o complemento completo e passar para o contexto
    const complementoCompleto = complementos.find(comp => comp.nome === complemento);
    if (complementoCompleto) {
      // Atualizar o contexto global para que outros componentes possam acessar
      updateFiltros({ complementoSelecionado: complementoCompleto });
    }
  };

  // Função para criar novo complemento
  const handleNovoComplemento = () => {
    // Passar a categoria selecionada para o modal
    const categoriaAtual = categoriaComplementoSelecionada || '';
    openModalNovoComplemento(null, categoriaAtual);
  };

  // Função para editar complemento
  const handleEditComplemento = (complemento: any) => {
    console.log('Editar complemento:', complemento);
    // Implementar modal de edição de complemento
    alert(`Editar complemento: ${complemento.nome}`);
  };

  // Função para duplicar complemento
  const handleDuplicateComplemento = async (complemento: any) => {
    try {
      console.log('Duplicar complemento:', complemento);
      
      // Criar cópia do complemento
      const novoComplemento = {
        ...complemento,
        id: Date.now().toString(), // ID temporário
        nome: `${complemento.nome} (Cópia)`,
        status: 'ativo'
      };

      // Adicionar à lista
      setComplementos(prev => [...prev, novoComplemento]);
      
      alert(`Complemento "${complemento.nome}" duplicado com sucesso!`);
    } catch (error) {
      console.error('Erro ao duplicar complemento:', error);
      alert('Erro ao duplicar complemento. Tente novamente.');
    }
  };

  // Função para excluir complemento
  const handleDeleteComplemento = async (complemento: any) => {
    try {
      const confirmacao = window.confirm(
        `Tem certeza que deseja excluir o complemento "${complemento.nome}"?\n\nEsta ação não pode ser desfeita.`
      );

      if (!confirmacao) {
        return;
      }

      // Remover da lista
      setComplementos(prev => prev.filter(comp => comp.id !== complemento.id));
      
      // Se o complemento excluído estava selecionado, selecionar outro
      if (complementoSelecionado === complemento.nome) {
        const complementosRestantes = complementos.filter(comp => comp.id !== complemento.id);
        if (complementosRestantes.length > 0) {
          setComplementoSelecionado(complementosRestantes[0].nome);
        } else {
          setComplementoSelecionado(undefined);
        }
      }

      alert(`Complemento "${complemento.nome}" excluído com sucesso!`);
    } catch (error) {
      console.error('Erro ao excluir complemento:', error);
      alert('Erro ao excluir complemento. Tente novamente.');
    }
  };

  // Função para reordenar complementos
  const handleReorderComplementos = async (novosComplementos: any[]) => {
    try {
      console.log('Reordenar complementos:', novosComplementos);
      
      // Atualizar ordem na lista
      setComplementos(novosComplementos);
      
      alert('Complementos reordenados com sucesso!');
    } catch (error) {
      console.error('Erro ao reordenar complementos:', error);
      alert('Erro ao reordenar complementos. Tente novamente.');
      // Recarregar complementos para restaurar ordem original
      await carregarComplementos();
    }
  };

  // Função para alternar status do complemento
  const handleToggleStatusComplemento = async (complemento: any) => {
    try {
      const novoStatus = complemento.status === 'ativo' ? 'inativo' : 'ativo';
      
      // Atualizar na lista
      setComplementos(prev => 
        prev.map(comp => 
          comp.id === complemento.id 
            ? { ...comp, status: novoStatus }
            : comp
        )
      );

      alert(`Status do complemento "${complemento.nome}" alterado para ${novoStatus}!`);
    } catch (error) {
      console.error('Erro ao alterar status do complemento:', error);
      alert('Erro ao alterar status do complemento. Tente novamente.');
    }
  };

  // Converter categorias para o formato esperado pelo CardMenuCategorias
  const nomesCategorias = categorias.map(cat => cat.nome);
  const categoriasCompletas = categorias.map(cat => ({
    id: cat.id,
    nome: cat.nome,
    ativa: cat.status === 'ativo',
    ordem: cat.posicao,
    lojaId: cat.lojaId,
    dataCriacao: cat.dataCriacao,
    dataAtualizacao: cat.dataAtualizacao,
    // Adicionar campos que o CardMenuCategorias pode precisar
    status: cat.status,
    agendamentoPrevio: cat.agendamentoPrevio.ativo,
    tempoExtraProducao: false, // Campo não usado mais, mas mantido para compatibilidade
    disponibilidade: []
  }));

  return (
    <div className="w-full lg:w-[360px] flex-shrink-0 space-y-6">
      <CardMenuCategorias
        // Props para produtos/categorias
        categorias={nomesCategorias}
        categoriaSelecionada={categoriaSelecionada}
        onCategoriaClick={(categoria) => updateFiltros({ categoria })}
        onNovaCategoria={openModalNovaCategoria}
        categoriasCompletas={categoriasCompletas}
        onEditCategoria={handleEditCategoria}
        onDuplicateCategoria={handleDuplicateCategoria}
        onDeleteCategoria={handleDeleteCategoria}
        onReorderCategorias={handleReorderCategorias}
        onToggleStatus={handleToggleStatus}
        
        // Props para complementos
        complementos={complementos}
        complementoSelecionado={complementoSelecionado}
        onComplementoClick={handleComplementoClick}
        onNovoComplemento={handleNovoComplemento}
        complementosCompletos={complementos}
        onEditComplemento={handleEditComplemento}
        onDuplicateComplemento={handleDuplicateComplemento}
        onDeleteComplemento={handleDeleteComplemento}
        onReorderComplementos={handleReorderComplementos}
        onToggleStatusComplemento={handleToggleStatusComplemento}
        
        // Props para categorias de complementos
        categoriasComplementos={categoriasComplementos}
        categoriaComplementoSelecionada={categoriaComplementoSelecionada}
        onCategoriaComplementoClick={handleCategoriaComplementoClick}
        onNovaCategoriaComplemento={openModalNovaCategoriaComplemento}
        categoriasComplementosCompletas={categoriasComplementosCompletas}
        onEditCategoriaComplemento={handleEditCategoriaComplemento}
        onDuplicateCategoriaComplemento={handleDuplicateCategoriaComplemento}
        onDeleteCategoriaComplemento={handleDeleteCategoriaComplemento}
        onReorderCategoriasComplementos={handleReorderCategoriasComplementos}
        onToggleStatusCategoriaComplemento={handleToggleStatusCategoriaComplemento}
        
        onAbaChange={handleAbaChange}
      />
    </div>
  );
}
