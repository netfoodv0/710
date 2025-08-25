import type { Plugin } from 'vite';

interface DeadCodeEliminationOptions {
  removeConsole?: boolean;
  removeDebugger?: boolean;
  removeUnusedImports?: boolean;
}

export function deadCodeElimination(options: DeadCodeEliminationOptions = {}): Plugin {
  const {
    removeConsole = true,
    removeDebugger = true,
    removeUnusedImports = true,
  } = options;

  return {
    name: 'dead-code-elimination',
    enforce: 'post',
    
    transform(code, id) {
      if (!id.includes('node_modules') && (id.endsWith('.ts') || id.endsWith('.tsx'))) {
        let transformedCode = code;

        // Remover console.log, console.warn, console.error em produção
        if (removeConsole && process.env.NODE_ENV === 'production') {
          transformedCode = transformedCode
            .replace(/console\.(log|warn|error|info|debug)\([^)]*\);?/g, '')
            .replace(/console\.(log|warn|error|info|debug)\([^)]*\)/g, '');
        }

        // Remover debugger statements
        if (removeDebugger) {
          transformedCode = transformedCode.replace(/debugger;?/g, '');
        }

        // Remover imports não utilizados (básico)
        if (removeUnusedImports) {
          // Remover imports vazios
          transformedCode = transformedCode.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?\n?/g, '');
          
          // Remover imports de tipos não utilizados (básico)
          transformedCode = transformedCode.replace(/import\s+type\s+{[^}]*}\s+from\s+['"][^'"]+['"];?\n?/g, '');
        }

        return {
          code: transformedCode,
          map: null,
        };
      }
      return null;
    },

    // Hook para análise de chunks
    generateBundle(options, bundle) {
      console.log('🔍 Analisando chunks para eliminação de código morto...');
      
      Object.keys(bundle).forEach(fileName => {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk' && chunk.code) {
          let code = chunk.code;
          let originalSize = code.length;

          // Remover comentários em produção
          if (process.env.NODE_ENV === 'production') {
            code = code
              .replace(/\/\*[\s\S]*?\*\//g, '') // Comentários /* */
              .replace(/\/\/.*$/gm, '') // Comentários //
              .replace(/\n\s*\n/g, '\n'); // Linhas vazias múltiplas
          }

          // Remover espaços em branco desnecessários
          code = code.replace(/\s+/g, ' ').trim();

          const newSize = code.length;
          const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

          if (newSize !== originalSize) {
            console.log(`  📦 ${fileName}: ${reduction}% reduzido`);
            chunk.code = code;
          }
        }
      });
    },
  };
}
