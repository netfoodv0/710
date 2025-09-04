import React from 'react';
import { SidebarToggleButtonProps } from '../types';

export function SidebarToggleButton({ isOpen, onClick, position }: SidebarToggleButtonProps) {
  const isLeft = position === 'left';
  
  const buttonClasses = isLeft
    ? "absolute -left-12 top-6 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-300"
    : "fixed top-6 right-6 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300";

  const icon = isOpen ? (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  return (
    <button onClick={onClick} className={buttonClasses}>
      {icon}
    </button>
  );
}
