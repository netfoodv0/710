import React from 'react';

interface CheckIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CheckIcon({
  className = "",
  size = 24,
  color = "#666666"
}: CheckIconProps) {
  return (
    <div className={`w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={`${size}px`}
        viewBox="0 -960 960 960"
        width={`${size}px`}
        fill={color}
        className="w-5 h-5"
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </div>
  );
}
