import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

export type PeriodType = 'weekly' | 'monthly';

interface PeriodFilterProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  className?: string;
}

export function PeriodFilter({ selectedPeriod, onPeriodChange, className = '' }: PeriodFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const periods = [
    { value: 'weekly' as PeriodType, label: 'Semanal' },
    { value: 'monthly' as PeriodType, label: 'Mensal' }
  ];

  const selectedPeriodData = periods.find(p => p.value === selectedPeriod);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className}`}
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span>{selectedPeriodData?.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => {
                  onPeriodChange(period.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 