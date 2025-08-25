import React from 'react';
import MenuIcon from '../components/icons/MenuIcon';
import AutoCarousel from '../components/carousel/AutoCarousel';
import { IconCloudDemo } from '../components/ui/IconCloudDemo';
import { SegmentMarquee } from '../components/ui/SegmentMarquee';
import { AnimatedBeamMultipleOutputDemo } from '../components/ui/AnimatedBeamMultipleOutputs';

export default function LandingPageDesktop() {
  // Itens do carrossel com todos os segmentos
  const carouselItems = [
    { id: 1, image: '/emojis/hamburguer.png', text: 'Hamburgueria' },
    { id: 2, image: '/emojis/Açaiteria e Sorveteria.png', text: 'Açaiteria e Sorveteria' },
    { id: 3, image: '/emojis/churrascaria.png', text: 'Churrascaria' },
    { id: 4, image: '/emojis/culainaria mexicana.png', text: 'Culinária Mexicana' },
    { id: 5, image: '/emojis/Culinaria japonesa.png', text: 'Culinária Japonesa' },
    { id: 6, image: '/emojis/Doceria.png', text: 'Doceria' },
    { id: 7, image: '/emojis/Lanchonete.png', text: 'Lanchonete' },
    { id: 8, image: '/emojis/Marmitaria Fit.png', text: 'Marmitaria Fit' },
    { id: 9, image: '/emojis/Marmitex.png', text: 'Marmitex' },
    { id: 10, image: '/emojis/Pizzaria.png', text: 'Pizzaria' },
  ];

  return (
    <div className="min-h-screen bg-[rgb(245,239,242)]">
      {/* Header Fixo Flutuante */}
      <header className="fixed top-6 left-6 right-6 h-[80px] bg-white/95 backdrop-blur-md rounded-2xl shadow-lg z-50">
        <div className="h-full px-8 flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-[48px] h-[56px] bg-[#e7e6ec] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#d1d0d6] transition-colors">
            <MenuIcon size={28} color="#666666" />
          </div>
          <div className="bg-[#fae9fd] hover:bg-purple-600 rounded-[8px] px-8 py-3 transition-all duration-500 ease-in-out cursor-pointer group hover:shadow-[0_12px_35px_rgba(147,51,234,0.7)]">
            <span className="text-[16px] font-bold text-purple-600 group-hover:text-white transition-all duration-500 ease-in-out">Experimente gratuitamente agora</span>
          </div>
          <div className="w-[48px] h-[56px] bg-[#e7e6ec] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#d1d0d6] transition-colors">
            <MenuIcon size={28} color="#666666" />
          </div>
        </div>
      </header>

      {/* Espaçamento para compensar o header fixo */}
      <div className="h-[104px]"></div>
      
      {/* Título Principal */}
      <div className="mt-[120px] px-8 text-center max-w-6xl mx-auto">
        <h1 className="text-[56px] font-bold text-gray-900 leading-tight">
          Seu Delivery Vendendo Mais em Poucas Semanas
        </h1>
      </div>
      
      {/* Subtítulo */}
      <div className="mt-[40px] px-8 text-center max-w-4xl mx-auto">
        <p className="text-[20px] text-gray-700 leading-relaxed">
          Com nossa plataforma, seus pedidos aumentam e sua operação fica mais simples – sem contratar mais equipe.
        </p>
      </div>
      
      {/* Botão Principal */}
      <div className="mt-[40px] flex justify-center">
        <button className="w-[400px] h-[70px] bg-purple-600 text-white font-bold text-[18px] rounded-[20px] hover:bg-purple-700 transition-colors duration-300 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(147,51,234,0.7)]">
          Experimente gratuitamente agora
        </button>
      </div>
      
      {/* Segundo Subtítulo */}
      <div className="mt-[60px] px-8 text-center max-w-4xl mx-auto">
        <p className="text-[18px] text-gray-700 leading-relaxed">
          Uma plataforma nova, feita para revolucionar a experiência de delivery. Atendemos diversos segmentos:
        </p>
      </div>
      
      {/* Marquee 3D dos Segmentos */}
      <div className="mt-8">
        <SegmentMarquee />
      </div>
      
      {/* Nova Seção - Plataforma Tudo-em-um */}
      <div className="mt-[60px] px-8 text-center max-w-5xl mx-auto">
        <h2 className="text-[40px] font-bold text-gray-900 leading-tight mb-[30px]">
          Sua Plataforma de Delivery Tudo-em-um
        </h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-[40px]">
          Gerencie pedidos, cardápio e entregas em um só lugar. Acompanhe desempenho, receba relatórios automáticos e otimize seu atendimento sem complicação – tudo em uma plataforma simples e poderosa.
        </p>
      </div>
      
      {/* Componente AnimatedBeam */}
      <div className="mt-[60px] px-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <AnimatedBeamMultipleOutputDemo />
        </div>
      </div>
      
      {/* Espaçamento final */}
      <div className="h-[100px]"></div>
    </div>
  );
}
