import { FormData } from '../../../hooks/useNovoProdutoForm';
import { PRODUTO_DEFAULTS } from '../constants';

/**
 * Transforma os dados do formulário em dados do produto para salvar no Firebase
 */
export const transformFormDataToProduto = (data: FormData, status: 'ativo' | 'inativo' | 'em_falta') => {
  return {
    nome: data.nome || '',
    descricao: data.descricao || '',
    preco: data.preco || 0,
    precoPromocional: data.precoPromocional || null,
    categoriaId: data.categoria || '',
    categoria: data.categoria || '', // Para compatibilidade
    status: status,
    destacado: data.destaque || false,
    tempoPreparo: data.tempoPreparo || '',
    calorias: data.calorias || null,
    peso: data.peso || null,
    ingredientes: data.ingredientes || [],
    alergenos: data.alergenos || [],
    tags: data.tags || [],
    imagem: data.imagens?.[0] || '', // Primeira imagem como principal
    galeriaFotos: data.imagens || [],
    
    // Classificações alimentares
    semIngredientesOrigemAnimal: data.vegetariano || data.vegano || false,
    semCarne: data.vegetariano || data.vegano || false,
    semLactose: data.semLactose || false,
    semAcucar: data.semAcucar || false,
    cultivadoSemAgrotoxicos: data.organico || false,
    
    // Disponibilidade
    ativo: data.disponivel || true,
    disponibilidade: {
      segunda: data.disponibilidadeDias?.segunda || PRODUTO_DEFAULTS.disponibilidadeDias.segunda,
      terca: data.disponibilidadeDias?.terca || PRODUTO_DEFAULTS.disponibilidadeDias.terca,
      quarta: data.disponibilidadeDias?.quarta || PRODUTO_DEFAULTS.disponibilidadeDias.quarta,
      quinta: data.disponibilidadeDias?.quinta || PRODUTO_DEFAULTS.disponibilidadeDias.quinta,
      sexta: data.disponibilidadeDias?.sexta || PRODUTO_DEFAULTS.disponibilidadeDias.sexta,
      sabado: data.disponibilidadeDias?.sabado || PRODUTO_DEFAULTS.disponibilidadeDias.sabado,
      domingo: data.disponibilidadeDias?.domingo || PRODUTO_DEFAULTS.disponibilidadeDias.domingo,
      horarioInicio: data.horarioInicio || PRODUTO_DEFAULTS.horarioInicio,
      horarioFim: data.horarioFim || PRODUTO_DEFAULTS.horarioFim,
    },
    
    // Estoque
    controlarEstoque: data.controlarEstoque || false,
    quantidadeEstoque: data.quantidadeEstoque || 0,
    estoqueMinimo: data.estoqueMinimo || 0,
    
    // Complementos e variações
    complementos: data.complementos || [],
    temVariacoes: data.temVariacoes || false,
    variacoes: data.variacoes || [],
    
    // Valores padrão necessários
    vendasTotais: PRODUTO_DEFAULTS.vendasTotais,
    avaliacaoMedia: PRODUTO_DEFAULTS.avaliacaoMedia,
    numeroAvaliacoes: PRODUTO_DEFAULTS.numeroAvaliacoes,
    tamanhoPorcao: data.porcoes || PRODUTO_DEFAULTS.tamanhoPorcao,
    agendamentoObrigatorio: PRODUTO_DEFAULTS.agendamentoObrigatorio,
    extras: PRODUTO_DEFAULTS.extras,
    sincronizadoComIfood: PRODUTO_DEFAULTS.sincronizadoComIfood,
    slug: (data.nome || 'produto').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  };
};

/**
 * Transforma dados do produto existente em dados iniciais do formulário
 */
export const transformProdutoToFormData = (produto: any) => {
  return {
    nome: produto.nome || '',
    descricao: produto.descricao || '',
    categoria: produto.categoria || '',
    preco: produto.preco || 0,
    precoPromocional: produto.precoPromocional || undefined,
    imagens: produto.galeriaFotos || [],
    tempoPreparo: produto.tempoPreparo || 15,
    calorias: produto.calorias || undefined,
    porcoes: produto.tamanhoPorcao || 1,
    peso: produto.peso || undefined,
    ingredientes: produto.ingredientes || [],
    alergenos: produto.alergenos || [],
    tags: produto.tags || [],
    vegetariano: produto.semIngredientesOrigemAnimal || false,
    vegano: produto.semIngredientesOrigemAnimal || false,
    semGluten: produto.semGluten || false,
    semLactose: produto.semLactose || false,
    semAcucar: produto.semAcucar || false,
    organico: produto.cultivadoSemAgrotoxicos || false,
    disponivel: produto.ativo || true,
    destaque: produto.destacado || false,
    promocao: produto.precoPromocional ? true : false,
    disponibilidadeDias: produto.disponibilidade ? {
      segunda: produto.disponibilidade.segunda || true,
      terca: produto.disponibilidade.terca || true,
      quarta: produto.disponibilidade.quarta || true,
      quinta: produto.disponibilidade.quinta || true,
      sexta: produto.disponibilidade.sexta || true,
      sabado: produto.disponibilidade.sabado || true,
      domingo: produto.disponibilidade.domingo || true,
    } : undefined,
    horarioInicio: produto.disponibilidade?.horarioInicio || PRODUTO_DEFAULTS.horarioInicio,
    horarioFim: produto.disponibilidade?.horarioFim || PRODUTO_DEFAULTS.horarioFim,
    controlarEstoque: produto.controlarEstoque || false,
    quantidadeEstoque: produto.quantidadeEstoque || undefined,
    estoqueMinimo: produto.estoqueMinimo || undefined,
    complementos: produto.complementos || [],
    temVariacoes: produto.temVariacoes || false,
    variacoes: produto.variacoes || [],
  };
};
