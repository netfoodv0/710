import { useState, useEffect } from 'react';
import { ModalGlobal } from '../../../../components/modals/ModalGlobal';
import { Button } from '../../../../components/ui/Button';
import { Caixa, Movimentacao } from '../../types';
import { useAuth } from '../../../../hooks/useAuth';
import { useConfiguracoesLoja } from '../../../../hooks/useConfiguracoesLoja';
import { ModalAdicionarMovimentacao } from './ModalAdicionarMovimentacao';
import { useCaixa } from '../../hooks';
import { caixaService } from '../../services';

interface ModalCaixaAbertoDetalhesProps {
  isOpen: boolean;
  onClose: () => void;
  caixa: Caixa;
}

export function ModalCaixaAbertoDetalhes({ isOpen, onClose, caixa }: ModalCaixaAbertoDetalhesProps) {
  const { user } = useAuth();
  const { config: configLoja } = useConfiguracoesLoja();
  const { adicionarMovimentacao } = useCaixa();
  
  const [isModalMovimentacaoOpen, setIsModalMovimentacaoOpen] = useState(false);
  const [tipoMovimentacao, setTipoMovimentacao] = useState<'entrada' | 'saida'>('entrada');
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    }).format(date);
  };

  const totalCaixa = (caixa.saldoInicial || 0) + (caixa.totalVendas || 0) + (caixa.totalEntradas || 0) - (caixa.totalSaidas || 0);

  // Calcular duração desde a abertura
  const calcularDuracao = () => {
    const agora = new Date();
    const diferenca = agora.getTime() - caixa.dataAbertura.getTime();
    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}m`;
  };

  // Obter nome do responsável (extrair do email ou usar nome da loja)
  const getResponsavel = () => {
    if (user?.email) {
      const nomeEmail = user.email.split('@')[0];
      return nomeEmail.charAt(0).toUpperCase() + nomeEmail.slice(1);
    }
    return '-';
  };

  // Obter CNPJ
  const getCNPJ = () => {
    // @ts-ignore - tentar acessar CNPJ de configurações se disponível
    return configLoja?.cnpj || '-';
  };

  const handleAdicionarEntrada = () => {
    setTipoMovimentacao('entrada');
    setIsModalMovimentacaoOpen(true);
  };

  const handleAdicionarSaida = () => {
    setTipoMovimentacao('saida');
    setIsModalMovimentacaoOpen(true);
  };

  const handleConfirmarMovimentacao = async (descricao: string, valor: number) => {
    await adicionarMovimentacao(tipoMovimentacao, valor, descricao);
    await buscarMovimentacoes();
  };

  const buscarMovimentacoes = async () => {
    const movimentacoesData = await caixaService.buscarMovimentacoes(caixa.id);
    setMovimentacoes(movimentacoesData);
  };

  useEffect(() => {
    if (isOpen && caixa.id) {
      buscarMovimentacoes();
    }
  }, [isOpen]);

  const handleFecharCaixa = () => {
    // TODO: Implementar lógica para fechar caixa
    console.log('Fechar caixa');
  };

  const footer = (
    <div className="flex gap-3 justify-between w-full">
      <div className="flex gap-3">
        <Button
          type="button"
          variant="default"
          onClick={handleAdicionarEntrada}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Adicionar Entrada
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={handleAdicionarSaida}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Adicionar Saída
        </Button>
      </div>
      <Button
        type="button"
        variant="default"
        onClick={handleFecharCaixa}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Fechar Caixa
      </Button>
    </div>
  );

  return (
    <>
      <ModalGlobal
        isOpen={isOpen}
        onClose={onClose}
        title="Detalhes do Caixa"
        size="md"
        footer={footer}
        footerAlign="left"
      >
      <div className="w-full">
        {/* Tabela no formato Excel */}
        <div className="border border-gray-300 rounded overflow-hidden">
          {/* Linha 1 - Header */}
          <div className="grid grid-cols-2 bg-gray-200 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 font-semibold text-gray-700">Campo</div>
            <div className="px-3 py-2 font-semibold text-gray-700">Valor</div>
          </div>

          {/* Linha 2 - Status */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">Status</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              {caixa.status.toUpperCase()}
            </div>
          </div>

          {/* Linha 3 - Aberto em */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">Aberto em</div>
            <div className="px-3 py-2 text-sm text-gray-900">{formatDate(caixa.dataAbertura)}</div>
          </div>

          {/* Linha 4 - Responsável */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">Responsável</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              {getResponsavel()}
            </div>
          </div>

          {/* Linha 5 - Duração */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">Duração</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              {calcularDuracao()}
            </div>
          </div>

          {/* Linha 6 - Total de Pedidos */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">Total de Pedidos</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              0
            </div>
          </div>

          {/* Linha 7 - Valor dos Pedidos */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">Valor dos Pedidos</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              {formatCurrency(caixa.totalVendas || 0)}
            </div>
          </div>

          {/* Linha 8 - Total de Saídas */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">Total de Saídas</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              {formatCurrency(caixa.totalSaidas || 0)}
            </div>
          </div>

          {/* Linha 9 - CNPJ */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">CNPJ</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              {getCNPJ()}
            </div>
          </div>

          {/* Linha 10 - Saldo Inicial */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">(+) Saldo Inicial</div>
            <div className="px-3 py-2 text-sm font-bold text-gray-900">
              {formatCurrency(caixa.saldoInicial || 0)}
            </div>
          </div>

          {/* Linha 11 - Total Entradas */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">(+) Total de Entradas</div>
            <div className="px-3 py-2 text-sm text-gray-500">-</div>
          </div>
          {movimentacoes.filter(m => m.tipo === 'entrada').map((mov) => (
            <div key={mov.id} className="grid grid-cols-2 border-b border-gray-300">
              <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700 pl-6">
                {mov.descricao}
              </div>
              <div className="px-3 py-2 text-sm font-bold text-gray-900">
                {formatCurrency(mov.valor)}
              </div>
            </div>
          ))}

          {/* Linha 12 - Total Saídas */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">(-) Total de Saídas</div>
            <div className="px-3 py-2 text-sm text-gray-500">-</div>
          </div>
          {movimentacoes.filter(m => m.tipo === 'saida').map((mov) => (
            <div key={mov.id} className="grid grid-cols-2 border-b border-gray-300">
              <div className="border-r border-gray-300 px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700 pl-6">
                {mov.descricao}
              </div>
              <div className="px-3 py-2 text-sm font-bold text-gray-900">
                {formatCurrency(mov.valor)}
              </div>
            </div>
          ))}

          {/* Linha 13 - Total Final */}
          <div className="grid grid-cols-2 bg-gray-100">
            <div className="border-r border-gray-300 px-3 py-3 bg-gray-50 text-sm font-bold text-gray-900">(=) SALDO FINAL</div>
            <div className="px-3 py-3 text-lg font-bold text-gray-900">
              {formatCurrency(totalCaixa)}
            </div>
          </div>
        </div>
      </div>
      </ModalGlobal>
      
      <ModalAdicionarMovimentacao
        isOpen={isModalMovimentacaoOpen}
        onClose={() => setIsModalMovimentacaoOpen(false)}
        onConfirm={handleConfirmarMovimentacao}
        tipo={tipoMovimentacao}
      />
    </>
  );
}

