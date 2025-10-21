import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useProductsFirebasePDV } from '../../../hooks/useProductsFirebasePDV';
import { usePDVContext } from '../../../context/PDVContext';
import { Product } from '../../../types/global/products';
import { ProductDetailsModal } from './ProductDetailsModal';

// Componente individual do produto
const ProductItem = ({ 
  product, 
  hoveredProduct, 
  onMouseEnter, 
  onMouseLeave, 
  onOpenModal 
}: {
  product: Product;
  hoveredProduct: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onOpenModal: (product: Product) => void;
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md h-[145px]"
      onMouseEnter={() => onMouseEnter(product.id)}
      onMouseLeave={onMouseLeave}
    >
      {/* Imagem do Produto */}
      <div className="h-20 bg-gray-100 relative overflow-hidden cursor-pointer" onClick={() => onOpenModal(product)}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200"
            style={{ transform: hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`text-3xl flex items-center justify-center w-full h-full ${product.images && product.images.length > 0 ? 'hidden' : ''}`}>
          🛍️
        </div>
        
        {/* Ícone + no hover */}
        <div className="absolute inset-0 bg-black transition-all duration-200 flex items-center justify-center"
             style={{ 
               backgroundColor: hoveredProduct === product.id ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)'
             }}>
          <span className="text-white font-bold text-3xl transition-opacity duration-200 w-[34px] h-[34px] flex items-center justify-center"
                style={{ opacity: hoveredProduct === product.id ? 1 : 0 }}>
            +
          </span>
        </div>
        
      </div>

      {/* Informações do Produto */}
      <div className="p-2">
        <h3 className="font-medium text-gray-900 text-xs mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Preço */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-purple-600">
            R$ {product.price.toFixed(2)}
          </p>
          <span className="text-xs text-gray-500">
            {product.unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ProductGrid: React.FC = () => {
  const { products, searchTerm, categories } = useProductsFirebasePDV();
  const { selectedCategory } = usePDVContext();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const openProductModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeProductModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleMouseEnter = useCallback((productId: string) => {
    setHoveredProduct(productId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProduct(null);
  }, []);

  // Efeito para fazer scroll para a categoria selecionada
  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
      if (selectedCategoryData) {
        const categoryElement = categoryRefs.current[selectedCategoryData.name];
        if (categoryElement) {
          categoryElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    }
  }, [selectedCategory, categories]);

  // Função para verificar se uma categoria está selecionada
  const isCategorySelected = useCallback((categoryName: string) => {
    if (!selectedCategory) return false;
    
    // Buscar a categoria selecionada
    const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
    if (!selectedCategoryData) return false;
    
    // Comparar nomes
    const isSelected = selectedCategoryData.name === categoryName;
    return isSelected;
  }, [selectedCategory, categories]);

  // Agrupar produtos por categoria - sempre usar todos os produtos para agrupamento
  const productsByCategory = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  if (products.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="text-4xl mb-2">🔍</div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
        </h3>
        <p className="text-xs text-gray-500">
          {searchTerm 
            ? `Não encontramos produtos para "${searchTerm}"`
            : 'Nenhum produto cadastrado'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="p-3">
      {/* Produtos agrupados por categoria */}
      {Object.entries(productsByCategory).map(([categoryName, products]) => {
        const isSelected = isCategorySelected(categoryName);
        return (
          <div 
            key={categoryName} 
            className="mb-4"
            ref={(el) => {
              categoryRefs.current[categoryName] = el;
            }}
          >
            {/* Cabeçalho da Categoria */}
            <div className="mb-1">
              <h2 className={`text-lg text-gray-900 ${isSelected ? 'font-bold' : 'font-normal'}`}>
                {categoryName}
              </h2>
            </div>
          
            {/* Grid de Produtos da Categoria - todos juntos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  hoveredProduct={hoveredProduct}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onOpenModal={openProductModal}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Modal de Detalhes do Produto */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </div>
  );
};
