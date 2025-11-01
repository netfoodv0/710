import React from 'react';
import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { FixedPageHeader, CustomDropdown, DropdownOption, ActionButton } from '../../components/ui';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderRelatoriosCompartilhadoProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
}

export const HeaderRelatoriosCompartilhado: React.FC<HeaderRelatoriosCompartilhadoProps> = ({
  selectedPeriod,
  onPeriodChange,
  onExport,
  loading
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determinar qual opção está ativa baseado na rota atual
  const getActiveReportType = () => {
    if (location.pathname.includes('/produtos')) return 'produtos';
    return 'geral';
  };

  const reportType = getActiveReportType();
  
  const periodOptions: DropdownOption[] = [
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  const handleReportTypeChange = (reportType: string) => {
    switch (reportType) {
      case 'geral':
        navigate('/relatorios/geral');
        break;
      case 'produtos':
        navigate('/relatorios/produtos');
        break;
      default:
        navigate('/relatorios/geral');
    }
  };

  // Conteúdo à direita com exportação
  const rightContent = (
    <div className="flex items-center gap-4">
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
  );

  // Conteúdo dos botões de navegação à direita
  const navigationButtons = (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleReportTypeChange('geral')}
        className={`px-3 text-sm rounded transition-colors text-gray-700 hover:bg-gray-100 ${reportType === 'geral' ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}`}
        style={{ 
          borderRadius: '100px', 
          backgroundColor: reportType === 'geral' ? undefined : '#f5f5f5',
          border: reportType === 'geral' ? '1px solid rgb(139, 92, 246)' : '1px solid rgb(209, 213, 219)',
          height: '32px'
        }}
      >
        Geral
      </button>
      <button
        onClick={() => handleReportTypeChange('produtos')}
        className={`px-3 text-sm rounded transition-colors text-gray-700 hover:bg-gray-100 ${reportType === 'produtos' ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}`}
        style={{ 
          borderRadius: '100px', 
          backgroundColor: reportType === 'produtos' ? undefined : '#f5f5f5',
          border: reportType === 'produtos' ? '1px solid rgb(139, 92, 246)' : '1px solid rgb(209, 213, 219)',
          height: '32px'
        }}
      >
        Produtos
      </button>
    </div>
  );

  const titleMap: Record<string, string> = {
    geral: 'Relatórios Gerais',
    produtos: 'Relatórios de Produtos'
  };

  return (
    <>
      <FixedPageHeader
        title={titleMap[reportType] || 'Relatórios'}
        rightContent={
          <div className="flex items-center gap-4">
            {navigationButtons}
            {rightContent}
          </div>
        }
      />
      {/* Espaço para não sobrepor o conteúdo */}
      <div className="h-[50px]" />
    </>
  );
};
