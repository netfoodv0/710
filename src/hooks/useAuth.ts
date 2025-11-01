import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

/**
 * Hook personalizado para autenticação com validações de segurança
 * Fornece acesso seguro aos dados do usuário e loja
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  // Validações de segurança
  const isAuthenticated = context.status === 'authenticated' && context.user !== null;
  const isOwner = (lojaId: string) => context.user?.uid === lojaId;
  const hasPermission = (lojaId: string) => isAuthenticated && isOwner(lojaId);

  return {
    ...context,
    isAuthenticated,
    isOwner,
    hasPermission,
    // Conveniência: lojaId é o mesmo que user.uid
    lojaId: context.user?.uid || null,
    // Métodos de conveniência
    getLojaId: () => context.user?.uid || null,
    getUserEmail: () => context.user?.email || null,
    getLojaNome: () => context.loja?.nomeLoja || null
  };
};

// ✅ EXPORTAR também como useAuthContext para compatibilidade
export const useAuthContext = useAuth; 