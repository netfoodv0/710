import { Pedido, ItemPedido, ClientePedido, PagamentoPedido, EnderecoEntrega } from '../types/pedidos';

/**
 * Remove campos undefined de um objeto
 */
function removeUndefinedFields<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as T;
}

// Dados fictícios para gerar pedidos realistas
const PRODUTOS_FICTICIOS = [
  { nome: 'X-Burger Clássico', preco: 18.90 },
  { nome: 'X-Bacon', preco: 22.50 },
  { nome: 'X-Salada', preco: 20.00 },
  { nome: 'X-Tudo', preco: 25.90 },
  { nome: 'Batata Frita', preco: 12.00 },
  { nome: 'Refrigerante Coca-Cola', preco: 6.50 },
  { nome: 'Refrigerante Pepsi', preco: 6.00 },
  { nome: 'Suco Natural Laranja', preco: 8.00 },
  { nome: 'Sorvete Casquinha', preco: 5.50 },
  { nome: 'Milk Shake Chocolate', preco: 15.00 }
];

const CLIENTES_FICTICIOS = [
  { nome: 'João Silva', telefone: '(11) 99999-1111' },
  { nome: 'Maria Santos', telefone: '(11) 99999-2222' },
  { nome: 'Pedro Oliveira', telefone: '(11) 99999-3333' },
  { nome: 'Ana Costa', telefone: '(11) 99999-4444' },
  { nome: 'Carlos Ferreira', telefone: '(11) 99999-5555' },
  { nome: 'Lucia Pereira', telefone: '(11) 99999-6666' },
  { nome: 'Roberto Almeida', telefone: '(11) 99999-7777' },
  { nome: 'Fernanda Lima', telefone: '(11) 99999-8888' }
];

const ENDERECOS_FICTICIOS = [
  'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
  'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
  'Rua Augusta, 500 - Consolação, São Paulo - SP',
  'Rua Oscar Freire, 200 - Jardins, São Paulo - SP',
  'Av. Brigadeiro Faria Lima, 1500 - Pinheiros, São Paulo - SP'
];

const FORMAS_PAGAMENTO = ['pix', 'dinheiro', 'cartao_credito', 'cartao_debito'];
const FORMAS_ENTREGA = ['delivery', 'retirada'];
const ORIGENS_PEDIDO = ['ifood', 'rappi', 'uber', 'proprio'];

/**
 * Gera um pedido fictício com dados realistas
 */
export function gerarPedidoFicticio(): Omit<Pedido, 'id' | 'dataCriacao' | 'dataAtualizacao'> {
  // Gerar número de pedido único
  const numero = `PED${Date.now().toString().slice(-6)}`;
  
  // Selecionar cliente aleatório
  const clienteIndex = Math.floor(Math.random() * CLIENTES_FICTICIOS.length);
  const cliente = CLIENTES_FICTICIOS[clienteIndex];
  
  // Gerar itens do pedido (1 a 4 itens)
  const numItens = Math.floor(Math.random() * 4) + 1;
  const itens: ItemPedido[] = [];
  let total = 0;
  
  for (let i = 0; i < numItens; i++) {
    const produtoIndex = Math.floor(Math.random() * PRODUTOS_FICTICIOS.length);
    const produto = PRODUTOS_FICTICIOS[produtoIndex];
    const quantidade = Math.floor(Math.random() * 3) + 1;
    const subtotal = produto.preco * quantidade;
    
    itens.push(removeUndefinedFields({
      id: `item-${i + 1}`,
      nome: produto.nome,
      preco: produto.preco,
      quantidade,
      ...(Math.random() > 0.7 && { observacoes: 'Sem cebola' })
    }));
    
    total += subtotal;
  }
  
  // Selecionar forma de pagamento e entrega
  const formaPagamento = FORMAS_PAGAMENTO[Math.floor(Math.random() * FORMAS_PAGAMENTO.length)];
  const formaEntrega = FORMAS_ENTREGA[Math.floor(Math.random() * FORMAS_ENTREGA.length)];
  const origemPedido = ORIGENS_PEDIDO[Math.floor(Math.random() * ORIGENS_PEDIDO.length)];
  
  // Gerar endereço de entrega se for delivery
  const enderecoEntrega: EnderecoEntrega | undefined = formaEntrega === 'delivery' ? removeUndefinedFields({
    rua: ENDERECOS_FICTICIOS[Math.floor(Math.random() * ENDERECOS_FICTICIOS.length)],
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    ...(Math.random() > 0.5 && { complemento: 'Apto 101' })
  }) : undefined;
  
  // Gerar dados de pagamento
  const pagamento: PagamentoPedido = {
    valorPago: total,
    statusPagamento: 'pago' as const,
    dataPagamento: new Date(),
    formaPagamento
  };
  
  // Gerar observações ocasionalmente
  const observacoes = Math.random() > 0.7 ? 'Entregar no portão' : undefined;
  
  // Gerar tempo estimado
  const tempoEstimado = `${Math.floor(Math.random() * 30) + 20} min`;
  
  // Gerar status que apareça no histórico (entregue ou cancelado)
  const status = Math.random() > 0.1 ? 'entregue' : 'cancelado'; // 90% entregue, 10% cancelado
  
  // Criar objeto do pedido removendo campos undefined
  const pedido = {
    numero,
    status,
    dataHora: new Date(),
    cliente: {
      nome: cliente.nome,
      telefone: cliente.telefone,
      ...(enderecoEntrega?.rua && { endereco: enderecoEntrega.rua })
    },
    itens,
    total,
    formaPagamento,
    formaEntrega,
    origemPedido,
    pagamento,
    clienteNovo: Math.random() > 0.6,
    tempoEstimado,
    ...(enderecoEntrega && { enderecoEntrega }),
    ...(observacoes && { observacoes })
  };
  
  // Remover campos undefined antes de retornar
  return removeUndefinedFields(pedido);
}

/**
 * Gera múltiplos pedidos fictícios
 */
export function gerarPedidosFicticios(quantidade: number = 1): Omit<Pedido, 'id' | 'dataCriacao' | 'dataAtualizacao'>[] {
  const pedidos = [];
  for (let i = 0; i < quantidade; i++) {
    pedidos.push(gerarPedidoFicticio());
  }
  return pedidos;
}

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