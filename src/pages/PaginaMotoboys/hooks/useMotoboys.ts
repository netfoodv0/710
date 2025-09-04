import { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { MotoboysService } from '../services';
import { Motoboy, MotoboysData } from '../types';

export function useMotoboys() {
  const [data, setData] = useState<MotoboysData>({
    motoboys: [],
    loading: true,
    error: null
  });

  const { showNotification } = useNotificationContext();

  const carregarDados = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const motoboys = await MotoboysService.getMotoboys();

      setData({
        motoboys,
        loading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar dados dos motoboys'
      }));
      
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível carregar os dados dos motoboys'
      });
    }
  }, [showNotification]);

  const criarMotoboy = useCallback(async (motoboy: Partial<Motoboy>) => {
    try {
      const novoMotoboy = await MotoboysService.criarMotoboy(motoboy);
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
    criarMotoboy
  };
}
