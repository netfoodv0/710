import React from 'react';

interface TimezoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  t: (key: string) => string;
}

const TIMEZONES = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (Brasília)' },
  { value: 'America/Manaus', label: 'Manaus (Amazonas)' },
  { value: 'America/Cuiaba', label: 'Cuiabá (Mato Grosso)' },
  { value: 'America/Campo_Grande', label: 'Campo Grande (Mato Grosso do Sul)' },
  { value: 'America/Porto_Velho', label: 'Porto Velho (Rondônia)' },
  { value: 'America/Rio_Branco', label: 'Rio Branco (Acre)' },
  { value: 'America/Boa_Vista', label: 'Boa Vista (Roraima)' },
  { value: 'America/Noronha', label: 'Fernando de Noronha' }
];

export function TimezoneSelector({ value, onChange, t }: TimezoneSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {t('timezone')}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {TIMEZONES.map((timezone) => (
          <option key={timezone.value} value={timezone.value}>
            {timezone.label}
          </option>
        ))}
      </select>
    </div>
  );
}
