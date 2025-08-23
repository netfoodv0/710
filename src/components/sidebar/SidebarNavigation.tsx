import React from 'react';
import { MenuItem } from '../../types/sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';

interface SidebarNavigationProps {
  menuItems: MenuItem[];
  isItemActive: (item: MenuItem) => boolean;
  isExpanded: (itemPath: string) => boolean;
  onItemClick: (item: MenuItem) => void;
  onSubItemClick: (path: string) => void;
  isSubItemActive: (subItem: MenuItem) => boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  menuItems,
  isItemActive,
  isExpanded,
  onItemClick,
  onSubItemClick,
  isSubItemActive
}) => {
  return (
    <nav className="sidebar-content flex-1 overflow-y-auto">
      <ul className="space-y-0">
        {menuItems.map((item) => {
          const isActive = isItemActive(item);
          const itemExpanded = isExpanded(item.path);
          
          return (
            <SidebarMenuItem
              key={item.path}
              item={item}
              isActive={isActive}
              isExpanded={itemExpanded}
              onItemClick={onItemClick}
              onSubItemClick={onSubItemClick}
              isSubItemActive={isSubItemActive}
            />
          );
        })}
      </ul>
    </nav>
  );
};
