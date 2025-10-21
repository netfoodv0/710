// Constantes do PDV
export const PDV_CONSTANTS = {
  NOTIFICATION_DURATION: 3000,
  CURRENCY_FORMAT: {
    style: 'currency' as const,
    currency: 'BRL' as const,
    locale: 'pt-BR'
  }
} as const;

export const PDV_MESSAGES = {
  ORDER_FINALIZED: 'Pedido finalizado com sucesso!',
  ORDER_COPIED: 'Pedido copiado para a área de transferência!',
  ORDER_CLEARED: 'Pedido limpo com sucesso!',
  PAYMENT_REQUIRED: 'Pagamento não foi concluído. Não é possível finalizar o pedido.',
  PAYMENT_COMPLETE: 'Pagamento concluído',
  ORDER_CANCELLED: 'Pedido cancelado',
  ERROR_COPY: 'Erro ao copiar pedido',
  ERROR_EXPORT: 'Erro ao exportar pedido',
  ERROR_PRINT: 'Erro ao imprimir pedido'
} as const;

export const PDV_LABELS = {
  PAYMENT_FIRST: 'Pagar primeiro',
  FINALIZE: 'Finalizar',
  PAYMENT: 'Pagamento',
  CANCEL: 'Cancelar',
  CLEAR: 'Limpar',
  SUBTOTAL: 'Subtotal',
  DISCOUNT: 'Desconto',
  PAID: 'Pago',
  TO_PAY: 'A pagar',
  COMPLETE_CUSTOMER_DATA: 'Complete os dados do cliente',
  COMPLETE_PAYMENT_AND_CUSTOMER: 'Complete pagamento e dados do cliente'
} as const;

export const CUSTOMER_VALIDATION = {
  REQUIRED_FIELDS: {
    delivery: ['name', 'phone', 'address', 'deliveryPerson'],
    pickup: ['name', 'phone'],
    dine_in: ['name', 'phone']
  },
  MESSAGES: {
    MISSING_NAME: 'Nome do cliente é obrigatório',
    MISSING_PHONE: 'Telefone do cliente é obrigatório',
    MISSING_ADDRESS: 'Endereço de entrega é obrigatório',
    MISSING_DELIVERY_PERSON: 'Selecione um motoboy para entrega',
    CUSTOMER_DATA_INCOMPLETE: 'Dados do cliente estão incompletos'
  }
} as const;
