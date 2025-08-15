import React, { useState } from 'react';
import { Download, Eye, AlertCircle } from 'lucide-react';
import { MediaData } from '../../types/Conversation';

interface ImageMessageProps {
  media: MediaData;
  body?: string;
  mediaError?: string;
}

export const ImageMessage: React.FC<ImageMessageProps> = ({ media, body, mediaError }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showFullSize, setShowFullSize] = useState(false);

  if (mediaError) {
    return (
      <div className="flex items-center gap-2 p-2 bg-red-900/20 rounded-lg border border-red-500/20">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs">{mediaError}</span>
      </div>
    );
  }

  const imageUrl = `data:${media.mimetype};base64,${media.data}`;
  const fileSize = (media.filesize / 1024).toFixed(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = media.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-sm">
      <div className="relative rounded-lg overflow-hidden bg-gray-800">

        
        {imageError ? (
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <span className="text-gray-400 text-xs">Erro ao carregar imagem</span>
            </div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={media.filename}
            className={`max-w-full h-auto cursor-pointer transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            onClick={() => setShowFullSize(true)}
            style={{ maxHeight: '300px' }}
          />
        )}
        
        {imageLoaded && !imageError && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullSize(true);
              }}
              className="p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              title="Ver em tamanho completo"
            >
              <Eye className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              title="Baixar imagem"
            >
              <Download className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
      </div>
      
      {body && (
        <div className="mt-2 text-sm">
          {body}
        </div>
      )}
      
      <div className="mt-1 text-xs text-gray-400">
        📷 {media.filename} • {fileSize} KB
      </div>

      {/* Modal para imagem em tamanho completo */}
      {showFullSize && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowFullSize(false)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={imageUrl}
              alt={media.filename}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setShowFullSize(false)}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
