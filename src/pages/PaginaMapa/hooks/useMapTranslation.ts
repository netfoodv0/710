import { useMemo } from 'react';
import { MapTranslations } from '../types';

export function useMapTranslation(): MapTranslations {
  const translations = useMemo(() => ({
    title: 'Mapa',
    subtitle: 'Visualize entregas e área de cobertura',
    
    sidebar: {
      title: 'Controles do Mapa',
      controls: 'Controles',
      deliveryRadius: 'Raio de Entrega',
      heatmap: 'Mapa de Calor'
    },
    
    controls: {
      toggleSidebar: 'Alternar Sidebar',
      toggleHeatmap: 'Alternar Mapa de Calor',
      toggleDeliveryRadius: 'Alternar Raio de Entrega'
    },
    
    loading: {
      message: 'Carregando mapa...'
    },
    
    error: {
      message: 'Erro ao carregar o mapa',
      retry: 'Tentar novamente'
    },
    
    warning: {
      noAddress: 'Endereço da loja não configurado',
      configureAddress: 'Configure o endereço nas configurações da loja'
    }
  }), []);

  return translations;
}
