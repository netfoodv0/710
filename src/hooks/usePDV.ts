import { useState, useCallback, useMemo } from 'react';
import { PDVState, Order, Product, Customer, DeliveryPerson, OrderType, PaymentMethod, Discount, ServiceCharge } from '../types/global/pdv';
import { Product as ProductType } from '../types/global/products';

// Estado inicial do PDV
const initialPDVState: PDVState = {
  isOpen: false,
  currentOrder: null,
  selectedProducts: [],
  selectedCustomer: null,
  selectedDeliveryPerson: null,
  orderType: 'delivery',
  paymentMethods: [],
  discounts: [],
  serviceCharges: [],
  total: 0,
  subtotal: 0,
  deliveryFee: 0,
  observations: '',
  activeTab: 'sacola'
};

export const usePDV = () => {
  const [state, setState] = useState<PDVState>(initialPDVState);

  // Abrir/fechar modal do PDV
  const openPDV = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closePDV = useCallback(() => {
    setState(initialPDVState);
  }, []);

  // Gerenciar tipo de pedido
  const setOrderType = useCallback((type: OrderType) => {
    setState(prev => ({ 
      ...prev, 
      orderType: type,
      deliveryFee: type === 'delivery' ? 5.00 : 0
    }));
  }, []);

  // Adicionar produto ao pedido
  const addProduct = useCallback((product: ProductType, quantity: number = 1, customizations: any[] = []) => {
    setState(prev => {
      // Sempre criar um novo item na sacola, mesmo se o produto já existir
      const newProduct = {
        id: `${product.id}_${Date.now()}`, // ID único para cada item
        name: product.name,
        price: product.price,
        image: product.images[0] || '',
        quantity,
        customizations,
        originalProductId: product.id // Manter referência ao produto original
      };
      
      return {
        ...prev,
        selectedProducts: [...prev.selectedProducts, newProduct]
      };
    });
  }, []);

  // Remover produto do pedido
  const removeProduct = useCallback((productId: string) => {
    setState(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter(p => p.id !== productId)
    }));
  }, []);

  // Atualizar quantidade do produto
  const updateProductQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }

    setState(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.map(p => 
        p.id === productId ? { ...p, quantity } : p
      )
    }));
  }, [removeProduct]);

  // Controlar aba ativa (Sacola/Cliente)
  const setActiveTab = useCallback((tab: 'sacola' | 'cliente') => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  // Selecionar cliente
  const selectCustomer = useCallback((customer: Customer | null) => {
    setState(prev => ({ ...prev, selectedCustomer: customer }));
  }, []);

  // Selecionar entregador
  const selectDeliveryPerson = useCallback((deliveryPerson: DeliveryPerson | null) => {
    setState(prev => ({ ...prev, selectedDeliveryPerson: deliveryPerson }));
  }, []);

  // Adicionar desconto
  const addDiscount = useCallback((discount: Discount) => {
    setState(prev => ({
      ...prev,
      discounts: [...prev.discounts, discount]
    }));
  }, []);

  // Remover desconto
  const removeDiscount = useCallback((discountId: string) => {
    setState(prev => ({
      ...prev,
      discounts: prev.discounts.filter(d => d.id !== discountId)
    }));
  }, []);

  // Adicionar taxa de serviço
  const addServiceCharge = useCallback((serviceCharge: ServiceCharge) => {
    setState(prev => ({
      ...prev,
      serviceCharges: [...prev.serviceCharges, serviceCharge]
    }));
  }, []);

  // Remover taxa de serviço
  const removeServiceCharge = useCallback((serviceChargeId: string) => {
    setState(prev => ({
      ...prev,
      serviceCharges: prev.serviceCharges.filter(s => s.id !== serviceChargeId)
    }));
  }, []);

  // Definir taxa de entrega
  const setDeliveryFee = useCallback((fee: number) => {
    setState(prev => ({ ...prev, deliveryFee: fee }));
  }, []);

  // Atualizar observações
  const updateObservations = useCallback((observations: string) => {
    setState(prev => ({ ...prev, observations }));
  }, []);

  // Atualizar nome do cliente
  const updateCustomerName = useCallback((customerName: string) => {
    setState(prev => ({ ...prev, customerName }));
  }, []);

  // Atualizar telefone do cliente
  const updateCustomerPhone = useCallback((customerPhone: string) => {
    setState(prev => ({ ...prev, customerPhone }));
  }, []);

  // Calcular totais
  const calculateTotals = useCallback(() => {
    setState(prev => {
      const subtotal = prev.selectedProducts.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
      }, 0);

      const discountTotal = prev.discounts.reduce((sum, discount) => {
        if (discount.type === 'percentage') {
          return sum + (subtotal * (discount.value / 100));
        }
        return sum + discount.value;
      }, 0);

      const serviceTotal = prev.serviceCharges.reduce((sum, service) => {
        return sum + service.value;
      }, 0);

      const total = subtotal - discountTotal + serviceTotal + prev.deliveryFee;

      return {
        ...prev,
        subtotal,
        total: Math.max(0, total)
      };
    });
  }, []);

  // Limpar pedido atual
  const clearOrder = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedProducts: [],
      selectedCustomer: null,
      selectedDeliveryPerson: null,
      discounts: [],
      serviceCharges: [],
      total: 0,
      subtotal: 0,
      deliveryFee: 0,
      observations: '',
      customerName: '',
      customerPhone: ''
    }));
  }, []);

  // Criar novo pedido
  const createOrder = useCallback(async (): Promise<Order | null> => {
    if (state.selectedProducts.length === 0) {
      throw new Error('Adicione produtos antes de criar o pedido');
    }

    if (state.orderType === 'delivery' && !state.selectedCustomer) {
      throw new Error('Selecione um cliente para pedidos de delivery');
    }

    // Aqui você faria a chamada para a API para criar o pedido
    const newOrder: Order = {
      id: Date.now().toString(),
      number: `#${Date.now()}`,
      type: state.orderType,
      status: 'pending',
      customer: state.selectedCustomer,
      items: state.selectedProducts.map(product => ({
        id: Date.now().toString(),
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          images: [product.image],
          available: true,
          stock: 0,
          minStock: 0,
          maxStock: 0,
          unit: 'un',
          customizations: [],
          allergens: [],
          categoryId: '',
          category: {
            id: '',
            name: '',
            description: '',
            icon: '',
            color: '',
            order: 0
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        quantity: product.quantity,
        unitPrice: product.price,
        totalPrice: product.price * product.quantity,
        observations: '',
        customizations: product.customizations || []
      })),
      subtotal: state.subtotal,
      deliveryFee: state.deliveryFee,
      discounts: state.discounts,
      serviceCharges: state.serviceCharges,
      total: state.total,
      observations: state.observations,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Simular criação do pedido
    console.log('Pedido criado:', newOrder);
    
    // Limpar estado após criar pedido
    clearOrder();
    
    return newOrder;
  }, [state, clearOrder]);

  // Valores calculados
  const calculatedValues = useMemo(() => {
    const subtotal = state.selectedProducts.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);

    const discountTotal = state.discounts.reduce((sum, discount) => {
      if (discount.type === 'percentage') {
        return sum + (subtotal * (discount.value / 100));
      }
      return sum + discount.value;
    }, 0);

    const serviceTotal = state.serviceCharges.reduce((sum, service) => {
      return sum + service.value;
    }, 0);

    const total = subtotal - discountTotal + serviceTotal + state.deliveryFee;

    return {
      subtotal,
      discountTotal,
      serviceTotal,
      total: Math.max(0, total)
    };
  }, [state.selectedProducts, state.discounts, state.serviceCharges, state.deliveryFee]);

  return {
    // Estado
    ...state,
    
    // Ações
    openPDV,
    closePDV,
    setOrderType,
    addProduct,
    removeProduct,
    updateProductQuantity,
    selectCustomer,
    selectDeliveryPerson,
    addDiscount,
    removeDiscount,
    addServiceCharge,
    removeServiceCharge,
    setDeliveryFee,
    updateObservations,
    updateCustomerName,
    updateCustomerPhone,
    calculateTotals,
    clearOrder,
    createOrder,
    setActiveTab,
    
    // Valores calculados
    calculatedValues,
    
    // Estados derivados
    hasProducts: state.selectedProducts.length > 0,
    hasCustomer: !!state.selectedCustomer,
    canCreateOrder: state.selectedProducts.length > 0 && 
      (state.orderType !== 'delivery' || !!state.selectedCustomer)
  };
};
