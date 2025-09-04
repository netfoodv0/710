// Service para gerenciar operadores
import { Operador } from '../types';

// Dados fictícios de operadores
export const operadoresFicticios: Operador[] = [
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

export class OperadoresService {
  static async getOperadores(): Promise<Operador[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return operadoresFicticios;
  }

  static async criarOperador(operador: Partial<Operador>): Promise<Operador> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const novoOperador: Operador = {
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
}
