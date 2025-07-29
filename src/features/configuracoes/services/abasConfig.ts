import { 
  Globe, 
  Truck, 
  Clock, 
  Bell, 
  Palette 
} from 'lucide-react';

export const abas = [
  { key: 'geral', label: 'Geral', icon: Globe },
  { key: 'entrega', label: 'Entrega', icon: Truck },
  { key: 'horarios', label: 'Horários', icon: Clock },
  { key: 'notificacoes', label: 'Notificações', icon: Bell },
  { key: 'aparencia', label: 'Aparência', icon: Palette }
] as const;

export const diasSemana = [
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' }
] as const; 