import React from 'react';

interface ModalIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ModalIcon({ size = 24, color = "#1f1f1f", className = "" }: ModalIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 -960 960 960" 
      width={`${size}px`} 
      className={`w-6 h-6 ${className}`}
      style={{ fill: color }}
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
    </svg>
  );
}
