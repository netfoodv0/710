# PeriodFilter Component

Componente de dropdown para filtro de período (semanal/mensal) usado no cabeçalho do dashboard.

## Uso

```tsx
import { PeriodFilter, PeriodType } from '../components/PeriodFilter';

function MyComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');

  return (
    <PeriodFilter
      selectedPeriod={selectedPeriod}
      onPeriodChange={setSelectedPeriod}
    />
  );
}
```

## Props

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `selectedPeriod` | `PeriodType` | ✅ | - | Período atualmente selecionado |
| `onPeriodChange` | `(period: PeriodType) => void` | ✅ | - | Callback chamado quando o período muda |
| `className` | `string` | ❌ | `''` | Classes CSS adicionais |

## Tipos

```tsx
type PeriodType = 'weekly' | 'monthly';
```

## Contexto

O componente também pode ser usado com o contexto `PeriodProvider`:

```tsx
import { PeriodProvider, usePeriod } from '../context/periodContext';

function App() {
  return (
    <PeriodProvider>
      <MyComponent />
    </PeriodProvider>
  );
}

function MyComponent() {
  const { selectedPeriod, setSelectedPeriod } = usePeriod();
  
  return (
    <PeriodFilter
      selectedPeriod={selectedPeriod}
      onPeriodChange={setSelectedPeriod}
    />
  );
}
```

## Hook usePeriodFilter

Hook personalizado para gerenciar o estado do filtro:

```tsx
import { usePeriodFilter } from '../hooks/usePeriodFilter';

function MyComponent() {
  const { 
    selectedPeriod, 
    handlePeriodChange, 
    getPeriodLabel, 
    getPeriodDays 
  } = usePeriodFilter('weekly');

  return (
    <div>
      <PeriodFilter
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />
      <p>Período: {getPeriodLabel(selectedPeriod)}</p>
      <p>Dias: {getPeriodDays(selectedPeriod)}</p>
    </div>
  );
}
```

## Integração com Dashboard

O componente está integrado com o dashboard através do contexto. Quando o período muda:

1. O contexto atualiza o estado global
2. O Header reflete a mudança no dropdown
3. O Dashboard recebe o novo período via contexto
4. Os dados são recarregados com base no período selecionado

## Estilização

O componente usa Tailwind CSS e segue o design system do projeto:

- Dropdown com borda e sombra
- Estados hover e focus
- Ícone de calendário
- Animação de rotação no ícone de chevron
- Cores consistentes com o tema 