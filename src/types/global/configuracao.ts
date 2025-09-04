// Tipos relacionados a configurações

export interface ConfiguracaoLoja {
  id: string;
  lojaId: string;
  nome: string;
  descricao?: string;
  endereco: string;
  telefone: string;
  email: string;
  horarioFuncionamento: {
    segunda: { abertura: string; fechamento: string; ativo: boolean };
    terca: { abertura: string; fechamento: string; ativo: boolean };
    quarta: { abertura: string; fechamento: string; ativo: boolean };
    quinta: { abertura: string; fechamento: string; ativo: boolean };
    sexta: { abertura: string; fechamento: string; ativo: boolean };
    sabado: { abertura: string; fechamento: string; ativo: boolean };
    domingo: { abertura: string; fechamento: string; ativo: boolean };
  };
  configuracoes: {
    taxaEntrega: number;
    tempoPreparo: number;
    valorMinimoPedido: number;
    aceitaCartao: boolean;
    aceitaDinheiro: boolean;
    aceitaPix: boolean;
    aceitaDebito: boolean;
    permiteRetirada: boolean;
    permiteEntrega: boolean;
    permiteConsumoLocal: boolean;
  };
  redesSociais?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface ConfiguracaoSistema {
  id: string;
  lojaId: string;
  tema: 'claro' | 'escuro' | 'auto';
  idioma: 'pt-BR' | 'en-US' | 'es-ES';
  notificacoes: {
    email: boolean;
    push: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  privacidade: {
    compartilharDados: boolean;
    analytics: boolean;
    cookies: boolean;
  };
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface ConfiguracaoPagamento {
  id: string;
  lojaId: string;
  metodos: {
    dinheiro: { ativo: boolean; troco: boolean };
    cartao: { ativo: boolean; taxa: number };
    pix: { ativo: boolean; chave: string };
    debito: { ativo: boolean; taxa: number };
  };
  configuracoes: {
    valorMinimoCartao: number;
    valorMinimoPix: number;
    aceitaTroco: boolean;
    trocoMaximo: number;
  };
  dataCriacao: Date;
  dataAtualizacao: Date;
}