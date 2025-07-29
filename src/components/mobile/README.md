# Mobile Components

Esta pasta contém todos os componentes otimizados para dispositivos móveis do sistema NetFood Dashboard.

## 🏗️ Arquitetura Mobile-First

### Layout Components
- **MobileLayout**: Layout principal responsivo com header, sidebar overlay e bottom navigation
- **MobileHeader**: Header com menu hambúrguer, título dinâmico e ações rápidas
- **MobileBottomNav**: Navegação inferior com ícones e indicadores de página ativa
- **MobileSidebar**: Sidebar overlay com navegação completa e informações do usuário

### UI Components
- **MobileCard**: Card otimizado com variantes e interações touch-friendly
- **MobileButton**: Botão com diferentes variantes, estados e feedback visual
- **MobileInput**: Input com validação, ícones e estados de erro

### Loading Components
- **MobileSkeleton**: Skeleton loading com diferentes variantes
- **MobileSkeletonCard**: Card skeleton para listas
- **MobileSkeletonList**: Lista de skeletons para loading states

### Page Components
- **MobileDashboard**: Dashboard otimizado com métricas e ações rápidas
- **MobilePedidos**: Página de pedidos com cards interativos e filtros

## 🎨 Design System Mobile

### Breakpoints
- **xs**: 475px+
- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+
- **2xl**: 1536px+

### Cores
- **Primary**: Azul (#3B82F6)
- **Success**: Verde (#10B981)
- **Warning**: Amarelo (#F59E0B)
- **Error**: Vermelho (#EF4444)
- **Neutral**: Cinza (#6B7280)

### Espaçamentos
- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

## 📱 UX/UI Mobile

### Touch Targets
- Mínimo 44px de altura para botões
- Espaçamento adequado entre elementos interativos
- Feedback visual imediato

### Navegação
- Bottom navigation para páginas principais
- Sidebar overlay para navegação completa
- Gestos intuitivos (swipe, tap)

### Performance
- Lazy loading de componentes
- Skeleton loading para melhor UX
- Otimização de imagens e assets

## 🔧 Uso

```tsx
import { 
  MobileLayout, 
  MobileCard, 
  MobileButton,
  MobileDashboard 
} from './components/mobile';

function App() {
  return (
    <MobileLayout>
      <MobileDashboard />
    </MobileLayout>
  );
}
```

## 📋 Checklist Mobile

- [x] Layout responsivo mobile-first
- [x] Navegação touch-friendly
- [x] Componentes otimizados para mobile
- [x] Loading states
- [x] Feedback visual
- [x] Performance otimizada
- [x] Acessibilidade
- [x] Testes de usabilidade

## 🚀 Próximos Passos

1. Implementar PWA (Progressive Web App)
2. Adicionar notificações push
3. Implementar cache offline
4. Otimizar para diferentes tamanhos de tela
5. Adicionar animações mais fluidas
6. Implementar dark mode 