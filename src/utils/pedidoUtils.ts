import { 
  Pedido, 
  FormaPagamento, 
  FormaEntrega, 
  OrigemPedido, 
  StatusPagamento 
} from '../types';

export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const formatarTelefone = (telefone: string): string => {
  const cleaned = telefone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return telefone;
};

export const formatarDataHora = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(data);
};

export const formatarHora = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(data);
};

export const getFormaPagamentoLabel = (forma: FormaPagamento): string => {
  const labels: Record<FormaPagamento, string> = {
    dinheiro: 'Dinheiro',
    pix: 'PIX',
    cartao_credito: 'Cartão de Crédito',
    cartao_debito: 'Cartão de Débito',
    vale_refeicao: 'Vale Refeição',
    vale_alimentacao: 'Vale Alimentação'
  };
  return labels[forma];
};

export const getFormaEntregaLabel = (forma: FormaEntrega): string => {
  const labels: Record<FormaEntrega, string> = {
    delivery: 'Delivery',
    retirada: 'Retirada',
    balcao: 'Balcão'
  };
  return labels[forma];
};

export const getOrigemPedidoLabel = (origem: OrigemPedido): string => {
  const labels: Record<OrigemPedido, string> = {
    pdv: 'PDV',
    cardapio_digital: 'Cardápio Digital',
    whatsapp: 'WhatsApp',
    telefone: 'Telefone',
    presencial: 'Presencial'
  };
  return labels[origem];
};

export const getStatusPagamentoLabel = (status: StatusPagamento): string => {
  const labels: Record<StatusPagamento, string> = {
    pendente: 'Pendente',
    pago: 'Pago',
    parcial: 'Pago Parcialmente',
    cancelado: 'Cancelado'
  };
  return labels[status];
};

export const getStatusPagamentoColor = (status: StatusPagamento): string => {
  const colors: Record<StatusPagamento, string> = {
    pendente: 'text-orange-600 bg-orange-100 border-orange-200',
    pago: 'text-green-600 bg-green-100 border-green-200',
    parcial: 'text-blue-600 bg-blue-100 border-blue-200',
    cancelado: 'text-red-600 bg-red-100 border-red-200'
  };
  return colors[status];
};

export const calcularTroco = (valorPago: number, total: number): number => {
  return Math.max(0, valorPago - total);
};

export const gerarLinkWhatsApp = (telefone: string, mensagem?: string): string => {
  const numeroLimpo = telefone.replace(/\D/g, '');
  const texto = mensagem || 'Olá! Gostaria de falar sobre meu pedido.';
  return `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(texto)}`;
};

export const formatarEnderecoCompleto = (endereco: any): string => {
  if (!endereco) return '';
  
  const partes = [
    endereco.rua,
    endereco.numero,
    endereco.bairro,
    endereco.cidade,
    endereco.estado
  ].filter(Boolean);
  
  return partes.join(', ');
};

export const isPedidoSemCliente = (pedido: Pedido): boolean => {
  return !pedido.cliente || !pedido.cliente.nome;
};

export const getClienteDisplayName = (pedido: Pedido): string => {
  if (isPedidoSemCliente(pedido)) {
    return 'Cliente não identificado';
  }
  return pedido.cliente!.nome;
};

export const getClienteTelefone = (pedido: Pedido): string => {
  if (isPedidoSemCliente(pedido)) {
    return 'N/A';
  }
  return pedido.cliente!.telefone;
}; 

// Função para gerar dados aleatórios de pedido
export function gerarPedidoAleatorio(pedidosExistentes: any[] = []): Omit<Pedido, 'id'> {
  const clientes: any[] = [
    {
      id: '1',
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      endereco: {
        rua: 'Rua das Flores, 123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567'
      }
    },
    {
      id: '2',
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      endereco: {
        rua: 'Av. Paulista, 456',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01310-000'
      }
    },
    {
      id: '3',
      nome: 'Carlos Lima',
      telefone: '(11) 77777-7777',
      email: 'carlos@email.com',
      endereco: {
        rua: 'Rua Augusta, 789',
        bairro: 'Consolação',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01212-000'
      }
    },
    {
      id: '4',
      nome: 'Ana Oliveira',
      telefone: '(11) 66666-6666',
      email: 'ana@email.com',
      endereco: {
        rua: 'Rua das Palmeiras, 321',
        bairro: 'Moema',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '04000-000'
      }
    },
    {
      id: '5',
      nome: 'Pedro Costa',
      telefone: '(11) 55555-5555',
      email: 'pedro@email.com',
      endereco: {
        rua: 'Rua do Comércio, 654',
        bairro: 'Jardins',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01223-000'
      }
    }
  ];

  const itens: any[] = [
    {
      id: '1',
      nome: 'X-Burger',
      quantidade: 1,
      preco: 15.90,
      observacoes: 'Sem cebola',
      extras: []
    },
    {
      id: '2',
      nome: 'Batata Frita',
      quantidade: 1,
      preco: 8.50,
      observacoes: '',
      extras: []
    },
    {
      id: '3',
      nome: 'Refrigerante',
      quantidade: 1,
      preco: 6.00,
      observacoes: '',
      extras: []
    },
    {
      id: '4',
      nome: 'Salada Caesar',
      quantidade: 1,
      preco: 18.50,
      observacoes: 'Molho à parte',
      extras: []
    },
    {
      id: '5',
      nome: 'Pizza Margherita',
      quantidade: 1,
      preco: 25.00,
      observacoes: 'Borda recheada',
      extras: []
    },
    {
      id: '6',
      nome: 'Lasanha Bolonhesa',
      quantidade: 1,
      preco: 22.00,
      observacoes: '',
      extras: []
    },
    {
      id: '7',
      nome: 'Sushi Combo',
      quantidade: 1,
      preco: 35.00,
      observacoes: 'Molho de soja extra',
      extras: []
    },
    {
      id: '8',
      nome: 'Sorvete',
      quantidade: 1,
      preco: 12.00,
      observacoes: 'Baunilha',
      extras: []
    }
  ];

  const formasPagamento: FormaPagamento[] = ['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'];
  const formasEntrega: FormaEntrega[] = ['delivery', 'retirada'];
  const origensPedido: OrigemPedido[] = ['ifood', 'rappi', 'uber_eats', 'telefone', 'presencial'];

  // Selecionar dados aleatórios
  const cliente = clientes[Math.floor(Math.random() * clientes.length)];
  const formaPagamento = formasPagamento[Math.floor(Math.random() * formasPagamento.length)];
  const formaEntrega = formasEntrega[Math.floor(Math.random() * formasEntrega.length)];
  const origemPedido = origensPedido[Math.floor(Math.random() * origensPedido.length)];
  
  // Gerar itens aleatórios (1 a 4 itens)
  const numItens = Math.floor(Math.random() * 4) + 1;
  const itensSelecionados: any[] = [];
  const itensDisponiveis = [...itens];
  
  for (let i = 0; i < numItens; i++) {
    const itemIndex = Math.floor(Math.random() * itensDisponiveis.length);
    const item = itensDisponiveis.splice(itemIndex, 1)[0];
    itensSelecionados.push({
      ...item,
      quantidade: Math.floor(Math.random() * 2) + 1
    });
  }

  // Calcular total
  const total = itensSelecionados.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  // Gerar número de pedido único
  const numerosExistentes = pedidosExistentes.map(p => parseInt(p.numero));
  let numeroPedido;
  let tentativas = 0;
  
  do {
    numeroPedido = Math.floor(Math.random() * 999) + 1;
    tentativas++;
    
    // Evitar loop infinito
    if (tentativas > 100) {
      numeroPedido = Math.max(...numerosExistentes, 0) + 1;
      break;
    }
  } while (numerosExistentes.includes(numeroPedido));
  
  const numeroFormatado = numeroPedido.toString().padStart(3, '0');

  return {
    numero: numeroFormatado,
    status: 'novo',
    dataHora: new Date(),
    cliente,
    itens: itensSelecionados,
    total,
    formaPagamento,
    formaEntrega,
    origemPedido,
    pagamento: {
      valorPago: formaPagamento === 'Dinheiro' ? 0 : total,
      statusPagamento: formaPagamento === 'Dinheiro' ? 'pendente' : 'pago',
      dataPagamento: formaPagamento === 'Dinheiro' ? null : new Date()
    },
    clienteNovo: Math.random() > 0.7, // 30% chance de ser cliente novo
    tempoEstimado: `${Math.floor(Math.random() * 30) + 15} min`,
    enderecoEntrega: formaEntrega === 'delivery' ? cliente.endereco : null
  };
} 