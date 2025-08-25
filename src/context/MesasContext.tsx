import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Mesa } from '../types/mesas';

// Tipos para o contexto
interface MesasState {
  mesas: Mesa[];
  loading: boolean;
  error: string | null;
  selectedMesa: Mesa | null;
}

interface MesasContextType extends MesasState {
  dispatch: React.Dispatch<MesasAction>;
  selectMesa: (mesa: Mesa | null) => void;
  updateMesaStatus: (mesaId: string, status: Mesa['status']) => void;
  addMesa: (mesa: Omit<Mesa, 'id'>) => void;
  removeMesa: (mesaId: string) => void;
}

type MesasAction =
  | { type: 'SET_MESAS'; payload: Mesa[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_MESA'; payload: Mesa | null }
  | { type: 'UPDATE_MESA_STATUS'; payload: { mesaId: string; status: Mesa['status'] } }
  | { type: 'ADD_MESA'; payload: Mesa }
  | { type: 'REMOVE_MESA'; payload: string }
  | { type: 'UPDATE_MESA'; payload: Mesa };

// Estado inicial
const initialState: MesasState = {
  mesas: [],
  loading: false,
  error: null,
  selectedMesa: null,
};

// Criando o contexto
const MesasContext = createContext<MesasContextType | undefined>(undefined);

// Reducer para gerenciar o estado
function mesasReducer(state: MesasState, action: MesasAction): MesasState {
  switch (action.type) {
    case 'SET_MESAS':
      return { ...state, mesas: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SELECT_MESA':
      return { ...state, selectedMesa: action.payload };
    case 'UPDATE_MESA_STATUS':
      return {
        ...state,
        mesas: state.mesas.map(mesa =>
          mesa.id === action.payload.mesaId
            ? { ...mesa, status: action.payload.status }
            : mesa
        ),
      };
    case 'ADD_MESA':
      return {
        ...state,
        mesas: [...state.mesas, action.payload],
      };
    case 'REMOVE_MESA':
      return {
        ...state,
        mesas: state.mesas.filter(mesa => mesa.id !== action.payload),
      };
    case 'UPDATE_MESA':
      return {
        ...state,
        mesas: state.mesas.map(mesa =>
          mesa.id === action.payload.id ? action.payload : mesa
        ),
      };
    default:
      return state;
  }
}

// Provider
export function MesasProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(mesasReducer, initialState);

  // Simular carregamento de dados
  useEffect(() => {
    const loadMesas = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Simular chamada API
        const mockMesas: Mesa[] = [
          { id: '1', numero: 1, status: 'livre', capacidade: 4 },
          { id: '2', numero: 2, status: 'ocupada', capacidade: 2 },
          { id: '3', numero: 3, status: 'reservada', capacidade: 6 },
          { id: '4', numero: 4, status: 'livre', capacidade: 4 },
          { id: '5', numero: 5, status: 'ocupada', capacidade: 8 },
          { id: '6', numero: 6, status: 'livre', capacidade: 2 },
        ];
        setTimeout(() => {
          dispatch({ type: 'SET_MESAS', payload: mockMesas });
        }, 500);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar mesas' });
      }
    };

    loadMesas();
  }, []);

  const selectMesa = (mesa: Mesa | null) => {
    dispatch({ type: 'SELECT_MESA', payload: mesa });
  };

  const updateMesaStatus = (mesaId: string, status: Mesa['status']) => {
    dispatch({ type: 'UPDATE_MESA_STATUS', payload: { mesaId, status } });
  };

  const addMesa = (mesa: Omit<Mesa, 'id'>) => {
    const newMesa: Mesa = {
      ...mesa,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_MESA', payload: newMesa });
  };

  const removeMesa = (mesaId: string) => {
    dispatch({ type: 'REMOVE_MESA', payload: mesaId });
  };

  const value = {
    ...state,
    dispatch,
    selectMesa,
    updateMesaStatus,
    addMesa,
    removeMesa,
  };

  return (
    <MesasContext.Provider value={value}>
      {children}
    </MesasContext.Provider>
  );
}

// Hook para usar o contexto
export function useMesasContext() {
  const context = useContext(MesasContext);
  if (context === undefined) {
    throw new Error('useMesasContext must be used within a MesasProvider');
  }
  return context;
}