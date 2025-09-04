import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Star, Clock, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { Product } from '../../../types/global/products';
import { usePDVContext } from '../../../context/PDVContext';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../modals/Modal';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct?: (product: Product, quantity: number, customizations: any[]) => void;
  isEditing?: boolean;
  initialQuantity?: number;
  initialCustomizations?: any[];
}

interface SelectedAddition {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onUpdateProduct,
  isEditing = false,
  initialQuantity = 1,
  initialCustomizations = []
}) => {
  const { addProduct, setActiveTab } = usePDVContext();
  const [quantity, setQuantity] = useState(Math.max(1, initialQuantity || 1));
  const [selectedAdditions, setSelectedAdditions] = useState<SelectedAddition[]>(initialCustomizations);
  const [observations, setObservations] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Mock de adicionais disponíveis organizados por categoria
  const availableAdditions = [
    { id: '1', name: 'Queijo Extra', price: 2.50, category: 'Queijos' },
    { id: '2', name: 'Queijo Gorgonzola', price: 3.50, category: 'Queijos' },
    { id: '3', name: 'Queijo Parmesão', price: 2.00, category: 'Queijos' },
    { id: '4', name: 'Bacon', price: 3.00, category: 'Carnes' },
    { id: '5', name: 'Presunto', price: 2.50, category: 'Carnes' },
    { id: '6', name: 'Pepperoni', price: 3.50, category: 'Carnes' },
    { id: '7', name: 'Cebola Caramelizada', price: 1.50, category: 'Vegetais' },
    { id: '8', name: 'Tomate Seco', price: 2.00, category: 'Vegetais' },
    { id: '9', name: 'Rúcula', price: 1.00, category: 'Vegetais' },
    { id: '10', name: 'Molho Especial', price: 1.00, category: 'Molhos' },
    { id: '11', name: 'Molho Picante', price: 1.50, category: 'Molhos' },
    { id: '12', name: 'Molho de Alho', price: 1.00, category: 'Molhos' },
    { id: '13', name: 'Batata Frita', price: 4.50, category: 'Acompanhamentos' },
    { id: '14', name: 'Arroz', price: 3.00, category: 'Acompanhamentos' },
    { id: '15', name: 'Feijão', price: 2.50, category: 'Acompanhamentos' },
    { id: '16', name: 'Refrigerante', price: 3.50, category: 'Bebidas' },
    { id: '17', name: 'Suco Natural', price: 4.00, category: 'Bebidas' },
    { id: '18', name: 'Água', price: 2.00, category: 'Bebidas' }
  ];

  // Agrupar adicionais por categoria
  const groupedAdditions = availableAdditions.reduce((groups, addition) => {
    const category = addition.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addition);
    return groups;
  }, {} as Record<string, typeof availableAdditions>);

  const handleQuantityChange = (newQuantity: number) => {
    console.log('handleQuantityChange chamado:', newQuantity);
    if (newQuantity >= 1 && newQuantity <= 99) {
      console.log('Definindo quantidade para:', newQuantity);
      setQuantity(newQuantity);
    } else {
      console.log('Quantidade inválida:', newQuantity);
    }
  };

  const handleAdditionToggle = (addition: any) => {
    setSelectedAdditions(prev => {
      const existing = prev.find(a => a.id === addition.id);
      if (existing) {
        return prev.filter(a => a.id !== addition.id);
      } else {
        return [...prev, { ...addition, quantity: 1 }];
      }
    });
  };

  const handleAdditionQuantityChange = (additionId: string, newQuantity: number) => {
    setSelectedAdditions(prev => {
      const existingAddition = prev.find(a => a.id === additionId);
      
      if (newQuantity <= 0) {
        // Remove o adicional se quantidade for 0 ou menor
        return prev.filter(a => a.id !== additionId);
      }
      
      if (existingAddition) {
        // Atualiza a quantidade do adicional existente
        return prev.map(a => 
          a.id === additionId ? { ...a, quantity: newQuantity } : a
        );
      } else {
        // Adiciona novo adicional com a quantidade especificada
        const addition = availableAdditions.find(a => a.id === additionId);
        if (addition) {
          return [...prev, { ...addition, quantity: newQuantity }];
        }
      }
      
      return prev;
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    const additionsTotal = selectedAdditions.reduce((sum, addition) => 
      sum + (addition.price * addition.quantity), 0
    );
    
    return (product.price * quantity) + additionsTotal;
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (isEditing && onUpdateProduct) {
      // Modo de edição - atualizar produto existente
      onUpdateProduct(product, quantity, selectedAdditions);
    } else {
      // Modo normal - adicionar novo produto
      addProduct(product, quantity, selectedAdditions);
      
      // Ativar aba Sacola para mostrar o produto adicionado
      setActiveTab('sacola');
    }
    
    onClose();
    
    // Resetar estado
    setQuantity(1);
    setSelectedAdditions([]);
    setObservations('');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!isOpen || !product) return null;

  return (
                                     <Modal
                 isOpen={isOpen}
                 onClose={onClose}
                 title={isEditing ? 'Editar Produto' : 'Detalhes do Produto'}
                 size="sm"
                 className="product-details-modal"
               >
                      <ModalBody className="max-h-[60vh] overflow-y-auto pb-4">
        {/* Imagem e Informações Básicas */}
        <div className="border-b border-gray-200 pb-6 mb-6" style={{ width: '501.996px', height: '144.184px', transform: 'translate(-23.3333px, 0px)' }}>
          <div className="flex">
            {/* Imagem */}
            <div className="w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0 rounded-lg" style={{ width: '210.191px', position: 'relative', left: '23px', top: '-1px' }}>
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={{ height: '127.969px', width: '189.08px', transform: 'translate(-60.0001px, 0px)', position: 'relative', left: '-227px', top: '84px' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Sem imagem</span>
                </div>
              )}
            </div>

            {/* Informações */}
            <div className="flex-1 px-6" style={{ position: 'relative', left: '14px', top: '-3px', width: '256.25px' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              
              <div className="text-lg font-bold text-purple-600" style={{ position: 'relative', left: '-1px', top: '21px' }}>
                {formatCurrency(product.price)}
              </div>
            </div>
          </div>
        </div>

        {/* Adicionais Disponíveis */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Adicionais Disponíveis</h4>
          
          <div className="space-y-4">
            {Object.entries(groupedAdditions).map(([category, additions]) => {
              const isExpanded = expandedCategories[category] || false;
              
              return (
                <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Cabeçalho da Categoria (Clicável) */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <h5 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                        {category}
                      </h5>
                      <div className="flex items-center space-x-2">
                        {(() => {
                          const selectedCount = selectedAdditions.filter(a => 
                            additions.some(addition => addition.id === a.id)
                          ).reduce((sum, a) => sum + a.quantity, 0);
                          
                          return selectedCount > 0 ? (
                            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-medium">
                              {selectedCount} selecionado{selectedCount !== 1 ? 's' : ''}
                            </span>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    
                    {/* Ícone de expansão */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {isExpanded ? 'Ocultar' : 'Mostrar'}
                      </span>
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-600" />
                      )}
                    </div>
                  </button>
                  
                  {/* Conteúdo da Categoria (Expandível) */}
                  <div 
                    className={`overflow-hidden transition-all duration-[600ms] ease-in-out ${
                      isExpanded ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="space-y-3">
                        {additions.map((addition) => {
                          const isSelected = selectedAdditions.some(a => a.id === addition.id);
                          const selectedAddition = selectedAdditions.find(a => a.id === addition.id);
                          
                          return (
                            <div key={addition.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div>
                                  <span className="text-sm font-medium text-gray-900">{addition.name}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900">
                                  {formatCurrency(addition.price)}
                                </span>
                                
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleAdditionQuantityChange(addition.id, (selectedAddition?.quantity || 0) - 1)}
                                    className="w-6 h-6 bg-white rounded-full ring-1 ring-gray-400 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:ring-gray-500 transition-colors"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="w-6 text-center text-sm text-gray-900">
                                    {selectedAddition?.quantity || 0}
                                  </span>
                                  <button
                                    onClick={() => handleAdditionQuantityChange(addition.id, (selectedAddition?.quantity || 0) + 1)}
                                    className="w-6 h-6 bg-white rounded-full ring-1 ring-gray-400 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:ring-gray-500 transition-colors"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Observações */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Observações</h4>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Adicione observações especiais para este produto..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none"
            rows={2}
          />
        </div>

                 
      </ModalBody>
      
             <ModalFooter>
         <div className="flex items-center justify-between w-full">
                        {/* Controle de Quantidade */}
             <div className="flex items-center space-x-4">
               <div className="bg-white border border-gray-300 rounded-lg p-2 h-[60px] flex items-center justify-center">
                 <div className="flex items-center justify-between w-full max-w-[200px]">
                 <button
                   onClick={() => handleQuantityChange(quantity - 1)}
                   disabled={quantity <= 1}
                   className="w-8 h-8 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ring-1 ring-gray-400"
                 >
                   <Minus size={16} />
                 </button>
                 <span className="w-16 text-center text-2xl font-semibold text-gray-900">{quantity}</span>
                 <button
                   onClick={() => handleQuantityChange(quantity + 1)}
                   disabled={quantity >= 99}
                   className="w-8 h-8 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ring-1 ring-gray-400"
                 >
                   <Plus size={16} />
                 </button>
               </div>
             </div>
           </div>
           
           {/* Botão de Ação com Valor Total */}
           <button
             onClick={handleAddToCart}
             className="bg-purple-600 text-white py-4 px-8 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-4"
           >
             <span className="text-lg">{isEditing ? 'Atualizar' : 'Adicionar'}</span>
             
             <span className="text-lg font-bold text-white">
               {formatCurrency(calculateTotalPrice())}
             </span>
           </button>
         </div>
       </ModalFooter>
    </Modal>
  );
};
