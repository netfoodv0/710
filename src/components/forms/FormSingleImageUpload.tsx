import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface FormSingleImageUploadProps {
  label: string;
  value: string;
  onChange: (image: string) => void;
  maxSize?: number; // em MB
  error?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  dimensions?: string; // ex: "800x256"
}

export function FormSingleImageUpload({
  label,
  value = '',
  onChange,
  maxSize = 5,
  error,
  disabled = false,
  className = '',
  placeholder = 'Selecione uma imagem',
  dimensions
}: FormSingleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || disabled) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    if (file.size > maxSize * 1024 * 1024) return;

    setUploading(true);

    try {
      // Simular upload - em produção, fazer upload real
      const imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      onChange(imageUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {dimensions && (
          <span className="text-gray-500 ml-2">
            ({dimensions})
          </span>
        )}
      </label>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${value ? 'hidden' : ''}
        `}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center space-y-2">
          <ImageIcon className="w-8 h-8 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 font-medium">{placeholder}</p>
            <p className="text-xs text-gray-500">
              Arraste e solte ou clique para selecionar
            </p>
            <p className="text-xs text-gray-500">
              Máximo {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {/* Preview da imagem */}
      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={disabled}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Estado de upload */}
      {uploading && (
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Fazendo upload...</span>
        </div>
      )}

      {/* Erro */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
