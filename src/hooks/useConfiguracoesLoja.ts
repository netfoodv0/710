import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { ConfiguracaoLoja } from '../types';
import { FirebaseConfiguracaoService } from '../services/firebaseConfiguracaoService';

export function useConfiguracoesLoja() {
  const { user, loja } = useAuth();
  const [config, setConfig] = useState<ConfiguracaoLoja | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      const lojaId = user?.uid || loja?.id;
      
      if (!lojaId) {
        setLoading(false);
        return;
      }

      try {
        const configuracaoCarregada = await FirebaseConfiguracaoService.buscarConfiguracaoPorLoja(lojaId);
        setConfig(configuracaoCarregada);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarConfiguracoes();
  }, [user?.uid, loja?.id]);

  return { config, loading };
}
