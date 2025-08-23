import React, { memo } from 'react';
import './Sidebar.css';
import { useSidebarActions } from '../hooks/useSidebarActions';
import { sidebarMenuItems } from '../data/sidebarMenu';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarFooter } from './sidebar/SidebarFooter';

interface SidebarProps {
  // Props futuras podem ser adicionadas aqui
}

export const Sidebar = memo(({}: SidebarProps) => {
  const [state, actions] = useSidebarActions();
  const { expandedItems } = state;
  const {
    handleNavigation,
    handleItemClick,
    isExpanded,
    isItemActive,
    isSubItemActive,
    logout
  } = actions;

  return (
    <aside className="sidebar-container expanded bg-white border-r border-slate-200 flex flex-col h-screen w-[243px] flex-shrink-0">
      {/* Header */}
      <SidebarHeader />

      {/* Navigation */}
      <SidebarNavigation
        menuItems={sidebarMenuItems}
        isItemActive={isItemActive}
        isExpanded={isExpanded}
        onItemClick={handleItemClick}
        onSubItemClick={handleNavigation}
        isSubItemActive={isSubItemActive}
      />

      {/* Footer */}
      <SidebarFooter onLogout={logout} />
    </aside>
  );
});