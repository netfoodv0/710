# Página de Acompanhamentos - Integração com Firebase

## Visão Geral

A página de acompanhamentos foi atualizada para usar dados reais de complementos salvos no Firebase, em vez de dados fictícios. Agora ela exibe os mesmos complementos que são mostrados na página de cardápio.

## Mudanças Implementadas

### 1. Serviço de Acompanhamentos (`services/acompanhamentosService.ts`)

- **Novo serviço**: `AcompanhamentosService` que busca complementos do Firebase
- **Conversão de dados**: Converte complementos para o formato de acompanhamentos
- **Simulação de estoque**: Gera dados de estoque baseados nos complementos reais
- **Métodos disponíveis**:
  - `buscarAcompanhamentos(lojaId)`: Busca todos os complementos da loja
  - `buscarAcompanhamentoPorId(id, lojaId)`: Busca um complemento específico
  - `atualizarStatusComplemento(id, status)`: Atualiza status ativo/inativo
  - `excluirComplemento(id)`: Exclui um complemento

### 2. Hook Principal (`hooks/useAcompanhamentos.ts`)

- **Integração com Firebase**: Usa `AcompanhamentosService` para buscar dados reais
- **Autenticação**: Integrado com `useAuth` para obter ID da loja
- **Carregamento automático**: Carrega dados quando a loja está disponível
- **Tratamento de erros**: Exibe notificações de erro/sucesso
- **Recarregamento**: Função `handleRetry` para recarregar dados do Firebase

### 3. Hook de Ações (`hooks/useAcompanhamentosActions.ts`)

- **Notificações**: Integrado com sistema de notificações
- **Tratamento de erros**: Melhor tratamento de erros com feedback visual

### 4. Componente de Tabela (`components/AcompanhamentosTable.tsx`)

- **Categorias dinâmicas**: Extrai categorias únicas dos dados reais
- **Filtros adaptativos**: Filtros baseados nos dados carregados do Firebase

## Estrutura de Dados

### Complemento (Firebase)
```typescript
interface Complemento {
  id: string;
  lojaId: string;
  nome: string;
  categoria: string;
  descricao?: string;
  preco: number;
  status: 'ativo' | 'inativo';
  dataCriacao: Date;
  dataAtualizacao: Date;
}
```

### Acompanhamento (Página)
```typescript
interface ProdutoAcompanhamento {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  semControleEstoque: boolean;
  fichaTecnica: string;
  status: 'em_estoque' | 'baixo_estoque' | 'sem_estoque';
  medida: string;
}
```

## Conversão de Dados

O serviço converte automaticamente os complementos para o formato de acompanhamentos:

- **ID**: Usa índice sequencial (1, 2, 3...)
- **Nome**: Copiado diretamente do complemento
- **Categoria**: Usa categoria do complemento ou "Acompanhamentos" como padrão
- **Quantidade**: Gerada aleatoriamente (1-50)
- **Quantidade Mínima**: Gerada aleatoriamente (5-15)
- **Preço de Custo**: 60% do preço de venda do complemento
- **Custo de Estoque**: Preço de custo × quantidade
- **Ficha Técnica**: "Sim" se tem descrição, "Não" caso contrário
- **Status**: Calculado baseado na quantidade simulada
- **Medida**: Determinada pelo nome do produto

## Benefícios

1. **Dados Reais**: Usa os mesmos complementos do cardápio
2. **Sincronização**: Mudanças no cardápio refletem nos acompanhamentos
3. **Consistência**: Uma única fonte de verdade para complementos
4. **Manutenibilidade**: Menos dados duplicados para manter

## Como Usar

A página de acompanhamentos agora funciona automaticamente:

1. **Carregamento**: Dados são carregados automaticamente quando a loja está disponível
2. **Exibição**: Mostra todos os complementos da loja como acompanhamentos
3. **Filtros**: Categorias são extraídas dinamicamente dos dados
4. **Atualização**: Botão "Tentar Novamente" recarrega dados do Firebase

## Próximos Passos

- [ ] Implementar edição de complementos diretamente na página
- [ ] Adicionar funcionalidade de alteração de estoque real
- [ ] Integrar com sistema de movimentação de estoque
- [ ] Adicionar relatórios específicos para acompanhamentos


