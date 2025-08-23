# CardMenuSkeleton

O `CardMenuSkeleton` é um componente de skeleton loading específico para o card de menu da página de cardápio. Ele simula a estrutura visual do componente `CardMenuCategorias` enquanto os dados estão carregando.

## Características

- **Design minimalista**: Seguindo as preferências do usuário por tabelas sem cores excessivas
- **Estrutura fiel**: Replica exatamente a estrutura do card de menu real
- **Customizável**: Permite ajustar o número de categorias
- **Responsivo**: Mantém a responsividade do componente original
- **Acessível**: Preserva a estrutura semântica para leitores de tela

## Uso Básico

```tsx
import { CardMenuSkeleton } from '../components/skeletons';

// Skeleton padrão com 3 categorias e header
<CardMenuSkeleton />

// Skeleton com 5 categorias
<CardMenuSkeleton numCategorias={5} />

// Skeleton compacto
<CardMenuSkeleton numCategorias={2} />
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `numCategorias` | `number` | `3` | Número de categorias para mostrar no skeleton |

## Hook de Conveniência

```tsx
import { useCardMenuSkeleton } from '../components/skeletons';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Retorna o skeleton se estiver carregando, null caso contrário
  const skeleton = useCardMenuSkeleton(isLoading, 4);
  
  if (skeleton) return skeleton;
  
  return <CardMenuCategorias />;
};
```

## Estrutura Visual

O skeleton replica exatamente a estrutura do `CardMenuCategorias`:

```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │ ← Header com borda
│ │ Categorias                [Nova]   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [⋮⋮] Nome da Categoria [⚪] Ativo [⋯] │ ← Categoria 1
│ [⋮⋮] Nome da Categoria [⚪] Ativo [⋯] │ ← Categoria 2
│ [⋮⋮] Nome da Categoria [⚪] Ativo [⋯] │ ← Categoria 3
└─────────────────────────────────────────┘
```

## Integração com CardapioSkeleton

O `CardMenuSkeleton` pode ser usado como parte do `CardapioSkeleton` existente:

```tsx
// Em CardapioSkeleton.tsx
import { CardMenuSkeleton } from './CardMenuSkeleton';

export const CardapioSkeleton: React.FC = () => {
  return (
    <div className="pt-6 px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de Categorias */}
        <div className="w-full lg:w-[360px] flex-shrink-0 space-y-6">
          <CardMenuSkeleton numCategorias={4} />
        </div>
        
        {/* Resto do skeleton... */}
      </div>
    </div>
  );
};
```

## Exemplos Completos

Veja `CardMenuSkeletonExample.tsx` para exemplos detalhados de uso em diferentes contextos.

## Estilo

- **Cores**: Usa `bg-gray-200` para os elementos de skeleton
- **Animações**: `animate-pulse` para o efeito de loading
- **Bordas**: Mantém as mesmas bordas do componente real
- **Espaçamento**: Preserva exatamente o layout do componente original
- **Header**: Sempre visível com borda própria para separação visual
