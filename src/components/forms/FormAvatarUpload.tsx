import React, { useState, useRef } from 'react';
import { Upload, X, User, Loader2 } from 'lucide-react';
import { ModalSelecaoAvatar } from '../modals/ModalSelecaoAvatar';

interface FormAvatarUploadProps {
  label: string;
  value: string;
  onChange: (image: string) => void;
  maxSize?: number; // em MB
  error?: string;
  disabled?: boolean;
  className?: string;
  dimensions?: string; // ex: "84x84"
  showAvatarSelector?: boolean; // se deve mostrar o seletor de avatares
}

export function FormAvatarUpload({
  label,
  value = '',
  onChange,
  maxSize = 2,
  error,
  disabled = false,
  className = '',
  dimensions = '84x84',
  showAvatarSelector = false
}: FormAvatarUploadProps) {
  
  const [uploading, setUploading] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
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

  const handleAvatarSelect = (avatar: { id: string; name: string; svg: string }) => {
    onChange(avatar.svg);
    setShowAvatarModal(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // Drag and drop desabilitado para círculo pequeno
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Drag and drop desabilitado para círculo pequeno
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Drag and drop desabilitado para círculo pequeno
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {dimensions && (
          <span className="text-gray-500 ml-2">
            ({dimensions}px)
          </span>
        )}
      </label>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-full w-[84px] h-[84px] mx-auto flex items-center justify-center transition-colors cursor-pointer
          border-gray-300 hover:border-purple-400 hover:bg-purple-50
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${value ? 'hidden' : ''}
        `}
        onClick={() => {
          if (disabled) return;
          if (showAvatarSelector) {
            setShowAvatarModal(true);
          } else {
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center space-y-1">
          <User className="w-5 h-5 text-gray-400" />
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">Foto</p>
            <p className="text-xs text-gray-500">
              {showAvatarSelector ? 'Escolher' : 'Clique'}
            </p>
          </div>
        </div>
      </div>

      {/* Preview da imagem */}
      {value && (
        <div className="relative inline-block mx-auto">
          <div className="w-[84px] h-[84px] rounded-full overflow-hidden border border-gray-200 bg-gray-50">
            {uploading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
              </div>
            ) : (
              <img
                src={value}
                alt="Avatar preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            )}
          </div>
          
          {/* Botão de remover */}
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={disabled || uploading}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Mensagem de erro */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Modal de seleção de avatares */}
      {showAvatarSelector && (
        <ModalSelecaoAvatar
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          onSelect={handleAvatarSelect}
        />
      )}
    </div>
  );
}
