import { useState, useCallback } from 'react';
import { ModalSize, ModalTab, ModalState, ModalActions } from '../types/modal';

export const useModalActions = (): [ModalState, ModalActions] => {
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [modalSize, setModalSize] = useState<ModalSize>('large');
  const [activeTab, setActiveTab] = useState<ModalTab>('pessoal');

  const handleSetShowModal = useCallback((show: boolean) => {
    setShowModal(show);
  }, []);

  const handleSetShowFormModal = useCallback((show: boolean) => {
    setShowFormModal(show);
  }, []);

  const handleSetModalSize = useCallback((size: ModalSize) => {
    setModalSize(size);
  }, []);

  const handleSetActiveTab = useCallback((tab: ModalTab) => {
    setActiveTab(tab);
  }, []);

  const state: ModalState = {
    showModal,
    showFormModal,
    modalSize,
    activeTab
  };

  const actions: ModalActions = {
    setShowModal: handleSetShowModal,
    setShowFormModal: handleSetShowFormModal,
    setModalSize: handleSetModalSize,
    setActiveTab: handleSetActiveTab
  };

  return [state, actions];
};
