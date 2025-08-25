#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 Removendo Rollup para evitar erros de dependências nativas...');

try {
  const rollupPath = path.join(process.cwd(), 'node_modules', 'rollup');
  const rollupDistPath = path.join(rollupPath, 'dist');
  
  // Verifica se o Rollup existe
  if (fs.existsSync(rollupPath)) {
    console.log('📦 Rollup encontrado, removendo...');
    
    // Remove o diretório dist do Rollup (onde estão os arquivos nativos)
    if (fs.existsSync(rollupDistPath)) {
      fs.rmSync(rollupDistPath, { recursive: true, force: true });
      console.log('✅ Diretório dist do Rollup removido');
    }
    
    // Cria um arquivo de stub para evitar erros
    const stubContent = `
      // Stub para evitar carregamento do Rollup
      export default {
        rollup: () => {
          throw new Error('Rollup foi desabilitado para este build');
        }
      };
    `;
    
    fs.writeFileSync(path.join(rollupPath, 'index.js'), stubContent);
    console.log('✅ Stub criado para Rollup');
    
    console.log('🎯 Rollup desabilitado com sucesso!');
  } else {
    console.log('ℹ️ Rollup não encontrado, continuando...');
  }
} catch (error) {
  console.error('❌ Erro ao remover Rollup:', error.message);
  // Não falha o build se houver erro
}
