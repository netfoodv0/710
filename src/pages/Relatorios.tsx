import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, StatsCard } from '../components';
import { relatorioMock, metricasComparativas } from '../data';

export function Relatorios() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30d');
  const [tipoGrafico, setTipoGrafico] = useState<'vendas' | 'pedidos' | 'horario'>('vendas');

  const calcularCrescimento = (atual: number, anterior: number) => {
    return ((atual - anterior) / anterior) * 100;
  };

  const crescimentoVendas = calcularCrescimento(
    metricasComparativas.mesAtual.vendas,
    metricasComparativas.mesAnterior.vendas
  );

  const crescimentoPedidos = calcularCrescimento(
    metricasComparativas.mesAtual.pedidos,
    metricasComparativas.mesAnterior.pedidos
  );

  const crescimentoTicket = calcularCrescimento(
    metricasComparativas.mesAtual.ticketMedio,
    metricasComparativas.mesAnterior.ticketMedio
  );

  const crescimentoClientes = calcularCrescimento(
    metricasComparativas.mesAtual.novosClientes,
    metricasComparativas.mesAnterior.novosClientes
  );

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600 mt-1">
              Análise de vendas e performance do restaurante
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="btn btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </button>
            <button className="btn btn-primary">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Seletor de Período */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">Período:</span>
          <div className="flex gap-2">
            {[
              { key: 'hoje', label: 'Hoje' },
              { key: 'semana', label: 'Esta Semana' },
              { key: 'mes', label: 'Este Mês' },
              { key: 'trimestre', label: 'Trimestre' },
              { key: 'ano', label: 'Este Ano' }
            ].map((periodo) => (
              <button
                key={periodo.key}
                onClick={() => setPeriodoSelecionado(periodo.key)}
                className={`btn text-sm ${
                  periodoSelecionado === periodo.key
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {periodo.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Vendas Totais"
          value={`R$ ${relatorioMock.vendas.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          trend={crescimentoVendas}
          icon={<DollarSign className="w-5 h-5" />}
          color="green"
        />
        
        <StatsCard
          title="Total de Pedidos"
          value={metricasComparativas.mesAtual.pedidos.toString()}
          trend={crescimentoPedidos}
          icon={<ShoppingBag className="w-5 h-5" />}
          color="blue"
        />
        
        <StatsCard
          title="Ticket Médio"
          value={`R$ ${metricasComparativas.mesAtual.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          trend={crescimentoTicket}
          icon={<TrendingUp className="w-5 h-5" />}
          color="purple"
        />
        
        <StatsCard
          title="Novos Clientes"
          value={metricasComparativas.mesAtual.novosClientes.toString()}
          trend={crescimentoClientes}
          icon={<Users className="w-5 h-5" />}
          color="orange"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas por Dia */}
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Vendas por Dia</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTipoGrafico('vendas')}
                  className={`btn text-sm ${
                    tipoGrafico === 'vendas'
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Vendas
                </button>
                <button
                  onClick={() => setTipoGrafico('pedidos')}
                  className={`btn text-sm ${
                    tipoGrafico === 'pedidos'
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Pedidos
                </button>
              </div>
            </div>
            
            {/* Placeholder para gráfico */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de {tipoGrafico} por dia</p>
                <p className="text-sm text-gray-400 mt-1">
                  Integrar com Recharts ou ApexCharts
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Gráfico de Vendas por Horário */}
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Vendas por Horário</h3>
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
            
            {/* Placeholder para gráfico */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Distribuição por horário</p>
                <p className="text-sm text-gray-400 mt-1">
                  Picos: 12h-14h e 19h-21h
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Produtos Mais Vendidos */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Produtos Mais Vendidos
          </h3>
          
          <div className="space-y-4">
            {relatorioMock.produtosMaisVendidos.map((produto, index) => {
              const porcentagem = (produto.quantidade / relatorioMock.produtosMaisVendidos[0].quantidade) * 100;
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{produto.nome}</span>
                      <span className="text-sm text-gray-600">
                        {produto.quantidade} vendas
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${porcentagem}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      R$ {produto.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Comparativo Mensal */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Comparativo Mensal
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Vendas</p>
              <p className="text-xl font-bold text-gray-900">
                R$ {metricasComparativas.mesAtual.vendas.toLocaleString('pt-BR')}
              </p>
              <div className={`flex items-center justify-center mt-1 ${
                crescimentoVendas >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {crescimentoVendas >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(crescimentoVendas).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Pedidos</p>
              <p className="text-xl font-bold text-gray-900">
                {metricasComparativas.mesAtual.pedidos}
              </p>
              <div className={`flex items-center justify-center mt-1 ${
                crescimentoPedidos >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {crescimentoPedidos >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(crescimentoPedidos).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
              <p className="text-xl font-bold text-gray-900">
                R$ {metricasComparativas.mesAtual.ticketMedio.toFixed(2)}
              </p>
              <div className={`flex items-center justify-center mt-1 ${
                crescimentoTicket >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {crescimentoTicket >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(crescimentoTicket).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Novos Clientes</p>
              <p className="text-xl font-bold text-gray-900">
                {metricasComparativas.mesAtual.novosClientes}
              </p>
              <div className={`flex items-center justify-center mt-1 ${
                crescimentoClientes >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {crescimentoClientes >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(crescimentoClientes).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}