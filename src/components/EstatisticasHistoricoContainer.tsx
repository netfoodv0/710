import React from 'react';
import { EstatisticasCard } from './';
import { EstatisticasHistorico } from '../features/historico/services/historicoPedidoService';
import { DadosRelatorios } from '../features/relatorios/types/relatorios.types';
import { DiscountIcon, RejectedOrderIcon, CompletedOrderIcon, NewCustomerIcon, BagIcon, RevenueIcon, TicketIcon, UsersIcon } from './ui';

interface EstatisticasHistoricoContainerProps {
	estatisticas: EstatisticasHistorico | null;
	dadosRelatorios?: DadosRelatorios | null;
}

const EstatisticasHistoricoContainer: React.FC<EstatisticasHistoricoContainerProps> = ({ 
	estatisticas,
	dadosRelatorios
}) => {
	// Converter dados de relatórios para o formato esperado pelas estatísticas
	const converterDadosRelatorios = (dados: DadosRelatorios) => {
		return {
			totalPedidos: dados.kpis.pedidosTotal,
			valorTotal: dados.kpis.receitaTotal,
			ticketMedio: dados.kpis.ticketMedio,
			clientesUnicos: dados.kpis.clientesAtivos,
			entregues: dados.kpis.pedidosTotal - Math.floor(dados.kpis.pedidosTotal * (dados.kpis.taxaCancelamento / 100)),
			cancelados: Math.floor(dados.kpis.pedidosTotal * (dados.kpis.taxaCancelamento / 100)),
			
		};
	};

	// Se não houver estatísticas, usar dados de exemplo
	const dadosExemplo = {
		totalPedidos: 0,
		valorTotal: 0,
		ticketMedio: 0,
		clientesUnicos: 0,
		entregues: 0,
		cancelados: 0,

	};
	
	// Priorizar dados de relatórios se disponíveis, senão usar estatísticas de histórico
	let dadosParaUsar = dadosExemplo;
	
	if (dadosRelatorios) {
		dadosParaUsar = converterDadosRelatorios(dadosRelatorios);
			} else if (estatisticas) {
		dadosParaUsar = { 
			...estatisticas
		};
	}

	return (
		<div className="bg-white rounded-lg p-4" style={{ border: '1px solid #cfd1d3' }}>
			{/* Primeira linha - 4 cards */}
			<div className="grid gap-6 grid-cols-4 mb-6">
				<EstatisticasCard
					titulo="Total de Pedidos"
					valor={dadosParaUsar.totalPedidos || 0}
					icone={
						<BagIcon size={24} color="#6b7280" />
					}
				/>

				<EstatisticasCard
					titulo="Faturamento Total"
					valor={`R$ ${(dadosParaUsar.valorTotal || 0).toFixed(2).replace('.', ',')}`}
					icone={
						<RevenueIcon size={24} color="#6b7280" />
					}
				/>

				<EstatisticasCard
					titulo="Ticket Médio"
					valor={`R$ ${(dadosParaUsar.ticketMedio || 0).toFixed(2).replace('.', ',')}`}
					icone={
						<TicketIcon size={24} color="#6b7280" />
					}
				/>

				<EstatisticasCard
					titulo="Clientes Únicos"
					valor={dadosParaUsar.clientesUnicos || 0}
					icone={
						<UsersIcon size={24} color="#6b7280" />
					}
				/>
			</div>

			{/* Segunda linha - 5 cards */}
			<div className="grid gap-6 grid-cols-5">
				<EstatisticasCard
					titulo="Pedidos Finalizados"
					valor={dadosParaUsar.entregues || 0}
					icone={
						<CompletedOrderIcon size={24} color="#6b7280" />
					}
				/>

				<EstatisticasCard
					titulo="Pedidos Rejeitados"
					valor={dadosParaUsar.cancelados || 0}
					icone={
						<RejectedOrderIcon size={24} color="#6b7280" />
					}
				/>

				<EstatisticasCard
					titulo="Clientes Novos"
					valor={dadosParaUsar.clientesUnicos || 0}
					icone={
						<NewCustomerIcon size={24} color="#6b7280" />
					}
				/>


			</div>
		</div>
	);
};

export default EstatisticasHistoricoContainer;
