import React from 'react';
import MenuIcon from '../components/icons/MenuIcon';
import AutoCarousel from '../components/carousel/AutoCarousel';
import { IconCloudDemo } from '../components/ui/IconCloudDemo';
import { SegmentMarquee } from '../components/ui/SegmentMarquee';
import { AnimatedBeamMultipleOutputDemo } from '../components/ui/AnimatedBeamMultipleOutputs';

export default function LandingPageMobile() {
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
    <div className="h-[3000px] bg-[rgb(245,239,242)]">
      {/* Header Fixo Flutuante */}
      <header className="fixed top-6 left-6 right-6 h-[70px] bg-white/95 backdrop-blur-md rounded-2xl shadow-lg z-50">
        <div className="h-full px-[10px] flex items-center justify-between">
          <div className="w-[38px] h-[48px] bg-[#e7e6ec] rounded-[6px] flex items-center justify-center">
            <MenuIcon size={24} color="#666666" />
          </div>
          <div className="w-[230px] bg-[#fae9fd] hover:bg-purple-600 rounded-[6px] px-5 py-0 transition-all duration-500 ease-in-out cursor-pointer group hover:shadow-[0_12px_35px_rgba(147,51,234,0.7)]">
            <span className="text-[14px] font-bold text-purple-600 group-hover:text-white transition-all duration-500 ease-in-out">Experimente gratuitamente agora</span>
          </div>
          <div className="w-[38px] h-[48px] bg-[#e7e6ec] rounded-[6px] flex items-center justify-center">
            <MenuIcon size={24} color="#666666" />
          </div>
        </div>
      </header>

      {/* Espaçamento para compensar o header fixo */}
      <div className="h-[94px]"></div>
      
      {/* Título Principal */}
      <div className="mt-[150px] px-[12px] text-center">
        <h1 className="text-[37px] font-bold text-gray-900 leading-tight">
          Seu Delivery Vendendo Mais em Poucas Semanas
        </h1>
      </div>
      
      {/* Subtítulo */}
      <div className="mt-[30px] px-[12px] text-center">
        <p className="text-[15px] text-gray-700 leading-relaxed">
          Com nossa plataforma, seus pedidos aumentam e sua operação fica mais simples – sem contratar mais equipe.
        </p>
      </div>
      
      {/* Botão Principal */}
      <div className="mt-[30px] flex justify-center">
        <button className="w-[357px] h-[60px] bg-purple-600 text-white font-bold text-[16px] rounded-[16px] hover:bg-purple-700 transition-colors duration-300 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(147,51,234,0.7)]">
          Experimente gratuitamente agora
        </button>
      </div>
      
      {/* Segundo Subtítulo */}
      <div className="mt-[50px] px-[12px] text-center">
        <p className="text-[15px] text-gray-700 leading-relaxed">
          Uma plataforma nova, feita para revolucionar a experiência de delivery. Atendemos diversos segmentos:
        </p>
      </div>
      
      {/* Carrossel de Segmentos - Temporariamente oculto */}
      {/* <div className="mt-[20px]">
        <AutoCarousel 
          items={carouselItems}
          height={30}
          speed={46}
        />
      </div> */}
      
      {/* IconCloud Demo - Temporariamente oculto */}
      {/* <div className="mt-[40px] px-[12px] flex justify-center">
        <div className="w-full max-w-lg">
          <IconCloudDemo />
        </div>
      </div> */}
      
      {/* Marquee 3D dos Segmentos */}
      <div className="mt-0.5">
        <SegmentMarquee />
      </div>
      
      {/* Nova Seção - Plataforma Tudo-em-um */}
      <div className="mt-[40px] px-[12px] text-center">
        <h2 className="text-[28px] font-bold text-gray-900 leading-tight mb-[20px]">
          Sua Plataforma de Delivery Tudo-em-um
        </h2>
        <p className="text-[15px] text-gray-700 leading-relaxed">
          Gerencie pedidos, cardápio e entregas em um só lugar. Acompanhe desempenho, receba relatórios automáticos e otimize seu atendimento sem complicação – tudo em uma plataforma simples e poderosa.
        </p>
      </div>
      
      {/* Componente AnimatedBeam */}
      <div className="mt-[40px] px-[12px] flex justify-center">
        <div className="w-full max-w-lg">
          <AnimatedBeamMultipleOutputDemo />
        </div>
      </div>
    </div>
  );
}
