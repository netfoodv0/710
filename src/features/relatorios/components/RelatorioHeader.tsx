import React from 'react';
import { Download, Loader2, FileDown, Plus, ArrowLeft, CheckCircle, Clock, XCircle, AlertTriangle, RefreshCw, Printer } from 'lucide-react';
import { SaveIcon } from '../../../components/ui';
import { PeriodFilter, PeriodType } from '../../../components/filters/FiltroPeriodo';
import { CustomDropdown, DropdownOption } from '../../../components/ui/CustomDropdown';

interface RelatorioHeaderProps {
  title?: string;
  subtitle?: string;
  selectedPeriod?: PeriodType;
  onPeriodChange?: (period: PeriodType) => void;
  onExportExcel?: () => void;
  onExportPDF?: () => void;
  loading?: boolean;
  showNewOrderButton?: boolean;
  onNewOrder?: () => void;
  showTabNavigation?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
  showStatusSelect?: boolean;
  selectedStatus?: 'ativo' | 'inativo' | 'em_falta';
  onStatusChange?: (status: 'ativo' | 'inativo' | 'em_falta') => void;
  // Novas props para botões de ação
  showActionButtons?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  isSubmitting?: boolean;
}



export const RelatorioHeader: React.FC<RelatorioHeaderProps> = ({
  title = 'Relatórios',
  subtitle = 'Análise completa do desempenho do restaurante',
  selectedPeriod,
  onPeriodChange,
  onExportExcel,
  onExportPDF,
  loading = false,
  showNewOrderButton = false,
  onNewOrder,
  showTabNavigation = false,
  activeTab = '',
  onTabChange,
  showBackButton = false,
  onBack,
  showStatusSelect = false,
  selectedStatus = 'ativo',
  onStatusChange,
  // Novas props para botões de ação
  showActionButtons = false,
  onCancel,
  onSave,
  isSubmitting = false,
}) => {
  // O header será fixo apenas na área do conteúdo, não sobre o sidebar
  // O layout principal já tem display flex, então usamos w-full e deixamos o header dentro do fluxo do conteúdo
  return (
    <div
              className="fixed top-0 left-[243px] z-20 w-[calc(100%-243px)] bg-white border-b border-gray-200 px-6 py-3 mb-4 transition-all duration-300"
      style={{ height: '73px' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          <div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {showTabNavigation && onTabChange && (
            <div className="flex gap-2">
              <button 
                onClick={() => onTabChange('produtos')}
                className={`flex items-center gap-2 px-4 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'produtos'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="hidden sm:inline">Produtos</span>
                <span className="sm:hidden">Prod.</span>
              </button>
            </div>
          )}
          
          {showStatusSelect && onStatusChange ? (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <CustomDropdown
                options={statusOptions}
                selectedValue={selectedStatus}
                onValueChange={onStatusChange}
                size="sm"
                placeholder="Selecione o status"
                className="min-w-[140px]"
              />
            </div>
          ) : (
            selectedPeriod && onPeriodChange && (
              <PeriodFilter
                selectedPeriod={selectedPeriod}
                onPeriodChange={onPeriodChange}
              />
            )
          )}
          {showNewOrderButton && onNewOrder && (
            <button
              onClick={onNewOrder}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Novo Pedido
            </button>
          )}

          {/* Botões de Ação */}
          {showActionButtons && onCancel && onSave && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting || loading}
                className="px-6 h-10 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={isSubmitting || loading}
                className="px-8 h-10 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting || loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <SaveIcon size={24} color="#ffffff" />
                    Salvar Produto
                  </>
                )}
              </button>
            </div>
          )}

          {onExportExcel && (
            <button
              onClick={onExportExcel}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Exportar Excel
            </button>
          )}
          {onExportPDF && (
            <button
              onClick={onExportPDF}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              Baixar PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const statusOptions: DropdownOption[] = [
  { value: 'ativo', label: 'Ativo', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
  { value: 'inativo', label: 'Inativo', icon: <XCircle className="w-4 h-4 text-gray-500" /> },
  { value: 'em_falta', label: 'Em Falta', icon: <AlertTriangle className="w-4 h-4 text-orange-500" /> },
];
