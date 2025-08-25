import { ReactNode } from 'react';

export interface RouteType {
  path: string;
  element: ReactNode | null;
  state: string;
  sidebarProps?: {
    displayText: string;
    icon?: ReactNode;
  };
  child?: RouteType[];
}
