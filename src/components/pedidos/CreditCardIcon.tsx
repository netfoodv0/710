import React from 'react';

interface CreditCardIconProps {
  className?: string;
  size?: number;
}

export function CreditCardIcon({ className = "", size = 16 }: CreditCardIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={size} 
      width={size} 
      viewBox="0 0 24 24" 
      fill="#666666"
      className={className}
    >
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
  );
}
