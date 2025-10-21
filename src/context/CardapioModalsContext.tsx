import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CategoriaModal } from '../types/cardapio/categoriaModal';
import { ProdutoModal } from '../types/cardapio/produtoModal';

interface CardapioModalsContextType {
  isModalNovaCategoriaOpen: boolean;
  openModalNovaCategoria: () => void;
  closeModalNovaCategoria: () => void;
  isModalEditarCategoriaOpen: boolean;
  openModalEditarCategoria: (categoria: CategoriaModal) => void;
  closeModalEditarCategoria: () => void;
  categoriaParaEditar: CategoriaModal | null;
  isModalNovoProdutoOpen: boolean;
  openModalNovoProduto: (produtoParaEditar?: ProdutoModal | null, categoriaPreSelecionada?: string) => void;
  closeModalNovoProduto: () => void;
  produtoParaEditar: ProdutoModal | null;
  categoriaProdutoPreSelecionada: string | null;
  isModalNovaCategoriaComplementoOpen: boolean;
  openModalNovaCategoriaComplemento: () => void;
  closeModalNovaCategoriaComplemento: () => void;
  isModalNovoComplementoOpen: boolean;
  openModalNovoComplemento: (complementoParaEditar?: any | null, categoriaPreSelecionada?: string) => void;
  closeModalNovoComplemento: () => void;
  complementoParaEditar: any | null;
  categoriaPreSelecionada: string | null;
  onCategoriaCriada: (callback: () => void) => void;
  triggerCategoriaCriada: () => void;
  onProdutoCriado: (callback: () => void) => void;
  triggerProdutoCriado: () => void;
  onCategoriaComplementoCriada: (callback: () => void) => void;
  triggerCategoriaComplementoCriada: () => void;
  onComplementoCriado: (callback: () => void) => void;
  triggerComplementoCriado: () => void;
}

const CardapioModalsContext = createContext<CardapioModalsContextType | undefined>(undefined);

interface CardapioModalsProviderProps {
  children: ReactNode;
}

export function CardapioModalsProvider({ children }: CardapioModalsProviderProps) {
  const [isModalNovaCategoriaOpen, setIsModalNovaCategoriaOpen] = useState(false);
  const [isModalEditarCategoriaOpen, setIsModalEditarCategoriaOpen] = useState(false);
  const [categoriaParaEditar, setCategoriaParaEditar] = useState<CategoriaModal | null>(null);
  const [isModalNovoProdutoOpen, setIsModalNovoProdutoOpen] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<ProdutoModal | null>(null);
  const [categoriaProdutoPreSelecionada, setCategoriaProdutoPreSelecionada] = useState<string | null>(null);
  const [isModalNovaCategoriaComplementoOpen, setIsModalNovaCategoriaComplementoOpen] = useState(false);
  const [isModalNovoComplementoOpen, setIsModalNovoComplementoOpen] = useState(false);
  const [complementoParaEditar, setComplementoParaEditar] = useState<any | null>(null);
  const [categoriaPreSelecionada, setCategoriaPreSelecionada] = useState<string | null>(null);
  const [categoriaCriadaCallbacks, setCategoriaCriadaCallbacks] = useState<(() => void)[]>([]);
  const [produtoCriadoCallbacks, setProdutoCriadoCallbacks] = useState<(() => void)[]>([]);
  const [categoriaComplementoCriadaCallbacks, setCategoriaComplementoCriadaCallbacks] = useState<(() => void)[]>([]);
  const [complementoCriadoCallbacks, setComplementoCriadoCallbacks] = useState<(() => void)[]>([]);

  const openModalNovaCategoria = () => {
    setIsModalNovaCategoriaOpen(true);
  };

  const closeModalNovaCategoria = () => {
    setIsModalNovaCategoriaOpen(false);
  };

  const openModalEditarCategoria = (categoria: CategoriaModal) => {
    setCategoriaParaEditar(categoria);
    setIsModalEditarCategoriaOpen(true);
  };

  const closeModalEditarCategoria = () => {
    setIsModalEditarCategoriaOpen(false);
    setCategoriaParaEditar(null);
  };

  const openModalNovoProduto = (produtoParaEditar?: ProdutoModal | null, categoriaPreSelecionada?: string) => {
    setProdutoParaEditar(produtoParaEditar || null);
    setCategoriaProdutoPreSelecionada(categoriaPreSelecionada || null);
    setIsModalNovoProdutoOpen(true);
  };

  const closeModalNovoProduto = () => {
    setIsModalNovoProdutoOpen(false);
    setProdutoParaEditar(null);
    setCategoriaProdutoPreSelecionada(null);
  };

  const openModalNovaCategoriaComplemento = () => {
    setIsModalNovaCategoriaComplementoOpen(true);
  };

  const closeModalNovaCategoriaComplemento = () => {
    setIsModalNovaCategoriaComplementoOpen(false);
  };

  const openModalNovoComplemento = (complementoParaEditar?: any | null, categoriaPreSelecionada?: string) => {
    setComplementoParaEditar(complementoParaEditar || null);
    setCategoriaPreSelecionada(categoriaPreSelecionada || null);
    setIsModalNovoComplementoOpen(true);
  };

  const closeModalNovoComplemento = () => {
    setIsModalNovoComplementoOpen(false);
    setComplementoParaEditar(null);
    setCategoriaPreSelecionada(null);
  };


  const onCategoriaCriada = useCallback((callback: () => void) => {
    setCategoriaCriadaCallbacks(prev => [...prev, callback]);
  }, []);

  const triggerCategoriaCriada = useCallback(() => {
    categoriaCriadaCallbacks.forEach(callback => callback());
  }, [categoriaCriadaCallbacks]);

  const onProdutoCriado = useCallback((callback: () => void) => {
    setProdutoCriadoCallbacks(prev => [...prev, callback]);
  }, []);

  const triggerProdutoCriado = useCallback(() => {
    produtoCriadoCallbacks.forEach(callback => callback());
  }, [produtoCriadoCallbacks]);

  const onCategoriaComplementoCriada = useCallback((callback: () => void) => {
    setCategoriaComplementoCriadaCallbacks(prev => [...prev, callback]);
  }, []);

  const triggerCategoriaComplementoCriada = useCallback(() => {
    categoriaComplementoCriadaCallbacks.forEach(callback => callback());
  }, [categoriaComplementoCriadaCallbacks]);

  const onComplementoCriado = useCallback((callback: () => void) => {
    setComplementoCriadoCallbacks(prev => [...prev, callback]);
  }, []);

  const triggerComplementoCriado = useCallback(() => {
    complementoCriadoCallbacks.forEach(callback => callback());
  }, [complementoCriadoCallbacks]);

  return (
    <CardapioModalsContext.Provider
      value={{
        isModalNovaCategoriaOpen,
        openModalNovaCategoria,
        closeModalNovaCategoria,
        isModalEditarCategoriaOpen,
        openModalEditarCategoria,
        closeModalEditarCategoria,
        categoriaParaEditar,
        isModalNovoProdutoOpen,
        openModalNovoProduto,
        closeModalNovoProduto,
        produtoParaEditar,
        categoriaProdutoPreSelecionada,
        isModalNovaCategoriaComplementoOpen,
        openModalNovaCategoriaComplemento,
        closeModalNovaCategoriaComplemento,
        isModalNovoComplementoOpen,
        openModalNovoComplemento,
        closeModalNovoComplemento,
        complementoParaEditar,
        categoriaPreSelecionada,
        onCategoriaCriada,
        triggerCategoriaCriada,
        onProdutoCriado,
        triggerProdutoCriado,
        onCategoriaComplementoCriada,
        triggerCategoriaComplementoCriada,
        onComplementoCriado,
        triggerComplementoCriado,
      }}
    >
      {children}
    </CardapioModalsContext.Provider>
  );
}

export function useCardapioModals() {
  const context = useContext(CardapioModalsContext);
  if (context === undefined) {
    throw new Error('useCardapioModals deve ser usado dentro de um CardapioModalsProvider');
  }
  return context;
}
