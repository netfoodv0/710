// Service para gerenciar operadores
import { Operador } from '../types';
import { FirebaseOperadoresService } from './firebaseOperadoresService';

const firebaseService = new FirebaseOperadoresService();

export class OperadoresService {
  static async getOperadores(): Promise<Operador[]> {
    return firebaseService.getOperadores();
  }

  static async getOperador(id: string): Promise<Operador | null> {
    return firebaseService.getOperador(id);
  }

  static async criarOperador(operador: Partial<Operador>): Promise<Operador> {
    return firebaseService.criarOperador(operador);
  }

  static async editarOperador(id: string, operador: Partial<Operador>): Promise<void> {
    return firebaseService.editarOperador(id, operador);
  }

  static async excluirOperador(id: string): Promise<void> {
    return firebaseService.excluirOperador(id);
  }

  static async getOperadoresPorStatus(status: 'ativo' | 'inativo'): Promise<Operador[]> {
    return firebaseService.getOperadoresPorStatus(status);
  }
}


