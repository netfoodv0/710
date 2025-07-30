import { Pedido } from '../types';

export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const formatarHora = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(data);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'novo':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'confirmado':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'preparando':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'saiu_entrega':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'entregue':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'cancelado':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'novo':
      return 'Novo';
    case 'confirmado':
      return 'Confirmado';
    case 'preparando':
      return 'Preparando';
    case 'saiu_entrega':
      return 'Saiu p/ Entrega';
    case 'entregue':
      return 'Entregue';
    case 'cancelado':
      return 'Cancelado';
    default:
      return status;
  }
};

export const abrirWhatsApp = (telefone: string) => {
  const numeroLimpo = telefone.replace(/\D/g, '');
  const link = `https://wa.me/55${numeroLimpo}`;
  window.open(link, '_blank');
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

  const formasPagamento: any[] = ['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'];
  const formasEntrega: any[] = ['delivery', 'retirada'];
  const origensPedido: any[] = ['ifood', 'rappi', 'uber_eats', 'telefone', 'presencial'];

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

/**
 * Formata um endereço de forma segura, lidando com strings e objetos
 */
export function formatarEndereco(endereco: string | object | null | undefined): string {
  if (!endereco) return '';
  
  if (typeof endereco === 'string') {
    return endereco;
  }
  
  if (typeof endereco === 'object') {
    // Se for um objeto EnderecoEntrega
    if ('rua' in endereco) {
      const end = endereco as any;
      
      // Verificar se a rua já contém o número
      if (end.rua && end.rua.includes(',')) {
        // Se a rua já tem vírgula, provavelmente já inclui o número
        const partes = [
          end.rua,
          end.bairro,
          end.cidade,
          end.estado,
          end.cep
        ].filter(Boolean);
        
        return partes.join(', ');
      } else {
        // Se não tem vírgula, adicionar o número
        const partes = [
          end.rua,
          end.numero,
          end.bairro,
          end.cidade,
          end.estado,
          end.cep
        ].filter(Boolean);
        
        return partes.join(', ');
      }
    }
    
    // Se for outro tipo de objeto, converte para string
    return JSON.stringify(endereco);
  }
  
  return String(endereco);
} 