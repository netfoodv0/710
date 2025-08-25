#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Iniciando build híbrido (Rollup + esbuild fallback)...');

try {
  // Limpar dependências problemáticas
  console.log('🧹 Limpando dependências...');
  if (fs.existsSync('node_modules')) {
    execSync('rm -rf node_modules', { stdio: 'inherit' });
  }
  if (fs.existsSync('package-lock.json')) {
    execSync('rm -rf package-lock.json', { stdio: 'inherit' });
  }

  // Instalar dependências
  console.log('📦 Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });

  // Tentar instalar dependências nativas do Rollup
  console.log('🔧 Tentando instalar dependências nativas do Rollup...');
  execSync('node scripts/install-rollup-native.js', { stdio: 'inherit' });

  // Configurar variáveis de ambiente
  process.env.VITE_FORCE_ESBUILD = 'false'; // Tenta Rollup primeiro
  process.env.VITE_SKIP_OPTIONAL_DEPS = 'false';

  // Tentar build com Rollup primeiro
  console.log('🔨 Tentando build com Rollup...');
  try {
    execSync('npx vite build', { stdio: 'inherit' });
    console.log('✅ Build com Rollup concluído com sucesso!');
    return;
  } catch (rollupError) {
    console.log('⚠️ Rollup falhou, tentando com esbuild...');
    console.log('Erro do Rollup:', rollupError.message);
  }

  // Fallback para esbuild
  console.log('🔄 Usando fallback para esbuild...');
  process.env.VITE_FORCE_ESBUILD = 'true';
  process.env.VITE_SKIP_OPTIONAL_DEPS = 'true';

  // Remover Rollup para usar esbuild
  console.log('🗑️ Removendo Rollup para usar esbuild...');
  execSync('node scripts/remove-rollup.js', { stdio: 'inherit' });

  // Build com esbuild
  console.log('🔨 Executando build com esbuild...');
  execSync('npx vite build --config vite.config.esbuild.ts', { stdio: 'inherit' });

  console.log('✅ Build com esbuild concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
