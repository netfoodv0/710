import React from 'react';
import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { PageHeader, CustomDropdown, DropdownOption } from '../../components/ui';
import { ReportNavigation } from '../../components/ui/ReportNavigation';

interface HeaderRelatorioProdutosProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
}

export const HeaderRelatorioProdutos: React.FC<HeaderRelatorioProdutosProps> = ({
  selectedPeriod,
  onPeriodChange,
  onExport,
  loading
}) => {
  const periodOptions: DropdownOption[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  return (
    <PageHeader
      title="Relatório de Produtos"
      subtitle="Análise completa do desempenho e estatísticas dos produtos do cardápio"
      leftContent={
        <ReportNavigation currentPage="produtos" />
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Excel
            </button>
            <button
              onClick={onExport}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
  );
};
