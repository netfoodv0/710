import React from 'react';
import { FixedPageHeader } from '../../../components/ui';

interface HorariosLayoutProps {
  children: React.ReactNode;
}

export function HorariosLayout({ children }: HorariosLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Cabeçalho fixo */}
      <FixedPageHeader
        title="Horários"
        subtitle="Configure os horários de funcionamento da sua loja"
      />
      
      {/* Espaço para não sobrepor o conteúdo */}
      <div className="h-[50px]" />
      
      <div className="h-full w-full">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}












