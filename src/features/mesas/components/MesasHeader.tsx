import React from 'react';
import { PageHeader } from '../../../components/ui';
import { useMesasContext } from '../../../context/MesasContext';
import { Button } from '../../../components/ui/Button';
import { PlusIcon } from 'lucide-react';

export function MesasHeader() {
  const { mesas } = useMesasContext();

  // Contar mesas por status
  const contarMesas = () => {
    const contagem = {
      livre: 0,
      ocupada: 0,
      reservada: 0,
      manutencao: 0
    };
    
    mesas.forEach(mesa => {
      if (contagem.hasOwnProperty(mesa.status)) {
        contagem[mesa.status]++;
      }
    });
    
    return contagem;
  };

  const contagem = contarMesas();

  return (
    <PageHeader
      title="Mesas"
      subtitle="Gerencie as mesas do restaurante"
      actions={
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Livres: {contagem.livre}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              Ocupadas: {contagem.ocupada}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              Reservadas: {contagem.reservada}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-gray-500"></span>
              Manutenção: {contagem.manutencao}
            </span>
          </div>
          <Button className="bg-primary text-white hover:bg-primary/90">
            <PlusIcon className="w-4 h-4 mr-2" />
            Adicionar Mesa
          </Button>
        </div>
      }
    />
  );
}