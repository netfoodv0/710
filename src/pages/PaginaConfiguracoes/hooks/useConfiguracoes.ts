import { useState, useEffect, useCallback } from 'react';
import { environment } from '../../../config/environment';
import { useAuth } from '../../../hooks/useAuth';
import { ConfiguracaoLoja } from '../../../types';
import { FirebaseConfiguracaoService } from '../../../services/firebaseConfiguracaoService';

interface UseConfiguracoesProps {
  configuracaoInicial?: ConfiguracaoLoja;
}

export function useConfiguracoes({ configuracaoInicial }: UseConfiguracoesProps = {}) {
  const { user, loja } = useAuth();
  const [config, setConfig] = useState<ConfiguracaoLoja | null>(configuracaoInicial || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<string>('gerais');
  
  // Carregar configurações do Firebase
  useEffect(() => {
    const carregarConfiguracoes = async () => {
      const lojaId = user?.uid || loja?.id;
      
      if (!lojaId) {
        setLoading(false);
        setError('Usuário não autenticado');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        if (environment.app.debug) console.log('🔍 useConfiguracoes - Carregando configurações para lojaId:', lojaId);
        
        let configuracaoCarregada = await FirebaseConfiguracaoService.buscarConfiguracaoPorLoja(lojaId);
        
        // Se não existe configuração, criar uma padrão
        if (!configuracaoCarregada) {
          if (environment.app.debug) console.log('⚠️ Configuração não encontrada, criando configuração padrão...');
          const nomeLoja = loja?.nomeLoja || 'Minha Loja';
          configuracaoCarregada = await FirebaseConfiguracaoService.criarConfiguracaoPadrao(lojaId, nomeLoja);
          if (environment.app.debug) console.log('✅ Configuração padrão criada com sucesso');
        }
        
        setConfig(configuracaoCarregada);
        if (environment.app.debug) console.log('✅ Configurações carregadas:', configuracaoCarregada.id);
      } catch (err) {
        console.error('❌ Erro ao carregar configurações:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar configurações');
      } finally {
        setLoading(false);
      }
    };

    carregarConfiguracoes();
  }, [user?.uid, loja?.id, loja?.nomeLoja]);

  // Salvar configurações no Firebase
  const salvarConfiguracao = useCallback(async (configuracao: ConfiguracaoLoja) => {
    try {
      setLoading(true);
      setError(null);
      
      if (environment.app.debug) console.log('💾 useConfiguracoes - Salvando configurações:', configuracao.id);
      await FirebaseConfiguracaoService.salvarConfiguracao(configuracao);
      
      setConfig(configuracao);
      setHasChanges(false);
      if (environment.app.debug) console.log('✅ Configurações salvas com sucesso');
    } catch (err) {
      console.error('❌ Erro ao salvar configurações:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar configurações');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Resetar configurações para o padrão
  const resetarConfiguracao = useCallback(async () => {
    const lojaId = user?.uid || loja?.id;
    
    if (!lojaId || !config) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (environment.app.debug) console.log('🔄 useConfiguracoes - Resetando configurações para padrão');
      const nomeLoja = loja?.nomeLoja || 'Minha Loja';
      const configuracaoPadrao = await FirebaseConfiguracaoService.criarConfiguracaoPadrao(lojaId, nomeLoja);
      
      setConfig(configuracaoPadrao);
      setHasChanges(false);
      if (environment.app.debug) console.log('✅ Configurações resetadas');
    } catch (err) {
      console.error('❌ Erro ao resetar configurações:', err);
      setError(err instanceof Error ? err.message : 'Erro ao resetar configurações');
    } finally {
      setLoading(false);
    }
  }, [user?.uid, loja?.id, loja?.nomeLoja, config]);

  // Atualizar configuração local (marca como tendo mudanças)
  const atualizarConfig = useCallback((updates: Partial<ConfiguracaoLoja>) => {
    setConfig(prev => prev ? { ...prev, ...updates } : null);
    setHasChanges(true);
  }, []);

  return {
    config: config || {} as ConfiguracaoLoja, // Retornar objeto vazio se ainda estiver carregando
    setConfig: atualizarConfig,
    loading,
    error,
    salvarConfiguracao,
    resetarConfiguracao,
    abaAtiva,
    setAbaAtiva,
    hasChanges
  };
}
