# Página de Mapa - Estrutura Modular

Esta página segue o padrão modular estabelecido pelo Dashboard, organizando todos os componentes, hooks, tipos e utilitários em uma estrutura clara e manutenível.

## 📁 Estrutura de Arquivos

```
src/pages/PaginaMapa/
├── Mapa.tsx                     # Componente principal da página
├── components/                  # Componentes específicos da página
│   ├── MapLayout.tsx           # Layout principal da página
│   ├── MapContainer.tsx        # Container do mapa
│   ├── MapSidebar.tsx          # Sidebar com controles
│   ├── MapControls.tsx         # Controles do mapa
│   ├── MapLoadingState.tsx     # Estado de carregamento
│   ├── SidebarToggleButton.tsx # Botão de toggle do sidebar
│   ├── StoreAddressWarning.tsx # Aviso sobre endereço da loja
│   ├── LeafletMap.tsx          # Componente do mapa Leaflet
│   └── index.ts                # Exportações dos componentes
├── hooks/                      # Hooks específicos da página
│   ├── useMapState.ts          # Hook principal com estado do mapa
│   ├── useMapActions.ts        # Hook para ações do mapa
│   ├── useMapTranslation.ts    # Hook para traduções
│   └── index.ts                # Exportações dos hooks
├── types/                      # Tipos TypeScript específicos
│   ├── mapa.types.ts           # Interfaces e tipos do mapa
│   └── index.ts                # Exportações dos tipos
├── services/                   # Serviços e integrações (futuro)
├── utils/                      # Utilitários específicos (futuro)
├── index.ts                    # Exportações principais
└── README.md                   # Este arquivo
```

## 🎯 Componentes Principais

### Mapa.tsx
- **Responsabilidade**: Componente principal que orquestra toda a página
- **Funcionalidades**: 
  - Integra todos os hooks e componentes
  - Gerencia o layout geral da página
  - Trata erros com ErrorBoundary
  - Controla estados de loading

### MapLayout.tsx
- **Responsabilidade**: Layout principal que organiza os componentes
- **Funcionalidades**:
  - Coordena MapContainer e MapSidebar
  - Gerencia a comunicação entre componentes
  - Controla a estrutura visual da página

### MapContainer.tsx
- **Responsabilidade**: Container principal do mapa
- **Funcionalidades**:
  - Renderiza o componente LeafletMap
  - Passa configurações e estados para o mapa
  - Gerencia a área de visualização do mapa

### MapSidebar.tsx
- **Responsabilidade**: Sidebar com controles e informações
- **Funcionalidades**:
  - Renderiza controles do mapa
  - Mostra avisos sobre configuração
  - Controla visibilidade do sidebar
  - Integra SidebarToggleButton

### MapControls.tsx
- **Responsabilidade**: Controles específicos do mapa
- **Funcionalidades**:
  - Toggle para mapa de calor
  - Toggle para raios de entrega
  - Legenda dos raios de entrega
  - Interface de controle intuitiva

### LeafletMap.tsx
- **Responsabilidade**: Componente principal do mapa Leaflet
- **Funcionalidades**:
  - Renderização do mapa interativo
  - Marcadores da loja
  - Raios de área de entrega
  - Mapa de calor
  - Geocodificação de endereços
  - Integração com APIs externas

## 🔧 Hooks Específicos

### useMapState.ts
- **Responsabilidade**: Hook principal com estado do mapa
- **Funcionalidades**:
  - Gerenciamento de estado do sidebar
  - Controle de visibilidade do heatmap
  - Controle de raios de entrega
  - Persistência no localStorage
  - Handlers para todas as ações

### useMapActions.ts
- **Responsabilidade**: Hook para ações específicas do mapa
- **Funcionalidades**:
  - Handlers para toggle do sidebar
  - Handlers para controles do mapa
  - Funções de reset e save
  - Ações de configuração

### useMapTranslation.ts
- **Responsabilidade**: Hook para textos e traduções
- **Funcionalidades**:
  - Centraliza todos os textos da página
  - Facilita manutenção e internacionalização
  - Textos para controles, avisos e mensagens

## 📊 Tipos TypeScript

### mapa.types.ts
- **Responsabilidade**: Define todos os tipos específicos do mapa
- **Tipos principais**:
  - `MapState`: Interface para estado do mapa
  - `MapLayoutProps`: Props para layout principal
  - `MapContainerProps`: Props para container do mapa
  - `MapSidebarProps`: Props para sidebar
  - `MapControlsProps`: Props para controles
  - `LeafletMapProps`: Props para componente Leaflet
  - `UseMapStateReturn`: Retorno do hook principal
  - `UseMapActionsReturn`: Retorno do hook de ações
  - `MapTranslations`: Interface para traduções

## 🚀 Funcionalidades

### Visualização do Mapa
- **Mapa Interativo**: Mapa Leaflet com tiles do MapTiler
- **Marcador da Loja**: Localização da loja com popup informativo
- **Raios de Entrega**: Círculos concêntricos mostrando áreas de entrega
- **Mapa de Calor**: Visualização de densidade de entregas

### Controles
- **Sidebar**: Painel lateral com controles e informações
- **Toggle Heatmap**: Ativar/desativar mapa de calor
- **Toggle Delivery Radius**: Ativar/desativar raios de entrega
- **Persistência**: Estados salvos no localStorage

### Integrações
- **Geocodificação**: Conversão de endereços em coordenadas
- **APIs Externas**: Nominatim para geocodificação
- **MapTiler**: Tiles do mapa
- **Leaflet**: Biblioteca de mapas interativos

### Estados e Persistência
- **LocalStorage**: Salva preferências do usuário
- **Estados Reativos**: Atualizações em tempo real
- **Loading States**: Estados de carregamento
- **Error Handling**: Tratamento de erros

## 🔄 Integração com Sistema

### Rotas
- **Rota**: `/mapa`
- **Lazy Loading**: Carregamento sob demanda
- **Fallback**: RouteFallback para loading

### Dependências
- **Leaflet**: Biblioteca de mapas
- **Leaflet.heat**: Plugin para mapa de calor
- **React Hooks**: useState, useEffect, useCallback
- **Contexto**: useConfiguracoesLoja para dados da loja

### Configurações
- **Endereço da Loja**: Obtido das configurações
- **Coordenadas**: Geocodificação automática
- **Raios de Entrega**: Configuráveis (1km, 2km, 3km, 5km)
- **Mapa de Calor**: Dados fictícios para demonstração

## 📈 Benefícios da Estrutura Modular

1. **Manutenibilidade**: Código organizado e fácil de manter
2. **Reutilização**: Componentes podem ser reutilizados
3. **Testabilidade**: Cada parte pode ser testada isoladamente
4. **Escalabilidade**: Fácil adicionar novas funcionalidades
5. **Performance**: Lazy loading e otimizações
6. **Type Safety**: TypeScript em toda a estrutura
7. **Separação de Responsabilidades**: Cada componente tem uma função específica

## 🔧 Desenvolvimento

### Adicionando Novos Componentes
1. Crie o componente em `components/`
2. Adicione os tipos necessários em `types/`
3. Exporte em `components/index.ts`
4. Integre no `MapLayout.tsx`

### Adicionando Novos Hooks
1. Crie o hook em `hooks/`
2. Adicione os tipos de retorno em `types/`
3. Exporte em `hooks/index.ts`
4. Use no `useMapState.ts` ou componentes

### Modificando Tipos
1. Edite `types/mapa.types.ts`
2. Atualize interfaces afetadas
3. Verifique compatibilidade com componentes

### Adicionando Novas Funcionalidades
1. **Novos Controles**: Adicione em `MapControls.tsx`
2. **Novas Camadas**: Integre em `LeafletMap.tsx`
3. **Novos Estados**: Adicione em `useMapState.ts`
4. **Novas Ações**: Implemente em `useMapActions.ts`

## 📝 Notas Importantes

- **Leaflet**: Requer configuração de ícones padrão
- **APIs Externas**: Nominatim para geocodificação
- **LocalStorage**: Persiste preferências do usuário
- **Responsividade**: Layout adaptável para diferentes telas
- **Performance**: Lazy loading e otimizações de renderização
- **Acessibilidade**: Controles com labels e focus management

## 🗺️ Funcionalidades do Mapa

### Raios de Entrega
- **1km**: Entrega rápida (roxo)
- **2km**: Entrega padrão (cinza)
- **3km**: Entrega estendida (cinza escuro)
- **5km**: Entrega especial (cinza muito escuro)

### Mapa de Calor
- **Dados Fictícios**: Bairros de Itaperuna/RJ
- **Intensidade Variável**: Pontos com diferentes intensidades
- **Gradiente de Cores**: Azul para vermelho
- **Performance**: Carregamento assíncrono

### Geocodificação
- **Endereço Completo**: Rua, número, bairro, cidade, estado, CEP
- **Coordenadas Salvas**: Evita geocodificação repetida
- **Fallback**: Coordenadas padrão se geocodificação falhar
- **API Nominatim**: Serviço gratuito de geocodificação


