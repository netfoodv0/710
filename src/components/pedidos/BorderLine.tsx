import React from 'react';

interface BorderLineProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function BorderLine({ 
  children, 
  className = "", 
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave
}: BorderLineProps) {
  const borderStyle = {
    borderColor: 'rgb(207 209 211)',
    ...style
  };

  return (
    <div 
      className={`border ${className}`}
      style={borderStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
