# Card de Tipos de Pedidos

Este componente foi criado baseado no gráfico de formas de pagamento existente, seguindo o mesmo padrão visual e funcional.

## Componentes Criados

### 1. `GraficoTiposPedidos.tsx`
Componente base que renderiza o gráfico de pizza para tipos de pedidos.

**Características:**
- Gráfico de pizza interativo usando Recharts
- Labels externos com linhas de conexão
- Cores minimalistas (verde, azul, roxo)
- Tooltip e legendas
- Responsivo

**Props:**
```tsx
interface GraficoTiposPedidosProps {
  className?: string; // Classe CSS opcional
}
```

### 2. `CardTiposPedidos.tsx`
Card completo que inclui o gráfico e estatísticas detalhadas.

**Características:**
- Título e descrição
- Gráfico integrado
- Estatísticas com cores e percentuais
- Design minimalista seguindo preferências do usuário

**Props:**
```tsx
interface CardTiposPedidosProps {
  className?: string; // Classe CSS opcional
}
```

### 3. `ExemploCardTiposPedidos.tsx`
Página de exemplo mostrando como usar o componente.

## Dados Atuais

O componente está configurado com dados mockados para demonstração:

- **Delivery**: 45 pedidos (45.0%)
- **Retirada**: 35 pedidos (35.0%)  
- **Balcão**: 20 pedidos (20.0%)

## Cores Utilizadas

- **Delivery**: `#10B981` (Verde)
- **Retirada**: `#3B82F6` (Azul)
- **Balcão**: `#8B5CF6` (Roxo)

## Como Usar

### Uso Básico
```tsx
import { CardTiposPedidos } from './components/CardTiposPedidos';

function MinhaPagina() {
  return (
    <div>
      <CardTiposPedidos />
    </div>
  );
}
```

### Uso com Classe Customizada
```tsx
<CardTiposPedidos className="my-custom-class" />
```

### Uso Apenas do Gráfico
```tsx
import { GraficoTiposPedidos } from './components/GraficoTiposPedidos';

<GraficoTiposPedidos className="h-64" />
```

## Integração com Dados Reais

Para integrar com dados reais, você pode:

1. Modificar o estado `tiposPedidos` no `GraficoTiposPedidos.tsx`
2. Conectar com um serviço de dados
3. Passar dados via props
4. Implementar loading states e error handling

## Dependências

- React
- Recharts (para o gráfico)
- Tailwind CSS (para estilos)

## Estrutura de Arquivos

```
src/features/historico/components/
├── GraficoTiposPedidos.tsx      # Componente do gráfico
├── CardTiposPedidos.tsx         # Card completo
├── ExemploCardTiposPedidos.tsx  # Página de exemplo
├── index.ts                     # Exportações
└── README-TiposPedidos.md      # Esta documentação
```

## Próximos Passos

1. **Integração com dados reais**: Conectar com o serviço de histórico
2. **Filtros**: Adicionar filtros por período
3. **Animações**: Melhorar transições e interações
4. **Responsividade**: Otimizar para dispositivos móveis
5. **Testes**: Adicionar testes unitários e de integração
