# Página Cupons - Sistema de Relatórios de Cupons

## Estrutura Organizada

A página de Cupons foi reorganizada seguindo o mesmo padrão do Dashboard, KDS e Horários para manter consistência e facilitar manutenção.

### Estrutura de Pastas

```
src/pages/PaginaCupons/
├── Cupons.tsx (componente principal)
├── components/
│   ├── CuponsLayout.tsx (layout principal)
│   ├── CuponsStats.tsx (estatísticas de cupons)
│   ├── CuponsChart.tsx (gráfico de distribuição)
│   ├── CuponsTable.tsx (tabela de cupons)
│   ├── CuponsLoading.tsx (estado de carregamento)
│   ├── CuponsError.tsx (tratamento de erros)
│   └── index.ts (exportações)
├── hooks/
│   ├── useCupons.ts (lógica principal)
│   ├── useCuponsActions.ts (ações dos cupons)
│   ├── useCuponsTranslation.ts (traduções)
│   └── index.ts (exportações)
├── types/
│   ├── cupons.types.ts (tipos TypeScript)
│   └── index.ts (exportações)
├── services/ (preparado para futuras implementações)
├── utils/ (preparado para futuras implementações)
├── index.ts (exportação principal)
└── README.md (esta documentação)
```

### Componentes

- **Cupons**: Componente principal que orquestra toda a página
- **CuponsLayout**: Layout principal com estrutura responsiva
- **CuponsStats**: Estatísticas dos cupons (total, ativos, usos, descontos)
- **CuponsChart**: Gráfico de distribuição por categoria
- **CuponsTable**: Tabela com lista de cupons e filtros
- **CuponsLoading**: Estado de carregamento
- **CuponsError**: Tratamento de erros

### Hooks

- **useCupons**: Gerencia dados e estados principais
- **useCuponsActions**: Ações como exportar, visualizar, editar
- **useCuponsTranslation**: Traduções específicas dos cupons

### Tipos

- **Cupom**: Interface para dados de cupom
- **EstatisticaCupom**: Interface para estatísticas
- **CuponsData**: Interface principal com todos os dados
- **CuponsLayoutProps, CuponsStatsProps, etc.**: Props dos componentes
- **UseCuponsReturn**: Retorno dos hooks

### Características

✅ **Modular**: Cada componente tem responsabilidade específica
✅ **Reutilizável**: Hooks e componentes podem ser reutilizados
✅ **Tipado**: TypeScript bem estruturado
✅ **Limpo**: Separação clara de responsabilidades
✅ **Manutenível**: Fácil de encontrar e modificar código
✅ **Escalável**: Estrutura preparada para crescimento
✅ **Consistente**: Segue o mesmo padrão do Dashboard, KDS e Horários

### Funcionalidades

- Relatório de cupons com estatísticas
- Gráfico de distribuição por categoria
- Tabela com filtros e busca
- Exportação de relatórios
- Gerenciamento de cupons (visualizar, editar, excluir)
- Estados de carregamento e erro
- Interface responsiva

### Melhorias Implementadas

- **De 237 linhas** em um arquivo para **estrutura modular**
- **Separação de responsabilidades** clara
- **Hooks específicos** para lógica de negócio
- **Tipos TypeScript** bem definidos
- **Componentes reutilizáveis**
- **Tratamento de erros** centralizado
- **Traduções** organizadas
- **Mantém funcionalidade original** sem alterações no front-end


