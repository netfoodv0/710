import React from 'react';
import { NotificationToast } from '../../../components/NotificationToast';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { PageHeader, CustomDropdown, DropdownOption } from '../../../components/ui';
import NavigationToggle from '../../../components/ui/NavigationToggle';
import { DataTable } from '../../../components/ui';
import { EstatisticasCustom } from '../../../components/EstatisticasCustom';
import { UsersIcon, NewCustomerIcon, CompletedOrderIcon, RevenueIcon } from '../../../components/ui';
import { ChartRadialShape } from '../../../components/RadialChart';
import { ChartRadarDots } from '../../../components/charts/radarchart';
import { RelatoriosClientesLayoutProps } from '../types';

export function RelatoriosClientesLayout({
  selectedPeriod,
  onPeriodChange,
  onReportTypeChange,
  onExport,
  loading,
  error,
  clientes,
  columns,
  categorias,
  statusOptions,
  estatisticasClientes,
  cardValues,
  cardPercentages,
  mostrarAnimacoes,
  carregamentoCompleto,
  alturasAnimadas
}: RelatoriosClientesLayoutProps) {
  // Opções do dropdown de período
  const periodOptions: DropdownOption[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  // Opções para o componente Radio (tipos de relatório)
  const reportTypeOptions = [
    { id: 'geral', label: 'Geral' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'produtos', label: 'Produtos' }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* CSS para animações de água */}
        <style>
          {`
            @keyframes ondulacaoSuperficie {
              0%, 100% {
                clip-path: polygon(0 0, 5% 0px, 10% 1px, 15% 0px, 20% 1.5px, 25% 1px, 30% 0px, 35% 1px, 40% 0px, 45% 1.5px, 50% 1px, 55% 0px, 60% 1px, 65% 0px, 70% 1.5px, 75% 1px, 80% 0px, 85% 1px, 90% 0px, 95% 1px, 100% 0px, 100% 100%, 0% 100%);
              }
              25% {
                clip-path: polygon(0 0, 5% 2px, 10% 1px, 15% 2.5px, 20% 1px, 25% 2px, 30% 1px, 35% 2.5px, 40% 1px, 45% 2px, 50% 1px, 55% 2.5px, 60% 1px, 65% 2px, 70% 1px, 75% 2.5px, 80% 1px, 85% 2px, 90% 1px, 95% 2.5px, 100% 1px, 100% 100%, 0% 100%);
              }
              50% {
                clip-path: polygon(0 0, 5% -1px, 10% 0px, 15% -1.5px, 20% 0px, 25% -1px, 30% 0px, 35% -1.5px, 40% 0px, 45% -1px, 50% 0px, 55% -1.5px, 60% 0px, 65% -1px, 70% 0px, 75% -1.5px, 80% 0px, 85% -1px, 90% 0px, 95% -1.5px, 100% 0px, 100% 100%, 0% 100%);
              }
              75% {
                clip-path: polygon(0 0, 5% 1px, 10% 2px, 15% 1px, 20% 2.5px, 25% 1px, 30% 2px, 35% 1px, 40% 2.5px, 45% 1px, 50% 2px, 55% 1px, 60% 2.5px, 65% 1px, 70% 2px, 75% 1px, 80% 2.5px, 85% 1px, 90% 2px, 95% 1px, 100% 1.5px, 100% 100%, 0% 100%);
              }
            }
            
            @keyframes bolhaSubindo1 {
              0% {
                transform: translateY(100%) scale(0.3);
                opacity: 0;
              }
              10% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-20px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo2 {
              0% {
                transform: translateY(100%) scale(0.4);
                opacity: 0;
              }
              15% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-25px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo3 {
              0% {
                transform: translateY(100%) scale(0.5);
                opacity: 0;
              }
              20% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-30px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo4 {
              0% {
                transform: translateY(100%) scale(0.35);
                opacity: 0;
              }
              12% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-22px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo5 {
              0% {
                transform: translateY(100%) scale(0.4);
                opacity: 0;
              }
              18% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-28px) scale(0.1);
                opacity: 0;
              }
            }
            
            @keyframes bolhaSubindo6 {
              0% {
                transform: translateY(100%) scale(0.3);
                opacity: 0;
              }
              14% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-24px) scale(0.1);
                opacity: 0;
              }
            }
          `}
        </style>

        {/* Cabeçalho da página */}
        <PageHeader
          title=""
          subtitle=""
          leftContent={
            <div className="flex items-center gap-2">
              <NavigationToggle
                options={reportTypeOptions}
                name="reportType"
                defaultValue="clientes"
                onChange={onReportTypeChange}
                size="small"
                color="#8b5cf6"
                backgroundColor="#f3f4f6"
              />
            </div>
          }
          rightContent={
            <div className="flex items-center gap-4">
              {/* Filtro de período */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Período:</label>
                <CustomDropdown
                  options={periodOptions}
                  selectedValue={selectedPeriod}
                  onValueChange={onPeriodChange}
                  size="sm"
                  className="min-w-[140px]"
                />
              </div>
              
              {/* Botões de exportação */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onExport}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Excel
                </button>
                <button
                  onClick={onExport}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF
                </button>
              </div>
            </div>
          }
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Content */}
        <div className="px-6 pt-2 pb-12" style={{ padding: '24px 24px 50px 24px' }}>
          {/* Container de Estatísticas de Clientes */}
          <EstatisticasCustom
            estatisticas={[
              {
                label: 'Total de Clientes',
                valor: estatisticasClientes.totalClientes,
                icon: UsersIcon,
                iconColor: '#6b7280'
              },
              {
                label: 'Novos Clientes',
                valor: estatisticasClientes.novosClientes,
                icon: NewCustomerIcon,
                iconColor: '#6b7280'
              },
              {
                label: 'Clientes Ativos',
                valor: estatisticasClientes.clientesAtivos,
                icon: CompletedOrderIcon,
                iconColor: '#6b7280'
              },
              {
                label: 'Taxa de Retenção',
                valor: `${estatisticasClientes.taxaRetencao.toFixed(1)}%`,
                icon: RevenueIcon,
                iconColor: '#6b7280'
              }
            ]}
          />
          
          {/* Margem de 24px abaixo das estatísticas */}
          <div className="mb-6"></div>
          
          {/* Gráfico Radial de Clientes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartRadialShape />
            <ChartRadarDots />
          </div>

          {/* Tabela de Clientes */}
          <DataTable
            data={clientes}
            columns={columns}
            searchPlaceholder="Buscar clientes..."
            searchFields={['nome', 'telefone', 'endereco']}
            filters={{
              categories: categorias,
              statuses: statusOptions,
              showDateRange: true
            }}
            actions={{
              onView: (cliente) => console.log('Visualizar:', cliente)
            }}
            pagination={{
              itemsPerPageOptions: [5, 8, 10, 15, 20],
              defaultItemsPerPage: 8
            }}
            onAdd={() => console.log('Adicionar novo cliente')}
            addButtonText="Novo Cliente"
          />
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
