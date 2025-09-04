# Página de Fidelidade - Estrutura Modular

Esta página segue o padrão modular estabelecido pelo Dashboard, organizando todos os componentes, hooks, tipos e utilitários em uma estrutura clara e manutenível.

## 📁 Estrutura de Arquivos

```
src/pages/PaginaFidelidade/
├── Fidelidade.tsx                 # Componente principal da página
├── components/                    # Componentes específicos da página
│   ├── FidelidadeLayout.tsx      # Layout principal da página
│   ├── SeletorSistema.tsx        # Seletor entre sistemas (Cashback/Pontos)
│   ├── EstatisticasGerais.tsx    # Estatísticas gerais da fidelidade
│   ├── SistemaCashback.tsx       # Configurações do sistema de cashback
│   ├── SistemaPontos.tsx         # Configurações do sistema de pontos
│   ├── ConfiguracoesPontos.tsx   # Configurações específicas de pontos
│   ├── ProdutosResgataveis.tsx   # Tabela de produtos resgatáveis
│   ├── ClientesPontos.tsx        # Tabela de clientes com pontos
│   ├── MigracaoSistemas.tsx      # Migração entre sistemas
│   └── index.ts                  # Exportações dos componentes
├── hooks/                        # Hooks específicos da página
│   ├── useFidelidade.ts          # Hook principal com lógica de negócio
│   ├── useFidelidadeActions.ts   # Hook para ações da página
│   ├── useFidelidadeTranslation.ts # Hook para traduções
│   └── index.ts                  # Exportações dos hooks
├── types/                        # Tipos TypeScript específicos
│   ├── fidelidade.types.ts       # Interfaces e tipos da fidelidade
│   └── index.ts                  # Exportações dos tipos
├── services/                     # Serviços e integrações (futuro)
├── utils/                        # Utilitários específicos (futuro)
├── index.ts                      # Exportações principais
└── README.md                     # Este arquivo
```

## 🎯 Componentes Principais

### Fidelidade.tsx
- **Responsabilidade**: Componente principal que orquestra toda a página
- **Funcionalidades**: 
  - Integra todos os hooks e componentes
  - Gerencia o layout geral da página
  - Trata erros com ErrorBoundary

### FidelidadeLayout.tsx
- **Responsabilidade**: Layout principal que organiza os componentes
- **Funcionalidades**:
  - Renderiza condicionalmente baseado no sistema ativo
  - Gerencia estados de loading e erro
  - Coordena a comunicação entre componentes

### SeletorSistema.tsx
- **Responsabilidade**: Permite alternar entre sistemas de fidelidade
- **Funcionalidades**:
  - Radio switch para escolher entre Cashback e Pontos
  - Interface limpa e intuitiva

### EstatisticasGerais.tsx
- **Responsabilidade**: Exibe estatísticas gerais da fidelidade
- **Funcionalidades**:
  - Cards com métricas importantes
  - Dados calculados dinamicamente
  - Ícones e visualização clara

### SistemaCashback.tsx
- **Responsabilidade**: Configurações do sistema de cashback
- **Funcionalidades**:
  - Configuração de taxa de cashback
  - Configuração de validade
  - Toggle para ativar/desativar
  - Informações e benefícios

### SistemaPontos.tsx
- **Responsabilidade**: Configurações do sistema de pontos
- **Funcionalidades**:
  - Tabs para diferentes seções
  - Integração com ConfiguracoesPontos, ProdutosResgataveis e ClientesPontos
  - Toggle para ativar/desativar

## 🔧 Hooks Específicos

### useFidelidade.ts
- **Responsabilidade**: Hook principal com toda a lógica de negócio
- **Funcionalidades**:
  - Gerenciamento de estado dos sistemas
  - Dados mock para desenvolvimento
  - Handlers para todas as ações
  - Estados de loading e erro

### useFidelidadeActions.ts
- **Responsabilidade**: Hook para ações específicas da página
- **Funcionalidades**:
  - Handlers para mudanças de sistema
  - Handlers para configurações
  - Handlers para ações (adicionar, exportar, migrar)

### useFidelidadeTranslation.ts
- **Responsabilidade**: Hook para textos e traduções
- **Funcionalidades**:
  - Centraliza todos os textos da página
  - Facilita manutenção e internacionalização

## 📊 Tipos TypeScript

### fidelidade.types.ts
- **Responsabilidade**: Define todos os tipos específicos da fidelidade
- **Tipos principais**:
  - `ProdutoResgatavel`: Interface para produtos resgatáveis
  - `ClientePontos`: Interface para clientes com pontos
  - `SistemaFidelidade`: Union type para sistemas
  - `FidelidadeData`: Interface principal dos dados
  - Props para todos os componentes

## 🚀 Funcionalidades

### Sistemas de Fidelidade
- **Sistema de Pontos**: Clientes acumulam pontos por compras
- **Sistema de Cashback**: Clientes recebem porcentagem em crédito

### Configurações
- **Taxa de Conversão**: Pontos por real gasto
- **Pontos de Boas-vindas**: Pontos para novos clientes
- **Taxa de Cashback**: Porcentagem de cashback
- **Validade**: Tempo de validade do saldo

### Gestão de Dados
- **Produtos Resgatáveis**: Tabela com produtos disponíveis para resgate
- **Clientes com Pontos**: Tabela com clientes e seus saldos
- **Estatísticas**: Métricas gerais do sistema

### Migração
- **Entre Sistemas**: Migração de cashback para pontos e vice-versa
- **Preservação de Dados**: Mantém histórico durante migração

## 🔄 Integração com Sistema

### Rotas
- **Rota**: `/fidelidade`
- **Lazy Loading**: Carregamento sob demanda
- **Fallback**: ChartsFallback para loading

### Dependências
- **Componentes UI**: DataTable, FormSwitch, Tabs, etc.
- **Ícones**: UsersIcon, BagIcon, RevenueIcon
- **Animações**: Framer Motion para transições
- **Contexto**: Não usa mais o contexto antigo

## 📈 Benefícios da Estrutura Modular

1. **Manutenibilidade**: Código organizado e fácil de manter
2. **Reutilização**: Componentes podem ser reutilizados
3. **Testabilidade**: Cada parte pode ser testada isoladamente
4. **Escalabilidade**: Fácil adicionar novas funcionalidades
5. **Performance**: Lazy loading e otimizações
6. **Type Safety**: TypeScript em toda a estrutura

## 🔧 Desenvolvimento

### Adicionando Novos Componentes
1. Crie o componente em `components/`
2. Adicione os tipos necessários em `types/`
3. Exporte em `components/index.ts`
4. Integre no `FidelidadeLayout.tsx`

### Adicionando Novos Hooks
1. Crie o hook em `hooks/`
2. Adicione os tipos de retorno em `types/`
3. Exporte em `hooks/index.ts`
4. Use no `useFidelidade.ts` ou componentes

### Modificando Tipos
1. Edite `types/fidelidade.types.ts`
2. Atualize interfaces afetadas
3. Verifique compatibilidade com componentes

## 📝 Notas Importantes

- **Dados Mock**: Atualmente usa dados mock para desenvolvimento
- **Contexto Antigo**: Não usa mais o `fidelidadeContext.tsx`
- **Componentes Externos**: Reutiliza componentes da pasta `components/`
- **Estilos**: Mantém os mesmos estilos do design original
- **Funcionalidade**: Preserva 100% da funcionalidade original
