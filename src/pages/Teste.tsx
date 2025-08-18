import React, { useEffect, useRef } from 'react';

const Teste: React.FC = () => {
  const dateRangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Verificar se o jQuery e daterangepicker estão disponíveis
    if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.daterangepicker) {
      const $ = (window as any).jQuery;
      
      if (dateRangeRef.current) {
        $(dateRangeRef.current).daterangepicker({
          timePicker: true,
          timePicker24Hour: false,
          timePickerIncrement: 30,
          locale: {
            format: 'DD/MM/YYYY HH:mm',
            separator: ' - ',
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            fromLabel: 'De',
            toLabel: 'Até',
            customRangeLabel: 'Personalizado',
            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            firstDay: 1
          },
          ranges: {
            'Hoje': [(window as any).moment(), (window as any).moment()],
            'Ontem': [(window as any).moment().subtract(1, 'days'), (window as any).moment().subtract(1, 'days')],
            'Últimos 7 dias': [(window as any).moment().subtract(6, 'days'), (window as any).moment()],
            'Últimos 30 dias': [(window as any).moment().subtract(29, 'days'), (window as any).moment()],
            'Este mês': [(window as any).moment().startOf('month'), (window as any).moment().endOf('month')],
            'Mês passado': [(window as any).moment().subtract(1, 'month').startOf('month'), (window as any).moment().subtract(1, 'month').endOf('month')]
          },
          startDate: (window as any).moment().subtract(7, 'days'),
          endDate: (window as any).moment(),
          autoApply: false,
          showDropdowns: true,
          showWeekNumbers: false,
          alwaysShowCalendars: true,
          opens: 'left',
          drops: 'down',
          showCustomRangeLabel: true,
          linkedCalendars: false,
          parentEl: 'body',
          buttonClasses: 'btn btn-sm',
          applyClass: 'btn-success',
          cancelClass: 'btn-default'
        }, function(start: any, end: any, label: string) {
          console.log('Período selecionado:', start.format('DD/MM/YYYY HH:mm'), 'até', end.format('DD/MM/YYYY HH:mm'));
          console.log('Rótulo:', label);
        });
      }
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Página de Teste
        </h1>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Esta é uma página em branco para testes e desenvolvimento.
          </p>
          
          {/* Caixa de Data com DateRangePicker */}
          <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Seletor de Período com DateRangePicker
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione o período
                </label>
                <input
                  ref={dateRangeRef}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  placeholder="Clique para selecionar período"
                  readOnly
                />
              </div>
              
              <div className="text-sm text-gray-500">
                <p>• Clique no campo acima para abrir o seletor de período</p>
                <p>• Inclui seleção de data e horário</p>
                <p>• Períodos pré-definidos disponíveis</p>
                <p>• Formato brasileiro (DD/MM/YYYY HH:mm)</p>
              </div>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">
              Área de teste - Adicione seu conteúdo aqui
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teste;
