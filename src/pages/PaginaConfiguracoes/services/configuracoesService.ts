import { ConfiguracaoLoja } from '../../../types';

// Dados das abas de configuração
export const abas = [
  { key: 'geral', label: 'Geral', icon: 'Globe' },
  { key: 'entrega', label: 'Entrega', icon: 'Truck' },
  { key: 'horarios', label: 'Horários', icon: 'Clock' },
  { key: 'notificacoes', label: 'Notificações', icon: 'Bell' },
  { key: 'aparencia', label: 'Aparência', icon: 'Palette' }
] as const;

// Dados dos dias da semana
export const diasSemana = [
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' }
] as const;

// Configuração mock para desenvolvimento
export const configuracaoMock: ConfiguracaoLoja = {
  id: '1',
  nomeRestaurante: 'Sabor & Arte Restaurante',
  cnpj: '12.345.678/0001-90',
  telefone: '(11) 99999-9999',
  email: 'contato@saborarte.com.br',
  endereco: {
    rua: 'Rua das Flores, 123',
    numero: '123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567'
  },
  horarioFuncionamento: {
    segunda: { abertura: '11:00', fechamento: '23:00', ativo: true },
    terca: { abertura: '11:00', fechamento: '23:00', ativo: true },
    quarta: { abertura: '11:00', fechamento: '23:00', ativo: true },
    quinta: { abertura: '11:00', fechamento: '23:00', ativo: true },
    sexta: { abertura: '11:00', fechamento: '23:00', ativo: true },
    sabado: { abertura: '11:00', fechamento: '23:00', ativo: true },
    domingo: { abertura: '11:00', fechamento: '22:00', ativo: true }
  },
  taxaEntrega: 5.99,
  tempoPreparoMedio: 35,
  valorMinimoEntrega: 25.00,
  raioEntregaKm: 8,
  ativo: true
};

// Serviços de configuração
export class ConfiguracoesService {
  static async getConfiguracao(): Promise<ConfiguracaoLoja> {
    // Simular chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(configuracaoMock);
      }, 1000);
    });
  }

  static async saveConfiguracao(config: ConfiguracaoLoja): Promise<void> {
    // Simular salvamento
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Configuração salva:', config);
        resolve();
      }, 500);
    });
  }

  static async resetConfiguracao(): Promise<ConfiguracaoLoja> {
    // Retornar configuração padrão
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(configuracaoMock);
      }, 300);
    });
  }
}


