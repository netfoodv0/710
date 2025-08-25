export default {
  // Configurações do Bundle Analyzer
  analyzer: {
    // Template de visualização
    template: 'treemap', // 'treemap', 'sunburst', 'network', 'raw-data'
    
    // Título da análise
    title: 'iFood Dashboard - Bundle Analysis',
    
    // Configurações de tamanho
    gzipSize: true,
    brotliSize: true,
    
    // Análise detalhada
    detailed: true,
    
    // Incluir node_modules
    includeNodeModules: true,
    
    // Excluir arquivos específicos
    exclude: [
      '**/*.map',
      '**/*.d.ts',
      '**/*.backup',
      '**/*.log'
    ],
    
    // Metadados do projeto
    metadata: {
      project: 'iFood Dashboard',
      version: '1.0.0',
      environment: 'production',
      buildDate: new Date().toISOString(),
      framework: 'React + Vite',
      bundler: 'Rollup'
    }
  },
  
  // Configurações de chunks
  chunks: {
    // Tamanho máximo recomendado para chunks
    maxSize: 800 * 1024, // 800KB
    
    // Categorias de chunks
    categories: {
      vendor: ['react', 'react-dom', 'react-router-dom'],
      firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
      ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-tabs'],
      charts: ['chart.js', 'react-apexcharts', 'apexcharts', 'recharts'],
      forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
      utils: ['date-fns', 'date-fns-tz', 'clsx', 'tailwind-merge'],
      icons: ['lucide-react'],
      maps: ['leaflet']
    },
    
    // Regras de otimização
    optimization: {
      // Tree shaking agressivo
      treeShaking: true,
      
      // Minificação
      minify: true,
      
      // Code splitting
      codeSplitting: true,
      
      // Lazy loading
      lazyLoading: true
    }
  },
  
  // Configurações de relatórios
  reports: {
    // Gerar relatório HTML
    html: true,
    
    // Gerar relatório JSON
    json: true,
    
    // Gerar relatório CSV
    csv: false,
    
    // Diretório de saída
    outputDir: 'dist',
    
    // Nome dos arquivos
    filenames: {
      html: 'bundle-analysis.html',
      json: 'bundle-stats.json',
      csv: 'bundle-stats.csv'
    }
  },
  
  // Configurações de alertas
  alerts: {
    // Tamanho máximo de chunk
    maxChunkSize: 1000 * 1024, // 1MB
    
    // Tamanho máximo total
    maxTotalSize: 5 * 1024 * 1024, // 5MB
    
    // Porcentagem máxima de vendor
    maxVendorPercentage: 40,
    
    // Porcentagem máxima de CSS
    maxCSSPercentage: 30
  }
};
