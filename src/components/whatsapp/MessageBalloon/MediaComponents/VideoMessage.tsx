import React, { useState, useRef } from 'react';
import { Play, Download, Maximize, AlertCircle } from 'lucide-react';
import { MediaData } from '../../types/Conversation';

interface VideoMessageProps {
  media: MediaData;
  body?: string;
  mediaError?: string;
}

export const VideoMessage: React.FC<VideoMessageProps> = ({ media, body, mediaError }) => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (mediaError) {
    return (
      <div className="flex items-center gap-2 p-2 bg-red-900/20 rounded-lg border border-red-500/20">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs">{mediaError}</span>
      </div>
    );
  }

  const videoUrl = `data:${media.mimetype};base64,${media.data}`;
  const fileSize = (media.filesize / 1024).toFixed(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = media.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="max-w-sm">
      <div className="relative rounded-lg overflow-hidden bg-gray-800">
        {!videoLoaded && !videoError && (
          <div className="w-full h-48 bg-gray-700 animate-pulse flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {videoError ? (
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <span className="text-gray-400 text-xs">Erro ao carregar vídeo</span>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className={`max-w-full h-auto transition-opacity duration-200 ${
              videoLoaded ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            controls
            preload="metadata"
            onLoadedMetadata={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            style={{ maxHeight: '300px' }}
          >
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        )}

        {videoLoaded && !videoError && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullScreen();
              }}
              className="p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              title="Tela cheia"
            >
              <Maximize className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              title="Baixar vídeo"
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
        🎬 {media.filename} • {fileSize} KB
      </div>
    </div>
  );
};
