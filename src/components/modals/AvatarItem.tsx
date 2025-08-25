import React, { useState } from 'react';

interface Avatar {
  id: string;
  name: string;
  svg: string;
}

interface AvatarItemProps {
  avatar: Avatar;
  onSelect: (avatar: Avatar) => void;
}

export function AvatarItem({ avatar, onSelect }: AvatarItemProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div
      onClick={() => onSelect(avatar)}
      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition-colors"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-2">
        {!imageError ? (
          <img
            src={avatar.svg}
            alt={avatar.name}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-medium bg-purple-100">
            {getInitials(avatar.name)}
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <span className="text-sm text-gray-700 text-center font-medium">
        {avatar.name}
      </span>
    </div>
  );
}
