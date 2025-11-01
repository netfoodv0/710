import { z } from 'zod';

// Schema de validação para cadastro de loja
export const cadastroLojaSchema = z.object({
  nomeLoja: z.string().min(2, 'Nome da loja deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos'),
  segmento: z.string().min(1, 'Selecione um segmento'),
  endereco: z.object({
    cep: z.string().min(8, 'CEP deve ter 8 dígitos'),
    numero: z.string().min(1, 'Número é obrigatório'),
    rua: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres'),
    bairro: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
    cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    estado: z.string().min(2, 'Estado é obrigatório'),
  }),
});

// Schema de validação para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

// Tipos derivados dos schemas
export type CadastroLojaFormData = z.infer<typeof cadastroLojaSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

// Tipos de usuário e loja
export interface Usuario {
  uid: string;
  email: string;
  dataCriacao: Date;
  ultimoLogin?: Date;
}

export interface Loja {
  id: string;
  nomeLoja: string;
  whatsapp: string;
  segmento: string;
  email: string;
  endereco: {
    cep: string;
    numero: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  dataCriacao: Date;
  ativa: boolean;
  configuracoes?: {
    horarioFuncionamento?: {
      abertura: string;
      fechamento: string;
    };
    taxaEntrega?: number;
    tempoPreparo?: number;
  };
}

// Estados de autenticação
export interface AuthState {
  user: Usuario | null;
  loja: Loja | null;
  status: AuthStatus;
  error: string | null;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';
