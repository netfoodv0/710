# 🏗️ Refatoração para DDD (Domain-Driven Design) Leve

## 📊 Análise da Estrutura Atual

### ✅ **Pontos Positivos**
Você já tem uma base **muito boa** para DDD:

```
features/
├── cardapio/          ✅ Já tem components, hooks, services, types
├── configuracoes/     ✅ Já tem components, hooks, services, types
├── historico/         ✅ Já tem components, hooks, services, types
├── pedidos/           ✅ Já tem components, hooks, services, types
└── relatorios/        ✅ Já tem components, hooks, services, types
```

### ⚠️ **Pontos de Melhoria**

1. **Hooks duplicados**: Muitos hooks estão em `src/hooks/` E em `src/features/[dominio]/hooks/`
2. **Services espalhados**: Services em `src/services/` E em `features/[dominio]/services/`
3. **Types globais demais**: `src/types/` tem muita coisa que poderia estar nos domínios
4. **Components compartilhados**: Alguns components em `src/components/` são específicos de domínio
5. **Falta de index.ts**: Alguns domínios não exportam uma API pública clara

---

## 🎯 Estrutura Proposta (DDD Leve)

### **Visão Geral**

```
src/
├── features/                    # ⭐ DOMÍNIOS DE NEGÓCIO
│   ├── cardapio/               # Domínio: Gestão do Cardápio
│   │   ├── components/         # Componentes do domínio
│   │   │   ├── forms/         # Formulários específicos
│   │   │   ├── modals/        # Modais específicos
│   │   │   └── ui/            # UI específica
│   │   ├── hooks/             # Hooks do domínio
│   │   ├── services/          # Services do domínio
│   │   ├── types/             # Types do domínio
│   │   ├── utils/             # Utils específicos (opcional)
│   │   ├── constants/         # Constantes do domínio (opcional)
│   │   └── index.ts           # 🔑 API pública do domínio
│   │
│   ├── pedidos/               # Domínio: Gestão de Pedidos
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── pdv/                   # Domínio: Ponto de Venda
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── relatorios/            # Domínio: Relatórios
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── fidelidade/            # Domínio: Sistema de Fidelidade
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── whatsapp/              # Domínio: Integração WhatsApp
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── estoque/               # Domínio: Gestão de Estoque
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── usuarios/              # Domínio: Gestão de Usuários
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── auth/                  # Domínio: Autenticação
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
│
├── shared/                     # 🔄 CÓDIGO COMPARTILHADO
│   ├── components/            # Componentes UI genéricos
│   │   ├── ui/               # Shadcn/Radix components
│   │   ├── layouts/          # Layouts genéricos
│   │   └── feedback/         # Toasts, Alerts, etc.
│   ├── hooks/                # Hooks genéricos
│   │   ├── useMediaQuery.ts
│   │   ├── usePagination.ts
│   │   └── useDebounce.ts
│   ├── utils/                # Utilitários gerais
│   ├── types/                # Types compartilhados
│   └── constants/            # Constantes globais
│
├── core/                      # 🎯 INFRAESTRUTURA CORE
│   ├── config/               # Configurações
│   │   ├── environment.ts
│   │   ├── firebase.ts
│   │   └── routes.ts
│   ├── lib/                  # Bibliotecas base
│   │   ├── firebase.ts
│   │   ├── api.ts
│   │   └── storage.ts
│   ├── services/             # Services base/abstratos
│   │   ├── BaseService.ts
│   │   └── ErrorService.ts
│   └── providers/            # Context Providers globais
│       ├── AuthProvider.tsx
│       ├── ThemeProvider.tsx
│       └── QueryProvider.tsx
│
├── pages/                    # 📄 PÁGINAS (apenas composição)
│   ├── Dashboard/
│   │   └── index.tsx        # Importa de features/
│   ├── Pedidos/
│   │   └── index.tsx        # Importa de features/
│   └── Cardapio/
│       └── index.tsx        # Importa de features/
│
├── routes/                   # 🛣️ ROTAS
│   └── index.tsx
│
├── App.tsx
└── main.tsx
```

---

## 🔧 Plano de Refatoração

### **Fase 1: Criar Domínios Faltantes** (2-3 horas)

#### Criar estrutura para domínios não mapeados:

```bash
# Novos domínios a criar
features/
├── pdv/
├── fidelidade/
├── whatsapp/
├── estoque/
├── usuarios/
└── auth/
```

### **Fase 2: Mover Código Específico** (5-8 horas)

#### 2.1 Mover hooks específicos de domínio

**De:** `src/hooks/`  
**Para:** `src/features/[dominio]/hooks/`

```typescript
// Exemplos:
src/hooks/usePDV.ts → src/features/pdv/hooks/usePDV.ts
src/hooks/useFidelidade.ts → src/features/fidelidade/hooks/useFidelidade.ts
src/hooks/useWhatsAppConnection.ts → src/features/whatsapp/hooks/useWhatsAppConnection.ts
```

**Manter em `src/hooks/`:** Apenas hooks genéricos
```typescript
// Hooks que ficam em src/hooks/ (genéricos)
- useMediaQuery.ts
- usePagination.ts
- useDebounce.ts
- useLocalStorage.ts
```

#### 2.2 Mover services específicos

**De:** `src/services/`  
**Para:** `src/features/[dominio]/services/`

```typescript
// Já movidos ✅
firebaseCardapioService.ts → features/cardapio/services/
firebasePedidoService.ts → features/pedidos/services/

// A mover:
firebaseWhatsAppService.ts → features/whatsapp/services/
firebaseClientesService.ts → features/usuarios/services/
authService.ts → features/auth/services/
```

#### 2.3 Mover types específicos

**De:** `src/types/global/`  
**Para:** `src/features/[dominio]/types/`

```typescript
// A mover:
src/types/global/pdv.ts → features/pdv/types/pdv.types.ts
src/types/global/products.ts → features/cardapio/types/products.types.ts
src/types/global/orders.ts → features/pedidos/types/orders.types.ts
```

#### 2.4 Mover componentes específicos

**De:** `src/components/`  
**Para:** `src/features/[dominio]/components/`

```typescript
// Exemplos:
src/components/pdv/ → features/pdv/components/
src/components/whatsapp/ → features/whatsapp/components/
src/components/fidelidade/ → features/fidelidade/components/
```

### **Fase 3: Criar APIs Públicas (index.ts)** (2-3 horas)

#### Cada domínio deve exportar uma API pública clara:

```typescript
// features/cardapio/index.ts
export { CardapioHeader, CardapioMain, CardapioSidebar } from './components';
export { useProdutos, useFiltrosCardapio } from './hooks';
export { firebaseCardapioService } from './services';
export type { Produto, Categoria, Complemento } from './types';
```

### **Fase 4: Reorganizar Código Compartilhado** (3-4 horas)

#### 4.1 Criar pasta `shared/`

```bash
mkdir src/shared
mkdir src/shared/components
mkdir src/shared/hooks
mkdir src/shared/utils
mkdir src/shared/types
```

#### 4.2 Mover componentes genéricos

```typescript
// De src/components/ui/ para src/shared/components/ui/
- Button, Input, Select, Modal (genéricos)
- Card, Badge, Avatar (genéricos)
- Table, Pagination (genéricos)
```

### **Fase 5: Criar pasta `core/`** (2-3 horas)

#### Centralizar infraestrutura:

```bash
mkdir src/core
mkdir src/core/config
mkdir src/core/lib
mkdir src/core/services
mkdir src/core/providers
```

```typescript
// Mover:
src/config/ → src/core/config/
src/lib/ → src/core/lib/
src/context/ → src/core/providers/
```

### **Fase 6: Atualizar Imports** (4-6 horas)

#### Atualizar todos os imports para nova estrutura:

```typescript
// ❌ Antes
import { useProdutos } from '@/hooks/useProdutos';
import { Produto } from '@/types/global/produtos';

// ✅ Depois
import { useProdutos, Produto } from '@/features/cardapio';
```

### **Fase 7: Atualizar Pages** (2-3 horas)

#### Simplificar páginas para apenas composição:

```typescript
// pages/Cardapio/index.tsx
import { CardapioHeader, CardapioMain, CardapioSidebar } from '@/features/cardapio';

export default function CardapioPage() {
  return (
    <div>
      <CardapioHeader />
      <CardapioMain />
      <CardapioSidebar />
    </div>
  );
}
```

---

## 📋 Checklist de Refatoração

### **Domínios a Refatorar**

- [ ] ✅ **cardapio** - Já bem estruturado
- [ ] ✅ **pedidos** - Já bem estruturado
- [ ] ✅ **relatorios** - Já bem estruturado
- [ ] ✅ **historico** - Já bem estruturado
- [ ] ✅ **configuracoes** - Já bem estruturado
- [ ] 🔨 **pdv** - Criar estrutura
- [ ] 🔨 **fidelidade** - Criar estrutura
- [ ] 🔨 **whatsapp** - Criar estrutura
- [ ] 🔨 **estoque** - Criar estrutura
- [ ] 🔨 **usuarios** - Criar estrutura
- [ ] 🔨 **auth** - Criar estrutura

### **Tarefas Gerais**

- [ ] Criar pasta `shared/`
- [ ] Criar pasta `core/`
- [ ] Mover hooks genéricos para `shared/hooks/`
- [ ] Mover componentes UI para `shared/components/ui/`
- [ ] Mover configs para `core/config/`
- [ ] Mover providers para `core/providers/`
- [ ] Criar `index.ts` para cada domínio
- [ ] Atualizar imports em toda aplicação
- [ ] Atualizar tsconfig paths
- [ ] Atualizar documentação

---

## 🎯 Benefícios da Refatoração

### **1. Isolamento de Domínios**
✅ Equipes podem trabalhar em domínios diferentes sem conflitos  
✅ Mudanças em um domínio não afetam outros  
✅ Facilita code review focado

### **2. Facilita Testes**
✅ Cada domínio pode ter seus próprios testes  
✅ Mocks ficam junto do domínio  
✅ Testes mais focados e rápidos

### **3. Escalabilidade**
✅ Fácil adicionar novos domínios  
✅ Possível extrair domínios para microfrontends no futuro  
✅ Reduz complexidade cognitiva

### **4. Manutenibilidade**
✅ Código mais fácil de encontrar  
✅ Menos acoplamento  
✅ Refatorações mais seguras

### **5. Onboarding**
✅ Novos devs entendem a estrutura rapidamente  
✅ Documentação mais clara  
✅ Padrões consistentes

---

## 📚 Exemplo Completo: Domínio PDV

```
features/pdv/
├── components/
│   ├── PDVHeader.tsx
│   ├── PDVProductList.tsx
│   ├── PDVCart.tsx
│   ├── PDVPayment.tsx
│   ├── modals/
│   │   ├── ModalFinalizarVenda.tsx
│   │   └── ModalDesconto.tsx
│   └── index.ts
│
├── hooks/
│   ├── usePDV.ts
│   ├── usePDVCart.ts
│   ├── usePDVPayment.ts
│   └── index.ts
│
├── services/
│   ├── pdvService.ts
│   ├── paymentService.ts
│   └── index.ts
│
├── types/
│   ├── pdv.types.ts
│   ├── cart.types.ts
│   ├── payment.types.ts
│   └── index.ts
│
├── utils/
│   ├── calculateTotal.ts
│   ├── formatPrice.ts
│   └── index.ts
│
├── constants/
│   ├── paymentMethods.ts
│   └── index.ts
│
└── index.ts              # 🔑 API Pública
```

### **API Pública do Domínio (index.ts)**

```typescript
// features/pdv/index.ts

// Components
export { 
  PDVHeader,
  PDVProductList, 
  PDVCart, 
  PDVPayment 
} from './components';

export {
  ModalFinalizarVenda,
  ModalDesconto
} from './components/modals';

// Hooks
export { 
  usePDV, 
  usePDVCart, 
  usePDVPayment 
} from './hooks';

// Services
export { 
  pdvService, 
  paymentService 
} from './services';

// Types
export type { 
  PDV, 
  Cart, 
  CartItem, 
  Payment, 
  PaymentMethod 
} from './types';

// Utils
export { 
  calculateTotal, 
  formatPrice 
} from './utils';

// Constants
export { PAYMENT_METHODS } from './constants';
```

### **Uso no Page**

```typescript
// pages/PDV/index.tsx
import { 
  PDVHeader, 
  PDVProductList, 
  PDVCart, 
  PDVPayment,
  usePDV 
} from '@/features/pdv';

export default function PDVPage() {
  const { cart, addToCart, removeFromCart } = usePDV();

  return (
    <div className="pdv-container">
      <PDVHeader />
      <PDVProductList onAddProduct={addToCart} />
      <PDVCart cart={cart} onRemoveItem={removeFromCart} />
      <PDVPayment cart={cart} />
    </div>
  );
}
```

---

## ⏱️ Estimativa de Tempo Total

| Fase | Tempo Estimado |
|------|----------------|
| Fase 1: Criar domínios | 2-3 horas |
| Fase 2: Mover código específico | 5-8 horas |
| Fase 3: Criar APIs públicas | 2-3 horas |
| Fase 4: Reorganizar shared | 3-4 horas |
| Fase 5: Criar core | 2-3 horas |
| Fase 6: Atualizar imports | 4-6 horas |
| Fase 7: Atualizar pages | 2-3 horas |
| **TOTAL** | **20-30 horas** |

---

## 🚀 Recomendação de Execução

### **Opção 1: Refatoração Gradual** ⭐ Recomendado
Refatorar um domínio por vez, mantendo a aplicação funcionando:

1. Semana 1: PDV + Auth
2. Semana 2: WhatsApp + Fidelidade
3. Semana 3: Estoque + Usuários
4. Semana 4: Criar shared/ e core/

### **Opção 2: Refatoração Completa**
Fazer tudo de uma vez em uma branch separada (mais arriscado)

### **Opção 3: Apenas Novos Domínios**
Aplicar padrão DDD apenas para novas features, migrando antigas aos poucos

---

## 📝 Notas Finais

- Sua estrutura atual **já é muito boa**!
- Esta refatoração é sobre **evoluir**, não corrigir erros
- DDD leve traz benefícios sem adicionar complexidade excessiva
- A mudança vale a pena para projetos que vão crescer
- Mantenha a simplicidade: nem todo domínio precisa de tudo

**Quer que eu comece a implementação de algum domínio específico?**
