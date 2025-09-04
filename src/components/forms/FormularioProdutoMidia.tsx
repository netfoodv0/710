import React from 'react';
import { Produto } from '../../types/global/produtos';

interface FormularioProdutoMidiaProps {
  formData: Partial<Produto>;
  onImageUpload: (file: File, type: 'principal' | 'galeria') => Promise<string>;
  onImageRemove: (url: string, type: 'principal' | 'galeria') => void;
  loading: boolean;
}

export function FormularioProdutoMidia({ 
  formData, 
  onImageUpload, 
  onImageRemove, 
  loading 
}: FormularioProdutoMidiaProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Foto Principal</h3>
        {/* <UploadImagem
          onUpload={(file) => onImageUpload(file, 'principal')}
          onRemove={(url) => onImageRemove(url, 'principal')}
          imagens={formData.imagem ? [formData.imagem] : []}
          maxImagens={1}
          loading={loading}
        /> */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500">Componente UploadImagem será implementado aqui</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Galeria de Fotos</h3>
        {/* <UploadImagem
          onUpload={(file) => onImageUpload(file, 'galeria')}
          onRemove={(url) => onImageRemove(url, 'galeria')}
          imagens={formData.galeriaFotos || []}
          maxImagens={5}
          loading={loading}
        /> */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500">Componente UploadImagem será implementado aqui</p>
        </div>
      </div>
    </div>
  );
} 
