import React from 'react';
import { useProducts } from '../../../hooks/useProducts';

export const CategoryTabs: React.FC = () => {
  const { categories, selectedCategory, selectCategory } = useProducts();

  const handleCategorySelect = (categoryId: string) => {
    selectCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="p-3 space-y-2">
      {/* Categoria "Todas" */}
      <div
        onClick={() => handleCategorySelect('')}
        className={`p-2 rounded-lg cursor-pointer transition-colors hover:bg-purple-50 ${
          !selectedCategory ? 'bg-purple-100 text-purple-800 border border-purple-300' : 'bg-purple-100 text-purple-800'
        }`}
      >
        <span className="text-sm font-medium">Todas</span>
      </div>

      {/* Categorias específicas */}
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        
        return (
          <div
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`p-2 rounded-lg cursor-pointer transition-colors hover:bg-purple-50 ${
              isSelected ? 'bg-purple-100 text-purple-800 border border-purple-300' : category.color
            }`}
          >
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        );
      })}
    </div>
  );
};
