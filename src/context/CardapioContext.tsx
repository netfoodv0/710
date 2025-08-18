import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Categoria, CriarCategoriaData } from '../types/categoria';
import { Produto } from '../types/produtos';

// Tipos para o estado
interface CardapioState {
  // Estados de UI
  activeSection: 'produtos';
  modalCategoriaOpen: boolean;
  modalProdutoOpen: boolean;
  categoriaSelecionadaEdicao: Categoria | undefined;
  
  // Estados de filtros
  filtros: {
    categoria: string;
    status: string;
    disponibilidade: string;
  };
  searchTerm: string;
  
  // Estados de loading
  loadingProdutos: boolean;
  loadingCategorias: boolean;
  
  // Estados de erro
  errorProdutos: string | null;
}

// Tipos para as ações
type CardapioAction =
  | { type: 'SET_ACTIVE_SECTION'; payload: 'produtos' }
  | { type: 'SET_MODAL_CATEGORIA_OPEN'; payload: boolean }
  | { type: 'SET_MODAL_PRODUTO_OPEN'; payload: boolean }
  | { type: 'SET_CATEGORIA_SELECIONADA_EDICAO'; payload: Categoria | undefined }
  | { type: 'SET_FILTROS'; payload: Partial<CardapioState['filtros']> }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_LOADING_PRODUTOS'; payload: boolean }
  | { type: 'SET_LOADING_CATEGORIAS'; payload: boolean }
  | { type: 'SET_ERROR_PRODUTOS'; payload: string | null }
  | { type: 'RESET_STATE' };

// Estado inicial
const initialState: CardapioState = {
  activeSection: 'produtos',
  modalCategoriaOpen: false,
  modalProdutoOpen: false,
  categoriaSelecionadaEdicao: undefined,
  filtros: {
    categoria: 'todos',
    status: 'todos',
    disponibilidade: 'todos'
  },
  searchTerm: '',
  loadingProdutos: false,
  loadingCategorias: false,
  errorProdutos: null
};

// Reducer para gerenciar o estado
function cardapioReducer(state: CardapioState, action: CardapioAction): CardapioState {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    
    case 'SET_MODAL_CATEGORIA_OPEN':
      return { ...state, modalCategoriaOpen: action.payload };
    
    case 'SET_MODAL_PRODUTO_OPEN':
      return { ...state, modalProdutoOpen: action.payload };
    
    case 'SET_CATEGORIA_SELECIONADA_EDICAO':
      return { ...state, categoriaSelecionadaEdicao: action.payload };
    
    case 'SET_FILTROS':
      return { 
        ...state, 
        filtros: { ...state.filtros, ...action.payload } 
      };
    
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_LOADING_PRODUTOS':
      return { ...state, loadingProdutos: action.payload };
    
    case 'SET_LOADING_CATEGORIAS':
      return { ...state, loadingCategorias: action.payload };
    
    case 'SET_ERROR_PRODUTOS':
      return { ...state, errorProdutos: action.payload };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Interface do contexto
interface CardapioContextType {
  state: CardapioState;
  dispatch: React.Dispatch<CardapioAction>;
  
  // Ações para modais
  openModalCategoria: (categoria?: Categoria) => void;
  closeModalCategoria: () => void;
  openModalProduto: () => void;
  closeModalProduto: () => void;
  
  // Ações para filtros
  updateFiltros: (filtros: Partial<CardapioState['filtros']>) => void;
  updateSearchTerm: (term: string) => void;
  
  // Ações para loading
  setLoadingProdutos: (loading: boolean) => void;
  setLoadingCategorias: (loading: boolean) => void;
  
  // Ações para erros
  setErrorProdutos: (error: string | null) => void;
  
  // Ações para seções
  setActiveSection: (section: 'produtos') => void;
  
  // ✅ NOVA FUNCIONALIDADE: Selecionar primeira categoria
  selecionarPrimeiraCategoria: (categorias: Categoria[]) => void;
}

// Criação do contexto
const CardapioContext = createContext<CardapioContextType | undefined>(undefined);

// Provider do contexto
interface CardapioProviderProps {
  children: ReactNode;
}

export function CardapioProvider({ children }: CardapioProviderProps) {
  const [state, dispatch] = useReducer(cardapioReducer, initialState);

  // Ações para modais
  const openModalCategoria = useCallback((categoria?: Categoria) => {
    dispatch({ type: 'SET_CATEGORIA_SELECIONADA_EDICAO', payload: categoria });
    dispatch({ type: 'SET_MODAL_CATEGORIA_OPEN', payload: true });
  }, []);

  const closeModalCategoria = useCallback(() => {
    dispatch({ type: 'SET_MODAL_CATEGORIA_OPEN', payload: false });
    dispatch({ type: 'SET_CATEGORIA_SELECIONADA_EDICAO', payload: undefined });
  }, []);

  const openModalProduto = useCallback(() => {
    dispatch({ type: 'SET_MODAL_PRODUTO_OPEN', payload: true });
  }, []);

  const closeModalProduto = useCallback(() => {
    dispatch({ type: 'SET_MODAL_PRODUTO_OPEN', payload: false });
  }, []);

  // Ações para filtros
  const updateFiltros = useCallback((filtros: Partial<CardapioState['filtros']>) => {
    dispatch({ type: 'SET_FILTROS', payload: filtros });
  }, []);

  const updateSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  // Ações para loading
  const setLoadingProdutos = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING_PRODUTOS', payload: loading });
  }, []);

  const setLoadingCategorias = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING_CATEGORIAS', payload: loading });
  }, []);

  // Ações para erros
  const setErrorProdutos = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR_PRODUTOS', payload: error });
  }, []);

  // Ações para seções
  const setActiveSection = useCallback((section: 'produtos') => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  }, []);

  // ✅ NOVA FUNCIONALIDADE: Selecionar primeira categoria automaticamente
  const selecionarPrimeiraCategoria = useCallback((categorias: Categoria[]) => {
    if (categorias.length > 0 && state.filtros.categoria === 'todos') {
      const primeiraCategoria = categorias[0]?.nome;
      if (primeiraCategoria) {
        dispatch({ 
          type: 'SET_FILTROS', 
          payload: { categoria: primeiraCategoria } 
        });
      }
    }
  }, [state.filtros.categoria]);

  const value: CardapioContextType = {
    state,
    dispatch,
    openModalCategoria,
    closeModalCategoria,
    openModalProduto,
    closeModalProduto,
    updateFiltros,
    updateSearchTerm,
    setLoadingProdutos,
    setLoadingCategorias,
    setErrorProdutos,
    setActiveSection,
    selecionarPrimeiraCategoria // ✅ Nova função
  };

  return (
    <CardapioContext.Provider value={value}>
      {children}
    </CardapioContext.Provider>
  );
}

// Hook para usar o contexto
export function useCardapioContext() {
  const context = useContext(CardapioContext);
  if (context === undefined) {
    throw new Error('useCardapioContext deve ser usado dentro de um CardapioProvider');
  }
  return context;
}
