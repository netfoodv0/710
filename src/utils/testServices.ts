/**
 * Teste de serviços para verificar se as exportações estão funcionando
 */

import { firebasePedidoService } from '../services/firebasePedidoService';
import { firebaseCardapioService } from '../services/firebaseCardapioService';

// Teste de importação dos serviços
export const testServicesImports = () => {
  console.log('✅ firebasePedidoService importado:', !!firebasePedidoService);
  console.log('✅ firebaseCardapioService importado:', !!firebaseCardapioService);
  
  return {
    pedidoServiceAvailable: !!firebasePedidoService,
    cardapioServiceAvailable: !!firebaseCardapioService
  };
};

// Teste de estrutura dos serviços
export const testServicesStructure = () => {
  const results = {
    pedidoService: {
      buscarPedidos: typeof firebasePedidoService?.buscarPedidos === 'function',
      buscarPedido: typeof firebasePedidoService?.buscarPedido === 'function',
      criarPedido: typeof firebasePedidoService?.criarPedido === 'function',
      atualizarStatusPedido: typeof firebasePedidoService?.atualizarStatusPedido === 'function',
      excluirPedido: typeof firebasePedidoService?.excluirPedido === 'function',
      buscarHistoricoPedidos: typeof firebasePedidoService?.buscarHistoricoPedidos === 'function'
    },
    cardapioService: {
      buscarProdutos: typeof firebaseCardapioService?.buscarProdutos === 'function',
      buscarCategorias: typeof firebaseCardapioService?.buscarCategorias === 'function',
      buscarCategoriasAdicionais: typeof firebaseCardapioService?.buscarCategoriasAdicionais === 'function',
      criarCategoriaAdicional: typeof firebaseCardapioService?.criarCategoriaAdicional === 'function',
      editarCategoriaAdicional: typeof firebaseCardapioService?.editarCategoriaAdicional === 'function',
      excluirCategoriaAdicional: typeof firebaseCardapioService?.excluirCategoriaAdicional === 'function'
    }
  };
  
  console.log('📊 Estrutura dos serviços:', results);
  
  return results;
};

// Executar todos os testes
export const runServicesTests = () => {
  console.log('🧪 Iniciando testes de serviços...');
  
  const imports = testServicesImports();
  const structure = testServicesStructure();
  
  const allPassed = imports.pedidoServiceAvailable && 
                   imports.cardapioServiceAvailable &&
                   Object.values(structure.pedidoService).every(Boolean) &&
                   Object.values(structure.cardapioService).every(Boolean);
  
  console.log('📊 Resultados dos testes:', { imports, structure });
  console.log(allPassed ? '✅ Todos os testes passaram!' : '❌ Alguns testes falharam');
  
  return allPassed;
}; 