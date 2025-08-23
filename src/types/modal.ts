export type ModalSize = 'small' | 'medium' | 'large';

export type ModalTab = 'pessoal' | 'endereco' | 'adicional' | 'observacoes';

export interface ModalState {
  showModal: boolean;
  showFormModal: boolean;
  modalSize: ModalSize;
  activeTab: ModalTab;
}

export interface ModalActions {
  setShowModal: (show: boolean) => void;
  setShowFormModal: (show: boolean) => void;
  setModalSize: (size: ModalSize) => void;
  setActiveTab: (tab: ModalTab) => void;
}

export interface ModalStats {
  totalModais: number;
  modaisAtivos: number;
  modaisInativos: number;
}
