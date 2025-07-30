/**
 * Teste de autenticação para verificar se tudo está funcionando
 */

import { AuthContext } from '../context/authContext';
import { useAuth } from '../hooks/useAuth';

// Teste de importação
export const testAuthImports = () => {
  console.log('✅ AuthContext importado com sucesso:', !!AuthContext);
  console.log('✅ useAuth hook disponível:', !!useAuth);
  
  return {
    authContextAvailable: !!AuthContext,
    useAuthAvailable: !!useAuth
  };
};

// Teste de estrutura do contexto
export const testAuthContextStructure = () => {
  const context = AuthContext;
  
  if (!context) {
    console.error('❌ AuthContext não está disponível');
    return false;
  }
  
  console.log('✅ AuthContext criado com sucesso');
  console.log('✅ Provider disponível:', !!context.Provider);
  console.log('✅ Consumer disponível:', !!context.Consumer);
  
  return true;
};

// Teste de hook useAuth
export const testUseAuthHook = () => {
  try {
    // Simular uso do hook (sem executar realmente)
    const hookExists = typeof useAuth === 'function';
    console.log('✅ useAuth hook é uma função:', hookExists);
    
    return hookExists;
  } catch (error) {
    console.error('❌ Erro ao testar useAuth hook:', error);
    return false;
  }
};

// Executar todos os testes
export const runAuthTests = () => {
  console.log('🧪 Iniciando testes de autenticação...');
  
  const results = {
    imports: testAuthImports(),
    context: testAuthContextStructure(),
    hook: testUseAuthHook()
  };
  
  const allPassed = results.imports.authContextAvailable && 
                   results.imports.useAuthAvailable && 
                   results.context && 
                   results.hook;
  
  console.log('📊 Resultados dos testes:', results);
  console.log(allPassed ? '✅ Todos os testes passaram!' : '❌ Alguns testes falharam');
  
  return allPassed;
}; 