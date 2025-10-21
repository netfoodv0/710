# 🏗️ Arquitetura do Sistema Voult

## 📁 Estrutura do Projeto

```
voult.710 - 5B/
├── src/
│   ├── app/                   # Configurações de layout e rotas
│   │   ├── layout/           # Layouts específicos
│   │   └── routes/           # Configurações de roteamento
│   │
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── ui/              # Componentes base (84 arquivos)
│   │   ├── modals/          # Modais (46 arquivos)
│   │   ├── forms/           # Formulários (22 arquivos)
│   │   ├── charts/          # Gráficos e visualizações
│   │   ├── pdv/             # Componentes específicos do PDV
│   │   ├── whatsapp/        # Integração WhatsApp
│   │   ├── analytics/       # Componentes de analytics
│   │   ├── auth/            # Componentes de autenticação
│   │   ├── mobile/          # Layout mobile
│   │   └── sidebar/         # Navegação lateral
│   │
│   ├── pages/               # Páginas da aplicação (351 arquivos)
│   │   ├── PaginaDashboard/ # Dashboard principal
│   │   ├── PaginaPedidos/   # Gestão de pedidos
│   │   ├── PaginaPDV/       # Ponto de venda
│   │   ├── PaginaCardapio/  # Gestão do cardápio
│   │   ├── PaginaRelatorios/ # Relatórios
│   │   ├── PaginaFidelidade/ # Sistema de fidelidade
│   │   └── auth/            # Login e cadastro
│   │
│   ├── context/             # Context API (Estado Global)
│   │   ├── authContext.tsx      # Autenticação
│   │   ├── lojaContext.tsx      # Dados da loja
│   │   ├── notificationContext.tsx # Notificações
│   │   ├── analyticsContext.tsx  # Analytics
│   │   ├── cacheContext.tsx      # Cache de dados
│   │   └── periodContext.tsx     # Filtros de período
│   │
│   ├── hooks/               # Hooks customizados (51 arquivos)
│   │   ├── useAuth.ts       # Autenticação
│   │   ├── useCaixa.ts      # Lógica do caixa
│   │   ├── usePDV.ts        # Ponto de venda
│   │   ├── useProdutos.ts   # Gestão de produtos
│   │   ├── usePedidos.ts    # Gestão de pedidos
│   │   └── useAnalytics.ts  # Analytics
│   │
│   ├── services/            # Camada de serviços
│   │   ├── firebase/        # Serviços Firebase
│   │   │   ├── BaseFirestoreService.ts
│   │   │   ├── produtosService.ts
│   │   │   └── estatisticasService.ts
│   │   ├── firebaseCardapioService.ts
│   │   ├── firebasePedidoService.ts
│   │   ├── firebaseClientesService.ts
│   │   ├── firebaseWhatsAppService.ts
│   │   └── authService.ts
│   │
│   ├── lib/                 # Configurações e utilitários
│   │   ├── firebase.ts      # Configuração Firebase
│   │   ├── firebaseCache.ts # Sistema de cache
│   │   ├── firebasePerformance.ts # Métricas
│   │   ├── firebaseRetry.ts # Retry automático
│   │   └── utils.ts         # Funções utilitárias
│   │
│   ├── types/               # Definições TypeScript (42 arquivos)
│   │   ├── global/          # Tipos globais
│   │   │   ├── auth.ts
│   │   │   ├── produtos.ts
│   │   │   ├── pedidos.ts
│   │   │   └── pdv.ts
│   │   ├── pages/           # Tipos específicos de páginas
│   │   └── cardapio/        # Tipos do cardápio
│   │
│   ├── config/              # Configurações
│   │   ├── environment.ts   # Variáveis de ambiente
│   │   ├── performance.ts   # Configurações de performance
│   │   └── whatsapp.ts     # Configurações WhatsApp
│   │
│   ├── constants/           # Constantes
│   │   ├── map.ts          # Configurações de mapa
│   │   └── pdv.ts          # Constantes do PDV
│   │
│   ├── features/            # Funcionalidades específicas
│   │   ├── cardapio/        # Lógica do cardápio
│   │   ├── configuracoes/   # Configurações
│   │   ├── historico/       # Histórico de pedidos
│   │   ├── pedidos/         # Gestão de pedidos
│   │   └── relatorios/      # Relatórios
│   │
│   ├── data/                # Dados mock e estáticos
│   │   ├── produtos/        # Dados de produtos
│   │   ├── mockPedidos.ts   # Mock de pedidos
│   │   └── produtosMock.ts  # Mock de produtos
│   │
│   ├── styles/              # Estilos CSS (19 arquivos)
│   ├── utils/               # Utilitários (8 arquivos)
│   ├── shared/              # Componentes compartilhados
│   ├── routes/              # Configuração de rotas
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Ponto de entrada
│
├── public/                  # Arquivos estáticos
│   ├── assets/             # Imagens e recursos
│   ├── avatares/           # Avatares de usuários
│   ├── emojis/             # Emojis de categorias
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service Worker
│
├── dist/                   # Build de produção
├── docs/                   # Documentação (19 arquivos)
├── Banco de dados/         # Configurações Firebase
│   ├── firebase.json
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   └── ARQUITETURA_ESCALAVEL.md
│
├── whatsapp-backend/       # Backend WhatsApp
├── whatsapp-web.js/        # Integração WhatsApp Web
│
├── package.json            # Dependências e scripts
├── vite.config.ts          # Configuração Vite
├── tailwind.config.js      # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
├── eslint.config.js        # Configuração ESLint
└── README.md               # Documentação principal
```

## 🎯 Camadas da Arquitetura

### **1. Camada de Apresentação**
- **Components**: Componentes React reutilizáveis
- **Pages**: Páginas da aplicação
- **Styles**: Estilos CSS/Tailwind

### **2. Camada de Estado**
- **Context**: Estado global com Context API
- **Hooks**: Lógica de negócio encapsulada

### **3. Camada de Serviços**
- **Services**: Comunicação com Firebase
- **Lib**: Configurações e utilitários

### **4. Camada de Dados**
- **Types**: Definições TypeScript
- **Data**: Dados mock e estáticos
- **Firebase**: Banco de dados e autenticação

## 🚀 Tecnologias Utilizadas

### **Frontend**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + Radix UI
- React Router (roteamento)
- Context API + Zustand (estado)

### **Backend**
- Firebase Firestore (banco)
- Firebase Auth (autenticação)
- Firebase Analytics (métricas)

### **Integrações**
- WhatsApp Web API
- Socket.io (tempo real)
- Leaflet (mapas)
- Chart.js/Recharts (gráficos)

## 📊 Estatísticas do Projeto

- **Total de arquivos**: ~800+ arquivos
- **Componentes**: 391 arquivos
- **Páginas**: 351 arquivos
- **Hooks**: 51 arquivos
- **Tipos**: 42 arquivos
- **Serviços**: 19 arquivos
- **Estilos**: 19 arquivos
- **Documentação**: 19 arquivos

## 🎨 Padrões Arquiteturais

1. **Feature-Based Organization**: Organização por funcionalidade
2. **Component Composition**: Composição sobre herança
3. **Context + Hooks Pattern**: Estado global + lógica encapsulada
4. **Service Layer**: Abstração da comunicação com backend
5. **Lazy Loading**: Carregamento sob demanda
6. **Type Safety**: TypeScript em toda aplicação

---

## ⚠️ Pontos de Atenção / Sugestões de Melhoria

### 📦 **1. Aplicar DDD (Domain-Driven Design) Leve**

**Situação Atual:**
- ✅ Já existe pasta `features/` com alguns domínios bem estruturados
- ⚠️ Código ainda espalhado entre `src/hooks/`, `src/services/`, `src/types/`
- ⚠️ Alguns componentes em `src/components/` são específicos de domínio

**Proposta de Melhoria:**

Cada domínio deveria ser **auto-contido** com tudo que precisa:

```
features/
├── cardapio/              # ✅ Já bem estruturado
│   ├── components/       # Componentes do domínio
│   ├── hooks/           # Hooks do domínio
│   ├── services/        # Services do domínio
│   ├── types/           # Types do domínio
│   ├── utils/           # Utils específicos
│   └── index.ts         # API pública
│
├── pdv/                  # 🔨 Precisa consolidar
│   ├── components/      # Mover de src/components/pdv/
│   ├── hooks/          # Mover de src/hooks/usePDV.ts
│   ├── services/       # Mover de src/services/
│   ├── types/          # Mover de src/types/global/pdv.ts
│   └── index.ts        # Criar API pública
│
└── whatsapp/            # 🔨 Precisa consolidar
    ├── components/     # Mover de src/components/whatsapp/
    ├── hooks/         # Mover de src/hooks/useWhatsApp*.ts
    ├── services/      # Mover de src/services/firebaseWhatsAppService.ts
    ├── types/         # Criar types específicos
    └── index.ts       # Criar API pública
```

**Benefícios:**
- ✅ Equipes diferentes podem trabalhar em domínios distintos sem conflitos
- ✅ Reduz acoplamento entre funcionalidades
- ✅ Facilita testes isolados
- ✅ Possível extrair domínios para microfrontends no futuro
- ✅ Onboarding mais rápido (tudo de uma feature em um lugar)

**Ver detalhes:** `docs/REFATORACAO_DDD.md`

---

### 🔄 **2. Criar Camada `shared/` para Código Reutilizável**

**Proposta:**

```
src/
├── shared/              # Código compartilhado entre domínios
│   ├── components/     # Componentes UI genéricos
│   │   ├── ui/        # Button, Input, Modal (genéricos)
│   │   ├── layouts/   # Layout components
│   │   └── feedback/  # Toast, Alert, Loading
│   ├── hooks/         # Hooks genéricos
│   │   ├── useMediaQuery.ts
│   │   ├── usePagination.ts
│   │   └── useDebounce.ts
│   ├── utils/         # Funções utilitárias
│   ├── types/         # Types compartilhados
│   └── constants/     # Constantes globais
```

**Benefícios:**
- Separação clara entre código compartilhado e específico
- Evita duplicação de código
- Facilita manutenção de componentes base

---

### 🎯 **3. Criar Camada `core/` para Infraestrutura**

**Proposta:**

```
src/
├── core/                    # Infraestrutura base
│   ├── config/             # Configurações
│   │   ├── environment.ts
│   │   ├── firebase.ts
│   │   └── routes.ts
│   ├── lib/                # Bibliotecas base
│   │   ├── firebase.ts
│   │   ├── api.ts
│   │   └── storage.ts
│   ├── services/           # Services base/abstratos
│   │   ├── BaseService.ts
│   │   └── ErrorService.ts
│   └── providers/          # Context Providers globais
│       ├── AuthProvider.tsx
│       ├── ThemeProvider.tsx
│       └── QueryProvider.tsx
```

**Benefícios:**
- Centraliza configurações e infraestrutura
- Facilita mudanças de tecnologia (trocar Firebase por outro backend)
- Melhor organização de código de infraestrutura

---

### 📄 **4. Simplificar `pages/` para Apenas Composição**

**Situação Atual:**
- Pages têm muita lógica misturada

**Proposta:**
```typescript
// pages/Cardapio/index.tsx - APENAS composição
import { CardapioHeader, CardapioMain } from '@/features/cardapio';

export default function CardapioPage() {
  return (
    <div>
      <CardapioHeader />
      <CardapioMain />
    </div>
  );
}
```

**Benefícios:**
- Pages ficam mais simples e fáceis de entender
- Toda lógica fica nos domínios (features)
- Facilita testes (testar features, não pages)

---

### 🔌 **5. Criar APIs Públicas (index.ts) para Cada Domínio**

**Proposta:**
```typescript
// features/pdv/index.ts
export { PDVHeader, PDVCart, PDVPayment } from './components';
export { usePDV, usePDVCart } from './hooks';
export { pdvService } from './services';
export type { PDV, Cart, Payment } from './types';
```

**Uso:**
```typescript
// ❌ Antes (acoplado)
import { PDVHeader } from '@/components/pdv/PDVHeader';
import { usePDV } from '@/hooks/usePDV';
import { PDV } from '@/types/global/pdv';

// ✅ Depois (desacoplado)
import { PDVHeader, usePDV, PDV } from '@/features/pdv';
```

**Benefícios:**
- API clara e documentada
- Facilita refatorações internas
- Controle sobre o que é público/privado

---

### 🧪 **6. Adicionar Testes por Domínio**

**Proposta:**
```
features/
├── cardapio/
│   ├── __tests__/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── components/
│   ├── hooks/
│   └── services/
```

**Benefícios:**
- Testes próximos ao código testado
- Facilita TDD (Test-Driven Development)
- Cobertura de testes por domínio

---

### 📚 **7. Documentação por Domínio**

**Proposta:**
```
features/
├── cardapio/
│   ├── README.md        # Documentação do domínio
│   ├── CHANGELOG.md     # Histórico de mudanças
│   └── components/
```

**Benefícios:**
- Documentação próxima ao código
- Facilita onboarding
- Histórico de mudanças rastreável

---

## 📊 Priorização das Melhorias

### **🔥 Alta Prioridade** (Impacto Alto, Esforço Médio)
1. ✅ Aplicar DDD leve nos domínios principais (PDV, WhatsApp, Auth)
2. ✅ Criar pasta `shared/` e mover código compartilhado
3. ✅ Criar APIs públicas (index.ts) para domínios existentes

### **⚡ Média Prioridade** (Impacto Médio, Esforço Baixo)
4. Criar pasta `core/` para infraestrutura
5. Simplificar `pages/` para composição
6. Adicionar testes por domínio

### **💡 Baixa Prioridade** (Impacto Baixo, Esforço Baixo)
7. Documentação por domínio
8. Scripts de automação
9. Análise de bundle size

---

## ⏱️ Estimativa de Implementação

| Melhoria | Tempo Estimado | ROI |
|----------|----------------|-----|
| DDD leve | 20-30 horas | ⭐⭐⭐⭐⭐ Alto |
| Pasta shared/ | 3-4 horas | ⭐⭐⭐⭐ Alto |
| APIs públicas | 2-3 horas | ⭐⭐⭐⭐ Alto |
| Pasta core/ | 2-3 horas | ⭐⭐⭐ Médio |
| Simplificar pages | 2-3 horas | ⭐⭐⭐ Médio |
| Testes | Contínuo | ⭐⭐⭐⭐⭐ Alto |
| Docs | Contínuo | ⭐⭐⭐ Médio |

---

## 🎯 Conclusão

Sua arquitetura atual **já é muito boa**! Estas sugestões são para:
- 🚀 **Escalar** o projeto conforme ele cresce
- 🤝 **Facilitar** trabalho em equipe
- 🛠️ **Reduzir** débito técnico futuro
- 📚 **Melhorar** manutenibilidade

**Próximo passo recomendado:** Comece refatorando um domínio crítico (ex: PDV ou Auth) e use como template para os outros.

**Documentação detalhada:** `docs/REFATORACAO_DDD.md`
