import React from 'react';
import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { PageHeader, CustomDropdown, DropdownOption, ActionButton } from '../../components/ui';
import NavigationToggle from '../ui/NavigationToggle';
import { useNavigate } from 'react-router-dom';
// ReportNavigation removido

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
  const navigate = useNavigate();
  const [selectedReportType, setSelectedReportType] = React.useState<string>('produtos');
  
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

  const handleReportTypeChange = React.useCallback((reportType: string) => {
    setSelectedReportType(reportType);
    
    // Navegar para a página correspondente
    switch (reportType) {
      case 'geral':
        navigate('/relatorios/geral');
        break;
      case 'clientes':
        navigate('/relatorios/clientes');
        break;
      case 'produtos':
        navigate('/relatorios/produtos');
        break;
      default:
        navigate('/relatorios/geral');
    }
  }, [navigate]);

  return (
    <PageHeader
      title=""
      subtitle=""
      leftContent={
        <div className="flex items-center gap-2">
          <NavigationToggle
            options={reportTypeOptions}
            name="reportType"
            defaultValue={selectedReportType}
            onChange={handleReportTypeChange}
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
            <ActionButton
              label="Excel"
              onClick={onExport}
              disabled={loading}
              variant="success"
              size="md"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <ActionButton
              label="PDF"
              onClick={onExport}
              disabled={loading}
              variant="danger"
              size="md"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
          </div>
        </div>
      }
    />
  );
};
