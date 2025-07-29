# Componentes de Produtos

## Estrutura de Pastas

```
src/components/produtos/
├── index.ts                 # Exports centralizados
├── ListaProdutos.tsx
├── modals/
│   └── index.ts            # Modais de produtos
└── forms/
    └── index.ts            # Formulários de produtos
```

## Organização

### Componentes Principais
- `ListaProdutos.tsx` - Lista e gerenciamento de produtos

### Modais
- `ModalProduto.tsx` - Modal para criar/editar produtos

### Formulários
- `FormularioProduto.tsx` - Formulário principal de produtos
- `UploadImagem.tsx` - Upload de imagens
- `ClassificacoesProduto.tsx` - Classificações e avaliações
- `DisponibilidadeProduto.tsx` - Controle de disponibilidade
- `DescontoProduto.tsx` - Configuração de descontos
- `ComplementosProduto.tsx` - Gerenciamento de complementos

## Boas Práticas

✅ **Componentes reutilizáveis**  
✅ **Separação por funcionalidade**  
✅ **Exports organizados**  
✅ **Tipagem TypeScript**  
✅ **Props bem definidas**  
✅ **Documentação clara** 