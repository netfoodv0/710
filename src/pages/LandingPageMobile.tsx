import React, { Suspense, lazy } from 'react';
import MenuIcon from '../components/icons/MenuIcon';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

// Lazy loading dos componentes pesados
const AutoCarousel = lazy(() => import('../components/carousel/AutoCarousel'));
const IconCloudDemo = lazy(() => import('../components/ui/IconCloudDemo').then(module => ({ default: module.IconCloudDemo })));
const SegmentMarquee = lazy(() => import('../components/ui/SegmentMarquee').then(module => ({ default: module.SegmentMarquee })));

// Componente de loading otimizado
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

// Componente de fallback para componentes pesados
const ComponentFallback = ({ children, fallback = <LoadingSpinner /> }: { children: React.ReactNode; fallback?: React.ReactNode }) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

export default function LandingPageMobile() {
  const [isVisible, setIsVisible] = useState(false);

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

  // Otimização: carregar componentes apenas quando visíveis
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(245,239,242)] landing-mobile-optimized">
      {/* Header Fixo Flutuante */}
      <header className="fixed top-6 left-6 right-6 h-[70px] bg-white/95 backdrop-blur-optimized rounded-2xl shadow-optimized z-50">
        <div className="h-full px-[10px] flex items-center justify-center">
          <div className="w-[38px] h-[48px] bg-[#e7e6ec] rounded-[6px] flex items-center justify-center">
            <MenuIcon size={24} color="#666666" />
          </div>
          <div className="w-[230px] bg-[#fae9fd] hover:bg-purple-600 rounded-[6px] px-5 py-0 transition-optimized cursor-pointer group hover:shadow-hover-optimized">
            <span className="text-[14px] font-bold text-purple-600 group-hover:text-white transition-optimized">Experimente gratuitamente agora</span>
          </div>
          <div className="w-[38px] h-[48px] bg-[#e7e6ec] rounded-[6px] flex items-center justify-center">
            <MenuIcon size={24} color="#666666" />
          </div>
        </div>
      </header>

      {/* Espaçamento para compensar o header fixo */}
      <div className="h-[94px]"></div>
      
      {/* Título Principal */}
      <div className="mt-[150px] px-[12px] text-center fade-in-mobile">
        <h1 className="text-[37px] font-bold text-gray-900 leading-tight text-optimized">
          Seu Delivery Vendendo Mais em Poucas Semanas
        </h1>
      </div>
      
      {/* Subtítulo */}
      <div className="mt-[30px] px-[12px] text-center slide-up-mobile">
        <p className="text-[15px] text-gray-700 leading-relaxed text-optimized">
          Com nossa plataforma, seus pedidos aumentam e sua operação fica mais simples – sem contratar mais equipe.
        </p>
      </div>
      
      {/* Botão Principal */}
      <div className="mt-[30px] flex justify-center">
        <button className="w-[357px] h-[60px] bg-purple-600 text-white font-bold text-[16px] rounded-[16px] hover:bg-purple-700 transition-optimized cursor-pointer shadow-optimized hover:shadow-hover-optimized">
          Experimente gratuitamente agora
        </button>
      </div>
      
      {/* Segundo Subtítulo */}
      <div className="mt-[50px] px-[12px] text-center slide-up-mobile">
        <p className="text-[15px] text-gray-700 leading-relaxed text-optimized">
          Uma plataforma nova, feita para revolucionar a experiência de delivery. Atendemos diversos segmentos:
        </p>
      </div>
      
      {/* Marquee 3D dos Segmentos - Otimizado com lazy loading */}
      {isVisible && (
        <div className="mt-0.5">
          <ComponentFallback>
            <SegmentMarquee />
          </ComponentFallback>
        </div>
      )}
      
      {/* Nova Seção - Plataforma Tudo-em-um */}
      <div className="mt-[40px] px-[12px] text-center slide-up-mobile">
        <h2 className="text-[28px] font-bold text-gray-900 leading-tight mb-[20px] text-optimized">
          Sua Plataforma de Delivery Tudo-em-um
        </h2>
        <p className="text-[15px] text-gray-700 leading-relaxed text-optimized">
          Gerencie pedidos, cardápio e entregas em um só lugar. Acompanhe desempenho, receba relatórios automáticos e otimize seu atendimento sem complicação – tudo em uma plataforma simples e poderosa.
        </p>
      </div>
      
      {/* Componente AnimatedBeam - Temporariamente removido para otimização */}
      <div className="mt-[40px] px-[12px] flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-gradient-to-b from-white to-[#f5eff2] rounded-2xl p-8 shadow-optimized text-center border-radius-optimized">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-optimized">Plataforma Integrada</h3>
            <p className="text-gray-700 text-optimized">
              Gerencie pedidos, cardápio e entregas em um só lugar com nossa plataforma completa.
            </p>
          </div>
        </div>
      </div>

      {/* Espaçamento final */}
      <div className="h-20"></div>
    </div>
  );
}
