import React from 'react';

interface MenuIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function MenuIcon({ 
  className = "", 
  size = 24, 
  color = "#666666" 
}: MenuIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 -960 960 960" 
      width={`${size}px`} 
      fill={color}
      className={className}
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>
  );
}
