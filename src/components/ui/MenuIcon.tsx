import React from 'react';

interface MenuIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ 
  color = "#666666", 
  size = 24, 
  className = "" 
}) => {
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
};

export default MenuIcon;
