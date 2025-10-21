import { 
  collection,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ConfiguracaoLoja } from '../types';
import { BaseFirestoreService } from './firebase/BaseFirestoreService';

const COLLECTION_NAME = 'configuracoes';

/**
 * Serviço para gerenciar configurações da loja no Firebase
 */
export class FirebaseConfiguracaoService extends BaseFirestoreService {
  
  /**
   * Salva ou atualiza as configurações da loja
   */
  static async salvarConfiguracao(configuracao: ConfiguracaoLoja): Promise<void> {
    try {
      const configRef = doc(db, COLLECTION_NAME, configuracao.id);
      
      const dadosParaSalvar = {
        ...configuracao,
        lojaId: configuracao.restauranteId, // Campo necessário para as regras do Firestore
        dataAtualizacao: serverTimestamp(),
        // Se for nova configuração, adicionar data de criação
        ...(!(await getDoc(configRef)).exists() && { dataCriacao: serverTimestamp() })
      };

      await setDoc(configRef, dadosParaSalvar, { merge: true });
    } catch (error) {
      throw new Error(`Falha ao salvar configurações da loja: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  /**
   * Busca as configurações de uma loja específica
   * Primeiro tenta buscar pelo ID da configuração, depois pelo ID da loja
   */
  static async buscarConfiguracaoPorLoja(lojaId: string): Promise<ConfiguracaoLoja | null> {
    try {
      // Primeiro tenta buscar diretamente pelo ID da configuração (se for igual ao ID da loja)
      const configRef = doc(db, COLLECTION_NAME, lojaId);
      const configSnap = await getDoc(configRef);
      
      if (configSnap.exists()) {
        const data = configSnap.data();
        return {
          ...data,
          id: configSnap.id,
          // Converter timestamps para strings se necessário
          dataCriacao: data.dataCriacao?.toDate?.()?.toISOString() || data.dataCriacao,
          dataAtualizacao: data.dataAtualizacao?.toDate?.()?.toISOString() || data.dataAtualizacao,
        } as ConfiguracaoLoja;
      }

      // Se não encontrar por ID, busca por lojaId (campo usado nas regras)
      const q = query(collection(db, COLLECTION_NAME), where('lojaId', '==', lojaId));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const documentSnapshot = snapshot.docs[0];
        const data = documentSnapshot.data();
        return {
          ...data,
          id: documentSnapshot.id,
          dataCriacao: data.dataCriacao?.toDate?.()?.toISOString() || data.dataCriacao,
          dataAtualizacao: data.dataAtualizacao?.toDate?.()?.toISOString() || data.dataAtualizacao,
        } as ConfiguracaoLoja;
      }

      return null;
    } catch (error) {
      throw new Error(`Falha ao carregar configurações da loja: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  /**
   * Atualiza campos específicos da configuração
   */
  static async atualizarCampo(
    configuracaoId: string, 
    campo: keyof ConfiguracaoLoja, 
    valor: any
  ): Promise<void> {
    try {
      const configRef = doc(db, COLLECTION_NAME, configuracaoId);
      await updateDoc(configRef, {
        [campo]: valor,
        dataAtualizacao: serverTimestamp()
      });
      console.log(`Campo ${campo} atualizado com sucesso`);
    } catch (error) {
      console.error(`Erro ao atualizar campo ${campo}:`, error);
      throw new Error(`Falha ao atualizar ${campo}`);
    }
  }

  /**
   * Verifica se existe configuração para uma loja
   */
  static async existeConfiguracao(lojaId: string): Promise<boolean> {
    try {
      const configuracao = await this.buscarConfiguracaoPorLoja(lojaId);
      return configuracao !== null;
    } catch (error) {
      console.error('Erro ao verificar existência da configuração:', error);
      return false;
    }
  }

  /**
   * Cria configuração padrão para uma nova loja
   */
  static async criarConfiguracaoPadrao(lojaId: string, nomeRestaurante: string): Promise<ConfiguracaoLoja> {
    const configuracaoPadrao: ConfiguracaoLoja = {
      id: lojaId,
      restauranteId: lojaId,
      lojaId: lojaId, // Campo necessário para as regras do Firestore
      nomeRestaurante,
      descricao: 'Restaurante especializado em comida caseira e tradicional',
      cnpj: '',
      telefone: '',
      email: '',
      fusoHorario: 'America/Sao_Paulo', // Fuso horário padrão do Brasil
      endereco: {
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      },
      horarioFuncionamento: {
        segunda: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
        terca: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
        quarta: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
        quinta: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
        sexta: { abertura: '08:00', fechamento: '23:00', ativo: true, pausas: [], entregaAte: '22:30', pedidoAte: '22:00' },
        sabado: { abertura: '09:00', fechamento: '23:00', ativo: true, pausas: [], entregaAte: '22:30', pedidoAte: '22:00' },
        domingo: { abertura: '10:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' }
      },
      horariosEspeciais: [],
      configuracaoAvancada: {
        aceitarPedidosForaHorario: false,
        tempoLimiteEntrega: 60,
        pausaAutomatica: true,
        notificarMudancaHorario: true
      },
      taxaEntrega: 5.00,
      tempoPreparoMedio: 30,
      valorMinimoEntrega: 15.00,
      raioEntregaKm: 5,
      ativo: true,
      
      // Configurações de entrega
      entregaDomicilio: true,
      retiradaLocal: true,
      entregaDelivery: true,
      pedidoMinimo: '15,00',
      raioEntrega: '5',
      
      // Horários simplificados
      horarioAbertura: '08:00',
      horarioFechamento: '22:00',
      diasFuncionamento: {
        segunda: true,
        terca: true,
        quarta: true,
        quinta: true,
        sexta: true,
        sabado: true,
        domingo: true
      },
      
      // Formas de pagamento
      pagamentoDinheiro: true,
      pagamentoCredito: true,
      pagamentoDebito: true,
      pagamentoPix: true,
      pagamentoValeRefeicao: false,
      
      // Notificações
      notificacoesEmail: true,
      notificacoesSMS: false,
      notificacoesPush: true,
      alertasEstoque: true,
      
      // Aparência
      tema: 'claro',
      corPrincipal: 'azul',
      modoCompacto: false,
      animacoes: true,

      // Informações da Loja
      fotoLoja: '',
      bannerLoja: '',
      nomeMarca: nomeRestaurante,
      identificacaoUnidade: '',
      linkPersonalizado: '',
      
      // Modos de pedidos
      aceitarPedidosDelivery: true,
      aceitarPedidosRetirada: true,
      aceitarPedidosBalcao: true,
      
      // Configurações de agendamento
      agendamentoAtivo: false,
      agendamentoAntecedencia: 2,
      agendamentoLimite: 7,

      // Configurações de Impressão
      imprimirPeloComputador: true,
      imprimirPeloCelular: false,
      assistenteBrendi: false,
      impressoraPrincipal: '',
      
      // Configurações da Notinha
      mostrarCNPJ: true,
      mostrarCategoria: true,
      mostrarDescricao: true,
      mostrarProdutosPizza: 'nome-completo',
      mostrarQuantidadeAdicionais: true
    };

    await this.salvarConfiguracao(configuracaoPadrao);
    return configuracaoPadrao;
  }

  /**
   * Lista todas as configurações (para admin)
   */
  static async listarConfiguracoes(): Promise<ConfiguracaoLoja[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          dataCriacao: data.dataCriacao?.toDate?.()?.toISOString() || data.dataCriacao,
          dataAtualizacao: data.dataAtualizacao?.toDate?.()?.toISOString() || data.dataAtualizacao,
        } as ConfiguracaoLoja;
      });
    } catch (error) {
      console.error('Erro ao listar configurações:', error);
      throw new Error('Falha ao listar configurações');
    }
  }
}
