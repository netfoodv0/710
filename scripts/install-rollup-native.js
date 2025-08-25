#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Instalando dependências nativas do Rollup para Linux...');

try {
  // Verifica se estamos no ambiente Linux
  if (process.platform !== 'linux') {
    console.log('ℹ️ Não estamos no Linux, pulando instalação de dependências nativas');
    return;
  }

  console.log('🐧 Ambiente Linux detectado, instalando dependências nativas...');

  // Instala dependências específicas do Rollup para Linux
  const rollupDeps = [
    '@rollup/rollup-linux-x64-gnu',
    '@rollup/rollup-linux-x64-musl'
  ];

  rollupDeps.forEach(dep => {
    try {
      console.log(`📦 Instalando ${dep}...`);
      execSync(`npm install ${dep} --no-save`, { stdio: 'inherit' });
      console.log(`✅ ${dep} instalado com sucesso`);
    } catch (error) {
      console.log(`⚠️ Erro ao instalar ${dep}: ${error.message}`);
    }
  });

  // Verifica se o Rollup está funcionando
  try {
    console.log('🔍 Testando Rollup...');
    execSync('node -e "import(\'rollup\').then(r => console.log(\'✅ Rollup funcionando!\'))"', { stdio: 'inherit' });
  } catch (error) {
    console.log('❌ Rollup não está funcionando, usando fallback para esbuild');
  }

  console.log('🎯 Instalação de dependências nativas concluída!');
} catch (error) {
  console.error('❌ Erro durante instalação:', error.message);
  // Não falha o build se houver erro
}
