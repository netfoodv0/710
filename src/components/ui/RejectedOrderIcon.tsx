import React from 'react';

interface RejectedOrderIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const RejectedOrderIcon: React.FC<RejectedOrderIconProps> = ({ 
  size = 24, 
  color = "#666666",
  className = ""
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 0 24 24" 
      width={`${size}px`} 
      fill={color}
      className={className}
    >
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9L19.59 7z"/>
    </svg>
  );
};

export default RejectedOrderIcon;
