#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build otimizado para Vercel...');

try {
  // Limpar dependências problemáticas
  console.log('🧹 Limpando dependências...');
  if (fs.existsSync('node_modules')) {
    execSync('rm -rf node_modules', { stdio: 'inherit' });
  }
  if (fs.existsSync('package-lock.json')) {
    execSync('rm -rf package-lock.json', { stdio: 'inherit' });
  }

  // Instalar dependências sem opcionais
  console.log('📦 Instalando dependências (sem opcionais)...');
  execSync('npm install --omit=optional --no-optional', { stdio: 'inherit' });

  // REMOVER ROLLUP ANTES DO BUILD
  console.log('🗑️ Removendo Rollup para evitar erros...');
  execSync('node scripts/remove-rollup.js', { stdio: 'inherit' });

  // Configurar variáveis de ambiente
  process.env.VITE_FORCE_ESBUILD = 'true';
  process.env.VITE_SKIP_OPTIONAL_DEPS = 'true';

  // Executar build com configuração que força esbuild
  console.log('🔨 Executando build com configuração que força esbuild...');
  execSync('npx vite build --config vite.config.esbuild.ts', { stdio: 'inherit' });

  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
