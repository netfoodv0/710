import React from 'react';

interface TestIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function TestIcon({ size = 24, color = "#1f1f1f", className = "" }: TestIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 -960 960 960" 
      width={`${size}px`} 
      className={`w-6 h-6 ${className}`}
      style={{ fill: color }}
    >
      <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm0-160v-80H120v-80h320v80Zm80 400v-80h120v-80h-120v-80h80v-80h80v240h-80v80h-80Z"/>
    </svg>
  );
}

