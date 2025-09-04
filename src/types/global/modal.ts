// Tipos relacionados a modais

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalTab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ModalState {
  isOpen: boolean;
  size: ModalSize;
  title?: string;
  tabs?: ModalTab[];
  activeTab?: string;
  data?: any;
  loading?: boolean;
  error?: string;
}

export interface ModalActions {
  open: (config?: Partial<ModalState>) => void;
  close: () => void;
  setSize: (size: ModalSize) => void;
  setTitle: (title: string) => void;
  setTabs: (tabs: ModalTab[]) => void;
  setActiveTab: (tabId: string) => void;
  setData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export interface ModalStats {
  totalModals: number;
  openModals: number;
  closedModals: number;
  averageOpenTime: number;
  mostUsedSize: ModalSize;
  mostUsedTabs: string[];
}