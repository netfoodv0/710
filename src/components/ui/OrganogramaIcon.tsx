import React from 'react';

interface OrganogramaIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function OrganogramaIcon({ size = 24, color = "#1f1f1f", className = "" }: OrganogramaIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 -960 960 960" 
      width={`${size}px`} 
      className={`w-6 h-6 ${className}`}
      style={{ fill: color }}
    >
      <path d="M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z"/>
    </svg>
  );
}
