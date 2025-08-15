import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { LocationData } from '../../types/Conversation';

interface LocationMessageProps {
  location: LocationData;
  body?: string;
}

export const LocationMessage: React.FC<LocationMessageProps> = ({ location, body }) => {
  const { latitude, longitude, description } = location;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const openInWaze = () => {
    const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    window.open(url, '_blank');
  };

  const copyCoordinates = () => {
    const coordinates = `${latitude}, ${longitude}`;
    navigator.clipboard.writeText(coordinates);
    // TODO: Adicionar toast de confirmação
  };

  // Gerar URL do mapa estático (usando OpenStreetMap)
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="max-w-sm">
      <div className="rounded-lg overflow-hidden bg-gray-800 border border-gray-600/30">
        {/* Mapa estático */}
        <div className="relative h-48 bg-gray-700">
          <iframe
            src={staticMapUrl}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            title="Localização"
            onError={(e) => {
              // Fallback se o iframe falhar
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Overlay com ícone de localização */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-red-500 rounded-full p-2 shadow-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Informações da localização */}
        <div className="p-3">
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              {description && (
                <div className="text-sm font-medium text-white mb-1">
                  {description}
                </div>
              )}
              <div className="text-xs text-gray-400">
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={openInGoogleMaps}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-xs"
            >
              <ExternalLink className="w-3 h-3" />
              Google Maps
            </button>
            <button
              onClick={openInWaze}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-xs"
            >
              <Navigation className="w-3 h-3" />
              Waze
            </button>
          </div>

          <button
            onClick={copyCoordinates}
            className="w-full mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-xs text-gray-300"
          >
            Copiar coordenadas
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
