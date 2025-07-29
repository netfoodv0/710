import { Pedido, StatusPedido } from '../types';
import { pedidosMock } from '../data/pedidosMock';

export interface PedidoHistorico extends Pedido {
  dataAlteracao: Date;
  statusAnterior?: StatusPedido;
  observacao?: string;
}

class PedidoService {
  private pedidos: Pedido[] = [];
  private historico: PedidoHistorico[] = [];

  constructor() {
    // Carregar dados de exemplo na inicialização
    this.carregarDadosExemplo();
  }

  // Carregar dados de exemplo
  private carregarDadosExemplo() {
    pedidosMock.forEach(pedido => {
      this.adicionarPedido(pedido);
    });
  }

  // Adicionar novo pedido
  adicionarPedido(pedido: Omit<Pedido, 'id'>): Pedido {
    const novoPedido: Pedido = {
      ...pedido,
      id: this.gerarId(),
      status: 'novo',
      dataHora: new Date(),
      pagamento: {
        valorPago: 0,
        statusPagamento: 'pendente'
      }
    };

    this.pedidos.push(novoPedido);
    this.adicionarAoHistorico(novoPedido, 'novo', 'Pedido criado');
    
    return novoPedido;
  }

  // Atualizar status do pedido
  atualizarStatus(pedidoId: string, novoStatus: StatusPedido, observacao?: string): Pedido | null {
    const pedidoIndex = this.pedidos.findIndex(p => p.id === pedidoId);
    
    if (pedidoIndex === -1) return null;

    const pedido = this.pedidos[pedidoIndex];
    const statusAnterior = pedido.status;

    // Validar transição de status
    if (!this.validarTransicaoStatus(statusAnterior, novoStatus)) {
      throw new Error(`Transição inválida de ${statusAnterior} para ${novoStatus}`);
    }

    // Atualizar pedido
    const pedidoAtualizado: Pedido = {
      ...pedido,
      status: novoStatus,
      dataHora: new Date()
    };

    this.pedidos[pedidoIndex] = pedidoAtualizado;
    this.adicionarAoHistorico(pedidoAtualizado, novoStatus, observacao);

    return pedidoAtualizado;
  }

  // Obter pedidos por status
  obterPedidosPorStatus(status: StatusPedido): Pedido[] {
    return this.pedidos.filter(p => p.status === status);
  }

  // Obter todos os pedidos
  obterTodosPedidos(): Pedido[] {
    return this.pedidos;
  }

  // Obter pedido por ID
  obterPedidoPorId(id: string): Pedido | null {
    return this.pedidos.find(p => p.id === id) || null;
  }

  // Obter histórico de pedido
  obterHistoricoPedido(pedidoId: string): PedidoHistorico[] {
    return this.historico.filter(h => h.id === pedidoId);
  }

  // Obter pedidos entregues (histórico)
  obterPedidosEntregues(): Pedido[] {
    return this.pedidos.filter(p => p.status === 'entregue');
  }

  // Cancelar pedido
  cancelarPedido(pedidoId: string, motivo?: string): Pedido | null {
    return this.atualizarStatus(pedidoId, 'cancelado', motivo || 'Pedido cancelado');
  }

  // Aceitar pedido (novo -> preparando)
  aceitarPedido(pedidoId: string): Pedido | null {
    return this.atualizarStatus(pedidoId, 'preparando', 'Pedido aceito e em preparo');
  }

  // Recusar pedido (qualquer status -> cancelado)
  recusarPedido(pedidoId: string, motivo?: string): Pedido | null {
    return this.cancelarPedido(pedidoId, motivo || 'Pedido recusado');
  }

  // Avançar pedido (confirmado -> preparando)
  avancarParaPreparo(pedidoId: string): Pedido | null {
    return this.atualizarStatus(pedidoId, 'preparando', 'Pedido em preparo');
  }

  // Avançar pedido (preparando -> saiu_entrega)
  avancarParaEntrega(pedidoId: string): Pedido | null {
    return this.atualizarStatus(pedidoId, 'saiu_entrega', 'Pedido saiu para entrega');
  }

  // Finalizar pedido (saiu_entrega -> entregue)
  finalizarPedido(pedidoId: string): Pedido | null {
    return this.atualizarStatus(pedidoId, 'entregue', 'Pedido entregue');
  }

  // Validar transição de status
  private validarTransicaoStatus(statusAtual: StatusPedido, novoStatus: StatusPedido): boolean {
    const transicoesValidas: Record<StatusPedido, StatusPedido[]> = {
      'novo': ['preparando', 'cancelado'],
      'confirmado': ['preparando', 'cancelado'],
      'preparando': ['saiu_entrega', 'cancelado'],
      'saiu_entrega': ['entregue', 'cancelado'],
      'entregue': [], // Status final
      'cancelado': [] // Status final
    };

    return transicoesValidas[statusAtual]?.includes(novoStatus) || false;
  }

  // Adicionar ao histórico
  private adicionarAoHistorico(pedido: Pedido, status: StatusPedido, observacao?: string) {
    const historicoEntry: PedidoHistorico = {
      ...pedido,
      dataAlteracao: new Date(),
      observacao
    };

    this.historico.push(historicoEntry);
  }

  // Gerar ID único
  private gerarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Estatísticas
  obterEstatisticas() {
    const total = this.pedidos.length;
    const porStatus = {
      novo: this.pedidos.filter(p => p.status === 'novo').length,
      confirmado: this.pedidos.filter(p => p.status === 'confirmado').length,
      preparando: this.pedidos.filter(p => p.status === 'preparando').length,
      saiu_entrega: this.pedidos.filter(p => p.status === 'saiu_entrega').length,
      entregue: this.pedidos.filter(p => p.status === 'entregue').length,
      cancelado: this.pedidos.filter(p => p.status === 'cancelado').length
    };

    return { total, porStatus };
  }
}

export const pedidoService = new PedidoService(); 