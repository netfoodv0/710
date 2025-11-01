import React from 'react';
import { Calendar } from 'lucide-react';
import { CustomDropdown, DropdownOption } from '../ui/CustomDropdown';

export type PeriodType = 'weekly' | 'monthly';

interface PeriodFilterProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  className?: string;
}

export function PeriodFilter({ selectedPeriod, onPeriodChange, className = '' }: PeriodFilterProps) {
  const periods: DropdownOption[] = [
    { value: 'monthly', label: 'Mensal' }
  ];

  return (
    <CustomDropdown
      options={periods}
      selectedValue={selectedPeriod}
      onValueChange={(value) => onPeriodChange(value as PeriodType)}
      triggerIcon={<Calendar className="w-4 h-4 text-gray-500" />}
      className={className}
    />
  );
}
