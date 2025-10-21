import React, { createContext, useContext, ReactNode } from 'react';
import { usePDV } from '../hooks/usePDV';

interface PDVContextType {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  // Adicionar todas as propriedades do hook usePDV
  isOpen: boolean;
  currentOrder: any;
  selectedProducts: any[];
  selectedCustomer: any;
  selectedDeliveryPerson: any;
  orderType: string;
  paymentMethods: any[];
  discounts: any[];
  serviceCharges: any[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  observations: string;
  activeTab: string;
  calculatedValues: {
    subtotal: number;
    discountTotal: number;
    serviceTotal: number;
    total: number;
  };
  // Estado de pagamento
  isPaymentComplete: boolean;
  setPaymentComplete: (complete: boolean) => void;
  // Estado dos dados do cliente
  isCustomerDataComplete: boolean;
  setCustomerDataComplete: (complete: boolean) => void;
  // Ações
  openPDV: () => void;
  closePDV: () => void;
  setOrderType: (type: any) => void;
  addProduct: (product: any, quantity?: number, customizations?: any[]) => void;
  removeProduct: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  selectCustomer: (customer: any) => void;
  selectDeliveryPerson: (person: any) => void;
  addDiscount: (discount: any) => void;
  removeDiscount: (discountId: string) => void;
  addServiceCharge: (service: any) => void;
  removeServiceCharge: (serviceId: string) => void;
  setDeliveryFee: (fee: number) => void;
  updateObservations: (observations: string) => void;
  updateCustomerName: (name: string) => void;
  updateCustomerPhone: (phone: string) => void;
  updateCustomerAddress: (address: string) => void;
  updatePaymentMethods: (paymentMethods: any[]) => void;
  calculateTotals: () => void;
  clearOrder: () => void;
  createOrder: () => Promise<any>;
  setActiveTab: (tab: string) => void;
  hasProducts: boolean;
  hasCustomer: boolean;
  canCreateOrder: boolean;
}

const PDVContext = createContext<PDVContextType | undefined>(undefined);

export const usePDVContext = () => {
  const context = useContext(PDVContext);
  if (!context) {
    throw new Error('usePDVContext must be used within a PDVProvider');
  }
  return context;
};

interface PDVProviderProps {
  children: ReactNode;
}

export const PDVProvider: React.FC<PDVProviderProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const pdvHook = usePDV();

  const contextValue: PDVContextType = {
    selectedCategory,
    setSelectedCategory,
    ...pdvHook
  };

  return (
    <PDVContext.Provider value={contextValue}>
      {children}
    </PDVContext.Provider>
  );
};