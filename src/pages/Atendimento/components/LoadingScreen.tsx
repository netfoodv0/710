import React from 'react';
import { MessageCircle } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Verificando cache..." 
}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#111b21]">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-[#00a884] rounded-full flex items-center justify-center mb-6">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a884]"></div>
        <p className="text-[#8696a0] mt-4">{message}</p>
      </div>
    </div>
  );
};
