import React from 'react';
import { useMesasContext } from '../../../context/MesasContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/input';
import { Mesa } from '../../../types/mesas';

export function MesasModals() {
  const { selectedMesa, selectMesa, addMesa, updateMesaStatus } = useMesasContext();
  
  const [numero, setNumero] = React.useState<string>('');
  const [capacidade, setCapacidade] = React.useState<string>('');
  const [status, setStatus] = React.useState<Mesa['status']>('livre');

  React.useEffect(() => {
    if (selectedMesa) {
      setNumero(selectedMesa.numero?.toString() || '');
      setCapacidade(selectedMesa.capacidade?.toString() || '');
      setStatus(selectedMesa.status || 'livre');
    } else {
      setNumero('');
      setCapacidade('');
      setStatus('livre');
    }
  }, [selectedMesa]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!numero || !capacidade) {
      return;
    }
    
    const numeroValue = parseInt(numero, 10);
    const capacidadeValue = parseInt(capacidade, 10);
    
    if (isNaN(numeroValue) || isNaN(capacidadeValue) || numeroValue <= 0 || capacidadeValue <= 0) {
      return;
    }
    
    if (selectedMesa) {
      // Atualizar mesa existente
      updateMesaStatus(selectedMesa.id, status);
      selectMesa(null);
    } else {
      // Adicionar nova mesa
      addMesa({
        numero: numeroValue,
        capacidade: capacidadeValue,
        status: status,
      });
      selectMesa(null);
    }
  };

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas números positivos
    if (value === '' || /^\d+$/.test(value)) {
      setNumero(value);
    }
  };

  const handleCapacidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas números positivos
    if (value === '' || /^\d+$/.test(value)) {
      setCapacidade(value);
    }
  };

  return (
    <Dialog open={!!selectedMesa} onOpenChange={(open) => !open && selectMesa(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {selectedMesa ? 'Editar Mesa' : 'Adicionar Nova Mesa'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="numero" className="text-sm font-medium">
              Número da Mesa
            </label>
            <Input
              id="numero"
              type="text"
              value={numero}
              onChange={handleNumeroChange}
              required
              placeholder="1"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="capacidade" className="text-sm font-medium">
              Capacidade (pessoas)
            </label>
            <Input
              id="capacidade"
              type="text"
              value={capacidade}
              onChange={handleCapacidadeChange}
              required
              placeholder="2"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Mesa['status'])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="livre">Livre</option>
              <option value="ocupada">Ocupada</option>
              <option value="reservada">Reservada</option>
              <option value="manutencao">Manutenção</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => selectMesa(null)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {selectedMesa ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}