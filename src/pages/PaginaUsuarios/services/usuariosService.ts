// Service para gerenciar usuários
import { Usuario, Motoboy } from '../types';

// Dados fictícios de operadores
export const operadoresFicticios: Usuario[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@restaurante.com',
    telefone: '(11) 99999-1111',
    cargo: 'Gerente',
    status: 'ativo',
    dataAdmissao: '2023-01-15',
    ultimoAcesso: '2024-01-20',
    permissoes: ['pedidos', 'estoque', 'relatorios']
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@restaurante.com',
    telefone: '(11) 88888-2222',
    cargo: 'Atendente',
    status: 'ativo',
    dataAdmissao: '2023-03-10',
    ultimoAcesso: '2024-01-19',
    permissoes: ['pedidos', 'atendimento']
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    email: 'pedro.costa@restaurante.com',
    telefone: '(11) 77777-3333',
    cargo: 'Cozinheiro',
    status: 'ativo',
    dataAdmissao: '2023-05-20',
    ultimoAcesso: '2024-01-18',
    permissoes: ['estoque', 'cardapio']
  },
  {
    id: 4,
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@restaurante.com',
    telefone: '(11) 66666-4444',
    cargo: 'Caixa',
    status: 'inativo',
    dataAdmissao: '2023-02-01',
    ultimoAcesso: '2024-01-10',
    permissoes: ['pedidos', 'financeiro']
  }
];

// Dados fictícios de motoboys
export const motoboysFicticios: Motoboy[] = [
  {
    id: 1,
    nome: 'Roberto Alves',
    telefone: '(11) 99999-1111',
    status: 'ativo',
    dataContratacao: '2023-02-15',
    ultimaEntrega: '2024-01-20',
    avaliacao: 4.8,
    totalEntregas: 156
  },
  {
    id: 2,
    nome: 'Fernando Lima',
    telefone: '(11) 88888-2222',
    status: 'ativo',
    dataContratacao: '2023-04-10',
    ultimaEntrega: '2024-01-19',
    avaliacao: 4.6,
    totalEntregas: 89
  },
  {
    id: 3,
    nome: 'Lucas Santos',
    telefone: '(11) 77777-3333',
    status: 'ativo',
    dataContratacao: '2023-06-05',
    ultimaEntrega: '2024-01-18',
    avaliacao: 4.9,
    totalEntregas: 203
  },
  {
    id: 4,
    nome: 'Carlos Mendes',
    telefone: '(11) 66666-4444',
    status: 'inativo',
    dataContratacao: '2023-01-20',
    ultimaEntrega: '2024-01-05',
    avaliacao: 4.2,
    totalEntregas: 45
  }
];

export class UsuariosService {
  static async getOperadores(): Promise<Usuario[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return operadoresFicticios;
  }

  static async getMotoboys(): Promise<Motoboy[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return motoboysFicticios;
  }

  static async criarOperador(operador: Partial<Usuario>): Promise<Usuario> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const novoOperador: Usuario = {
      id: Date.now(),
      nome: operador.nome || '',
      email: operador.email || '',
      telefone: operador.telefone || '',
      cargo: operador.cargo || '',
      status: operador.status || 'ativo',
      dataAdmissao: new Date().toISOString().split('T')[0],
      ultimoAcesso: new Date().toISOString().split('T')[0],
      permissoes: operador.permissoes || []
    };
    return novoOperador;
  }

  static async criarMotoboy(motoboy: Partial<Motoboy>): Promise<Motoboy> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const novoMotoboy: Motoboy = {
      id: Date.now(),
      nome: motoboy.nome || '',
      telefone: motoboy.telefone || '',
      status: motoboy.status || 'ativo',
      dataContratacao: new Date().toISOString().split('T')[0],
      ultimaEntrega: '',
      avaliacao: 0,
      totalEntregas: 0
    };
    return novoMotoboy;
  }
}
