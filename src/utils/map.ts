import { MapAddress, MapCoordinates } from '../types/map';

export const mapUtils = {
  /**
   * Formata um endereço completo para geocodificação
   */
  formatFullAddress(endereco: MapAddress): string {
    return `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, ${endereco.cep}`;
  },

  /**
   * Verifica se um endereço tem todos os campos obrigatórios
   */
  hasRequiredFields(endereco: MapAddress): boolean {
    const camposObrigatorios = ['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'];
    return camposObrigatorios.every(campo => Boolean(endereco[campo as keyof MapAddress]));
  },

  /**
   * Verifica se um endereço tem coordenadas válidas
   */
  hasValidCoordinates(endereco: MapAddress): boolean {
    return Boolean(
      endereco.coordenadas?.latitude && 
      endereco.coordenadas?.longitude &&
      !isNaN(endereco.coordenadas.latitude) &&
      !isNaN(endereco.coordenadas.longitude)
    );
  },

  /**
   * Gera variação sutil nas coordenadas para evitar sobreposição
   */
  generateCoordinateVariation(baseLat: number, baseLng: number, variation: number = 0.01): [number, number] {
    const latVariacao = (Math.random() - 0.5) * variation;
    const lngVariacao = (Math.random() - 0.5) * variation;
    
    return [
      baseLat + latVariacao,
      baseLng + lngVariacao
    ];
  },

  /**
   * Calcula intensidade baseada no valor do pedido
   */
  calculateIntensityFromOrderValue(total: number, divisor: number = 50): number {
    return Math.min(total / divisor, 1);
  }
};
