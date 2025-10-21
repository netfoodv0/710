import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Dados de exemplo para operadores
const operadoresExemplo = [
  {
    lojaId: 'loja-teste-123',
    nome: 'João Silva',
    email: 'joao.silva@restaurante.com',
    telefone: '(11) 99999-1111',
    cargo: 'Gerente',
    status: 'ativo',
    dataAdmissao: '2023-01-15',
    ultimoAcesso: '2024-01-20',
    permissoes: ['pedidos', 'estoque', 'relatorios'],
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  },
  {
    lojaId: 'loja-teste-123',
    nome: 'Maria Santos',
    email: 'maria.santos@restaurante.com',
    telefone: '(11) 88888-2222',
    cargo: 'Atendente',
    status: 'ativo',
    dataAdmissao: '2023-03-10',
    ultimoAcesso: '2024-01-19',
    permissoes: ['pedidos', 'atendimento'],
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  },
  {
    lojaId: 'loja-teste-123',
    nome: 'Pedro Costa',
    email: 'pedro.costa@restaurante.com',
    telefone: '(11) 77777-3333',
    cargo: 'Cozinheiro',
    status: 'ativo',
    dataAdmissao: '2023-05-20',
    ultimoAcesso: '2024-01-18',
    permissoes: ['estoque', 'cardapio'],
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  },
  {
    lojaId: 'loja-teste-123',
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@restaurante.com',
    telefone: '(11) 66666-4444',
    cargo: 'Caixa',
    status: 'inativo',
    dataAdmissao: '2023-02-01',
    ultimoAcesso: '2024-01-10',
    permissoes: ['pedidos', 'financeiro'],
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  }
];

// Dados de exemplo para motoboys
const motoboysExemplo = [
  {
    lojaId: 'loja-teste-123',
    nome: 'Roberto Alves',
    telefone: '(11) 99999-1111',
    status: 'ativo',
    dataContratacao: '2023-02-15',
    ultimaEntrega: '2024-01-20',
    avaliacao: 4.8,
    totalEntregas: 156,
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  },
  {
    lojaId: 'loja-teste-123',
    nome: 'Fernando Lima',
    telefone: '(11) 88888-2222',
    status: 'ativo',
    dataContratacao: '2023-04-10',
    ultimaEntrega: '2024-01-19',
    avaliacao: 4.6,
    totalEntregas: 89,
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  },
  {
    lojaId: 'loja-teste-123',
    nome: 'Lucas Santos',
    telefone: '(11) 77777-3333',
    status: 'ativo',
    dataContratacao: '2023-06-05',
    ultimaEntrega: '2024-01-18',
    avaliacao: 4.9,
    totalEntregas: 203,
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  },
  {
    lojaId: 'loja-teste-123',
    nome: 'Carlos Mendes',
    telefone: '(11) 66666-4444',
    status: 'inativo',
    dataContratacao: '2023-01-20',
    ultimaEntrega: '2024-01-05',
    avaliacao: 4.2,
    totalEntregas: 45,
    dataCriacao: serverTimestamp(),
    dataAtualizacao: serverTimestamp()
  }
];

export async function popularFirebase() {
  try {
    console.log('🚀 Iniciando população do Firebase...');

    // Adicionar operadores
    console.log('📝 Adicionando operadores...');
    for (const operador of operadoresExemplo) {
      await addDoc(collection(db, 'operadores'), operador);
      console.log(`✅ Operador ${operador.nome} adicionado`);
    }

    // Adicionar motoboys
    console.log('🏍️ Adicionando motoboys...');
    for (const motoboy of motoboysExemplo) {
      await addDoc(collection(db, 'motoboys'), motoboy);
      console.log(`✅ Motoboy ${motoboy.nome} adicionado`);
    }

    console.log('🎉 Firebase populado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao popular Firebase:', error);
    throw error;
  }
}

// Executar se chamado diretamente
if (typeof window !== 'undefined') {
  // No navegador, adicionar ao window para facilitar execução
  (window as any).popularFirebase = popularFirebase;
  console.log('💡 Execute window.popularFirebase() no console para popular o Firebase');
}
