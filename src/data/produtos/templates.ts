import { ClassificacaoProduto } from '../../types/global/produtos';

interface TemplateProduto {
  id: string;
  nome: string;
  categoria: string;
  camposPredefinidos: {
    tempoPreparoMinutos: number;
    agendamentoObrigatorio: boolean;
    destacado: boolean;
    tamanhoPorcao: number;
  };
  classificacoes: ClassificacaoProduto;
}

export const templatesProduto: TemplateProduto[] = [
  {
    id: 'template-1',
    nome: 'Hambúrguer Artesanal',
    categoria: 'Hambúrgueres',
    camposPredefinidos: {
      tempoPreparoMinutos: 20,
      agendamentoObrigatorio: false,
      destacado: true,
      tamanhoPorcao: 1
    },
    classificacoes: {
      semIngredientesOrigemAnimal: false,
      semCarne: false,
      semLactose: false,
      semAcucar: false,
      cultivadoSemAgrotoxicos: false,
      servidoGelado: false,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: false
    }
  },
  {
    id: 'template-2',
    nome: 'Pizza Tradicional',
    categoria: 'Pizzas',
    camposPredefinidos: {
      tempoPreparoMinutos: 25,
      agendamentoObrigatorio: false,
      destacado: true,
      tamanhoPorcao: 2
    },
    classificacoes: {
      semIngredientesOrigemAnimal: false,
      semCarne: true,
      semLactose: false,
      semAcucar: false,
      cultivadoSemAgrotoxicos: true,
      servidoGelado: false,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: false
    }
  },
  {
    id: 'template-3',
    nome: 'Bebida Alcoólica',
    categoria: 'Bebidas',
    camposPredefinidos: {
      tempoPreparoMinutos: 2,
      agendamentoObrigatorio: false,
      destacado: false,
      tamanhoPorcao: 1
    },
    classificacoes: {
      semIngredientesOrigemAnimal: true,
      semCarne: true,
      semLactose: true,
      semAcucar: false,
      cultivadoSemAgrotoxicos: false,
      servidoGelado: true,
      teorAlcoolico: 5.0,
      preparadoComFrutasFrescas: false
    }
  }
]; 