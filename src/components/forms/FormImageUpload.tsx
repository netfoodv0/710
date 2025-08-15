import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface FormImageUploadProps {
  label: string;
  value: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  maxSize?: number; // em MB
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function FormImageUpload({
  label,
  value = [],
  onChange,
  maxImages = 5,
  maxSize = 5,
  error,
  disabled = false,
  className = ''
}: FormImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || disabled) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > maxSize * 1024 * 1024) return false;
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);

    try {
      // Simular upload - em produção, fazer upload real
      const newImages = await Promise.all(
        validFiles.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        })
      );

      const updatedImages = [...value, ...newImages].slice(0, maxImages);
      onChange(updatedImages);
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = value.filter((_, i) => i !== index);
    onChange(updatedImages);
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
    <div className={`flex flex-col space-y-4 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label}
        <span className="text-gray-500 ml-2">
          (máx. {maxImages} imagens, {maxSize}MB cada)
        </span>
      </label>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${dragOver
            ? 'border-purple-400 bg-purple-50'
            : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-purple-400 hover:bg-purple-50'}
        `}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        {uploading ? (
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-600">Enviando imagens...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <div>
              <span className="text-sm font-medium text-gray-700">
                Clique para enviar ou arraste as imagens
              </span>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, JPEG até {maxSize}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview das Imagens */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {value.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Principal
                </div>
              )}
            </div>
          ))}

          {/* Placeholder para adicionar mais imagens */}
          {value.length < maxImages && !disabled && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-purple-400 hover:text-purple-500 transition-colors duration-200"
            >
              <ImageIcon className="w-6 h-6 mb-2" />
              <span className="text-xs">Adicionar</span>
            </button>
          )}
        </div>
      )}

      {error && (
        <span className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}


