// Service para gerenciar dados do cardápio
// Por enquanto, apenas um placeholder que retorna dados vazios
// Em produção, isso seria conectado ao Firebase ou API real

export interface CardapioServiceData {
  produtos: any[];
  categorias: any[];
}

class CardapioService {
  async obterProdutos(): Promise<any[]> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Por enquanto, retornar array vazio
      // Em produção, isso viria do Firebase
      return [];
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      throw error;
    }
  }

  async obterCategorias(): Promise<any[]> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Por enquanto, retornar array vazio
      // Em produção, isso viria do Firebase
      return [];
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      throw error;
    }
  }
}

export const cardapioService = new CardapioService();
