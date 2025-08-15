#!/usr/bin/env node

/**
 * Script para iniciar automaticamente o servidor WhatsApp Backend
 * Verifica se o servidor está rodando na porta 3001 e inicia se necessário
 */

const { exec } = require('child_process');
const net = require('net');
const path = require('path');

const PORT = 3001;
const SERVER_PATH = __dirname;

// Função para verificar se a porta está em uso
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(false); // Porta não está em uso
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(true); // Porta está em uso
    });
  });
}

// Função para iniciar o servidor
function startServer() {
  console.log('🚀 Iniciando servidor WhatsApp Backend...');
  
  const serverProcess = exec('node server.js', { cwd: SERVER_PATH });
  
  serverProcess.stdout.on('data', (data) => {
    console.log(data.toString().trim());
  });
  
  serverProcess.stderr.on('data', (data) => {
    console.error(data.toString().trim());
  });
  
  serverProcess.on('close', (code) => {
    console.log(`❌ Servidor encerrado com código ${code}`);
    
    // Se o servidor foi fechado inesperadamente, reiniciar após 5 segundos
    setTimeout(() => {
      console.log('🔄 Reiniciando servidor...');
      startServer();
    }, 5000);
  });
  
  return serverProcess;
}

// Função principal
async function main() {
  console.log('🔍 Verificando se o servidor está rodando...');
  
  const portInUse = await isPortInUse(PORT);
  
  if (portInUse) {
    console.log(`✅ Servidor já está rodando na porta ${PORT}`);
    console.log('📱 Acesse: http://localhost:3001');
  } else {
    console.log(`❌ Servidor não está rodando na porta ${PORT}`);
    startServer();
  }
}

// Executar função principal
main().catch(console.error);

// Manter o processo vivo
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando auto-start...');
  process.exit(0);
});
