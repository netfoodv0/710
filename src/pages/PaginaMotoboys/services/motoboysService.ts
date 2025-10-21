// Service para gerenciar motoboys
import { Motoboy } from '../types';
import { FirebaseMotoboysService } from './firebaseMotoboysService';

const firebaseService = new FirebaseMotoboysService();

export class MotoboysService {
  static async getMotoboys(): Promise<Motoboy[]> {
    return firebaseService.getMotoboys();
  }

  static async getMotoboy(id: string): Promise<Motoboy | null> {
    return firebaseService.getMotoboy(id);
  }

  static async criarMotoboy(motoboy: Partial<Motoboy>): Promise<Motoboy> {
    return firebaseService.criarMotoboy(motoboy);
  }

  static async editarMotoboy(id: string, motoboy: Partial<Motoboy>): Promise<void> {
    return firebaseService.editarMotoboy(id, motoboy);
  }

  static async excluirMotoboy(id: string): Promise<void> {
    return firebaseService.excluirMotoboy(id);
  }

  static async getMotoboysPorStatus(status: 'ativo' | 'inativo'): Promise<Motoboy[]> {
    return firebaseService.getMotoboysPorStatus(status);
  }

  static async atualizarAvaliacao(id: string, avaliacao: number): Promise<void> {
    return firebaseService.atualizarAvaliacao(id, avaliacao);
  }

  static async incrementarEntregas(id: string): Promise<void> {
    return firebaseService.incrementarEntregas(id);
  }
}


