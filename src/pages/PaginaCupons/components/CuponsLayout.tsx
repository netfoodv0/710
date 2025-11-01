
import React from 'react';
import { HeaderRelatorioCupons } from '../../../components/relatorios';
import { CuponsStats } from './CuponsStats';
import { CuponsChart } from './CuponsChart';
import { CuponsTable } from './CuponsTable';
import { CuponsLoading } from './CuponsLoading';
import { CuponsError } from './CuponsError';
import { CuponsLayoutProps } from '../types';

export function CuponsLayout({ 
  data, 
  onPeriodChange, 
  onExport, 
  onView, 
  onEdit, 
  onDelete, 
  onAdd, 
  loading = false,
  categoriasFiltros,
  statusOptions,
  tipoOptions,
  columns,
  carregamentoCompleto,
  mostrarAnimacoes,
  alturasAnimadas
}: CuponsLayoutProps & {
  categoriasFiltros: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  tipoOptions: Array<{ value: string; label: string }>;
  columns: any[];
  carregamentoCompleto: boolean;
  mostrarAnimacoes: boolean;
  alturasAnimadas: number[];
}) {
  const { 
    cupons, 
    estatisticas, 
    categorias, 
    cardPercentages, 
    selectedPeriod, 
    error,
    loading: dataLoading
  } = data;

  return (
    <div className="min-h-screen">
      {/* Cabeçalho da página */}
      <HeaderRelatorioCupons
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        onExport={onExport}
        loading={loading}
      />

      {/* Content */}
      <div className="px-4 sm:px-6 pb-12 cupons-content-container" style={{ paddingTop: '16px' }}>
        {/* Loading state apenas para operações específicas */}
        {loading && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Processando...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && <CuponsError error={error} />}

        {/* Conteúdo principal com loading */}
        {dataLoading ? (
          <CuponsLoading />
        ) : (
          <>
            {/* Container de Estatísticas de Cupons */}
            {estatisticas && estatisticas.length > 0 && (
              <CuponsStats 
                estatisticas={estatisticas}
                carregamentoCompleto={carregamentoCompleto}
                mostrarAnimacoes={mostrarAnimacoes}
                alturasAnimadas={alturasAnimadas}
              />
            )}

            {/* Distribuição por Categoria */}
            {categorias && categorias.length > 0 && cardPercentages && cardPercentages.length > 0 && (
              <CuponsChart 
                categorias={categorias}
                percentuais={cardPercentages.map(card => card.percentual)}
                alturasAnimadas={alturasAnimadas}
                mostrarAnimacoes={mostrarAnimacoes}
              />
            )}

            {/* Tabela de Cupons - sempre visível */}
            {columns && columns.length > 0 && (
              <CuponsTable 
                cupons={cupons || []}
                columns={columns}
                categoriasFiltros={categoriasFiltros}
                statusOptions={statusOptions}
                tipoOptions={tipoOptions}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onAdd={onAdd}
              />
            )}
          </>
        )}
        
        {/* Margem inferior da página */}
        <div className="h-25"></div>
      </div>
    </div>
  );
}
