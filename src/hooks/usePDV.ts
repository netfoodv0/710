import { useState, useCallback, useMemo } from 'react';
import { Order, Product, Customer, DeliveryPerson, OrderType, PaymentMethod, Discount, ServiceCharge } from '../types/global/pdv';
import { Product as ProductType } from '../types/global/products';
import { firebasePedidoService } from '../services/firebasePedidoService';
import { Pedido, StatusPedido, ClientePedido, ItemPedido, PagamentoPedido } from '../types/global/pedidos';

// Tipo local para o estado do PDV
interface PDVState {
  isOpen: boolean;
  currentOrder: any;
  selectedProducts: any[];
  selectedCustomer: any;
  selectedDeliveryPerson: any;
  orderType: OrderType;
  paymentMethods: any[];
  discounts: any[];
  serviceCharges: any[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  observations: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  activeTab: string;
  isPaymentComplete: boolean;
  isCustomerDataComplete: boolean;
}

// Estado inicial do PDV
const initialPDVState: PDVState = {
  isOpen: false,
  currentOrder: null,
  selectedProducts: [],
  selectedCustomer: null,
  selectedDeliveryPerson: null,
  orderType: 'delivery',
  paymentMethods: [
    { id: 'cash', name: 'Dinheiro', value: 0, enabled: false },
    { id: 'pix', name: 'PIX', value: 0, enabled: false },
    { id: 'credit', name: 'Crédito', value: 0, enabled: false },
    { id: 'debit', name: 'Débito', value: 0, enabled: false }
  ],
  discounts: [],
  serviceCharges: [],
  total: 0,
  subtotal: 0,
  deliveryFee: 0,
  observations: '',
  customerName: '',
  customerPhone: '',
  customerAddress: '',
  activeTab: 'sacola',
  isPaymentComplete: false,
  isCustomerDataComplete: false
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

  // Atualizar endereço do cliente
  const updateCustomerAddress = useCallback((customerAddress: string) => {
    setState(prev => ({ ...prev, customerAddress }));
  }, []);

  const updatePaymentMethods = useCallback((paymentMethods: any[]) => {
    setState(prev => ({ ...prev, paymentMethods }));
  }, []);

  // Controlar estado de pagamento
  const setPaymentComplete = useCallback((complete: boolean) => {
    setState(prev => ({ ...prev, isPaymentComplete: complete }));
  }, []);

  // Controlar estado dos dados do cliente
  const setCustomerDataComplete = useCallback((complete: boolean) => {
    setState(prev => ({ ...prev, isCustomerDataComplete: complete }));
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

  // Converter dados do PDV para formato do Firebase
  const converterParaPedidoFirebase = useCallback((orderData: any): Omit<Pedido, 'id' | 'dataHora' | 'dataAtualizacao'> => {
    // Converter cliente
    const cliente: ClientePedido = {
      id: orderData.customer?.id || 'manual',
      nome: orderData.customer?.name || orderData.customerName || 'Cliente',
      telefone: orderData.customer?.phone || orderData.customerPhone || '',
      email: orderData.customer?.email || ''
    };

    // Converter itens
    const itens: ItemPedido[] = orderData.items.map((item: any) => ({
      id: item.id,
      produtoId: item.productId,
      nome: item.name,
      preco: item.price,
      quantidade: item.quantity,
      observacoes: item.observations || '',
      adicionais: item.customizations || [],
      subtotal: item.totalPrice
    }));

    // Converter pagamento (pegar o primeiro método com valor > 0)
    const metodoPagamento = orderData.paymentMethods?.find((method: any) => method.value > 0);
    const pagamento: PagamentoPedido = {
      metodo: metodoPagamento?.id === 'cash' ? 'dinheiro' : 
              metodoPagamento?.id === 'credit' ? 'cartao' :
              metodoPagamento?.id === 'debit' ? 'debito' : 'pix',
      valor: orderData.paymentTotal || 0,
      troco: orderData.paymentTotal > orderData.total ? orderData.paymentTotal - orderData.total : 0,
      status: 'aprovado'
    };

    // Converter endereço se for delivery
    const enderecoEntrega = orderData.type === 'delivery' && orderData.customer?.addresses?.[0] ? {
      rua: orderData.customer.addresses[0].street || '',
      numero: orderData.customer.addresses[0].number || '',
      complemento: orderData.customer.addresses[0].complement || '',
      bairro: orderData.customer.addresses[0].neighborhood || '',
      cidade: orderData.customer.addresses[0].city || '',
      cep: orderData.customer.addresses[0].zipCode || '',
      referencia: orderData.customer.addresses[0].reference || ''
    } : null;

    // Determinar forma de entrega baseado no tipo do pedido
    const formaEntrega = orderData.type === 'delivery' ? 'delivery' :
                        orderData.type === 'pickup' ? 'retirada' : 'balcao';

    const pedidoFirebase = {
      numero: orderData.number,
      lojaId: firebasePedidoService.getLojaId() || '', // Usar lojaId real
      cliente,
      enderecoEntrega,
      itens,
      subtotal: orderData.subtotal,
      taxaEntrega: orderData.deliveryFee || 0,
      desconto: orderData.discounts?.reduce((sum: number, d: any) => sum + d.value, 0) || 0,
      total: orderData.total,
      status: 'pendente' as StatusPedido,
      pagamento,
      observacoes: orderData.observations || '',
      tempoPreparo: 20, // Valor padrão
      tempoEntrega: orderData.type === 'delivery' ? 30 : null,
      motoboyId: orderData.selectedDeliveryPerson?.id || null,
      formaEntrega: formaEntrega as 'delivery' | 'retirada' | 'balcao'
    };
    
    console.log('🔍 Status do pedido antes de salvar:', pedidoFirebase.status);
    return pedidoFirebase;
  }, []);

  // Criar novo pedido
  const createOrder = useCallback(async (): Promise<Order | null> => {
    // Validar produtos
    if (state.selectedProducts.length === 0) {
      throw new Error('Adicione produtos antes de criar o pedido');
    }

    // Validar dados do cliente baseado no tipo de pedido
    if (state.orderType === 'delivery') {
      if (!state.selectedCustomer && !state.customerName) {
        throw new Error('Dados do cliente são obrigatórios para delivery');
      }
      if (!state.customerPhone) {
        throw new Error('Telefone do cliente é obrigatório');
      }
    } else if (state.orderType === 'pickup') {
      if (!state.customerName) {
        throw new Error('Nome do cliente é obrigatório para retirada');
      }
      if (!state.customerPhone) {
        throw new Error('Telefone do cliente é obrigatório');
      }
    }

    // Validar pagamento
    const totalPaid = state.paymentMethods.reduce((total, method) => total + (method.value || 0), 0);
    if (totalPaid < calculatedValues.total) {
      throw new Error('Valor pago é menor que o total do pedido');
    }

    // Aqui você faria a chamada para a API para criar o pedido
    const newOrder: Order = {
      id: Date.now().toString(),
      number: `#${Date.now()}`,
      type: state.orderType,
      status: 'pending',
      customer: state.selectedCustomer || {
        id: 'manual',
        name: state.customerName,
        phone: state.customerPhone,
        email: '',
        addresses: state.customerAddress ? [{
          id: 'manual',
          street: state.customerAddress,
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          zipCode: '',
          reference: '',
          isPrimary: true
        }] : []
      },
      items: state.selectedProducts.map(product => ({
        id: `${Date.now()}-${product.id}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        unitPrice: product.price,
        totalPrice: product.price * product.quantity,
        observations: product.observations || '',
        customizations: product.customizations || [],
        image: product.image || product.images?.[0] || ''
      })),
      subtotal: calculatedValues.subtotal,
      deliveryFee: state.deliveryFee,
      discounts: state.discounts,
      serviceCharges: state.serviceCharges,
      total: calculatedValues.total,
      paymentMethods: state.paymentMethods.filter(method => method.value > 0),
      paymentTotal: state.paymentMethods.reduce((total, method) => total + (method.value || 0), 0),
      observations: state.observations,
      customerName: state.customerName,
      customerPhone: state.customerPhone,
      customerAddress: state.customerAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    };

      // Salvar pedido no Firebase
      try {
        console.log('=== SALVANDO PEDIDO NO FIREBASE ===');
        
        // Converter para formato do Firebase
        const pedidoFirebase = converterParaPedidoFirebase(newOrder);
        
        // Debug: verificar dados antes de salvar
        console.log('Dados do pedido para Firebase:', JSON.stringify(pedidoFirebase, null, 2));
        
        // Salvar no Firebase
        const pedidoId = await firebasePedidoService.criarPedido(pedidoFirebase);
      
      console.log('✅ Pedido salvo no Firebase com ID:', pedidoId);
      console.log('Número:', newOrder.number);
      console.log('Tipo:', newOrder.type);
      console.log('Cliente:', newOrder.customer);
      console.log('Itens:', newOrder.items.length, 'produtos');
      console.log('Subtotal:', newOrder.subtotal);
      console.log('Total:', newOrder.total);
      console.log('Pagamentos:', newOrder.paymentMethods);
      console.log('Total Pago:', newOrder.paymentTotal);
      console.log('=====================================');
      
      // Limpar estado após criar pedido
      clearOrder();
      
      return newOrder;
    } catch (error) {
      console.error('❌ Erro ao salvar pedido no Firebase:', error);
      throw new Error('Falha ao salvar pedido no banco de dados');
    }
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
    updateCustomerAddress,
    updatePaymentMethods,
    setPaymentComplete,
    setCustomerDataComplete,
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