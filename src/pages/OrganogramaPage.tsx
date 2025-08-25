import React, { useState, useRef, useEffect } from 'react';
import { INode, ReactHiererchyChart } from 'react-hierarchy-chart';
import "../styles/organograma.css";
import { avataresDisponiveis } from '../components/modals/avatarData';
import { useAuth } from '../hooks/useAuth';
import { useLoja } from '../context/lojaContext';
import { ModalCriarUsuario } from '../components/modals/ModalCriarUsuario';

interface OrganogramaNode extends INode {
  nome: string;
  cargo: string;
  avatar?: string;
  childs?: OrganogramaNode[];
}

interface UsuarioData {
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
  funcao: string;
  avatar: string;
}

const OrganogramaPage: React.FC = () => {
  const { user } = useAuth();
  const { loja } = useLoja();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.6);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nodes: OrganogramaNode[] = [
    {
      key: "1",
      nome: loja?.nomeLoja || 'Minha Loja',
      cargo: 'Dono',
      avatar: avataresDisponiveis[0]?.svg,
      cssClass: 'nivel-1',
      childs: [
        {
          key: "2",
          nome: 'Carlos Ferreira',
          cargo: 'Supervisor',
          avatar: avataresDisponiveis[1]?.svg,
          cssClass: 'nivel-2',
          childs: [
            {
              key: "3",
              nome: 'João Silva',
              cargo: 'Gerente',
              avatar: avataresDisponiveis[2]?.svg,
              cssClass: 'nivel-3',
              childs: [
                {
                  key: "4",
                  nome: 'Maria Santos',
                  cargo: 'Atendente',
                  avatar: avataresDisponiveis[3]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "5",
                  nome: 'Fernanda Lima',
                  cargo: 'Atendente',
                  avatar: avataresDisponiveis[4]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "6",
                  nome: 'Patrícia Costa',
                  cargo: 'Atendente',
                  avatar: avataresDisponiveis[5]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "7",
                  nome: 'Amanda Silva',
                  cargo: 'Atendente',
                  avatar: avataresDisponiveis[6]?.svg,
                  cssClass: 'nivel-4'
                }
              ]
            },
            {
              key: "8",
              nome: 'Juliana Pereira',
              cargo: 'Gerente',
              avatar: avataresDisponiveis[7]?.svg,
              cssClass: 'nivel-3',
              childs: [
                {
                  key: "9",
                  nome: 'Rafael Santos',
                  cargo: 'Supervisor',
                  avatar: avataresDisponiveis[8]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "10",
                  nome: 'Pedro Oliveira',
                  cargo: 'Cozinheiro',
                  avatar: avataresDisponiveis[9]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "11",
                  nome: 'Roberto Almeida',
                  cargo: 'Cozinheiro',
                  avatar: avataresDisponiveis[10]?.svg,
                  cssClass: 'nivel-4'
                }
              ]
            },
            {
              key: "12",
              nome: 'Camila Rocha',
              cargo: 'Gerente',
              avatar: avataresDisponiveis[11]?.svg,
              cssClass: 'nivel-3',
              childs: [
                {
                  key: "13",
                  nome: 'Diego Souza',
                  cargo: 'Cozinheiro',
                  avatar: avataresDisponiveis[12]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "14",
                  nome: 'Thiago Oliveira',
                  cargo: 'Cozinheiro',
                  avatar: avataresDisponiveis[13]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "15",
                  nome: 'Ana Costa',
                  cargo: 'Atendente',
                  avatar: avataresDisponiveis[14]?.svg,
                  cssClass: 'nivel-4'
                },
                {
                  key: "16",
                  nome: 'Lucas Mendes',
                  cargo: 'Atendente',
                  avatar: avataresDisponiveis[15]?.svg,
                  cssClass: 'nivel-4'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  // Dados fictícios para os usuários (como na tabela de operadores)
  const dadosUsuarios: Record<string, UsuarioData> = {
    'Camila Rocha': {
      nome: 'Camila Rocha',
      email: 'camila.rocha@restaurante.com',
      whatsapp: '(11) 00000-0000',
      cpf: '111.111.111-11',
      funcao: 'gerente',
      avatar: avataresDisponiveis[1]?.svg || ''
    },
    'João Silva': {
      nome: 'João Silva',
      email: 'joao.silva@restaurante.com',
      whatsapp: '(11) 99999-1111',
      cpf: '987.654.321-00',
      funcao: 'gerente',
      avatar: avataresDisponiveis[2]?.svg || ''
    },
    'Maria Santos': {
      nome: 'Maria Santos',
      email: 'maria.santos@restaurante.com',
      whatsapp: '(11) 88888-2222',
      cpf: '111.222.333-44',
      funcao: 'atendente',
      avatar: avataresDisponiveis[3]?.svg || ''
    },
    'Fernanda Lima': {
      nome: 'Fernanda Lima',
      email: 'fernanda.lima@restaurante.com',
      whatsapp: '(11) 44444-6666',
      cpf: '222.333.444-55',
      funcao: 'atendente',
      avatar: avataresDisponiveis[4]?.svg || ''
    },
    'Patrícia Costa': {
      nome: 'Patrícia Costa',
      email: 'patricia.costa@restaurante.com',
      whatsapp: '(11) 98765-4321',
      cpf: '333.444.555-66',
      funcao: 'atendente',
      avatar: avataresDisponiveis[5]?.svg || ''
    },
    'Amanda Silva': {
      nome: 'Amanda Silva',
      email: 'amanda.silva@restaurante.com',
      whatsapp: '(11) 44444-5678',
      cpf: '444.555.666-77',
      funcao: 'atendente',
      avatar: avataresDisponiveis[6]?.svg || ''
    },
    'Carlos Ferreira': {
      nome: 'Carlos Ferreira',
      email: 'carlos.ferreira@restaurante.com',
      whatsapp: '(11) 55555-5555',
      cpf: '123.456.789-00',
      funcao: 'supervisor',
      avatar: avataresDisponiveis[7]?.svg || ''
    },
    'Juliana Pereira': {
      nome: 'Juliana Pereira',
      email: 'juliana.pereira@restaurante.com',
      whatsapp: '(11) 22222-8888',
      cpf: '555.666.777-88',
      funcao: 'supervisor',
      avatar: avataresDisponiveis[8]?.svg || ''
    },
    'Rafael Santos': {
      nome: 'Rafael Santos',
      email: 'rafael.santos@restaurante.com',
      whatsapp: '(11) 55555-1234',
      cpf: '666.777.888-99',
      funcao: 'supervisor',
      avatar: avataresDisponiveis[9]?.svg || ''
    },
    'Pedro Oliveira': {
      nome: 'Pedro Oliveira',
      email: 'pedro.oliveira@restaurante.com',
      whatsapp: '(11) 77777-3333',
      cpf: '777.888.999-00',
      funcao: 'cozinheiro',
      avatar: avataresDisponiveis[10]?.svg || ''
    },
    'Roberto Almeida': {
      nome: 'Roberto Almeida',
      email: 'roberto.almeida@restaurante.com',
      whatsapp: '(11) 33333-7777',
      cpf: '888.999.000-11',
      funcao: 'cozinheiro',
      avatar: avataresDisponiveis[11]?.svg || ''
    },
    'Diego Souza': {
      nome: 'Diego Souza',
      email: 'diego.souza@restaurante.com',
      whatsapp: '(11) 12345-6789',
      cpf: '999.000.111-22',
      funcao: 'cozinheiro',
      avatar: avataresDisponiveis[12]?.svg || ''
    },
    'Thiago Oliveira': {
      nome: 'Thiago Oliveira',
      email: 'thiago.oliveira@restaurante.com',
      whatsapp: '(11) 33333-9012',
      cpf: '000.111.222-33',
      funcao: 'cozinheiro',
      avatar: avataresDisponiveis[13]?.svg || ''
    },
    'Ana Costa': {
      nome: 'Ana Costa',
      email: 'ana.costa@restaurante.com',
      whatsapp: '(11) 66666-4444',
      cpf: '999.888.777-66',
      funcao: 'atendente',
      avatar: avataresDisponiveis[14]?.svg || ''
    },
    'Lucas Mendes': {
      nome: 'Lucas Mendes',
      email: 'lucas.mendes@restaurante.com',
      whatsapp: '(11) 11111-9999',
      cpf: '888.777.666-55',
      funcao: 'atendente',
      avatar: avataresDisponiveis[15]?.svg || ''
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Botão esquerdo do mouse
      setIsDragging(true);
      setLastPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastPosition.x;
      const deltaY = e.clientY - lastPosition.y;
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => {
      const newZoom = Math.min(3, prev + 0.2);
      console.log('Zoom in:', { prev, newZoom });
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(0.3, prev - 0.2);
      console.log('Zoom out:', { prev, newZoom });
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    // Forçar o reset do zoom e posição
    setZoom(0.6);
    setPosition({ x: 0, y: 0 });
    
    // Reset adicional com timeout para garantir
    setTimeout(() => {
      setZoom(0.6);
      setPosition({ x: 0, y: 0 });
    }, 50);
    
    console.log('Reset zoom aplicado:', { zoom: 0.6, position: { x: 0, y: 0 } });
  };

  const handleCardClick = (node: OrganogramaNode) => {
    console.log('🎯 handleCardClick chamado para:', node.nome);
    
    // Buscar dados completos do usuário
    const dadosCompletos = dadosUsuarios[node.nome];
    console.log('📊 Dados encontrados:', dadosCompletos);
    
    if (dadosCompletos) {
      setUsuarioSelecionado(dadosCompletos);
      console.log('✅ Usando dados completos');
    } else {
      // Se não encontrar dados, usar apenas as informações básicas do nó
      const dadosBasicos = {
        nome: node.nome,
        email: '',
        whatsapp: '',
        cpf: '',
        funcao: node.cargo.toLowerCase().replace(/\s+/g, ''),
        avatar: node.avatar || ''
      };
      setUsuarioSelecionado(dadosBasicos);
      console.log('⚠️ Usando dados básicos:', dadosBasicos);
    }
    
    setIsModalOpen(true);
    console.log('🚀 Modal aberto, estado:', { isModalOpen: true, usuarioSelecionado: dadosCompletos || 'dados básicos' });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUsuarioSelecionado(null);
  };

  const handleModalSubmit = (usuarioData: UsuarioData) => {
    console.log('Dados do usuário:', usuarioData);
    // Aqui você implementaria a lógica para salvar/editar o usuário
    handleModalClose();
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const zoomFactor = 0.15;
      const currentZoom = zoom;
      const newZoom = e.deltaY > 0 ? currentZoom - zoomFactor : currentZoom + zoomFactor;
      const clampedZoom = Math.max(0.3, Math.min(3, newZoom));
      
      setZoom(clampedZoom);
      console.log('Wheel zoom funcionando:', { 
        deltaY: e.deltaY, 
        oldZoom: currentZoom, 
        newZoom: clampedZoom,
        timestamp: Date.now()
      });
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    // Adicionar listener de wheel no container do organograma
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      console.log('Wheel listener adicionado ao container');
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        console.log('Wheel listener removido do container');
      }
    };
  }, [zoom]);

  // Reset zoom e posição quando a página carregar
  useEffect(() => {
    // Reset inicial do zoom e posição com delay para garantir que o componente esteja montado
    const timer = setTimeout(() => {
      setZoom(0.6);
      setPosition({ x: 0, y: 0 });
      setIsInitialized(true);
      console.log('Zoom inicial resetado para 60% e componente inicializado');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Esconder scrollbars do navegador
  useEffect(() => {
    // Adicionar CSS global para esconder scrollbars
    const style = document.createElement('style');
    style.textContent = `
      body {
        overflow: hidden !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      body::-webkit-scrollbar {
        display: none !important;
      }
      html {
        overflow: hidden !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      html::-webkit-scrollbar {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderNode = (node: OrganogramaNode) => {
    return (
      <div 
        className="node-template cursor-pointer hover:scale-105 transition-transform duration-200"
        onMouseUp={(e) => {
          e.stopPropagation();
          handleCardClick(node);
        }}
      >
        <div className="node-avatar">
          {node.avatar ? (
            <>
              <img 
                src={node.avatar} 
                alt={node.nome}
                className="avatar-image"
                onError={(e) => {
                  // Fallback para iniciais se a imagem falhar
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div className="avatar-placeholder" style={{ display: 'none' }}>
                {node.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            </>
          ) : (
            <div className="avatar-placeholder">
              {node.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          )}
        </div>
        <div className="node-inner-card">
          <div className="node-content">
            <span className="nome">{node.nome}</span>
          </div>
          <div className="node-header">
            <strong className="cargo">{node.cargo}</strong>
          </div>
        </div>
      </div>
    );
  };

  // Aguardar carregamento dos dados da loja
  if (!loja) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando organograma...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white overflow-hidden relative"
         style={{
           backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><defs><pattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'><path d='M 20 0 L 0 0 0 20' fill='none' stroke='%236b7280' stroke-width='0.5' opacity='0.3'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grid)'/></svg>")`,
           backgroundAttachment: 'fixed',
           backgroundRepeat: 'repeat',
           backgroundSize: '20px 20px',
           scrollbarWidth: 'none', /* Firefox */
           msOverflowStyle: 'none', /* IE and Edge */
           overflow: 'hidden'
         }}
         onWheel={(e) => e.preventDefault()}>
      {/* Controles de Zoom */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={handleResetZoom}
          className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center"
          title="Reset Zoom e Posição"
        >
          ↺
        </button>
        <div className="w-10 h-8 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm flex items-center justify-center border border-gray-300">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing organograma-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const zoomFactor = 0.15;
          const currentZoom = zoom;
          const newZoom = e.deltaY > 0 ? currentZoom - zoomFactor : currentZoom + zoomFactor;
          const clampedZoom = Math.max(0.3, Math.min(3, newZoom));
          
          setZoom(clampedZoom);
          console.log('Wheel zoom direto:', { 
            deltaY: e.deltaY, 
            oldZoom: currentZoom, 
            newZoom: clampedZoom,
            timestamp: Date.now()
          });
        }}
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
          overflow: 'hidden'
        }}
      >
        <div 
          className="w-full h-full p-6 organograma-content"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
            overflow: 'visible',
            minHeight: '100%',
            minWidth: '100%'
          }}
        >
          <ReactHiererchyChart 
            nodes={nodes} 
            direction="vertical"
            randerNode={renderNode} 
          />
        </div>
      </div>

      {/* Modal para criar/editar usuário */}
      <ModalCriarUsuario
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        usuarioEditando={usuarioSelecionado}
      />
    </div>
  );
};

export default OrganogramaPage;
