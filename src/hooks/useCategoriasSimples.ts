import { useState, useEffect } from 'react';
import { Categoria } from '../types/global/categoria';

// Categorias mockadas para desenvolvimento
const categoriasDesenvolvimento: Categoria[] = [
  {
    id: 'dev-1',
    nome: 'Hambúrgueres',
    status: 'ativo',
    agendamentoPrevio: false,
    tempoExtraProducao: false,
    disponibilidade: [],
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-01'),
    lojaId: 'desenvolvimento'
  },
  {
    id: 'dev-2',
    nome: 'Bebidas',
    status: 'ativo',
    agendamentoPrevio: false,
    tempoExtraProducao: false,
    disponibilidade: [],
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-01'),
    lojaId: 'desenvolvimento'
  },
  {
    id: 'dev-3',
    nome: 'Sobremesas',
    status: 'ativo',
    agendamentoPrevio: false,
    tempoExtraProducao: false,
    disponibilidade: [],
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-01'),
    lojaId: 'desenvolvimento'
  }
];

export function useCategoriasSimples() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar categorias do localStorage ou usar padrões
  useEffect(() => {
    if (!isInitialized) {
      const timer = setTimeout(() => {
        // FORÇAR RESET COMPLETO - limpar localStorage e usar apenas categorias padrão
        console.log('🧹 Limpando localStorage e resetando categorias...');
        
        try {
          // Remover dados antigos
          localStorage.removeItem('categorias-desenvolvimento');
          
          // Usar apenas categorias padrão
          setCategorias(categoriasDesenvolvimento);
          
          // Salvar categorias padrão limpas
          localStorage.setItem('categorias-desenvolvimento', JSON.stringify(categoriasDesenvolvimento));
          
          console.log('✅ Categorias resetadas para padrão:', categoriasDesenvolvimento);
        } catch (error) {
          console.error('Erro ao resetar categorias:', error);
          setCategorias(categoriasDesenvolvimento);
        }
        
        setLoading(false);
        setIsInitialized(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  // Salvar categorias no localStorage sempre que mudarem
  useEffect(() => {
    if (isInitialized && categorias.length > 0) {
      localStorage.setItem('categorias-desenvolvimento', JSON.stringify(categorias));
    }
  }, [categorias, isInitialized]);

  const excluirCategoria = async (id: string) => {
    // Simular delay da operação
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setCategorias(prev => prev.filter(cat => cat.id !== id));
    setLoading(false);
  };

  const editarCategoria = async (id: string, dados: any) => {
    // Simular delay da operação
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setCategorias(prev => prev.map(cat => 
      cat.id === id 
        ? { ...cat, ...dados, dataAtualizacao: new Date() }
        : cat
    ));
    setLoading(false);
  };

  const duplicarCategoria = async (id: string, novoNome?: string) => {
    // Simular delay da operação
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const categoriaOriginal = categorias.find(cat => cat.id === id);
    if (categoriaOriginal) {
      const categoriaDuplicada: Categoria = {
        ...categoriaOriginal,
        id: `dev-${Date.now()}`,
        nome: novoNome || `${categoriaOriginal.nome} (Cópia)`,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };
      setCategorias(prev => [...prev, categoriaDuplicada]);
    }
    setLoading(false);
  };

  const criarCategoria = async (dados: any) => {
    // Simular delay da operação
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const novaCategoria: Categoria = {
      id: `dev-${Date.now()}`,
      nome: dados.nome,
      status: dados.status || 'ativo',
      agendamentoPrevio: dados.agendamentoPrevio || false,
      tempoExtraProducao: dados.tempoExtraProducao || false,
      disponibilidade: dados.disponibilidade || [],
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      lojaId: 'desenvolvimento'
    };
    
    setCategorias(prev => [...prev, novaCategoria]);
    setLoading(false);
  };

  return {
    categorias,
    loading,
    error: null,
    criarCategoria,
    editarCategoria,
    excluirCategoria,
    duplicarCategoria,
    buscarCategoria: (id: string) => categorias.find(cat => cat.id === id),
    recarregar: async () => {
      // Não recarregar se já foi inicializado para manter as alterações do usuário
      if (!isInitialized) {
        setLoading(true);
        setTimeout(() => {
          setCategorias(categoriasDesenvolvimento);
          setLoading(false);
          setIsInitialized(true);
        }, 300);
      }
    },
    resetarCategorias: async () => {
      // Função para resetar para as categorias padrão
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCategorias(categoriasDesenvolvimento);
      localStorage.setItem('categorias-desenvolvimento', JSON.stringify(categoriasDesenvolvimento));
      setLoading(false);
    }
  };
}
