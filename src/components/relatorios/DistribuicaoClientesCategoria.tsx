import React, { useState, useEffect, useRef } from 'react';
import { ActionButton } from '../ui';

// Tipos para o componente
export interface CategoriaCliente {
  nome: string;
  quantidade: number;
  altura: number;
  cor: string;
}

export interface DistribuicaoClientesCategoriaProps {
  categorias: CategoriaCliente[];
  alturaMaxima?: number;
  mostrarAnimacoes?: boolean;
  className?: string;
  erro?: string | null;
  onRecarregar?: () => void;
}

// Componente para caixa colorida individual
interface ColoredBoxProps {
  categoria: CategoriaCliente;
  index: number;
  alturaMaxima: number;
  mostrarAnimacoes: boolean;
  carregamentoCompleto: boolean;
  estaRestaurando: boolean;
  estaVazio: boolean;
  categoriasIniciais: CategoriaCliente[];
}

const ColoredBox: React.FC<ColoredBoxProps> = ({ 
  categoria, 
  index, 
  alturaMaxima, 
  mostrarAnimacoes, 
  carregamentoCompleto,
  estaRestaurando,
  estaVazio,
  categoriasIniciais,
}) => {
  const [aguaBalançando] = useState(true);
  const [porcentagemAnimada, setPorcentagemAnimada] = useState(0);
  const [alturaAnimada, setAlturaAnimada] = useState(50);
  const animationRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  
  // Calcular inclinação baseada no índice
  const calcularInclinacao = (index: number): string => {
    const inclinacoes = ['0px', '-2px', '1px', '-1px'];
    return inclinacoes[index] || '0px';
  };

  // Calcular porcentagem de preenchimento
  const calcularPorcentagemPreenchimento = (altura: number): number => {
    return Math.round((altura / alturaMaxima) * 100);
  };

  // Função para animar suavemente usando requestAnimationFrame
  const animarSuavemente = (inicio: number, fim: number, duracao: number, callback: (valor: number) => void) => {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duracao, 1);
      
      // Função de easing para movimento mais natural
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = inicio + (fim - inicio) * easeOutQuart;
      
      callback(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };



  // Efeito para resetar quando estiver vazio
  useEffect(() => {
    if (estaVazio) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setPorcentagemAnimada(0);
      setAlturaAnimada(50);
      hasAnimatedRef.current = false;
    }
  }, [estaVazio]);

  // Efeito para animação de restauração
  useEffect(() => {
    if (estaRestaurando && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      
      // Limpar animação anterior se existir
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Calcular valores finais baseados nas categorias originais
      const alturaReal = categoriasIniciais[index]?.altura || 50;
      const porcentagemFinal = Math.round((alturaReal / alturaMaxima) * 100);
      
      // Começar de 0
      setPorcentagemAnimada(0);
      setAlturaAnimada(50);
      
      const duracao = 3000; // 3 segundos
      
      // Animar altura e porcentagem simultaneamente
      animarSuavemente(50, alturaReal, duracao, (valor) => {
        setAlturaAnimada(Math.round(valor));
      });
      
      animarSuavemente(0, porcentagemFinal, duracao, (valor) => {
        setPorcentagemAnimada(Math.round(valor));
      });
    }
  }, [estaRestaurando, alturaMaxima, index, categoriasIniciais]);

  // Cleanup das animações
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      hasAnimatedRef.current = false;
    };
  }, []);

  // Converter tilt para número para verificar se é negativo
  const heightValue = estaRestaurando ? alturaAnimada : categoria.altura;
  const tiltValue = parseFloat(calcularInclinacao(index).replace('px', ''));
  const isNegativeTilt = tiltValue < 0;
  const absTiltValue = Math.abs(tiltValue);
  
  // Converter inclinação em pixels para percentual baseado na altura da caixa
  const maxTiltPercentage = 80;
  const tiltPercentage = Math.min((absTiltValue / heightValue) * 100, maxTiltPercentage);

  // Cards não têm linha esquerda
  const noLeftBorder = true;

  const porcentagem = estaRestaurando ? porcentagemAnimada : calcularPorcentagemPreenchimento(heightValue);

  // CSS para animação de água balançando
  const aguaBalançandoCSS = `
    @keyframes ondulacaoSuperficie {
      0%, 100% {
        clip-path: polygon(0 var(--b), 5% calc(var(--tilt-percent) + var(--b) + 0.5px), 10% calc(var(--tilt-percent) + var(--b) + 1px), 15% calc(var(--tilt-percent) + var(--b) + 0.5px), 20% calc(var(--tilt-percent) + var(--b) + 1.5px), 25% calc(var(--tilt-percent) + var(--b) + 1px), 30% calc(var(--tilt-percent) + var(--b) + 0.5px), 35% calc(var(--tilt-percent) + var(--b) + 1px), 40% calc(var(--tilt-percent) + var(--b) + 0.5px), 45% calc(var(--tilt-percent) + var(--b) + 1.5px), 50% calc(var(--tilt-percent) + var(--b) + 1px), 55% calc(var(--tilt-percent) + var(--b) + 0.5px), 60% calc(var(--tilt-percent) + var(--b) + 1px), 65% calc(var(--tilt-percent) + var(--b) + 0.5px), 70% calc(var(--tilt-percent) + var(--b) + 1.5px), 75% calc(var(--tilt-percent) + var(--b) + 1px), 80% calc(var(--tilt-percent) + var(--b) + 0.5px), 85% calc(var(--tilt-percent) + var(--b) + 1px), 90% calc(var(--tilt-percent) + var(--b) + 0.5px), 95% calc(var(--tilt-percent) + var(--b) + 1px), 100% calc(var(--tilt-percent) + var(--b)), 100% calc(100% - var(--b)), 0 calc(100% - var(--b)));
      }
      25% {
        clip-path: polygon(0 var(--b), 5% calc(var(--tilt-percent) + var(--b) + 1px), 10% calc(var(--tilt-percent) + var(--b) + 1.5px), 15% calc(var(--tilt-percent) + var(--b) + 1px), 20% calc(var(--tilt-percent) + var(--b) + 2px), 25% calc(var(--tilt-percent) + var(--b) + 1.5px), 30% calc(var(--tilt-percent) + var(--b) + 1px), 35% calc(var(--tilt-percent) + var(--b) + 1.5px), 40% calc(var(--tilt-percent) + var(--b) + 1px), 45% calc(var(--tilt-percent) + var(--b) + 2px), 50% calc(var(--tilt-percent) + var(--b) + 1.5px), 55% calc(var(--tilt-percent) + var(--b) + 1px), 60% calc(var(--tilt-percent) + var(--b) + 1.5px), 65% calc(var(--tilt-percent) + var(--b) + 1px), 70% calc(var(--tilt-percent) + var(--b) + 2px), 75% calc(var(--tilt-percent) + var(--b) + 1.5px), 80% calc(var(--tilt-percent) + var(--b) + 1px), 85% calc(var(--tilt-percent) + var(--b) + 1.5px), 90% calc(var(--tilt-percent) + var(--b) + 1px), 95% calc(var(--tilt-percent) + var(--b) + 1.5px), 100% calc(var(--tilt-percent) + var(--b) + 0.5px), 100% calc(100% - var(--b)), 0 calc(100% - var(--b)));
      }
      50% {
        clip-path: polygon(0 var(--b), 5% calc(var(--tilt-percent) + var(--b) - 0.5px), 10% calc(var(--tilt-percent) + var(--b) - 1px), 15% calc(var(--tilt-percent) + var(--b) - 0.5px), 20% calc(var(--tilt-percent) + var(--b) - 1.5px), 25% calc(var(--tilt-percent) + var(--b) - 1px), 30% calc(var(--tilt-percent) + var(--b) - 0.5px), 35% calc(var(--tilt-percent) + var(--b) - 1px), 40% calc(var(--tilt-percent) + var(--b) - 0.5px), 45% calc(var(--tilt-percent) + var(--b) - 1.5px), 50% calc(var(--tilt-percent) + var(--b) - 1px), 55% calc(var(--tilt-percent) + var(--b) - 0.5px), 60% calc(var(--tilt-percent) + var(--b) - 1px), 65% calc(var(--tilt-percent) + var(--b) - 0.5px), 70% calc(var(--tilt-percent) + var(--b) - 1.5px), 75% calc(var(--tilt-percent) + var(--b) - 1px), 80% calc(var(--tilt-percent) + var(--b) - 0.5px), 85% calc(var(--tilt-percent) + var(--b) - 1px), 90% calc(var(--tilt-percent) + var(--b) - 0.5px), 95% calc(var(--tilt-percent) + var(--b) - 1px), 100% calc(var(--tilt-percent) + var(--b)), 100% calc(100% - var(--b)), 0 calc(100% - var(--b)));
      }
      75% {
        clip-path: polygon(0 var(--b), 5% calc(var(--tilt-percent) + var(--b) + 0.5px), 10% calc(var(--tilt-percent) + var(--b) + 1px), 15% calc(var(--tilt-percent) + var(--b) + 1.5px), 20% calc(var(--tilt-percent) + var(--b) + 1px), 25% calc(var(--tilt-percent) + var(--b) + 0.5px), 30% calc(var(--tilt-percent) + var(--b) + 1px), 35% calc(var(--tilt-percent) + var(--b) + 1.5px), 40% calc(var(--tilt-percent) + var(--b) + 1px), 45% calc(var(--tilt-percent) + var(--b) + 0.5px), 50% calc(var(--tilt-percent) + var(--b) + 1px), 55% calc(var(--tilt-percent) + var(--b) + 1.5px), 60% calc(var(--tilt-percent) + var(--b) + 1px), 65% calc(var(--tilt-percent) + var(--b) + 0.5px), 70% calc(var(--tilt-percent) + var(--b) + 1px), 75% calc(var(--tilt-percent) + var(--b) + 1.5px), 80% calc(var(--tilt-percent) + var(--b) + 1px), 85% calc(var(--tilt-percent) + var(--b) + 0.5px), 90% calc(var(--tilt-percent) + var(--b) + 1px), 95% calc(var(--tilt-percent) + var(--b) + 1.5px), 100% calc(var(--tilt-percent) + var(--b) + 0.5px), 100% calc(100% - var(--b)), 0 calc(100% - var(--b)));
      }
    }
    
    @keyframes bolhaSubindo1 {
      0% {
        transform: translateY(100%) scale(0.3);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-20px) scale(0.1);
        opacity: 0;
      }
    }
    
    @keyframes bolhaSubindo2 {
      0% {
        transform: translateY(100%) scale(0.4);
        opacity: 0;
      }
      15% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-25px) scale(0.1);
        opacity: 0;
      }
    }
    
    @keyframes bolhaSubindo3 {
      0% {
        transform: translateY(100%) scale(0.5);
        opacity: 0;
      }
      20% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-30px) scale(0.1);
        opacity: 0;
      }
    }
    
    @keyframes bolhaSubindo4 {
      0% {
        transform: translateY(100%) scale(0.35);
        opacity: 0;
      }
      12% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-22px) scale(0.1);
        opacity: 0;
      }
    }
    
    @keyframes bolhaSubindo5 {
      0% {
        transform: translateY(100%) scale(0.4);
        opacity: 0;
      }
      18% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-28px) scale(0.1);
        opacity: 0;
      }
    }
    
    @keyframes bolhaSubindo6 {
      0% {
        transform: translateY(100%) scale(0.3);
        opacity: 0;
      }
      14% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-24px) scale(0.1);
        opacity: 0;
      }
    }


  `;

  return (
    <>
      <style>{aguaBalançandoCSS}</style>
              <div
          className="relative"
          style={{
            height: `calc(${heightValue}px + 2px)`,
            '--tilt-percent': `${tiltPercentage}%`,
            '--b': '1px',
            '--altura-final': `${categoria.altura}px`,
            opacity: categoria.quantidade === 0 ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out', // Transição suave apenas para opacity
            margin: '0px',
            marginRight: '0px',
            marginLeft: '0px',
            padding: '0px',
            fontSize: '16px',
            width: 'calc(100% + 2px)',
            transform: 'translateY(2px)'
          } as React.CSSProperties}
        >
        {/* Conteúdo com "recuo" para formar a borda inclinada */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            top: 'var(--b)',
            right: 'var(--b)',
            bottom: 'var(--b)',
            left: noLeftBorder ? '0px' : 'var(--b)',
            padding: '0px',
            backgroundColor: categoria.cor,
            color: '#ffffff',
            borderRadius: index === 0 ? '0px 0px 0px 10px' : index === 3 ? '0px 0px 10px 0px' : '0px',
            clipPath: noLeftBorder
              ? 'polygon(0 var(--b), calc(100% - var(--b)) calc(var(--tilt-percent) + var(--b)), calc(100% - var(--b)) calc(100% - var(--b)), 0 calc(100% - var(--b)))'
              : isNegativeTilt
                ? 'polygon(var(--b) calc(var(--tilt-percent) + var(--b)), calc(100% - var(--b)) var(--b), calc(100% - var(--b)) calc(100% - var(--b)), var(--b) calc(100% - var(--b)))'
                : 'polygon(var(--b) var(--b), calc(100% - var(--b)) calc(var(--tilt-percent) + var(--b)), calc(100% - var(--b)) calc(100% - var(--b)), var(--b) calc(100% - var(--b)))',
            background: categoria.cor,
            boxShadow: 'none',
            animation: aguaBalançando && mostrarAnimacoes && !estaRestaurando
              ? `ondulacaoSuperficie ${3 + index * 0.3}s ease-in-out infinite`
              : 'none'
          }}
        >
          {/* Caixa de água com animação */}
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-1000 ease-out"
            style={{
              backgroundColor: '#1ac136',
              height: `${alturaAnimada}px`,
              minHeight: '10px',
              animation: mostrarAnimacoes && carregamentoCompleto && categoria.quantidade > 0 && !estaRestaurando
                ? `ondulacaoSuperficie ${2 + index * 0.2}s ease-in-out infinite`
                : 'none'
            }}
          />
          
          {/* Indicador de porcentagem no canto inferior esquerdo */}
          <div 
            className="absolute bottom-2 text-lg font-bold text-white"
            style={{ 
              zIndex: 12,
              left: '16px'
            }}
          >
            {porcentagem}%
          </div>
        </div>
      </div>
    </>
  );
};

// Componente principal
export const DistribuicaoClientesCategoria: React.FC<DistribuicaoClientesCategoriaProps> = ({
  categorias: categoriasIniciais,
  alturaMaxima = 260,
  mostrarAnimacoes = false,
  className = '',
  erro = null,
  onRecarregar
}) => {
  const [carregamentoCompleto, setCarregamentoCompleto] = useState(true);
  
  // Começar sempre vazio para mostrar animação de carregamento
  const [categorias, setCategorias] = useState<CategoriaCliente[]>(() => {
    return categoriasIniciais.map(cat => ({
      ...cat,
      quantidade: 0,
      altura: 50
    }));
  });
  
  const [estaVazio, setEstaVazio] = useState(true);
  const [estaRestaurando, setEstaRestaurando] = useState(false);
  
  // Refs para controlar timeouts e evitar múltiplas execuções
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const lastCategoriasRef = useRef<string>('');

  // Função para limpar todos os timeouts
  const limparTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  };

  // Função para verificar se as categorias realmente mudaram
  const categoriasMudaram = (novas: CategoriaCliente[], antigas: string): boolean => {
    const novasString = JSON.stringify(novas.map(cat => ({ nome: cat.nome, quantidade: cat.quantidade, altura: cat.altura })));
    return novasString !== antigas;
  };

  // Atualizar categorias quando categoriasIniciais mudar
  useEffect(() => {
    // Verificar se realmente mudou para evitar re-execuções desnecessárias
    if (!categoriasMudaram(categoriasIniciais, lastCategoriasRef.current)) {
      return;
    }

    // Limpar timeouts anteriores
    limparTimeouts();
    
    // Atualizar referência
    lastCategoriasRef.current = JSON.stringify(categoriasIniciais.map(cat => ({ 
      nome: cat.nome, 
      quantidade: cat.quantidade, 
      altura: cat.altura 
    })));
    
    // Sempre começar vazio para mostrar animação
    setCategorias(categoriasIniciais.map(cat => ({
      ...cat,
      quantidade: 0,
      altura: 50
    })));
    setEstaVazio(true);
    setEstaRestaurando(false);
    isAnimatingRef.current = false;
    
    // Aguardar um pouco e depois iniciar a animação
    timeoutRef.current = setTimeout(() => {
      if (categoriasIniciais.some(cat => cat.quantidade > 0 || cat.altura > 50) && !isAnimatingRef.current) {
        isAnimatingRef.current = true;
        setCategorias(categoriasIniciais);
        setEstaVazio(false);
        setEstaRestaurando(true);
        
        // Resetar após animação completa
        animationTimeoutRef.current = setTimeout(() => {
          setEstaRestaurando(false);
          isAnimatingRef.current = false;
        }, 3000);
      }
    }, 800); // Delay para mostrar o estado vazio
    
    return () => limparTimeouts();
  }, [categoriasIniciais]);

  // Função para carregar dados reais (só quando clicar no botão)
  const esvaziarCaixas = () => {
    if (isAnimatingRef.current) {
      return;
    }

    // Limpar timeouts anteriores
    limparTimeouts();
    
    // Primeiro esvaziar
    setCategorias(categoriasIniciais.map(cat => ({
      ...cat,
      quantidade: 0,
      altura: 50
    })));
    setEstaVazio(true);
    setEstaRestaurando(false);
    isAnimatingRef.current = false;
    
    // Depois carregar dados reais com animação
    timeoutRef.current = setTimeout(() => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        setCategorias(categoriasIniciais);
        setEstaRestaurando(true);
        
        // Resetar após animação completa
        animationTimeoutRef.current = setTimeout(() => {
          setEstaRestaurando(false);
          setEstaVazio(false);
          isAnimatingRef.current = false;
        }, 3000);
      }
    }, 800); // Delay para esvaziar completamente
  };

  // Cleanup ao desmontar o componente
  useEffect(() => {
    return () => {
      limparTimeouts();
    };
  }, []);

  if (!categorias || categorias.length === 0) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="text-center text-gray-500">
          Nenhuma categoria disponível
        </div>
      </div>
    );
  }

  // Removido o loading - sempre mostrar o conteúdo

  // Mostrar erro se houver
  if (erro) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`} style={{ height: '280px', display: 'flex', flexDirection: 'column' }}>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontSize: '12px' }}>
            Distribuição de Clientes por Categoria
          </h3>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium mb-2">Erro ao carregar dados</p>
            <p className="text-gray-600 text-sm">{erro}</p>
            <ActionButton
              label="Tentar Novamente"
              onClick={onRecarregar || (() => window.location.reload())}
              variant="primary"
              size="md"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg p-6 ${className}`} style={{ borderColor: '#cfd1d3' }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '12px' }}>Distribuição de Clientes por Categoria</h3>
      
      {/* Gráfico das caixas roxas de água */}
      <div className="flex items-end justify-center space-x-4 h-64 pb-8">
        {categorias.map((categoria, index) => (
          <ColoredBox
            key={index}
            categoria={categoria}
            index={index}
            alturaMaxima={alturaMaxima}
            mostrarAnimacoes={mostrarAnimacoes}
            carregamentoCompleto={carregamentoCompleto}
            estaRestaurando={estaRestaurando}
            estaVazio={estaVazio}
            categoriasIniciais={categoriasIniciais}
          />
        ))}
      </div>
    </div>
  );
};
