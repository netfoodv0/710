import React, { useState } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { usePDVContext } from '../../../context/PDVContext';
import { Product } from '../../../types/global/products';
import { ProductDetailsModal } from './ProductDetailsModal';

export const ProductGrid: React.FC = () => {
  const { filteredProducts, searchTerm, selectedCategory } = useProducts();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="text-4xl mb-2">🔍</div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
        </h3>
        <p className="text-xs text-gray-500">
          {searchTerm 
            ? `Não encontramos produtos para "${searchTerm}"`
            : 'Tente selecionar uma categoria diferente'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="p-3">
      {/* Grid de Produtos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md h-[145px]"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Imagem do Produto */}
              <div className="h-20 bg-gray-100 relative overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
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
                
                {/* Badge de Estoque */}
                {product.stock <= product.minStock && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
                    Baixo
                  </div>
                )}
                
                {/* Badge de Categoria */}
                <div className="absolute top-1 left-1 bg-purple-100 text-purple-800 text-xs px-1 py-0.5 rounded-full">
                  {product.category.name}
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
        })}
      </div>

      {/* Modal de Detalhes do Produto */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </div>
  );
};
