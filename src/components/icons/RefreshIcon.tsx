import React from 'react';

interface RefreshIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function RefreshIcon({
  className = "",
  size = 24,
  color = "#666666"
}: RefreshIconProps) {
  return (
    <div className={`w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center ${className} hover:border-blue-400 hover:bg-blue-50 transition-all duration-300`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={`${size}px`}
        viewBox="0 -960 960 960"
        width={`${size}px`}
        fill={color}
        className="w-5 h-5 hover:text-blue-600 hover:-rotate-180 transition-transform duration-300"
      >
        <path d="M480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0 280q-139 0-241-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Z"/>
      </svg>
    </div>
  );
}
