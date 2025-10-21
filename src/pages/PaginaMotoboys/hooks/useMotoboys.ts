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

  const editarMotoboy = useCallback(async (id: string, motoboy: Partial<Motoboy>) => {
    try {
      await MotoboysService.editarMotoboy(id, motoboy);
      setData(prev => ({
        ...prev,
        motoboys: prev.motoboys.map(mot => 
          mot.id === id ? { ...mot, ...motoboy, dataAtualizacao: new Date() } : mot
        )
      }));
      
      showNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Motoboy editado com sucesso!'
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível editar o motoboy'
      });
    }
  }, [showNotification]);

  const excluirMotoboy = useCallback(async (id: string) => {
    try {
      await MotoboysService.excluirMotoboy(id);
      setData(prev => ({
        ...prev,
        motoboys: prev.motoboys.filter(mot => mot.id !== id)
      }));
      
      showNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Motoboy excluído com sucesso!'
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível excluir o motoboy'
      });
    }
  }, [showNotification]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    data,
    carregarDados,
    criarMotoboy,
    editarMotoboy,
    excluirMotoboy
  };
}


