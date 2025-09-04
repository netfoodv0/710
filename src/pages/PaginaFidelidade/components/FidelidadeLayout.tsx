import React from 'react';
import { FidelidadeLayoutProps } from '../types';
import { SeletorSistema } from './SeletorSistema';
import { EstatisticasGerais } from './EstatisticasGerais';
import { SistemaCashback } from './SistemaCashback';
import { SistemaPontos } from './SistemaPontos';
import { MigracaoSistemas } from './MigracaoSistemas';

export function FidelidadeLayout({
  data,
  onSistemaChange,
  onSecaoChange,
  onTaxaCashbackChange,
  onValidadeCashbackChange,
  onPontosPorRealChange,
  onPontosBoasVindasChange,
  onSistemaPontosToggle,
  onSistemaCashbackToggle,
  onAdicionarProduto,
  onExportarDados,
  onMigracao
}: FidelidadeLayoutProps) {
  const {
    sistemaAtivo,
    sistemaPontosAtivo,
    sistemaCashbackAtivo,
    secaoAtiva,
    taxaCashback,
    validadeCashback,
    pontosPorReal,
    pontosBoasVindas,
    produtosResgataveis,
    clientesPontos,
    loading,
    error
  } = data;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Carregando dados de fidelidade...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Erro ao carregar dados de fidelidade</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SeletorSistema 
        sistemaAtivo={sistemaAtivo}
        onSistemaChange={onSistemaChange}
      />
      
      <EstatisticasGerais 
        sistemaAtivo={sistemaAtivo}
        sistemaPontosAtivo={sistemaPontosAtivo}
        sistemaCashbackAtivo={sistemaCashbackAtivo}
        produtosResgataveis={produtosResgataveis}
        clientesPontos={clientesPontos}
      />
      
      {sistemaAtivo === 'cashback' && (
        <SistemaCashback
          taxaCashback={taxaCashback}
          validadeCashback={validadeCashback}
          sistemaCashbackAtivo={sistemaCashbackAtivo}
          onTaxaChange={onTaxaCashbackChange}
          onValidadeChange={onValidadeCashbackChange}
          onToggle={onSistemaCashbackToggle}
        />
      )}
      
      {sistemaAtivo === 'pontos' && (
        <SistemaPontos
          pontosPorReal={pontosPorReal}
          pontosBoasVindas={pontosBoasVindas}
          sistemaPontosAtivo={sistemaPontosAtivo}
          secaoAtiva={secaoAtiva}
          produtosResgataveis={produtosResgataveis}
          clientesPontos={clientesPontos}
          onPontosPorRealChange={onPontosPorRealChange}
          onPontosBoasVindasChange={onPontosBoasVindasChange}
          onToggle={onSistemaPontosToggle}
          onSecaoChange={onSecaoChange}
          onAdicionarProduto={onAdicionarProduto}
          onExportarDados={onExportarDados}
        />
      )}
      
      <MigracaoSistemas onMigracao={onMigracao} />
    </div>
  );
}
