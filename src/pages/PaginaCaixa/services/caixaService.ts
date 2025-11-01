import { Caixa, DadosAberturaCaixa, DadosFechamentoCaixa, CaixaResumo, Movimentacao } from '../types';
import { firebaseCaixaService } from './firebaseCaixaService';
import { useAuth } from '../../../hooks/useAuth';

class CaixaService {
  async abrirCaixa(dados: DadosAberturaCaixa, lojaId: string, usuarioId: string): Promise<string> {
    try {
      const caixaId = await firebaseCaixaService.abrirCaixa(lojaId, usuarioId, dados);
      console.log('✅ Caixa aberto com sucesso:', caixaId);
      return caixaId;
    } catch (error) {
      console.error('❌ Erro ao abrir caixa:', error);
      throw new Error('Erro ao abrir caixa');
    }
  }

  async fecharCaixa(caixaId: string, dados: DadosFechamentoCaixa): Promise<void> {
    try {
      await firebaseCaixaService.fecharCaixa(caixaId, dados);
      console.log('✅ Caixa fechado com sucesso:', caixaId);
    } catch (error) {
      console.error('❌ Erro ao fechar caixa:', error);
      throw new Error('Erro ao fechar caixa');
    }
  }

  async buscarCaixaAtual(lojaId: string): Promise<Caixa | null> {
    try {
      const caixa = await firebaseCaixaService.buscarCaixaAtual(lojaId);
      return caixa;
    } catch (error) {
      console.error('❌ Erro ao buscar caixa atual:', error);
      return null;
    }
  }

  async buscarHistoricoCaixas(lojaId: string, limite: number = 50): Promise<CaixaResumo[]> {
    try {
      const caixas = await firebaseCaixaService.buscarHistoricoCaixas(lojaId, limite);
      return caixas;
    } catch (error) {
      console.error('❌ Erro ao buscar histórico de caixas:', error);
      return [];
    }
  }

  async atualizarTotaisCaixa(caixaId: string, totais: {
    totalVendas?: number;
    totalEntradas?: number;
    totalSaidas?: number;
  }): Promise<void> {
    try {
      await firebaseCaixaService.atualizarTotaisCaixa(caixaId, totais);
      console.log('✅ Totais do caixa atualizados:', caixaId);
    } catch (error) {
      console.error('❌ Erro ao atualizar totais do caixa:', error);
      throw new Error('Erro ao atualizar totais do caixa');
    }
  }

  async adicionarMovimentacao(caixaId: string, tipo: 'entrada' | 'saida', valor: number, descricao: string): Promise<void> {
    try {
      await firebaseCaixaService.adicionarMovimentacao(caixaId, tipo, valor, descricao);
      console.log('✅ Movimentação adicionada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao adicionar movimentação:', error);
      throw new Error('Erro ao adicionar movimentação');
    }
  }

  async buscarMovimentacoes(caixaId: string): Promise<Movimentacao[]> {
    try {
      const movimentacoes = await firebaseCaixaService.buscarMovimentacoes(caixaId);
      return movimentacoes;
    } catch (error) {
      console.error('❌ Erro ao buscar movimentações:', error);
      return [];
    }
  }
}

export const caixaService = new CaixaService();
