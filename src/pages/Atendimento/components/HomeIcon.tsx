import React from 'react';
import { MessageCircle } from 'lucide-react';

export const HomeIcon: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-20 h-20 bg-[#00a884] rounded-full flex items-center justify-center mb-6">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-[#e9edef] text-3xl font-extralight mb-4">WhatsApp Web</h1>
        
        <div className="space-y-3 text-[#8696a0] text-base font-light mb-6">
          <p>Agora você pode enviar e receber mensagens sem precisar manter seu celular conectado à internet</p>
          <p>Use o WhatsApp em até quatro aparelhos conectados e um celular ao mesmo tempo.</p>
        </div>
        
        <div className="border-b border-[rgba(134,150,160,0.15)] w-full mb-6"></div>

        <div className="flex items-center gap-2 text-[#8696a0] text-sm">
          <svg viewBox="0 0 21 18" width="21" height="18">
            <path fill="currentColor" d="M10.426 14.235a.767.767 0 0 1-.765-.765c0-.421.344-.765.765-.765s.765.344.765.765-.344.765-.765.765zM4.309 3.529h12.235v8.412H4.309V3.529zm12.235 9.942c.841 0 1.522-.688 1.522-1.529l.008-8.412c0-.842-.689-1.53-1.53-1.53H4.309c-.841 0-1.53.688-1.53 1.529v8.412c0 .841.688 1.529 1.529 1.529H1.25c0 .842.688 1.53 1.529 1.53h15.294c.841 0 1.529-.688 1.529-1.529h-3.058z">
            </path>
          </svg>
          <span className="font-light">Make calls from desktop with WhatsApp for Windows. <a href="https://www.whatsapp.com/download" className="text-[#53bdeb]">Baixe Aqui</a></span>
        </div>
      </div>
    </div>
  );
};
