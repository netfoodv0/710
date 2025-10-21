import React, { useState, useEffect } from 'react';
import { usePDVContext } from '../../../context/PDVContext';
import { OrderItem } from './OrderItem';
import { OrderActions } from './OrderActions';
import { CustomerInfo } from '../customers/CustomerInfo';
import { ShoppingBag } from 'lucide-react';
import { ProductDetailsModal } from '../products/ProductDetailsModal';

import { CustomerForm } from '../customers/CustomerForm';
import { DeliverySelector } from '../customers/DeliverySelector';
import { TotalCalculator } from '../payments/TotalCalculator';
import { ThreeDotsIcon } from '../../ui/ThreeDotsIcon';
import { Edit2 } from 'lucide-react';

export const OrderSummary: React.FC = () => {
  const { selectedProducts, selectedCustomer, orderType, calculatedValues, addProduct, removeProduct, customerName, customerPhone } = usePDVContext();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCustomerMenu && !(event.target as Element).closest('.customer-menu')) {
        setShowCustomerMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCustomerMenu]);

  const handleEditProduct = (product: any) => {
    // Converter o produto do pedido para o formato esperado pelo modal
    const productForModal = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.image ? [product.image] : [],
      image: product.image,
      description: product.description || '',
      preparationTime: product.preparationTime || 20,
      category: product.category || '',
      isPopular: product.isPopular || false,
      originalPrice: product.originalPrice || null,
      quantity: product.quantity,
      customizations: product.customizations || []
    };
    
    setEditingProduct(productForModal);
    setShowEditModal(true);
  };

  const handleUpdateProduct = (product: any, quantity: number, customizations: any[]) => {
    // Remover o produto atual usando o ID único
    removeProduct(editingProduct.id);
    
    // Adicionar o produto atualizado com nova quantidade e customizações
    addProduct(product, quantity, customizations);
    
    // Fechar o modal
    setShowEditModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Resumo dos Dados do Cliente */}
      {(selectedCustomer || customerName || customerPhone) && (
        <div className="bg-blue-50 border-b border-blue-200 px-3 py-2">
          <div className="text-xs font-semibold text-blue-800 mb-1 uppercase tracking-wide">
            Dados do Cliente
          </div>
          <div className="space-y-0.5">
            {selectedCustomer ? (
              <>
                <div className="text-sm font-medium text-gray-900">
                  {selectedCustomer.name}
                </div>
                {selectedCustomer.phone && (
                  <div className="text-xs text-gray-600">
                    {selectedCustomer.phone}
                  </div>
                )}
                {orderType === 'delivery' && selectedCustomer.addresses && selectedCustomer.addresses.length > 0 && (
                  <div className="text-xs text-gray-600">
                    {selectedCustomer.addresses[0].street}, {selectedCustomer.addresses[0].number}
                  </div>
                )}
              </>
            ) : (
              <>
                {customerName && (
                  <div className="text-sm font-medium text-gray-900">
                    {customerName}
                  </div>
                )}
                {customerPhone && (
                  <div className="text-xs text-gray-600">
                    {customerPhone}
                  </div>
                )}
              </>
            )}
            <div className="text-xs text-blue-600 font-medium">
              {orderType === 'delivery' ? 'Delivery' : orderType === 'pickup' ? 'Retirada' : 'Balcão'}
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Sacola */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Lista de Produtos */}
        {selectedProducts.length > 0 ? (
              <div className="space-y-3">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-3 relative group">
                    {/* Hover com opções de Editar e Excluir */}
                    <div 
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-between px-6"
                    >
                      {/* Botão Excluir - Esquerda */}
                      <div 
                        className="flex items-center space-x-2 cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        style={{
                          backgroundColor: 'rgba(244, 67, 54, 0.6)',
                          color: 'white'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(244, 67, 54, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(244, 67, 54, 0.2)';
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Tem certeza que deseja remover este produto?')) {
                            removeProduct(product.id);
                          }
                        }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-lg font-semibold">Excluir</span>
                      </div>

                      {/* Botão Editar - Direita */}
                      <div 
                        className="flex items-center space-x-2 cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-white"
                        style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.6)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.2)';
                        }}
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit2 size={24} />
                        <span className="text-lg font-semibold">Editar</span>
                      </div>
                    </div>
                    
                    {/* Nome do produto com quantidade e preço na mesma linha */}
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">
                        {product.quantity}x {product.name}
                      </h5>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.price * product.quantity)}
                      </p>
                    </div>
                    
                    {/* Exibir adicionais se existirem */}
                    {product.customizations && product.customizations.length > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <div className="space-y-3">
                          {/* Agrupar adicionais por categoria */}
                          {(() => {
                            const groupedCustomizations = product.customizations.reduce((groups: any, customization: any) => {
                              const category = customization.category || 'Outros';
                              if (!groups[category]) {
                                groups[category] = [];
                              }
                              groups[category].push(customization);
                              return groups;
                            }, {});

                            return Object.entries(groupedCustomizations).map(([category, customizations]) => (
                              <div key={category} className="space-y-2">
                                {/* Cabeçalho da categoria */}
                                <div className="flex items-center">
                                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide italic">
                                    {category}
                                  </span>
                                </div>
                                
                                {/* Lista de adicionais da categoria */}
                                <div className="space-y-1 ml-4">
                                  {(customizations as any[]).map((customization: any) => (
                                    <div key={customization.id} className="flex items-center justify-between text-xs">
                                      <div className="font-medium text-gray-700">
                                        {customization.quantity}x {customization.name}
                                      </div>
                                      <div className="text-gray-600">
                                        {customization.price > 0 ? formatCurrency(customization.price) : 'Grátis'}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} className="text-gray-400" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Sacola vazia</h4>
                <p className="text-xs text-gray-500">
                  Adicione produtos para começar o pedido
                </p>
              </div>
            )}

            {/* Resumo de Valores */}
            {selectedProducts.length > 0 && <TotalCalculator />}
      </div>

      {/* Ações do Pedido - Removido para evitar duplicação com PDVValuesDisplay */}

      {/* Modal de Formulário de Cliente */}
      {showCustomerForm && (
        <CustomerForm
          onClose={() => setShowCustomerForm(false)}
          customer={null}
        />
      )}

      {/* Modal de Edição de Produto */}
      {showEditModal && editingProduct && (
        <ProductDetailsModal
          product={editingProduct}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingProduct(null);
          }}
          onUpdateProduct={handleUpdateProduct}
          isEditing={true}
          initialQuantity={editingProduct.quantity}
          initialCustomizations={editingProduct.customizations}
        />
      )}
    </div>
  );
};
