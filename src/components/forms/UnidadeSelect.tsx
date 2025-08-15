import React from 'react';
import { CustomDropdown, DropdownOption } from '../ui/CustomDropdown';

interface UnidadeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const unidades: DropdownOption[] = [
  { value: 'ml', label: 'ml' },
  { value: 'l', label: 'l' },
  { value: 'g', label: 'g' },
  { value: 'kg', label: 'kg' },
  { value: 'un', label: 'un' },
  { value: 'cm', label: 'cm' }
];

export function UnidadeSelect({ value, onChange, className = '' }: UnidadeSelectProps) {
  return (
    <div className={className}>
      <CustomDropdown
        options={unidades}
        selectedValue={value}
        onValueChange={onChange}
        placeholder="Selecione"
        size="sm"
        className="rounded-md"
      />
    </div>
  );
}

