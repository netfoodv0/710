// Service para gerenciar motoboys
import { Motoboy } from '../types';

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

export class MotoboysService {
  static async getMotoboys(): Promise<Motoboy[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return motoboysFicticios;
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
