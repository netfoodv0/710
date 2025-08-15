import { useState } from 'react';

interface AvatarProps {
  width: string;
  height: string;
  image: string;
  name?: string;
}

export default function Avatar(props: AvatarProps) {
  const { width, height, image, name } = props;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Gerar iniciais do nome
  const getInitials = (imageName: string, displayName?: string) => {
    // Se temos um nome de exibição, usar ele
    if (displayName && displayName.trim()) {
      const name = displayName.trim();
      // Pegar apenas a primeira letra ou número
      const firstChar = name[0];
      
      // Se for número, retornar o número
      if (/[0-9]/.test(firstChar)) {
        return firstChar;
      }
      
      // Se for letra, retornar em maiúsculo
      if (/[a-zA-Z]/.test(firstChar)) {
        return firstChar.toUpperCase();
      }
      
      // Se for outro caractere (como +), tentar pegar a primeira letra válida
      for (let i = 0; i < name.length; i++) {
        const char = name[i];
        if (/[a-zA-Z0-9]/.test(char)) {
          return /[0-9]/.test(char) ? char : char.toUpperCase();
        }
      }
      
      // Se não encontrar letra ou número, retornar ?
      return '?';
    }
    
    // Fallback para o nome da imagem
    if (!imageName) return '?';
    
    // Remover extensão e pegar apenas o nome
    const name = imageName.split('.')[0];
    
    // Se for apenas uma letra, duplicar
    if (name.length === 1) return name.toUpperCase() + name.toUpperCase();
    
    // Pegar primeira e última letra
    if (name.length >= 2) {
      return (name[0] + name[name.length - 1]).toUpperCase();
    }
    
    return name.toUpperCase();
  };

  // Gerar cor baseada no nome
  const getAvatarColor = (imageName: string, displayName?: string) => {
    const nameToUse = displayName || imageName;
    if (!nameToUse) return 'bg-gray-400';
    
    // Se o nome começa com número, usar cores específicas para números
    const firstChar = nameToUse.trim()[0];
    if (/[0-9]/.test(firstChar)) {
      const numberColors = [
        'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500',
        'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
      ];
      const numberIndex = parseInt(firstChar);
      return numberColors[numberIndex] || 'bg-gray-500';
    }
    
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < nameToUse.length; i++) {
      hash = nameToUse.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <div className={`rounded-full ${width} ${height} flex items-center justify-center text-white font-medium text-lg overflow-hidden transition-all duration-200 hover:scale-105`}>
      {/* Sempre mostrar iniciais */}
      <div className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(image, name)}`}>
        {/* Se for número, não mostrar texto */}
        {(() => {
          const initials = getInitials(image, name);
          const isNumber = /[0-9]/.test(initials);
          return !isNumber ? <span className="text-sm">{initials}</span> : null;
        })()}
      </div>
    </div>
  )
}