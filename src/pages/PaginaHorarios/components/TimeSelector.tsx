import React from 'react';

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(
        <option key={timeString} value={timeString}>
          {timeString}
        </option>
      );
    }
  }
  return options;
};

export function TimeSelector({ value, onChange }: TimeSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-20"
    >
      {generateTimeOptions()}
    </select>
  );
}
