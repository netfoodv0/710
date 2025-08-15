// React
import React, { useContext, useEffect } from 'react';

// Componentes WhatsApp
import { ConversationProvider, ConversationContext } from '../components/whatsapp';
import { WhatsAppAuth } from '../components/whatsapp/WhatsAppAuth';
import SideBar from '../components/whatsapp/SideBar';
import ConversationDetails from '../components/whatsapp/ConversationDetails';

// Componentes locais
import { LoadingScreen, HomeIcon, ConnectionStatus } from './Atendimento/components';

// Hooks
import { useAuthLogic } from './Atendimento/hooks';


// Contexto do robô
import { BotProvider } from '../context/botContext';



// Estilos
import './Atendimento.css';


export function Atendimento() {
  return (
    <div className="w-full h-screen m-0 p-0 overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Interface do WhatsApp ocupando 100% da tela */}
      <BotProvider>
        <ConversationProvider>
          <WhatsAppInterface />
        </ConversationProvider>
      </BotProvider>
    </div>
  );
}

// Componente interno que usa o contexto
function WhatsAppInterface() {
  const { conversation } = useContext(ConversationContext);
  const { 
    isAuthenticated, 
    setIsAuthenticated, 
    isCheckingCache, 
    isConnected, 
    handleReconnect 
  } = useAuthLogic();






  // IMPORTANTE: Se não estiver autenticado, mostrar APENAS a tela de autenticação
  // Sem renderizar nenhuma interface do WhatsApp
  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen">
        <WhatsAppAuth 
          onAuthenticated={setIsAuthenticated}
        />
      </div>
    );
  }

  // Só mostrar a interface do WhatsApp se estiver autenticado
  return (
    <div className="flex w-full h-screen">
      <div className="flex w-full h-screen relative">
        <SideBar />
        <div className="flex flex-1 bg-[#222E35]">
          {
            conversation.contactName
              ? <ConversationDetails />
              : (
                <div className="flex flex-col w-full h-full">
                  <HomeIcon />
                  <ConnectionStatus 
                    isConnected={isConnected} 
                    onReconnect={handleReconnect}
                  />
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}
