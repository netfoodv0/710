import React from 'react';

export interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  subItems?: MenuItem[];
}

export interface SidebarProps {
  // Props futuras podem ser adicionadas aqui
}

export interface SidebarState {
  expandedItems: Set<string>;
}

export interface SidebarActions {
  handleNavigation: (path: string) => void;
  toggleSubItems: (itemPath: string) => void;
  handleItemClick: (item: MenuItem) => void;
  isExpanded: (itemPath: string) => boolean;
  isItemActive: (item: MenuItem) => boolean;
  isSubItemActive: (subItem: MenuItem) => boolean;
  logout: () => void;
}
