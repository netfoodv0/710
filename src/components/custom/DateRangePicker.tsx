import React, { useState } from 'react';

interface DateRange {
  start: string;
  end: string;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  label?: string;
  className?: string;
}

export default function DateRangePicker({ 
  value, 
  onChange, 
  label, 
  className = "" 
}: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange>(
    value || { start: '', end: '' }
  );

  const handleDateChange = (field: 'start' | 'end', date: string) => {
    const newRange = { ...dateRange, [field]: date };
    setDateRange(newRange);
    onChange?.(newRange);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">
            Data inicial
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">
            Data final
          </label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
            min={dateRange.start}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
