import React from 'react';

export const SidebarHeader: React.FC = () => {
  return (
    <div className="sidebar-header expanded p-0 border-b border-slate-100">
      <div className="flex items-center justify-center h-full">
        <img 
          src="/logo.png" 
          alt="VOULT Logo" 
          className="h-18 w-auto"
        />
      </div>
    </div>
  );
};
