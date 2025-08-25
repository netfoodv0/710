import React from 'react';

interface AutoCarouselProps {
  items: Array<{
    id: number;
    image: string;
    text: string;
  }>;
  height?: number;
  speed?: number;
}

export default function AutoCarousel({ 
  items, 
  height = 30, 
  speed = 20 
}: AutoCarouselProps) {
  return (
    <div className="relative overflow-hidden" style={{ height: `${height}px` }}>
      {/* Gradiente esquerdo para fade */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[rgb(245,239,242)] to-transparent z-10 pointer-events-none"></div>
      
      {/* Gradiente direito para fade */}
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[rgb(245,239,242)] to-transparent z-10 pointer-events-none"></div>
      
      <div 
        className="flex items-center space-x-4 whitespace-nowrap"
        style={{ 
          width: 'max-content',
          animation: `scroll ${speed}s linear infinite`
        }}
      >
        {/* Primeira sequência */}
        {items.map((item) => (
          <div key={`first-${item.id}`} className="flex items-center space-x-2">
            <img 
              src={item.image} 
              alt={item.text}
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-medium text-gray-700">{item.text}</span>
          </div>
        ))}
        
        {/* Segunda sequência para loop infinito */}
        {items.map((item) => (
          <div key={`second-${item.id}`} className="flex items-center space-x-2">
            <img 
              src={item.image} 
              alt={item.text}
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-medium text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
