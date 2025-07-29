import { ConfiguracaoLoja } from '../../../types';

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