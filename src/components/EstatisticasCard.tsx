import React from 'react';

interface EstatisticasCardProps {
  titulo: string;
  valor: string | number;
  icone: React.ReactNode;
}

const EstatisticasCard: React.FC<EstatisticasCardProps> = ({ 
  titulo, 
  valor, 
  icone 
}) => {
  const getAvatarClasses = () => {
    return 'bg-gray-100';
  };

  const getIconClasses = () => {
    return 'text-gray-600';
  };

  return (
         <div className="flex-1 bg-white rounded-lg p-4 relative" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
             <div className="text-left h-full flex flex-col justify-between">
         <p className="text-xs font-normal text-gray-600">{titulo}</p>
         <p className="text-lg font-bold text-gray-900">
           {valor}
         </p>
       </div>
      
             {/* Avatar posicionado no topo direito e centralizado verticalmente */}
       <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
         <div className={`p-2 ${getAvatarClasses()} rounded-full`}>
           <div className={`w-6 h-6 ${getIconClasses()}`}>
             {icone}
           </div>
         </div>
       </div>
    </div>
  );
};

export default EstatisticasCard;
