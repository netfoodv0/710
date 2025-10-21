import { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { OperadoresService } from '../services';
import { Operador, OperadoresData } from '../types';

export function useOperadores() {
  const [data, setData] = useState<OperadoresData>({
    operadores: [],
    loading: true,
    error: null
  });

  const { showNotification } = useNotificationContext();

  const carregarDados = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const operadores = await OperadoresService.getOperadores();

      setData({
        operadores,
        loading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar dados dos operadores'
      }));
      
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível carregar os dados dos operadores'
      });
    }
  }, [showNotification]);

  const criarOperador = useCallback(async (operador: Partial<Operador>) => {
    try {
      const novoOperador = await OperadoresService.criarOperador(operador);
      setData(prev => ({
        ...prev,
        operadores: [...prev.operadores, novoOperador]
      }));
      
      showNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Operador criado com sucesso!'
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível criar o operador'
      });
    }
  }, [showNotification]);

  const editarOperador = useCallback(async (id: string, operador: Partial<Operador>) => {
    try {
      await OperadoresService.editarOperador(id, operador);
      setData(prev => ({
        ...prev,
        operadores: prev.operadores.map(op => 
          op.id === id ? { ...op, ...operador, dataAtualizacao: new Date() } : op
        )
      }));
      
      showNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Operador editado com sucesso!'
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível editar o operador'
      });
    }
  }, [showNotification]);

  const excluirOperador = useCallback(async (id: string) => {
    try {
      await OperadoresService.excluirOperador(id);
      setData(prev => ({
        ...prev,
        operadores: prev.operadores.filter(op => op.id !== id)
      }));
      
      showNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Operador excluído com sucesso!'
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível excluir o operador'
      });
    }
  }, [showNotification]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    data,
    carregarDados,
    criarOperador,
    editarOperador,
    excluirOperador
  };
}


