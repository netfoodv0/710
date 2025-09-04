import React from 'react';

interface PhoneIconProps {
  className?: string;
  size?: number;
}

export const PhoneIcon: React.FC<PhoneIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={`${size}px`} 
      viewBox="0 -960 960 960" 
      width={`${size}px`} 
      fill="#666666"
      className={className}
    >
      <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 35 47.5 66.5T418-386q31 31 62.5 57.5T547-276l97-97q9-9 23.5-13.5T691-287l140 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600q20-34 47-65.5t65-52.5l-98-98q-9-9-13.5-23.5T241-828l-28-140q-4-13-14.5-22.5T160-1000h-2q-14 0-25 9.5T120-968q0 125 54.5 247T241-600Zm241 241Zm-241-241Z"/>
    </svg>
  );
};


