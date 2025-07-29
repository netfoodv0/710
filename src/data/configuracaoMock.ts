import { ConfiguracaoLoja } from '../types';

// Dados mockados da configuração da loja
export const configuracaoMock: ConfiguracaoLoja = {
  id: '1',
  nomeRestaurante: 'Sabor & Arte Restaurante',
  cnpj: '12.345.678/0001-90',
  telefone: '(11) 99999-9999',
  email: 'contato@saborarte.com.br',
  endereco: {
    rua: 'Rua das Flores, 123',
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

// Dados para as abas de navegação
export const abasConfiguracao = [
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

// Dados das notificações
export const tiposNotificacao = [
  { 
    key: 'novoPedido', 
    label: 'Novo pedido recebido', 
    desc: 'Receber notificação quando um novo pedido for feito' 
  },
  { 
    key: 'pedidoCancelado', 
    label: 'Pedido cancelado', 
    desc: 'Notificar quando um pedido for cancelado' 
  },
  { 
    key: 'novaAvaliacao', 
    label: 'Nova avaliação', 
    desc: 'Receber notificação de novas avaliações de clientes' 
  },
  { 
    key: 'baixoEstoque', 
    label: 'Estoque baixo', 
    desc: 'Alertar quando produtos estiverem com estoque baixo' 
  },
  { 
    key: 'relatoriosDiarios', 
    label: 'Relatórios diários', 
    desc: 'Receber resumo diário de vendas por e-mail' 
  }
];

// Dados dos temas
export const temasDisponiveis = [
  { key: 'light', label: 'Claro', preview: 'bg-white border-2' },
  { key: 'dark', label: 'Escuro', preview: 'bg-gray-900 border-2' },
  { key: 'auto', label: 'Automático', preview: 'bg-gradient-to-r from-white to-gray-900 border-2' }
];

// Cores principais disponíveis
export const coresPrincipais = [
  'bg-red-500', 
  'bg-blue-500', 
  'bg-green-500', 
  'bg-purple-500', 
  'bg-orange-500', 
  'bg-pink-500'
];

// Estados do Brasil
export const estadosBrasil = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];