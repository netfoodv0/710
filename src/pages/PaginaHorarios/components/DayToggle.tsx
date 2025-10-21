import React from 'react';

interface DayToggleProps {
  isActive: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}

export function DayToggle({ isActive, onToggle, t }: DayToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#8217d5] focus:ring-offset-2 ${
        isActive ? 'bg-[#8217d5]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      <span className="sr-only">{isActive ? t('open') : t('closed')}</span>
    </button>
  );
}
