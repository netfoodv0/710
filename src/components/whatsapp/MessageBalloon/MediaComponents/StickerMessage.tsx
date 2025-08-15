import React, { useState } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { MediaData } from '../../types/Conversation';

interface StickerMessageProps {
  media: MediaData;
  body?: string;
  mediaError?: string;
}

export const StickerMessage: React.FC<StickerMessageProps> = ({ media, body, mediaError }) => {
  const [stickerLoaded, setStickerLoaded] = useState(false);
  const [stickerError, setStickerError] = useState(false);

  if (mediaError) {
    return (
      <div className="flex items-center gap-2 p-2 bg-red-900/20 rounded-lg border border-red-500/20">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs">{mediaError}</span>
      </div>
    );
  }

  const stickerUrl = `data:${media.mimetype};base64,${media.data}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = stickerUrl;
    link.download = media.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="inline-block">
      <div className="relative group">
        {!stickerLoaded && !stickerError && (
          <div className="w-32 h-32 bg-gray-700 animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">🎭</span>
          </div>
        )}

        {stickerError ? (
          <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <span className="text-gray-400 text-xs">Erro</span>
            </div>
          </div>
        ) : (
          <img
            src={stickerUrl}
            alt="Sticker"
            className={`w-32 h-32 object-contain transition-opacity duration-200 ${
              stickerLoaded ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            onLoad={() => setStickerLoaded(true)}
            onError={() => setStickerError(true)}
            style={{ 
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              maxWidth: '128px',
              maxHeight: '128px'
            }}
          />
        )}

        {stickerLoaded && !stickerError && (
          <button
            onClick={handleDownload}
            className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all"
            title="Baixar sticker"
          >
            <Download className="w-3 h-3 text-white" />
          </button>
        )}
      </div>

      {body && (
        <div className="mt-2 text-sm max-w-32">
          {body}
        </div>
      )}
    </div>
  );
};
