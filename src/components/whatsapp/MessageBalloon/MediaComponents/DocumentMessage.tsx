import React from 'react';
import { Download, File, FileText, Archive, AlertCircle } from 'lucide-react';
import { MediaData } from '../../types/Conversation';

interface DocumentMessageProps {
  media: MediaData;
  body?: string;
  mediaError?: string;
}

export const DocumentMessage: React.FC<DocumentMessageProps> = ({ media, body, mediaError }) => {
  if (mediaError) {
    return (
      <div className="flex items-center gap-2 p-2 bg-red-900/20 rounded-lg border border-red-500/20">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-xs">{mediaError}</span>
      </div>
    );
  }

  const fileSize = (media.filesize / 1024).toFixed(1);
  const fileSizeMB = media.filesize > 1024 * 1024 ? (media.filesize / (1024 * 1024)).toFixed(1) + ' MB' : fileSize + ' KB';

  const getFileIcon = () => {
    const mimetype = media.mimetype.toLowerCase();
    
    if (mimetype.includes('pdf')) {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else if (mimetype.includes('word') || mimetype.includes('document')) {
      return <FileText className="w-8 h-8 text-blue-500" />;
    } else if (mimetype.includes('excel') || mimetype.includes('spreadsheet')) {
      return <FileText className="w-8 h-8 text-green-500" />;
    } else if (mimetype.includes('powerpoint') || mimetype.includes('presentation')) {
      return <FileText className="w-8 h-8 text-orange-500" />;
    } else if (mimetype.includes('zip') || mimetype.includes('rar') || mimetype.includes('archive')) {
      return <Archive className="w-8 h-8 text-purple-500" />;
    } else {
      return <File className="w-8 h-8 text-gray-400" />;
    }
  };

  const getFileTypeLabel = () => {
    const mimetype = media.mimetype.toLowerCase();
    
    if (mimetype.includes('pdf')) return 'PDF';
    if (mimetype.includes('word')) return 'Word';
    if (mimetype.includes('excel')) return 'Excel';
    if (mimetype.includes('powerpoint')) return 'PowerPoint';
    if (mimetype.includes('zip')) return 'ZIP';
    if (mimetype.includes('rar')) return 'RAR';
    
    // Extrair extensão do filename
    const extension = media.filename.split('.').pop()?.toUpperCase();
    return extension || 'Arquivo';
  };

  const handleDownload = () => {
    const dataUrl = `data:${media.mimetype};base64,${media.data}`;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = media.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    // Para PDFs, podemos abrir em nova aba
    if (media.mimetype.includes('pdf')) {
      const dataUrl = `data:${media.mimetype};base64,${media.data}`;
      window.open(dataUrl, '_blank');
    } else {
      // Para outros tipos, fazer download
      handleDownload();
    }
  };

  return (
    <div className="min-w-[250px] max-w-sm">
      <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
        <div className="flex-shrink-0">
          {getFileIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">
            {media.filename}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {getFileTypeLabel()} • {fileSizeMB}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {media.mimetype}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {media.mimetype.includes('pdf') && (
            <button
              onClick={handlePreview}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              title="Visualizar"
            >
              <FileText className="w-3 h-3 text-white" />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
            title="Baixar arquivo"
          >
            <Download className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {body && (
        <div className="mt-2 text-sm">
          {body}
        </div>
      )}
    </div>
  );
};
