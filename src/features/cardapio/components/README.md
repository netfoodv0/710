# Componentes do Cardápio

## Estrutura de Pastas

```
src/components/cardapio/
├── index.ts                 # Exports centralizados
├── GerenciadorCategorias.tsx
├── ListaCategorias.tsx
├── modals/
│   └── index.ts            # Modais do cardápio
├── forms/
│   └── index.ts            # Formulários e filtros
└── ui/
    └── index.ts            # Componentes de UI
```

## Organização

### Componentes Principais
- `GerenciadorCategorias.tsx` - Gerenciamento de categorias
- `ListaCategorias.tsx` - Lista de categorias

### Modais
- `ModalCategoria.tsx` - Modal para criar/editar categorias

### Formulários
- `FiltrosCardapio.tsx` - Filtros da página de produtos
- `FiltrosCategorias.tsx` - Filtros de categorias

### UI Components
- `EstatisticasCardapio.tsx` - Cards de estatísticas
- `SkeletonLoading.tsx` - Loading states com skeleton

## Boas Práticas

✅ **Separação por responsabilidade**  
✅ **Exports centralizados**  
✅ **Nomenclatura consistente**  
✅ **Componentes reutilizáveis**  
✅ **Tipagem TypeScript**  
✅ **Documentação clara** 