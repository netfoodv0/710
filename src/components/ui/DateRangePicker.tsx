import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek, parseISO, subDays, startOfWeek as startOfWeekFn, endOfWeek as endOfWeekFn, subWeeks, subMonths as subMonthsFn } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
  placeholder?: string;
  startTime?: string;
  endTime?: string;
  onStartTimeChange?: (time: string) => void;
  onEndTimeChange?: (time: string) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = '',
  placeholder = 'Selecione o período',
  startTime = '00:00',
  endTime = '23:59',
  onStartTimeChange,
  onEndTimeChange
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [view, setView] = useState<'range' | 'start' | 'end'>('range');
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('left');
  
  // Estados temporários para não aplicar filtro até confirmar
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [tempStartTime, setTempStartTime] = useState(startTime);
  const [tempEndTime, setTempEndTime] = useState(endTime);

  // Fechar quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setView('range');
        setHoveredDate(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sincronizar estados temporários quando props mudarem
  useEffect(() => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setTempStartTime(startTime);
    setTempEndTime(endTime);
  }, [startDate, endDate, startTime, endTime]);

  // Navegar para o mês da data selecionada quando abrir
  useEffect(() => {
    if (isOpen && tempStartDate) {
      setCurrentMonth(parseDate(tempStartDate));
    }
  }, [isOpen, tempStartDate]);

  // Calcular posição do dropdown para não cortar
  useEffect(() => {
    const calculatePosition = () => {
      if (isOpen && containerRef.current && dropdownRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const dropdownWidth = 800; // min-w-[800px]
        const viewportWidth = window.innerWidth;
        
        // Se não couber à direita, posiciona à esquerda
        if (containerRect.left + dropdownWidth > viewportWidth - 20) {
          setDropdownPosition('right');
        } else {
          setDropdownPosition('left');
        }
      }
    };

    calculatePosition();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [isOpen]);

  // Função para converter string de data para Date sem problemas de fuso horário
  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // month - 1 porque Date usa 0-11 para meses
  };

  // Função para converter Date para string de data no formato YYYY-MM-DD
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque Date usa 0-11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Função para aplicar atalhos de data
  const applyShortcut = (shortcut: string) => {
    const today = new Date();
    let start: Date;
    let end: Date;

    switch (shortcut) {
      case 'ontem':
        start = subDays(today, 1);
        end = subDays(today, 1);
        break;
      case 'hoje':
        start = today;
        end = today;
        break;
      case 'ultimos7dias':
        start = subDays(today, 6);
        end = today;
        break;
      case 'ultimos30dias':
        start = subDays(today, 29);
        end = today;
        break;
      case 'ultimos90dias':
        start = subDays(today, 89);
        end = today;
        break;
      case 'semanaPassada':
        start = startOfWeekFn(subWeeks(today, 1));
        end = endOfWeekFn(subWeeks(today, 1));
        break;
      case 'essaSemana':
        start = startOfWeekFn(today);
        end = endOfWeekFn(today);
        break;
      case 'mesPassado':
        start = startOfMonth(subMonthsFn(today, 1));
        end = endOfMonth(subMonthsFn(today, 1));
        break;
      case 'esseMes':
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      case 'ultimos3meses':
        start = startOfMonth(subMonthsFn(today, 3));
        end = endOfMonth(today);
        break;
      case 'ultimos4meses':
        start = startOfMonth(subMonthsFn(today, 4));
        end = endOfMonth(today);
        break;
      default:
        return;
    }

         setTempStartDate(formatDateToString(start));
     setTempEndDate(formatDateToString(start));
     setView('range');
     setIsOpen(false);
     setHoveredDate(null);
  };

     const handleDateClick = (date: Date) => {
     const dateString = formatDateToString(date);
     
     if (view === 'start') {
       setTempStartDate(dateString);
       setView('end');
     } else if (view === 'end') {
       if (new Date(dateString) >= new Date(tempStartDate)) {
         setTempEndDate(dateString);
         setView('range');
         setHoveredDate(null);
       }
     } else {
       // Modo range - selecionar data inicial
       setTempStartDate(dateString);
       setView('end');
     }
   };

  const handleInputClick = () => {
    setView('start');
    setIsOpen(true);
  };

     const clearDates = () => {
     setTempStartDate('');
     setTempEndDate('');
     setHoveredDate(null);
   };

  const getDaysInMonth = (month: Date) => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  };

     // Função para verificar se uma data está no período hover
   const isInHoverRange = (date: Date) => {
     if (!hoveredDate || !tempStartDate || view !== 'end') return false;
     
     const startDateObj = parseDate(tempStartDate);
     const hoverDateObj = hoveredDate;
     
     // Se a data hover for anterior à data inicial, inverte a ordem
     if (hoverDateObj < startDateObj) {
       return date >= hoverDateObj && date <= startDateObj;
     } else {
       return date >= startDateObj && date <= hoverDateObj;
     }
   };

   const isInRange = (date: Date) => {
     if (!tempStartDate || !tempEndDate) return false;
     const startDateObj = parseDate(tempStartDate);
     const endDateObj = parseDate(tempEndDate);
     return date >= startDateObj && date <= endDateObj;
   };

   const isStartDate = (date: Date) => {
     return tempStartDate && isSameDay(date, parseDate(tempStartDate));
   };

   const isEndDate = (date: Date) => {
     return tempEndDate && isSameDay(date, parseDate(tempEndDate));
   };

  const getDateClasses = (date: Date) => {
    const baseClasses = "w-8 h-8 flex items-center justify-center text-sm rounded-md cursor-pointer transition-colors";
    
    if (isStartDate(date)) {
      return `${baseClasses} bg-purple-600 text-white hover:bg-purple-700`;
    }
    
    if (isEndDate(date)) {
      return `${baseClasses} bg-purple-600 text-white hover:bg-purple-700`;
    }
    
    // Efeito de hover para pré-seleção
    if (isInHoverRange(date)) {
      return `${baseClasses} bg-purple-200 text-purple-900 hover:bg-purple-300`;
    }
    
    if (isInRange(date)) {
      return `${baseClasses} bg-purple-100 text-purple-900 hover:bg-purple-200`;
    }
    
    if (isToday(date)) {
      return `${baseClasses} bg-gray-100 text-gray-900 hover:bg-gray-200`;
    }
    
    if (isSameMonth(date, currentMonth) || isSameMonth(date, addMonths(currentMonth, 1))) {
      return `${baseClasses} text-gray-900 hover:bg-gray-100`;
    }
    
    return `${baseClasses} text-gray-400 cursor-default`;
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = parseDate(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

     const getDisplayText = () => {
     if (tempStartDate && tempEndDate) {
       return `${formatDisplayDate(tempStartDate)} - ${formatDisplayDate(tempEndDate)}`;
     } else if (tempStartDate) {
       return `${formatDisplayDate(tempStartDate)} - Selecione data final`;
     } else {
       return 'Selecione o período';
     }
   };

  // Lista de atalhos disponíveis
  const shortcuts = [
    { key: 'ontem', label: 'Ontem' },
    { key: 'hoje', label: 'Hoje' },
    { key: 'ultimos7dias', label: 'Últimos 7 dias' },
    { key: 'ultimos30dias', label: 'Últimos 30 dias' },
    { key: 'ultimos90dias', label: 'Últimos 90 dias' },
    { key: 'semanaPassada', label: 'Semana passada' },
    { key: 'essaSemana', label: 'Essa semana' },
    { key: 'mesPassado', label: 'Mês passado' },
    { key: 'esseMes', label: 'Esse mês' },
    { key: 'ultimos3meses', label: 'Últimos 3 meses' }
  ];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Input único com datas juntas */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={getDisplayText()}
          onClick={handleInputClick}
          readOnly
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white cursor-pointer"
        />
        
                 {(tempStartDate || tempEndDate) && (
           <button
             onClick={clearDates}
             className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
             title="Limpar datas"
           >
             <X className="w-4 h-4" />
           </button>
         )}
      </div>

             {/* Calendário dropdown com 2 meses */}
       {isOpen && (
                  <div 
                    ref={dropdownRef}
                    className={`absolute top-full mt-2 bg-gradient-to-b from-white to-[#f5eff2] border border-gray-200 rounded-lg shadow-2xl z-50 min-w-[800px] ${
                      dropdownPosition === 'left' ? 'left-0' : 'right-0'
                    }`}
                  >
          {/* Header do calendário */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
                         <div className="text-center">
               <div className="text-sm font-medium text-gray-900">
                 {format(currentMonth, 'MMMM yyyy', { locale: ptBR })} - {format(addMonths(currentMonth, 1), 'MMMM yyyy', { locale: ptBR })}
               </div>
             </div>
            
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Conteúdo principal: atalhos + calendário */}
          <div className="flex">
            {/* Coluna da esquerda - Atalhos */}
                         <div className="w-48 border-r border-gray-200 p-4">
              
                             <div className="space-y-0">
                 {shortcuts.map((shortcut) => (
                   <button
                     key={shortcut.key}
                     onClick={() => applyShortcut(shortcut.key)}
                     className="w-full text-left px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                   >
                     {shortcut.label}
                   </button>
                 ))}
               </div>
            </div>

            {/* Coluna da direita - Calendário */}
            <div className="flex-1 p-4">
              {/* Grid com 2 meses lado a lado */}
              <div className="flex gap-4">
                {/* Primeiro mês */}
                <div className="flex-1">
                  <div className="text-center mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                    </div>
                  </div>
                  
                  {/* Dias da semana */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                      <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Dias do primeiro mês */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((date, index) => (
                      <button
                        key={`month1-${index}`}
                        onClick={() => handleDateClick(date)}
                        onMouseEnter={() => setHoveredDate(date)}
                        onMouseLeave={() => setHoveredDate(null)}
                        className={getDateClasses(date)}
                        disabled={!isSameMonth(date, currentMonth)}
                      >
                        {format(date, 'd')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Segundo mês */}
                <div className="flex-1">
                  <div className="text-center mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      {format(addMonths(currentMonth, 1), 'MMMM yyyy', { locale: ptBR })}
                    </div>
                  </div>
                  
                  {/* Dias da semana */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                      <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Dias do segundo mês */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(addMonths(currentMonth, 1)).map((date, index) => (
                      <button
                        key={`month2-${index}`}
                        onClick={() => handleDateClick(date)}
                        onMouseEnter={() => setHoveredDate(date)}
                        onMouseLeave={() => setHoveredDate(null)}
                        className={getDateClasses(date)}
                        disabled={!isSameMonth(date, addMonths(currentMonth, 1))}
                      >
                        {format(date, 'd')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

                                {/* Footer com ações */}
            <div className="p-4 border-t border-gray-200">
              {/* Ações */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                                     <div className="text-sm text-gray-600">
                     {tempStartDate && tempEndDate ? (
                       <span>
                         {formatDisplayDate(tempStartDate)} - {formatDisplayDate(tempEndDate)}
                       </span>
                     ) : (
                       <span>Selecione um período</span>
                     )}
                   </div>
                  
                  {/* Seleção de horário na mesma linha */}
                                     <div className="flex items-center gap-2">
                     <label className="text-sm font-medium text-gray-700">Início:</label>
                     <input
                       type="time"
                       value={tempStartTime}
                       onChange={(e) => setTempStartTime(e.target.value)}
                       className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
                     />
                   </div>
                   <div className="flex items-center gap-2">
                     <label className="text-sm font-medium text-gray-700">Fim:</label>
                     <input
                       type="time"
                       value={tempEndTime}
                       onChange={(e) => setTempEndTime(e.target.value)}
                       className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 outline-none"
                     />
                   </div>
                </div>
                
                                 <div className="flex gap-2">
                   <button
                     onClick={() => {
                       // Resetar para os valores originais
                       setTempStartDate(startDate);
                       setTempEndDate(endDate);
                       setTempStartTime(startTime);
                       setTempEndTime(endTime);
                       setIsOpen(false);
                       setView('range');
                       setHoveredDate(null);
                     }}
                     className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                   >
                     Cancelar
                   </button>
                   
                   <button
                     onClick={() => {
                       // Aplicar as mudanças apenas quando confirmar
                       onStartDateChange(tempStartDate);
                       onEndDateChange(tempEndDate);
                       onStartTimeChange?.(tempStartTime);
                       onEndTimeChange?.(tempEndTime);
                       setIsOpen(false);
                       setView('range');
                       setHoveredDate(null);
                     }}
                     className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                   >
                     Confirmar
                   </button>
                 </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}
