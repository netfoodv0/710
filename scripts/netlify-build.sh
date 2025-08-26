#!/bin/bash

# Script de build específico para o Netlify
echo "🚀 Configurando ambiente para o Netlify..."

# Configurar ambiente Linux
export NODE_ENV=production
export PLATFORM=linux
export ARCH=x64

# Copiar configuração específica do Netlify
echo "📋 Copiando configuração .npmrc para Netlify..."
cp .npmrc.netlify .npmrc

# Limpar cache e reinstalar dependências
echo "🧹 Limpando cache e reinstalando dependências..."
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --platform=linux --arch=x64

# Executar build
echo "🔨 Executando build de produção..."
npm run build:prod

echo "✅ Build concluído com sucesso!"
