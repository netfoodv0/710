import React from 'react';

interface TableIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function TableIcon({ size = 24, color = "currentColor", className = "" }: TableIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}
