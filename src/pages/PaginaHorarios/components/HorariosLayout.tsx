import React from 'react';

interface HorariosLayoutProps {
  children: React.ReactNode;
}

export function HorariosLayout({ children }: HorariosLayoutProps) {
  return (
    <div className="h-full w-full">
      <div className="container mx-auto p-6">
        {children}
      </div>
    </div>
  );
}












