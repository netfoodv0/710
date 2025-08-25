import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2, AlertCircle } from 'lucide-react';
import { MediaData } from '../../types/Conversation';

interface AudioMessageProps {
  media: MediaData;
  body?: string;
  mediaError?: string;
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ media, body, mediaError }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (mediaError) {
    return (
      <div className="flex items-center gap-2 p-2 bg-red-900/20 rounded-lg border border-red-500/20">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs">{mediaError}</span>
      </div>
    );
  }

  const audioUrl = `data:${media.mimetype};base64,${media.data}`;
  const fileSize = (media.filesize / 1024).toFixed(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setLoading(true);
    };

    const handleCanPlay = () => {
      setLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // Pausar todos os outros áudios antes de tocar este
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(a => {
          if (a !== audio) {
            a.pause();
          }
        });
        
        await audio.play();
        setIsPlaying(true);
        console.log('🎵 Áudio iniciado:', media.filename);
      }
    } catch (error) {
      console.error('❌ Erro ao reproduzir áudio:', error);
      // Tentar novamente com user interaction
      if (error.name === 'NotAllowedError') {
        console.log('🔒 Aguardando interação do usuário para reproduzir áudio');
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = media.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-w-[200px] max-w-sm">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
        isPlaying 
          ? 'bg-green-900/30 border-green-500/30 shadow-lg shadow-green-500/10' 
          : 'bg-gray-800/50 border-gray-600/30'
      }`}>
        <button
          onClick={togglePlayPause}
          disabled={loading}
          className="flex-shrink-0 w-12 h-12 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 rounded-full flex items-center justify-center transition-colors shadow-lg"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {isPlaying ? (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                </div>
              ) : (
                <Volume2 className="w-4 h-4 text-green-400" />
              )}
              <span className="text-sm text-white font-medium">
                {media.filename}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div 
            className="w-full h-2 bg-gray-600 rounded-full cursor-pointer relative group"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Indicador de progresso */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          {/* Indicador de formato */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">
              {media.mimetype.split('/')[1]?.toUpperCase() || 'AUDIO'}
            </span>
            <span className="text-xs text-gray-400">
              {fileSize} KB
            </span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="flex-shrink-0 p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Baixar áudio"
        >
          <Download className="w-3 h-3 text-gray-400" />
        </button>
      </div>

      {body && (
        <div className="mt-2 text-sm text-gray-300">
          {body}
        </div>
      )}
    </div>
  );
};
