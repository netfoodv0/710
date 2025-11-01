import React from 'react';

interface AccessIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function AccessIcon({ size = 24, color = "#6b7280", className = "" }: AccessIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 -960 960 960" 
      width={`${size}px`} 
      className={`w-6 h-6 ${className}`}
      style={{ fill: color }}
    >
      <path d="M320-280 80-520l240-240 57 56-184 184 184 184-57 56Zm480 80v-160q0-50-35-85t-85-35H433l144 144-57 56-240-240 240-240 57 56-144 144h247q83 0 141.5 58.5T880-360v160h-80Z"/>
    </svg>
  );
}



