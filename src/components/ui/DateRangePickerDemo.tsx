import React, { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';

export function DateRangePickerDemo() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        DateRangePicker Customizado - Versão 2.0
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Exemplo de uso no DataTable
          </h3>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            className="w-full max-w-md"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Valores selecionados:
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Data inicial: {startDate || 'Não selecionada'}</div>
            <div>Data final: {endDate || 'Não selecionada'}</div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-700 mb-2">
            Novas características da versão 2.0:
          </h4>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• <strong>Input único:</strong> Ambas as datas em um só campo</li>
            <li>• <strong>Calendário duplo:</strong> Mostra 2 meses lado a lado</li>
            <li>• <strong>Interface compacta:</strong> Ocupa menos espaço na tela</li>
            <li>• <strong>Navegação melhorada:</strong> Navega por 2 meses de cada vez</li>
            <li>• <strong>Visual mais limpo:</strong> Design minimalista e elegante</li>
            <li>• <strong>Responsivo:</strong> Funciona perfeitamente em mobile e desktop</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-700 mb-2">
            Como usar no DataTable:
          </h4>
          <pre className="text-xs text-green-600 bg-green-100 p-3 rounded overflow-x-auto">
{`// No DataTable, use o DateRangePicker atualizado:
{filters.showDateRange && (
  <div className="w-full lg:w-80">
    <DateRangePicker
      startDate={dateInicio}
      endDate={dateFim}
      onStartDateChange={setDateInicio}
      onEndDateChange={setDateFim}
      className="w-full"
    />
  </div>
)}

// O componente agora:
// - Mostra ambas as datas em um único input
// - Exibe 2 meses no calendário dropdown
// - Mantém a mesma interface de dados
// - Oferece experiência visual muito melhor`}
          </pre>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-700 mb-2">
            Vantagens da nova implementação:
          </h4>
          <ul className="text-sm text-purple-600 space-y-1">
            <li>• <strong>Economia de espaço:</strong> Um input em vez de dois</li>
            <li>• <strong>Melhor UX:</strong> Usuário vê o período completo de uma vez</li>
            <li>• <strong>Navegação eficiente:</strong> 2 meses visíveis simultaneamente</li>
            <li>• <strong>Design consistente:</strong> Mantém o tema do projeto</li>
            <li>• <strong>Fácil manutenção:</strong> Código mais limpo e organizado</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
