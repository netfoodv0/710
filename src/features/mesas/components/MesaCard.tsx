import React from 'react';
import { Mesa } from '../../../types/mesas';
import { useMesasContext } from '../../../context/MesasContext';
import { Button } from '../../../components/ui/Button';
import { EditIcon } from '../../../components/ui/EditIcon';

interface MesaCardProps {
  mesa: Mesa;
}

export function MesaCard({ mesa }: MesaCardProps) {
  const { selectMesa, updateMesaStatus } = useMesasContext();

  const getStatusColor = () => {
    switch (mesa.status) {
      case 'livre':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ocupada':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reservada':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'manutencao':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = () => {
    switch (mesa.status) {
      case 'livre':
        return 'Livre';
      case 'ocupada':
        return 'Ocupada';
      case 'reservada':
        return 'Reservada';
      case 'manutencao':
        return 'Manutenção';
      default:
        return mesa.status;
    }
  };

  const handleStatusChange = () => {
    const statusOrder: Mesa['status'][] = ['livre', 'ocupada', 'reservada', 'manutencao'];
    const currentIndex = statusOrder.indexOf(mesa.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    updateMesaStatus(mesa.id, statusOrder[nextIndex]);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`p-4 border-b ${getStatusColor()}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">Mesa {mesa.numero}</h3>
            <p className="text-sm mt-1">Capacidade: {mesa.capacidade} pessoas</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => selectMesa(mesa)}
            className="flex items-center gap-1"
          >
            <EditIcon className="w-4 h-4" />
            Editar
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleStatusChange}
            className="ml-2"
          >
            Status
          </Button>
        </div>
      </div>
    </div>
  );
}