import { useCallback } from 'react';

export function useHorariosTranslation() {
  const t = useCallback((key: string): string => {
    const translations: Record<string, string> = {
      'title': 'Horário de atendimento',
      'timezone': 'Fuso horário',
      'save': 'Salvar horário',
      'open': 'Aberto',
      'closed': 'Fechado',
      'monday': 'Segunda-feira',
      'tuesday': 'Terça-feira',
      'wednesday': 'Quarta-feira',
      'thursday': 'Quinta-feira',
      'friday': 'Sexta-feira',
      'saturday': 'Sábado',
      'sunday': 'Domingo',
      'openTime': 'Horário de Abertura',
      'closeTime': 'Horário de Fechamento',
      'active': 'Ativo',
      'inactive': 'Inativo'
    };

    return translations[key] || key;
  }, []);

  return { t };
}
