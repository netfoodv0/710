import React from 'react';

interface ReportIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ReportIcon({ size = 24, color = "#1f1f1f", className = "" }: ReportIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 -960 960 960" 
      width={`${size}px`} 
      className={`w-6 h-6 ${className}`}
      style={{ fill: color }}
    >
      <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z"/>
    </svg>
  );
}
