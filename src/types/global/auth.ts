import { z } from 'zod';

// Schema de validação para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

// Schema de validação para cadastro de loja
export const cadastroLojaSchema = z.object({
  nomeLoja: z.string().min(2, 'Nome da loja deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmarSenha: z.string(),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  endereco: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  categoria: z.string().min(1, 'Selecione uma categoria'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "Senhas não coincidem",
  path: ["confirmarSenha"],
});

// Tipos derivados dos schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type CadastroLojaFormData = z.infer<typeof cadastroLojaSchema>;

// Tipos de usuário e loja
export interface Usuario {
  id: string;
  email: string;
  nome: string;
  lojaId: string;
  role: 'admin' | 'operador' | 'motoboy';
  ativo: boolean;
  dataCriacao: Date;
  ultimoLogin?: Date;
}

export interface Loja {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  categoria: string;
  ativa: boolean;
  dataCriacao: Date;
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
  usuario: Usuario | null;
  loja: Loja | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';