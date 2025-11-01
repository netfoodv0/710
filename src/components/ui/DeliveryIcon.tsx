import React from 'react';

interface DeliveryIconProps {
  className?: string;
  size?: number;
}

export function DeliveryIcon({ className = "", size = 24 }: DeliveryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Caminhão de entrega */}
      <path
        d="M2 17H4C4.55 17 5 16.55 5 16V8C5 7.45 4.55 7 4 7H2V17Z"
        fill="currentColor"
      />
      <path
        d="M6 7H15L19 11V16C19 16.55 18.55 17 18 17H16"
        fill="currentColor"
      />
      <path
        d="M16 17H20C20.55 17 21 16.55 21 16V12L17 8H16V17Z"
        fill="currentColor"
      />
      
      {/* Rodas */}
      <circle
        cx="6"
        cy="19"
        r="2"
        fill="currentColor"
      />
      <circle
        cx="18"
        cy="19"
        r="2"
        fill="currentColor"
      />
      
      {/* Detalhes do caminhão */}
      <rect
        x="7"
        y="9"
        width="6"
        height="2"
        fill="white"
        opacity="0.8"
      />
      <rect
        x="7"
        y="12"
        width="4"
        height="1"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
}





