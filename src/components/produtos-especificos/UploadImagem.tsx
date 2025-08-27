import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadImagemProps } from '../../types/produtos';

export const UploadImagem: React.FC<UploadImagemProps> = ({
  onUpload,
  onRemove,
  imagens,
  maxImagens = 5,
  loading = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
  };

  const canAddMore = imagens.length < maxImagens;

  return (
    <div className="space-y-4">
      {/* Área de Upload */}
      {canAddMore && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            loading 
              ? 'border-gray-300 bg-gray-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={loading}
          />
          
          <div className="space-y-2">
            <Upload size={24} className="mx-auto text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {loading ? 'Enviando...' : 'Clique para selecionar ou arraste uma imagem'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG ou WebP até 5MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Selecionar Imagem
            </button>
          </div>
        </div>
      )}

      {/* Imagens Carregadas */}
      {imagens.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagens.map((imagem, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={imagem}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay com botão de remover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onRemove(imagem)}
                  disabled={loading}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contador */}
      <div className="text-sm text-gray-500">
        {imagens.length} de {maxImagens} imagens
      </div>
    </div>
  );
}; 
