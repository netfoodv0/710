// Tipos relacionados a clientes

export interface Address {
  id?: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  cep: string;
  referencia?: string;
  principal?: boolean;
}

export interface Customer {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  enderecos: Address[];
  dataCriacao: Date;
  ultimoPedido?: Date;
  totalPedidos: number;
  totalGasto: number;
  observacoes?: string;
  ativo: boolean;
}