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
    
    // Cria um arquivo de stub principal para evitar erros
    const mainStubContent = `
      // Stub principal para evitar carregamento do Rollup
      export default {
        rollup: () => {
          throw new Error('Rollup foi desabilitado para este build');
        }
      };
      
      // Exporta funções comuns que o Vite pode precisar
      export const rollup = () => {
        throw new Error('Rollup foi desabilitado para este build');
      };
      
      export const watch = () => {
        throw new Error('Rollup foi desabilitado para este build');
      };
    `;
    
    fs.writeFileSync(path.join(rollupPath, 'index.js'), mainStubContent);
    console.log('✅ Stub principal criado para Rollup');
    
    // Cria diretório dist com arquivos stub necessários
    fs.mkdirSync(rollupDistPath, { recursive: true });
    
    // Cria stub para parseAst.js que o Vite está tentando importar
    const parseAstStub = `
      // Stub para parseAst.js
      export default function parseAst() {
        throw new Error('Rollup parseAst foi desabilitado para este build');
      }
    `;
    
    fs.mkdirSync(path.join(rollupDistPath, 'es'), { recursive: true });
    fs.writeFileSync(path.join(rollupDistPath, 'es', 'parseAst.js'), parseAstStub);
    console.log('✅ Stub para parseAst.js criado');
    
    // Cria stub para outros arquivos comuns
    const commonStubs = [
      'cli.js',
      'rollup.js',
      'watch.js'
    ];
    
    commonStubs.forEach(file => {
      const stubContent = `
        // Stub para ${file}
        export default function() {
          throw new Error('Rollup ${file} foi desabilitado para este build');
        }
      `;
      fs.writeFileSync(path.join(rollupDistPath, file), stubContent);
    });
    
    console.log('✅ Stubs comuns criados');
    
    console.log('🎯 Rollup desabilitado com sucesso!');
  } else {
    console.log('ℹ️ Rollup não encontrado, continuando...');
  }
} catch (error) {
  console.error('❌ Erro ao remover Rollup:', error.message);
  // Não falha o build se houver erro
}
