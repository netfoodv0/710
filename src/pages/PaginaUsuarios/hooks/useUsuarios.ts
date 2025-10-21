import { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { UsuariosService } from '../services';
import { Usuario, Motoboy, UsuariosData } from '../types';

export function useUsuarios() {
  const [data, setData] = useState<UsuariosData>({
    operadores: [],
    motoboys: [],
    loading: true,
    error: null
  });

  const { showNotification } = useNotificationContext();

  const carregarDados = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const [operadores, motoboys] = await Promise.all([
        UsuariosService.getOperadores(),
        UsuariosService.getMotoboys()
      ]);

      setData({
        operadores,
        motoboys,
        loading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar dados dos usuários'
      }));
      
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível carregar os dados dos usuários'
      });
    }
  }, [showNotification]);

  const criarOperador = useCallback(async (operador: Partial<Usuario>) => {
    try {
      const novoOperador = await UsuariosService.criarOperador(operador);
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

  const criarMotoboy = useCallback(async (motoboy: Partial<Motoboy>) => {
    try {
      const novoMotoboy = await UsuariosService.criarMotoboy(motoboy);
      setData(prev => ({
        ...prev,
        motoboys: [...prev.motoboys, novoMotoboy]
      }));
      
      showNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Motoboy criado com sucesso!'
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível criar o motoboy'
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
    criarMotoboy
  };
}


