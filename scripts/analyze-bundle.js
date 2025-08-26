import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Analisando bundle do projeto...\n');

// Função para formatar tamanho em bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Função para analisar arquivos do dist
function analyzeDist() {
  const distPath = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ Pasta dist não encontrada. Execute npm run build primeiro.');
    return;
  }

  console.log('📁 Analisando estrutura de arquivos:');
  
  const files = fs.readdirSync(distPath);
  let totalSize = 0;
  let jsFiles = [];
  let cssFiles = [];
  let otherFiles = [];

  files.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      if (file === 'assets') {
        const assetsPath = path.join(distPath, 'assets');
        const assetFiles = fs.readdirSync(assetsPath);
        
        assetFiles.forEach(assetFile => {
          const assetPath = path.join(assetsPath, assetFile);
          const assetStats = fs.statSync(assetPath);
          
          if (assetFile.endsWith('.js')) {
            jsFiles.push({
              name: assetFile,
              size: assetStats.size,
              path: assetPath
            });
          } else if (assetFile.endsWith('.css')) {
            cssFiles.push({
              name: assetFile,
              size: assetStats.size,
              path: assetPath
            });
          } else {
            otherFiles.push({
              name: assetFile,
              size: assetStats.size,
              path: assetPath
            });
          }
          
          totalSize += assetStats.size;
        });
      }
    } else {
      totalSize += stats.size;
      if (file.endsWith('.html')) {
        console.log(`  📄 ${file}: ${formatBytes(stats.size)}`);
      }
    }
  });

  // Ordenar por tamanho
  jsFiles.sort((a, b) => b.size - a.size);
  cssFiles.sort((a, b) => b.size - a.size);

  console.log('\n📊 RESUMO DO BUNDLE:');
  console.log(`  Total: ${formatBytes(totalSize)}`);
  console.log(`  JS Files: ${jsFiles.length}`);
  console.log(`  CSS Files: ${cssFiles.length}`);
  console.log(`  Other Files: ${otherFiles.length}`);

  console.log('\n🔴 TOP 10 MAIORES CHUNKS JS:');
  jsFiles.slice(0, 10).forEach((file, index) => {
    console.log(`  ${index + 1}. ${file.name}: ${formatBytes(file.size)}`);
  });

  console.log('\n🎨 TOP 5 MAIORES CHUNKS CSS:');
  cssFiles.slice(0, 5).forEach((file, index) => {
    console.log(`  ${index + 1}. ${file.name}: ${formatBytes(file.size)}`);
  });

  // Análise de chunks por categoria
  console.log('\n📈 ANÁLISE POR CATEGORIA:');
  
  const vendorSize = jsFiles
    .filter(f => f.name.includes('vendor'))
    .reduce((sum, f) => sum + f.size, 0);
  
  const firebaseSize = jsFiles
    .filter(f => f.name.includes('firebase'))
    .reduce((sum, f) => sum + f.size, 0);
  
  const routerSize = jsFiles
    .filter(f => f.name.includes('router'))
    .reduce((sum, f) => sum + f.size, 0);

  console.log(`  Vendor: ${formatBytes(vendorSize)}`);
  console.log(`  Firebase: ${formatBytes(firebaseSize)}`);
  console.log(`  Router: ${formatBytes(routerSize)}`);

  // Recomendações
  console.log('\n💡 RECOMENDAÇÕES:');
  
  if (vendorSize > 200000) {
    console.log('  ⚠️  Vendor chunk pode ser otimizado');
  }
  
  if (firebaseSize > 500000) {
    console.log('  ⚠️  Firebase chunk grande - considere importações dinâmicas');
  }

  console.log('\n✅ Análise concluída! Verifique dist/stats.html para visualização gráfica.');
}

// Executar análise
try {
  analyzeDist();
} catch (error) {
  console.error('❌ Erro durante análise:', error.message);
}
