import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ANÁLISE AVANÇADA DE BUNDLE - iFood Dashboard\n');

// Função para formatar tamanho em bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Função para calcular porcentagem
function calculatePercentage(part, total) {
  return ((part / total) * 100).toFixed(2);
}

// Função para analisar arquivos do dist
function analyzeDistAdvanced() {
  const distPath = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ Pasta dist não encontrada. Execute npm run build primeiro.');
    return;
  }

  console.log('📁 ANALISANDO ESTRUTURA COMPLETA DO BUNDLE:\n');
  
  const files = fs.readdirSync(distPath);
  let totalSize = 0;
  let jsFiles = [];
  let cssFiles = [];
  let htmlFiles = [];
  let otherFiles = [];
  let statsFile = null;

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
              path: assetPath,
              type: 'javascript'
            });
          } else if (assetFile.endsWith('.css')) {
            cssFiles.push({
              name: assetFile,
              size: assetStats.size,
              path: assetPath,
              type: 'css'
            });
          } else {
            otherFiles.push({
              name: assetFile,
              size: assetStats.size,
              path: assetPath,
              type: 'other'
            });
          }
          
          totalSize += assetStats.size;
        });
      } else if (file === 'js') {
        const jsPath = path.join(distPath, 'js');
        const jsDirFiles = fs.readdirSync(jsPath);
        
        jsDirFiles.forEach(jsFile => {
          const jsFilePath = path.join(jsPath, jsFile);
          const jsFileStats = fs.statSync(jsFilePath);
          
          jsFiles.push({
            name: jsFile,
            size: jsFileStats.size,
            path: jsFilePath,
            type: 'javascript'
          });
          
          totalSize += jsFileStats.size;
        });
      }
    } else {
      totalSize += stats.size;
      if (file.endsWith('.html')) {
        htmlFiles.push({
          name: file,
          size: stats.size,
          path: filePath,
          type: 'html'
        });
      } else if (file === 'stats.html') {
        statsFile = {
          name: file,
          size: stats.size,
          path: filePath,
          type: 'stats'
        };
        totalSize += stats.size;
      } else {
        otherFiles.push({
          name: file,
          size: stats.size,
          path: filePath,
          type: 'other'
        });
      }
    }
  });

  // Ordenar por tamanho
  jsFiles.sort((a, b) => b.size - a.size);
  cssFiles.sort((a, b) => b.size - a.size);
  htmlFiles.sort((a, b) => b.size - a.size);

  // Análise detalhada
  console.log('📊 RESUMO COMPLETO DO BUNDLE:');
  console.log(`  📦 Total: ${formatBytes(totalSize)}`);
  console.log(`  🔴 JS Files: ${jsFiles.length} (${formatBytes(jsFiles.reduce((sum, f) => sum + f.size, 0))})`);
  console.log(`  🎨 CSS Files: ${cssFiles.length} (${formatBytes(cssFiles.reduce((sum, f) => sum + f.size, 0))})`);
  console.log(`  📄 HTML Files: ${htmlFiles.length} (${formatBytes(htmlFiles.reduce((sum, f) => sum + f.size, 0))})`);
  console.log(`  📁 Other Files: ${otherFiles.length} (${formatBytes(otherFiles.reduce((sum, f) => sum + f.size, 0))})`);

  // Análise de chunks JS
  console.log('\n🔴 ANÁLISE DETALHADA DOS CHUNKS JS:');
  jsFiles.forEach((file, index) => {
    const percentage = calculatePercentage(file.size, totalSize);
    console.log(`  ${index + 1}. ${file.name}: ${formatBytes(file.size)} (${percentage}%)`);
  });

  // Análise de chunks CSS
  console.log('\n🎨 ANÁLISE DETALHADA DOS CHUNKS CSS:');
  cssFiles.forEach((file, index) => {
    const percentage = calculatePercentage(file.size, totalSize);
    console.log(`  ${index + 1}. ${file.name}: ${formatBytes(file.size)} (${percentage}%)`);
  });

  // Análise de HTML
  console.log('\n📄 ANÁLISE DOS ARQUIVOS HTML:');
  htmlFiles.forEach((file, index) => {
    const percentage = calculatePercentage(file.size, totalSize);
    console.log(`  ${index + 1}. ${file.name}: ${formatBytes(file.size)} (${percentage}%)`);
  });

  // Análise por categoria
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

  const indexSize = jsFiles
    .filter(f => f.name.includes('index'))
    .reduce((sum, f) => sum + f.size, 0);

  console.log(`  🏗️  Vendor: ${formatBytes(vendorSize)} (${calculatePercentage(vendorSize, totalSize)}%)`);
  console.log(`  🔥 Firebase: ${formatBytes(firebaseSize)} (${calculatePercentage(firebaseSize, totalSize)}%)`);
  console.log(`  🛣️  Router: ${formatBytes(routerSize)} (${calculatePercentage(routerSize, totalSize)}%)`);
  console.log(`  📱 Index: ${formatBytes(indexSize)} (${calculatePercentage(indexSize, totalSize)}%)`);

  // Análise de performance
  console.log('\n⚡ ANÁLISE DE PERFORMANCE:');
  
  const jsTotalSize = jsFiles.reduce((sum, f) => sum + f.size, 0);
  const cssTotalSize = cssFiles.reduce((sum, f) => sum + f.size, 0);
  const htmlTotalSize = htmlFiles.reduce((sum, f) => sum + f.size, 0);

  console.log(`  🔴 JavaScript: ${calculatePercentage(jsTotalSize, totalSize)}% do bundle`);
  console.log(`  🎨 CSS: ${calculatePercentage(cssTotalSize, totalSize)}% do bundle`);
  console.log(`  📄 HTML: ${calculatePercentage(htmlTotalSize, totalSize)}% do bundle`);

  // Recomendações baseadas na análise
  console.log('\n💡 RECOMENDAÇÕES BASEADAS NA ANÁLISE:');
  
  if (jsTotalSize > totalSize * 0.8) {
    console.log('  ⚠️  JavaScript representa mais de 80% do bundle - considere code splitting mais agressivo');
  }
  
  if (cssTotalSize > totalSize * 0.3) {
    console.log('  ⚠️  CSS representa mais de 30% do bundle - considere purging de CSS não utilizado');
  }
  
  if (vendorSize > totalSize * 0.4) {
    console.log('  ⚠️  Vendor chunk representa mais de 40% - considere otimizações de dependências');
  }
  
  if (firebaseSize > totalSize * 0.2) {
    console.log('  ⚠️  Firebase representa mais de 20% - considere importações dinâmicas');
  }

  // Análise de chunks vazios
  const emptyChunks = jsFiles.filter(f => f.size === 0);
  if (emptyChunks.length > 0) {
    console.log(`  ⚠️  ${emptyChunks.length} chunks vazios detectados - verifique manual chunks`);
    emptyChunks.forEach(chunk => {
      console.log(`      - ${chunk.name}`);
    });
  }

  // Informações sobre o stats.html
  if (statsFile) {
    console.log(`\n📊 Bundle Analyzer: ${statsFile.name} (${formatBytes(statsFile.size)})`);
    console.log('  🌐 Abra este arquivo no navegador para visualização interativa');
    console.log('  📍 Caminho:', statsFile.path);
  }

  console.log('\n✅ Análise avançada concluída!');
  console.log('💡 Use as recomendações para otimizar ainda mais o bundle');
}

// Executar análise
try {
  analyzeDistAdvanced();
} catch (error) {
  console.error('❌ Erro durante análise avançada:', error.message);
}
