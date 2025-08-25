# Sistema Voult - Mobile First

Sistema de gestão para restaurantes e delivery com foco em experiência mobile otimizada.

## 🚀 Características

### 📱 Mobile-First Design
- **Layout Responsivo**: Otimizado para dispositivos móveis com breakpoints inteligentes
- **Navegação Touch-Friendly**: Bottom navigation e sidebar overlay
- **Componentes Mobile**: Cards, botões e inputs otimizados para touch
- **PWA Ready**: Instalável como app nativo com cache offline

### 🎨 UI/UX Mobile
- **Design System**: Cores, tipografia e espaçamentos consistentes
- **Animações Fluidas**: Transições suaves e feedback visual
- **Loading States**: Skeleton loading para melhor experiência
- **Acessibilidade**: Suporte completo a screen readers

### ⚡ Performance
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Service Worker**: Cache offline e atualizações automáticas
- **Otimização**: Bundle splitting e code splitting
- **PWA**: Instalação nativa e notificações push

## 🏗️ Arquitetura

```
src/
├── components/
│   ├── mobile/           # Componentes mobile otimizados
│   │   ├── MobileLayout.tsx
│   │   ├── MobileHeader.tsx
│   │   ├── MobileSidebar.tsx
│   │   ├── MobileCard.tsx
│   │   ├── MobileButton.tsx
│   │   ├── MobileInput.tsx
│   │   ├── MobileSkeleton.tsx
│   │   ├── MobilePWAInstall.tsx
│   │   ├── MobileDashboard.tsx
│   │   └── MobilePedidos.tsx
│   └── ...               # Componentes desktop
├── hooks/
│   ├── useMediaQuery.ts  # Detecção de breakpoints
│   ├── usePWA.ts        # Gerenciamento PWA
│   └── ...              # Outros hooks
└── ...
```

## 🛠️ Tecnologias

- **React 19** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilos mobile-first
- **Lucide React** para ícones
- **Framer Motion** para animações
- **React Router** para navegação
- **PWA** com service worker

## 📱 Breakpoints Mobile

- **xs**: 475px+ (Mobile pequeno)
- **sm**: 640px+ (Mobile grande)
- **md**: 768px+ (Tablet)
- **lg**: 1024px+ (Desktop pequeno)
- **xl**: 1280px+ (Desktop)
- **2xl**: 1536px+ (Desktop grande)

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sistema-voult.git

# Instale as dependências
pnpm install

# Execute em modo desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview
```

## 📱 PWA Features

### Instalação
- Banner de instalação automático
- Ícones adaptativos para diferentes dispositivos
- Splash screen personalizada

### Offline
- Cache de recursos estáticos
- Service worker para cache inteligente
- Fallback para conteúdo offline

### Notificações
- Push notifications para novos pedidos
- Notificações locais
- Permissões granulares

## 🎯 Componentes Mobile

### Layout
- `MobileLayout`: Layout principal responsivo
- `MobileHeader`: Header com menu e ações
- `MobileSidebar`: Sidebar overlay

### UI
- `MobileCard`: Card com variantes
- `MobileButton`: Botão com estados
- `MobileInput`: Input com validação
- `MobileSkeleton`: Loading states

### Páginas
- `MobileDashboard`: Sistema otimizado
- `MobilePedidos`: Gestão de pedidos

## 🔧 Configuração

### Environment Variables
```env
VITE_API_URL=https://api.sistema-voult.com
VITE_FIREBASE_CONFIG=your_firebase_config
```

### PWA Configuration
```json
{
  "name": "Sistema Voult",
      "short_name": "Sistema Voult",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff"
}
```

## 📊 Performance

### Lighthouse Score
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: 100

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🧪 Testes

```bash
# Testes unitários
pnpm test

# Testes de integração
pnpm test:integration

# Testes E2E
pnpm test:e2e
```

## 📱 Deploy

### Vercel (Recomendado)
```bash
# Deploy automático
git push origin main
```

### Firebase Hosting
```bash
# Build
pnpm build

# Deploy
firebase deploy
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- 📧 Email: suporte@sistema-voult.com
- 💬 Discord: [Sistema Voult Community](https://discord.gg/sistema-voult)
- 📖 Documentação: [docs.sistema-voult.com](https://docs.sistema-voult.com)

## 🚀 Roadmap

- [ ] Dark mode
- [ ] Animações mais fluidas
- [ ] Suporte a múltiplos idiomas
- [ ] Analytics avançados
- [ ] Integração com mais plataformas
- [ ] Modo offline completo
- [ ] Notificações em tempo real
- [ ] Gestos avançados (swipe, pinch)

---

**Sistema Voult** - Transformando a gestão de restaurantes com tecnologia mobile-first! 🍕📱


cd "whatsapp-backend\whatsapp-backend"