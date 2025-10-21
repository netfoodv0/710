import React, { useCallback, useEffect } from 'react';
import { useProductsFirebasePDV } from '../../../hooks/useProductsFirebasePDV';
import { usePDVContext } from '../../../context/PDVContext';

export const CategoryTabs: React.FC = () => {
  const { categories } = useProductsFirebasePDV();
  const { selectedCategory, setSelectedCategory } = usePDVContext();

  // Pré-selecionar a primeira categoria quando as categorias são carregadas
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      // Ordenar categorias por ordem e selecionar a primeira
      const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
      setSelectedCategory(sortedCategories[0].id);
    }
  }, [categories, selectedCategory, setSelectedCategory]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  }, [selectedCategory, setSelectedCategory]);

  return (
    <div className="p-3">
      {/* Categorias específicas */}
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        
        return (
          <div
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`p-2 rounded-lg cursor-pointer transition-colors hover:bg-purple-50 ${
              isSelected ? 'bg-white text-purple-800' : 'bg-white text-purple-800'
            }`}
          >
            <span className={`text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}>
              {category.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
