import React from 'react';
import { UsersIcon, BagIcon, RevenueIcon } from '../../../components/ui';
import { FidelidadeStatsProps } from '../types';

export function EstatisticasGerais({
  sistemaAtivo,
  sistemaPontosAtivo,
  sistemaCashbackAtivo,
  produtosResgataveis,
  clientesPontos
}: FidelidadeStatsProps) {
  // Calcular estatísticas baseadas nos dados reais
  const totalClientes = clientesPontos.length;
  const totalProdutos = produtosResgataveis.length;
  const totalPontos = clientesPontos.reduce((acc, cliente) => acc + cliente.saldoAtual, 0);
  const totalCashback = clientesPontos.reduce((acc, cliente) => acc + (cliente.pontosAcumulados * 0.01), 0);

  return (
    <div className="bg-white rounded-lg mb-4" style={{ border: '1px solid #cfd1d3', padding: '16px' }}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex-1 bg-white rounded-lg relative p-4" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
          <div className="text-left h-full flex flex-col justify-between">
            <p className="text-xs font-normal text-gray-600" style={{ fontSize: '12px' }}>Total de Clientes</p>
            <p className="text-lg font-bold text-gray-900">{totalClientes.toLocaleString()}</p>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="p-2 bg-gray-100 rounded-full">
              <UsersIcon size={24} color="#6b7280" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-lg relative p-4" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
          <div className="text-left h-full flex flex-col justify-between">
            <p className="text-xs font-normal text-gray-600" style={{ fontSize: '12px' }}>Produtos Resgatáveis</p>
            <p className="text-lg font-bold text-gray-900">{totalProdutos}</p>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="p-2 bg-gray-100 rounded-full">
              <BagIcon size={24} color="#6b7280" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-lg relative p-4" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
          <div className="text-left h-full flex flex-col justify-between">
            <p className="text-xs font-normal text-gray-600" style={{ fontSize: '12px' }}>Total de Pontos</p>
            <p className="text-lg font-bold text-gray-900">{totalPontos.toLocaleString()}</p>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="p-2 bg-gray-100 rounded-full">
              <RevenueIcon size={24} color="#6b7280" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-lg relative p-4" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
          <div className="text-left h-full flex flex-col justify-between">
            <p className="text-xs font-normal text-gray-600" style={{ fontSize: '12px' }}>Cashback Total</p>
            <p className="text-lg font-bold text-gray-900">R$ {totalCashback.toFixed(1)}K</p>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="p-2 bg-gray-100 rounded-full">
              <RevenueIcon size={24} color="#6b7280" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
