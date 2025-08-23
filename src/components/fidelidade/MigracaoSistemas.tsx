import React from 'react';
import { useFidelidade } from '../../context/fidelidadeContext';
import { Button } from '@mui/material';

export function MigracaoSistemas() {
  const { handleMigracao } = useFidelidade();

  return (
    <div className="bg-white border rounded-lg" style={{ borderColor: '#cfd1d3', padding: '24px' }}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ fontSize: '16px' }}>
        Migração entre Sistemas
      </h3>
    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Cashback para Pontos</h4>
          <p className="text-sm text-gray-600 mb-3">
            Transfira o saldo de cashback de todos os clientes para pontos
          </p>
          <Button 
            variant="outlined" 
            size="medium"
            onClick={() => handleMigracao('cashback-para-pontos')}
            sx={{
              color: '#8b5cf6',
              borderColor: '#8b5cf6',
              '&:hover': {
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(139, 92, 246, 0.04)'
              }
            }}
          >
            Iniciar Migração
          </Button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Pontos para Cashback</h4>
          <p className="text-sm text-gray-600 mb-3">
            Transfira o saldo de pontos de todos os clientes para cashback
          </p>
          <Button 
            variant="outlined" 
            size="medium"
            onClick={() => handleMigracao('pontos-para-cashback')}
            sx={{
              color: '#8b5cf6',
              borderColor: '#8b5cf6',
              '&:hover': {
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(139, 92, 246, 0.04)'
              }
            }}
          >
            Iniciar Migração
          </Button>
        </div>
      </div>
    </div>
  );
}
