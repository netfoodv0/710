import { auth } from '../lib/firebase';

/**
 * Utilitários para autenticação e validação de dados
 */

/**
 * Obtém o ID da loja do usuário autenticado
 * @throws Error se o usuário não estiver autenticado
 */
export const getCurrentLojaId = (): string => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }
  return user.uid;
};

/**
 * Verifica se o usuário está autenticado
 */
export const isUserAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};

/**
 * Verifica se um documento pertence à loja do usuário
 */
export const belongsToUserLoja = (documentLojaId: string): boolean => {
  const userLojaId = getCurrentLojaId();
  return documentLojaId === userLojaId;
};

/**
 * Sanitiza dados antes de enviar para o Firebase
 * Remove campos undefined/null e adiciona campos obrigatórios
 */
export const sanitizeDataForFirebase = <T extends Record<string, any>>(
  data: T,
  addLojaId: boolean = true
): T & { lojaId?: string } => {
  const sanitized: any = {};
  
  // Remover campos undefined/null
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      sanitized[key] = value;
    }
  });

  // Adicionar lojaId se necessário
  if (addLojaId) {
    try {
      sanitized.lojaId = getCurrentLojaId();
    } catch (error) {
      console.warn('Não foi possível adicionar lojaId:', error);
    }
  }

  return sanitized;
};

/**
 * Valida se um documento pode ser acessado pelo usuário atual
 */
export const validateDocumentAccess = (documentLojaId: string): boolean => {
  try {
    return belongsToUserLoja(documentLojaId);
  } catch (error) {
    console.error('Erro ao validar acesso ao documento:', error);
    return false;
  }
};

/**
 * Gera um ID único para documentos
 */
export const generateDocumentId = (): string => {
  return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Converte timestamp do Firebase para Date
 */
export const convertFirebaseTimestamp = (timestamp: any): Date => {
  if (!timestamp) return new Date();
  
  if (timestamp.toDate) {
    return timestamp.toDate();
  }
  
  if (timestamp instanceof Date) {
    return timestamp;
  }
  
  return new Date(timestamp);
};

/**
 * Validação de dados de entrada
 */
export const validateInput = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },
  
  cep: (cep: string): boolean => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(cep);
  }
}; 