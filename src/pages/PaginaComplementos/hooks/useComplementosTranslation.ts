// Hook para traduções específicas da página de complementos
export function useComplementosTranslation() {
  const translations = {
    // Títulos e cabeçalhos
    pageTitle: 'Complementos',
    pageSubtitle: 'Gerencie os complementos dos seus produtos',
    
    // Ações
    create: 'Criar Complemento',
    edit: 'Editar Complemento',
    delete: 'Excluir Complemento',
    duplicate: 'Duplicar Complemento',
    toggleStatus: 'Alternar Status',
    
    // Status
    active: 'Ativo',
    inactive: 'Inativo',
    required: 'Obrigatório',
    optional: 'Opcional',
    
    // Campos do formulário
    name: 'Nome',
    description: 'Descrição',
    price: 'Preço',
    category: 'Categoria',
    type: 'Tipo',
    maxSelections: 'Máximo de Seleções',
    minSelections: 'Mínimo de Seleções',
    availability: 'Disponibilidade',
    
    // Mensagens
    noComplementos: 'Nenhum complemento encontrado',
    noComplementosDescription: 'Crie seu primeiro complemento para começar',
    loadingComplementos: 'Carregando complementos...',
    errorLoadingComplementos: 'Erro ao carregar complementos',
    
    // Confirmações
    confirmDelete: 'Tem certeza que deseja excluir este complemento?',
    confirmDeleteTitle: 'Excluir Complemento',
    
    // Validações
    nameRequired: 'Nome é obrigatório',
    priceRequired: 'Preço é obrigatório',
    priceInvalid: 'Preço deve ser um número válido',
    categoryRequired: 'Categoria é obrigatória',
    
    // Estatísticas
    totalComplementos: 'Total de Complementos',
    activeComplementos: 'Complementos Ativos',
    inactiveComplementos: 'Complementos Inativos',
    byCategory: 'Por Categoria',
    byType: 'Por Tipo',
    
    // Filtros
    filterByCategory: 'Filtrar por Categoria',
    filterByStatus: 'Filtrar por Status',
    filterByType: 'Filtrar por Tipo',
    searchPlaceholder: 'Buscar complementos...',
    allCategories: 'Todas as Categorias',
    allStatus: 'Todos os Status',
    allTypes: 'Todos os Tipos',
    
    // Dias da semana
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
    sunday: 'Domingo',
    
    // Horários
    startTime: 'Horário de Início',
    endTime: 'Horário de Fim',
    addSchedule: 'Adicionar Horário',
    removeSchedule: 'Remover Horário',
    
    // Botões
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    add: 'Adicionar',
    remove: 'Remover',
    edit: 'Editar',
    view: 'Visualizar',
    
    // Sucesso
    complementoCreated: 'Complemento criado com sucesso!',
    complementoUpdated: 'Complemento atualizado com sucesso!',
    complementoDeleted: 'Complemento excluído com sucesso!',
    complementoDuplicated: 'Complemento duplicado com sucesso!',
    statusUpdated: 'Status atualizado com sucesso!',
    
    // Erro
    errorCreating: 'Erro ao criar complemento',
    errorUpdating: 'Erro ao atualizar complemento',
    errorDeleting: 'Erro ao excluir complemento',
    errorDuplicating: 'Erro ao duplicar complemento',
    errorUpdatingStatus: 'Erro ao atualizar status'
  };

  return translations;
}
















