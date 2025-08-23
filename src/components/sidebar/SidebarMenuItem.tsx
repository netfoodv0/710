import React from 'react';
import { MenuItem } from '../../types/sidebar';
import { AnimatedDropdown, AnimatedChevron } from '../ui/animated-dropdown';

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  isExpanded: boolean;
  onItemClick: (item: MenuItem) => void;
  onSubItemClick: (path: string) => void;
  isSubItemActive: (subItem: MenuItem) => boolean;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isActive,
  isExpanded,
  onItemClick,
  onSubItemClick,
  isSubItemActive
}) => {
  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <li>
      <div className="sidebar-item-container">
        <button
          onClick={() => onItemClick(item)}
          className={`sidebar-menu-item ${hasSubItems ? 'has-dropdown' : ''} flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
            isActive && !hasSubItems
              ? 'text-[#8217d5] sidebar-item-active'
              : 'text-[#525866] hover:text-[#525866] hover:bg-slate-50 sidebar-item-inactive'
          }`}
        >
          <Icon className="w-6 h-6 flex-shrink-0" color={isActive && !hasSubItems ? "#8217d5" : "#525866"} />
          <span className="sidebar-text expanded">{item.label}</span>
          {hasSubItems && (
            <div className="ml-auto">
              <AnimatedChevron 
                isOpen={isExpanded}
                color="#525866"
              />
            </div>
          )}
        </button>
      </div>
      
      {/* Sublinks */}
      {hasSubItems && (
        <AnimatedDropdown isOpen={isExpanded}>
          <ul className="sidebar-submenu expanded space-y-0">
            {item.subItems!.map((subItem) => {
              const isSubActive = isSubItemActive(subItem);
              
              return (
                <li key={subItem.path}>
                  <button
                    onClick={() => onSubItemClick(subItem.path)}
                    className={`sidebar-menu-item w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isSubActive
                        ? 'text-[#8217d5] sidebar-item-active'
                        : 'text-[#525866] hover:text-[#525866] hover:bg-slate-50 sidebar-item-inactive'
                    }`}
                  >
                    <div className="w-6 h-6 flex-shrink-0"></div>
                    <span className="sidebar-text expanded">{subItem.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </AnimatedDropdown>
      )}
    </li>
  );
};
