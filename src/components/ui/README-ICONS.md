# Ícones Personalizados

Este diretório contém componentes de ícones personalizados criados especificamente para o projeto Sistema Voult.

## Ícones Disponíveis

### 1. DiscountIcon
Ícone personalizado para representar descontos e promoções.

**Uso:**
```tsx
import { DiscountIcon } from '../ui/DiscountIcon';

// Uso básico
<DiscountIcon />

// Com props personalizadas
<DiscountIcon size={32} color="#10B981" className="my-custom-class" />
```

**Props:**
- `size`: Tamanho do ícone em pixels (padrão: 24)
- `color`: Cor do ícone em formato hexadecimal (padrão: "#666666")
- `className`: Classes CSS adicionais

### 2. RejectedOrderIcon
Ícone para representar pedidos rejeitados ou cancelados.

**Uso:**
```tsx
import { RejectedOrderIcon } from '../ui/RejectedOrderIcon';

<RejectedOrderIcon size={20} color="#EF4444" />
```

### 3. CompletedOrderIcon
Ícone para representar pedidos finalizados com sucesso.

**Uso:**
```tsx
import { CompletedOrderIcon } from '../ui/CompletedOrderIcon';

<CompletedOrderIcon size={20} color="#10B981" />
```

### 4. NewCustomerIcon
Ícone para representar novos clientes ou cadastros.

**Uso:**
```tsx
import { NewCustomerIcon } from '../ui/NewCustomerIcon';

<NewCustomerIcon size={20} color="#3B82F6" />
```

## Implementação no Sistema

O `DiscountIcon` pode ser usado em qualquer componente que precise representar descontos:

```tsx
// Exemplo de uso em componentes de desconto
<DiscountIcon size={16} color="#666666" />
```

## Vantagens dos Ícones Personalizados

1. **Consistência Visual**: Todos os ícones seguem o mesmo padrão de design
2. **Personalização**: Cores e tamanhos podem ser facilmente ajustados
3. **Reutilização**: Componentes podem ser usados em diferentes partes da aplicação
4. **Manutenibilidade**: Mudanças no design podem ser feitas em um só lugar
5. **Performance**: SVGs inline são mais eficientes que imagens externas

## Exemplos de Uso

Consulte o componente `IconExamples` para ver demonstrações visuais de todos os ícones com diferentes tamanhos e cores.

## Padrões de Cores Recomendados

- **Descontos**: `#666666` (cinza padrão), `#10B981` (verde para destaque)
- **Pedidos Rejeitados**: `#EF4444` (vermelho), `#DC2626` (vermelho escuro)
- **Pedidos Finalizados**: `#10B981` (verde), `#059669` (verde escuro)
- **Clientes Novos**: `#3B82F6` (azul), `#1D4ED8` (azul escuro)
