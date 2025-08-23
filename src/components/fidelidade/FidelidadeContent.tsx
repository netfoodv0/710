import React from 'react';
import { useFidelidade } from '../../context/fidelidadeContext';
import { SeletorSistema } from './SeletorSistema';
import { EstatisticasGerais } from './EstatisticasGerais';
import { SistemaCashback } from './SistemaCashback';
import { SistemaPontos } from './SistemaPontos';
import { MigracaoSistemas } from './MigracaoSistemas';

export function FidelidadeContent() {
  const { sistemaAtivo } = useFidelidade();

  return (
    <>
      <SeletorSistema />
      <EstatisticasGerais />
      
      {sistemaAtivo === 'cashback' && <SistemaCashback />}
      {sistemaAtivo === 'pontos' && <SistemaPontos />}
      
      <MigracaoSistemas />
    </>
  );
}
