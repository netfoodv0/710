import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌐 ABRINDO BUNDLE ANALYZER...\n');

const statsPath = path.join(__dirname, '../dist/stats.html');

if (!fs.existsSync(statsPath)) {
  console.log('❌ Arquivo stats.html não encontrado!');
  console.log('💡 Execute npm run build primeiro para gerar o bundle analyzer.');
  process.exit(1);
}

console.log('📊 Bundle Analyzer encontrado!');
console.log(`📍 Caminho: ${statsPath}`);
console.log('🚀 Abrindo no navegador padrão...\n');

// Detectar o sistema operacional e abrir o arquivo
const platform = process.platform;

try {
  if (platform === 'win32') {
    // Windows
    exec(`start "" "${statsPath}"`, (error) => {
      if (error) {
        console.log('❌ Erro ao abrir no Windows:', error.message);
        console.log('💡 Abra manualmente:', statsPath);
      } else {
        console.log('✅ Bundle Analyzer aberto com sucesso!');
        console.log('🔍 Analise os chunks e otimize seu bundle');
      }
    });
  } else if (platform === 'darwin') {
    // macOS
    exec(`open "${statsPath}"`, (error) => {
      if (error) {
        console.log('❌ Erro ao abrir no macOS:', error.message);
        console.log('💡 Abra manualmente:', statsPath);
      } else {
        console.log('✅ Bundle Analyzer aberto com sucesso!');
        console.log('🔍 Analise os chunks e otimize seu bundle');
      }
    });
  } else {
    // Linux e outros
    exec(`xdg-open "${statsPath}"`, (error) => {
      if (error) {
        console.log('❌ Erro ao abrir no Linux:', error.message);
        console.log('💡 Abra manualmente:', statsPath);
      } else {
        console.log('✅ Bundle Analyzer aberto com sucesso!');
        console.log('🔍 Analise os chunks e otimize seu bundle');
      }
    });
  }
} catch (error) {
  console.log('❌ Erro ao executar comando de abertura:', error.message);
  console.log('💡 Abra manualmente:', statsPath);
}

console.log('\n📋 INSTRUÇÕES DE USO:');
console.log('1. 🔍 Use o zoom para navegar pelos chunks');
console.log('2. 📊 Clique nos chunks para ver detalhes');
console.log('3. 📈 Analise o tamanho de cada dependência');
console.log('4. 💡 Identifique oportunidades de otimização');
console.log('5. 🎯 Foque nos chunks maiores primeiro');

console.log('\n💡 DICAS DE OTIMIZAÇÃO:');
console.log('• Chunks > 800KB: Considere code splitting');
console.log('• Vendor chunks grandes: Otimize dependências');
console.log('• CSS > 30%: Considere purging de CSS');
console.log('• Muitos chunks pequenos: Consolide se necessário');
