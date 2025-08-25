import React, { useEffect, useRef } from 'react';

interface IconCloudProps {
  images: string[];
}

export function IconCloud({ images }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Limpar container
    container.innerHTML = '';

    // Criar elementos de imagem
    images.forEach((imageSrc, index) => {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = `Icon ${index}`;
      img.className = 'absolute w-12 h-12 object-cover rounded-lg shadow-lg';
      
      // Posicionamento inicial
      const angle = (index / images.length) * Math.PI * 2;
      const radius = 80 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      img.style.transform = `translate(${x}px, ${y}px)`;
      img.style.transition = 'transform 0.3s ease-out';
      
      container.appendChild(img);
    });

    // Animação de rotação
    let time = 0;
    const animate = () => {
      images.forEach((_, index) => {
        const img = container.children[index] as HTMLElement;
        if (img) {
          const angle = (index / images.length) * Math.PI * 2 + time * 0.001;
          const radius = 80 + Math.sin(time * 0.002 + index) * 20;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          img.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      
      time += 16;
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [images]);

  return (
    <div 
      ref={containerRef}
      className="relative w-64 h-64 mx-auto"
      style={{ perspective: '1000px' }}
    />
  );
}
