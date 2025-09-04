import React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PageHeader } from '../../components/ui';
import { useFidelidade } from './hooks';
import { FidelidadeLayout } from './components';

export default function Fidelidade() {
  const {
    data,
    handleSistemaChange,
    handleSecaoChange,
    handleTaxaCashbackChange,
    handleValidadeCashbackChange,
    handlePontosPorRealChange,
    handlePontosBoasVindasChange,
    handleSistemaPontosToggle,
    handleSistemaCashbackToggle,
    handleAdicionarProduto,
    handleExportarDados,
    handleMigracao
  } = useFidelidade();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <PageHeader
          title="Fidelidade"
          subtitle="Sistema de fidelidade e recompensas"
        />

        <div className="flex-1 px-4 py-4">
          <div className="max-w-6xl mx-auto space-y-4">
            <FidelidadeLayout
              data={data}
              onSistemaChange={handleSistemaChange}
              onSecaoChange={handleSecaoChange}
              onTaxaCashbackChange={handleTaxaCashbackChange}
              onValidadeCashbackChange={handleValidadeCashbackChange}
              onPontosPorRealChange={handlePontosPorRealChange}
              onPontosBoasVindasChange={handlePontosBoasVindasChange}
              onSistemaPontosToggle={handleSistemaPontosToggle}
              onSistemaCashbackToggle={handleSistemaCashbackToggle}
              onAdicionarProduto={handleAdicionarProduto}
              onExportarDados={handleExportarDados}
              onMigracao={handleMigracao}
            />
            <div className="h-6"></div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
