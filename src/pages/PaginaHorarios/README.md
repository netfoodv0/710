# Página de Horários - Estrutura Modular

Esta página segue o padrão modular estabelecido pelas outras páginas do projeto, organizando todos os componentes, hooks, tipos e utilitários em uma estrutura clara e manutenível.

## 📁 Estrutura de Arquivos

```
src/pages/PaginaHorarios/
├── Horarios.tsx                  # Componente principal da página
├── components/                   # Componentes específicos da página
│   ├── HorariosLayout.tsx       # Layout principal da página
│   └── index.ts                 # Exportações dos componentes
├── hooks/                       # Hooks específicos da página
│   ├── useHorarios.ts           # Hook principal com lógica de negócio
│   ├── useHorariosActions.ts    # Hook para ações da página
│   ├── useHorariosTranslation.ts # Hook para traduções
│   └── index.ts                 # Exportações dos hooks
├── types/                       # Tipos TypeScript específicos
│   ├── horarios.types.ts        # Interfaces e tipos dos horários
│   └── index.ts                 # Exportações dos tipos
├── services/                    # Serviços e integrações (futuro)
├── utils/                       # Utilitários específicos (futuro)
├── index.ts                     # Exportações principais
└── README.md                    # Este arquivo
```

## 🎯 Componentes Principais

### Horarios.tsx
- **Responsabilidade**: Componente principal que orquestra toda a página
- **Funcionalidades**: 
  - Integra todos os hooks e componentes
  - Gerencia o estado global da página
  - Coordena as ações do usuário

### HorariosLayout.tsx
- **Responsabilidade**: Define o layout visual da página
- **Funcionalidades**:
  - Estrutura básica da página
  - Container responsivo

## 🔧 Hooks

### useHorarios
- **Responsabilidade**: Hook principal que gerencia toda a lógica de negócio
- **Retorna**:
  - `data`: Array de horários
  - `error`: Mensagens de erro
  - `handleUpdateData`: Função para atualizar horário
  - `handleAddHorario`: Função para adicionar horário
  - `handleRemoveHorario`: Função para remover horário
  - `t`: Função de tradução

### useHorariosActions
- **Responsabilidade**: Gerencia as ações relacionadas aos horários
- **Funcionalidades**:
  - `fetchHorariosData`: Busca dados do Firebase
  - `updateHorarioData`: Atualiza horário no Firebase
  - `addHorario`: Adiciona novo horário
  - `removeHorario`: Remove horário

### useHorariosTranslation
- **Responsabilidade**: Gerencia traduções específicas da página
- **Funcionalidades**:
  - Fornece função `t()` para traduzir textos

## 📝 Tipos

### HorarioData
Interface para dados de horário:
- `id`: Identificador único
- `diaSemana`: Dia da semana
- `horaAbertura`: Horário de abertura
- `horaFechamento`: Horário de fechamento
- `ativo`: Status do horário

### HorariosProps
Props do componente principal (a ser expandido conforme necessário)

### UseHorariosReturn
Tipo de retorno do hook useHorarios

## 🚀 Características

✅ **Modular**: Cada componente tem responsabilidade específica
✅ **Reutilizável**: Hooks e componentes podem ser reutilizados
✅ **Tipado**: TypeScript bem estruturado
✅ **Limpo**: Separação clara de responsabilidades
✅ **Manutenível**: Fácil de encontrar e modificar código
✅ **Escalável**: Preparado para futuras implementações

## 📦 Como Usar

```typescript
import { Horarios } from './pages/PaginaHorarios';

// Usar o componente
<Horarios />
```

## 🔥 Integração com Firebase

### **Conectado ao Backend:**
- ✅ **FirebaseConfiguracaoService** - Integração completa
- ✅ **Estrutura existente** - Usa `horarioFuncionamento` em `ConfiguracaoLoja`
- ✅ **Autenticação** - Integrado com `useAuth` para obter `lojaId`
- ✅ **Estados de loading** - Indicadores visuais durante operações
- ✅ **Tratamento de erros** - Erros silenciosos (apenas console)
- ✅ **Persistência** - Dados salvos automaticamente no Firestore

### **Estrutura de Dados:**
```typescript
// Firebase (ConfiguracaoLoja)
horarioFuncionamento: {
  segunda: { abertura: '08:00', fechamento: '22:00', ativo: true },
  terca: { abertura: '08:00', fechamento: '22:00', ativo: true },
  // ... outros dias
}

// Componente (HorariosConfig)
{
  fusoHorario: 'America/Sao_Paulo',
  horarios: [
    { diaSemana: 'Segunda-feira', horaAbertura: '08:00', horaFechamento: '22:00', ativo: true }
    // ... outros dias
  ]
}
```

## 🔜 Próximos Passos

- [x] ✅ **Implementar integração com Firebase**
- [x] ✅ **Criar componentes de formulário para adicionar/editar horários**
- [x] ✅ **Implementar estados de loading e notificações**
- [ ] Implementar validações de horários
- [ ] Adicionar testes unitários
- [ ] Implementar horários especiais (feriados, etc.)
