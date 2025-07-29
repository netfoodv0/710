import { z } from 'zod';

// Tipos para autenticação
export interface Usuario {
  uid: string;
  email: string;
  nome?: string;
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
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  dataCriacao: Date;
  ativa: boolean;
}

// Schemas de validação
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Senha é obrigatória')
});

export const cadastroLojaSchema = z.object({
  nomeLoja: z.string().min(2, 'Nome da loja deve ter pelo menos 2 caracteres'),
  whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos'),
  segmento: z.string().min(1, 'Segmento é obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  endereco: z.object({
    cep: z.string().min(8, 'CEP inválido'),
    rua: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres'),
    numero: z.string().min(1, 'Número é obrigatório'),
    bairro: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
    cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    estado: z.string().length(2, 'Estado deve ter 2 caracteres')
  })
});

export const cadastroUsuarioSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmarSenha: z.string()
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "Senhas não coincidem",
  path: ["confirmarSenha"]
});

// Tipos inferidos dos schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type CadastroLojaFormData = z.infer<typeof cadastroLojaSchema>;
export type CadastroUsuarioFormData = z.infer<typeof cadastroUsuarioSchema>;

// Estados de autenticação
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthState {
  user: Usuario | null;
  loja: Loja | null;
  status: AuthStatus;
  error: string | null;
} 