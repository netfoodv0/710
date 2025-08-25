export interface Mesa {
  id: string;
  numero: number;
  status: 'livre' | 'ocupada' | 'reservada' | 'manutencao';
  capacidade: number;
}

export type MesaStatus = Mesa['status'];