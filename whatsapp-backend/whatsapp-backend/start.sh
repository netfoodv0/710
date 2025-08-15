#!/bin/bash

echo "========================================"
echo "   WhatsApp Backend - Inicializador"
echo "========================================"
echo

echo "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERRO: Node.js não encontrado!"
    echo "Por favor, instale o Node.js de https://nodejs.org/"
    exit 1
fi

echo "Node.js encontrado! Versão: $(node --version)"
echo

echo "Verificando dependências..."
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERRO: Falha ao instalar dependências!"
        exit 1
    fi
    echo "Dependências instaladas com sucesso!"
else
    echo "Dependências já estão instaladas."
fi

echo
echo "Iniciando servidor WhatsApp Backend..."
echo
echo "Pressione Ctrl+C para parar o servidor"
echo

npm start

echo
echo "Servidor parado."
