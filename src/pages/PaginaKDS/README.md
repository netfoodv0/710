# Página KDS - Kitchen Display System

## Estrutura Organizada

A página KDS foi reorganizada seguindo o mesmo padrão do Dashboard para manter consistência e facilitar manutenção.

### Estrutura de Pastas

```
src/pages/PaginaKDS/
├── KDS.tsx (componente principal)
├── components/
│   ├── KDSLayout.tsx (layout principal)
│   ├── KDSContent.tsx (conteúdo principal)
│   ├── KDSGrid.tsx (grid de colunas)
│   └── index.ts (exportações)
├── hooks/
│   ├── usePedidosKDS.ts (gerenciamento de pedidos)
│   ├── useKDSActions.ts (ações do KDS)
│   ├── useKDSTranslation.ts (traduções)
│   └── index.ts (exportações)
├── types/
│   ├── kds.types.ts (tipos TypeScript)
│   └── index.ts (exportações)
├── services/ (preparado para futuras implementações)
├── utils/ (preparado para futuras implementações)
├── index.ts (exportação principal)
└── README.md (esta documentação)
```

### Componentes

- **KDS**: Componente principal que orquestra toda a página
- **KDSLayout**: Layout principal com estrutura responsiva
- **KDSContent**: Conteúdo principal com scroll
- **KDSGrid**: Grid responsivo com drag and drop

### Hooks

- **usePedidosKDS**: Gerencia estado dos pedidos e operações
- **useKDSActions**: Ações como drag and drop
- **useKDSTranslation**: Traduções específicas do KDS

### Tipos

- **PedidoComColuna**: Pedido com informação de coluna
- **ItemStatus**: Status dos itens (pendente, preparando, pronto)
- **KDSContentProps, KDSGridProps**: Props dos componentes

### Características

✅ **Modular**: Cada componente tem responsabilidade específica
✅ **Reutilizável**: Hooks e componentes podem ser reutilizados
✅ **Tipado**: TypeScript bem estruturado
✅ **Limpo**: Separação clara de responsabilidades
✅ **Manutenível**: Fácil de encontrar e modificar código
✅ **Escalável**: Estrutura preparada para crescimento
✅ **Consistente**: Segue o mesmo padrão do Dashboard
