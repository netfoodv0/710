# Arquitetura do Sistema de Mapas

## Visão Geral

O sistema de mapas foi refatorado seguindo princípios de **componentização extrema** e **boas práticas de arquitetura**, eliminando gambiarras e criando uma estrutura modular, reutilizável e fácil de manter.

## Estrutura de Componentes

### 🏗️ Componentes Principais

- **`MapLayout`**: Componente de layout principal que organiza o mapa e sidebar
- **`MapContainer`**: Container responsável por renderizar o mapa Leaflet
- **`MapSidebar`**: Sidebar lateral com controles e informações
- **`MapControls`**: Controles do mapa (heatmap e raios de entrega)

### 🎨 Componentes de UI

- **`SidebarToggleButton`**: Botão para abrir/fechar o sidebar
- **`StoreAddressWarning`**: Aviso sobre endereço não configurado
- **`MapLoadingState`**: Estado de carregamento
- **`DeliveryRadiusLegend`**: Legenda dos raios de entrega

### 🗺️ Componente do Mapa

- **`LeafletMap`**: Implementação do mapa usando Leaflet.js

## 🪝 Hooks Customizados

- **`useMapState`**: Gerencia o estado do mapa (sidebar, heatmap, raios)
- **`useConfiguracoesLoja`**: Busca configurações da loja

## 📁 Organização de Arquivos

```
src/
├── components/maps/
│   ├── index.ts                 # Exportações
│   ├── MapLayout.tsx            # Layout principal
│   ├── MapContainer.tsx         # Container do mapa
│   ├── MapSidebar.tsx           # Sidebar lateral
│   ├── MapControls.tsx          # Controles do mapa
│   ├── SidebarToggleButton.tsx  # Botão toggle
│   ├── StoreAddressWarning.tsx  # Aviso de endereço
│   ├── MapLoadingState.tsx      # Estado de carregamento
│   ├── LeafletMap.tsx           # Mapa Leaflet
│   └── README.md                # Esta documentação
├── hooks/
│   ├── useMapState.ts           # Estado do mapa
│   └── useConfiguracoesLoja.ts  # Configurações da loja
├── types/
│   └── map.ts                   # Tipos específicos do mapa
├── constants/
│   └── map.ts                   # Constantes do mapa
└── utils/
    └── map.ts                   # Utilitários do mapa
```

## 🎯 Princípios de Design

### 1. **Separação de Responsabilidades**
- Cada componente tem uma responsabilidade única e bem definida
- Lógica de negócio separada da apresentação
- Hooks customizados para gerenciamento de estado

### 2. **Componentização Extrema**
- Componentes pequenos e focados
- Reutilização máxima de código
- Props bem tipadas e documentadas

### 3. **Arquitetura Limpa**
- Sem gambiarras ou soluções temporárias
- Código legível e autoexplicativo
- Padrões consistentes em todo o projeto

### 4. **Performance Otimizada**
- Renderização condicional inteligente
- Hooks otimizados com useCallback
- Estado local quando possível

## 🔄 Fluxo de Dados

```
useMapState → MapLayout → MapSidebar → MapControls
     ↓
useConfiguracoesLoja → MapContainer → LeafletMap
```

## 📱 Responsividade

- Layout flexível que se adapta ao tamanho da tela
- Sidebar responsivo com toggle automático
- Componentes que funcionam em diferentes resoluções

## 🧪 Testabilidade

- Componentes isolados e independentes
- Props bem definidas e tipadas
- Lógica de negócio separada da UI

## 🚀 Benefícios da Nova Arquitetura

1. **Manutenibilidade**: Código mais fácil de entender e modificar
2. **Reutilização**: Componentes podem ser reutilizados em outras partes
3. **Testabilidade**: Cada componente pode ser testado isoladamente
4. **Performance**: Renderização otimizada e estado bem gerenciado
5. **Escalabilidade**: Fácil adicionar novos recursos e funcionalidades
6. **Colaboração**: Múltiplos desenvolvedores podem trabalhar em paralelo

## 🔧 Como Usar

```tsx
import { MapLayout } from '../components/maps';

export function MinhaPagina() {
  const mapState = useMapState();
  const { config, loading } = useConfiguracoesLoja();

  if (loading) return <MapLoadingState />;

  return (
    <MapLayout
      config={config}
      {...mapState}
      onToggleSidebar={mapState.toggleSidebar}
      onToggleHeatmap={mapState.toggleHeatmap}
      onToggleDeliveryRadius={mapState.toggleDeliveryRadius}
    />
  );
}
```

## 📈 Próximos Passos

- [ ] Adicionar testes unitários para cada componente
- [ ] Implementar lazy loading para componentes pesados
- [ ] Adicionar animações e transições suaves
- [ ] Criar tema personalizável
- [ ] Implementar cache de coordenadas
- [ ] Adicionar suporte a múltiplos mapas
