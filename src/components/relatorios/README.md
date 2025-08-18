# Distribuição de Clientes por Categoria

Componente reutilizável para exibir a distribuição de clientes por categoria em formato de gráfico de barras verticais com animações de água.

## 🚀 Características

- **Gráfico de barras verticais** com design moderno
- **Animações de água** com bolhas flutuantes
- **Indicador de porcentagem** em cada barra
- **Labels informativos** com nome da categoria e quantidade de clientes
- **Grade de fundo** para melhor visualização
- **Responsivo** e adaptável a diferentes tamanhos
- **Customizável** com cores, alturas e animações
- **TypeScript** com tipagem completa
- **Calculadora integrada** para determinar clientes necessários para 100%
- **Botão de esvaziar** para zerar todas as caixas
- **Botão de restaurar** para voltar aos valores originais
- **Transições suaves** ao esvaziar e restaurar

## 📦 Instalação

```bash
# O componente já está incluído no projeto
# Importe diretamente do diretório de componentes
```

## 🔧 Uso Básico

### Gráfico de Distribuição

```tsx
import { DistribuicaoClientesCategoria, CategoriaCliente } from './DistribuicaoClientesCategoria';

const categorias: CategoriaCliente[] = [
  {
    nome: 'Curiosos',
    quantidade: 18,
    altura: 260,
    cor: 'rgba(124, 58, 237, 0.9)'
  },
  {
    nome: 'Novatos',
    quantidade: 8,
    altura: 210,
    cor: 'rgba(139, 92, 246, 0.8)'
  },
  {
    nome: 'Fiéis',
    quantidade: 4,
    altura: 128,
    cor: 'rgba(168, 85, 247, 0.7)'
  },
  {
    nome: 'Super Clientes',
    quantidade: 3,
    altura: 75,
    cor: 'rgba(192, 132, 252, 0.6)'
  }
];

function App() {
  return (
    <DistribuicaoClientesCategoria 
      categorias={categorias}
      mostrarAnimacoes={true}
    />
  );
}
```

### Funcionalidade de Atualização

O componente agora inclui um botão para atualizar os dados com animação suave:

- **Botão "Atualizar"** (roxo): Atualiza os dados das caixas com animação suave

```tsx
// O componente gerencia internamente o estado das categorias
// Não é necessário passar props adicionais
<DistribuicaoClientesCategoria 
  categorias={categorias}
  mostrarAnimacoes={true}
/>
```

**Comportamento:**
1. As caixas sempre ficam visíveis com suas alturas corretas (sem tela de loading)
2. Ao clicar em "Atualizar", os dados são atualizados com animação suave
3. As caixas sobem suavemente até a altura real (3 segundos)
4. A porcentagem cresce progressivamente até o valor final
5. As transições são suaves e contínuas, sem quebras na animação
6. Movimento fluido e natural das caixas

### Calculadora de Clientes para 100%

```tsx
import { CalculadoraClientes } from './CalculadoraClientes';

function App() {
  return (
    <CalculadoraClientes 
      categorias={categorias}
      alturaMaxima={260}
    />
  );
}
```

## 📋 Props

### DistribuicaoClientesCategoriaProps

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `categorias` | `CategoriaCliente[]` | **obrigatório** | Array de categorias de clientes |
| `alturaMaxima` | `number` | `260` | Altura máxima para cálculo de porcentagem |
| `mostrarAnimacoes` | `boolean` | `false` | Habilita animações de água e bolhas |
| `className` | `string` | `''` | Classes CSS adicionais |

### CalculadoraClientesProps

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `categorias` | `CategoriaCliente[]` | **obrigatório** | Array de categorias de clientes |
| `alturaMaxima` | `number` | `260` | Altura máxima para cálculo de porcentagem |
| `className` | `string` | `''` | Classes CSS adicionais |

### CategoriaCliente

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `nome` | `string` | Nome da categoria (ex: "Curiosos") |
| `quantidade` | `number` | Quantidade de clientes na categoria |
| `altura` | `number` | Altura da barra em pixels |
| `cor` | `string` | Cor da barra (RGBA recomendado) |

## 🎨 Customização

### Cores Personalizadas

```tsx
const categorias = [
  {
    nome: 'Categoria A',
    quantidade: 25,
    altura: 200,
    cor: 'rgba(59, 130, 246, 0.8)' // Azul
  },
  {
    nome: 'Categoria B',
    quantidade: 15,
    altura: 120,
    cor: 'rgba(16, 185, 129, 0.8)' // Verde
  }
];
```

### Classes CSS Personalizadas

```tsx
<DistribuicaoClientesCategoria 
  categorias={categorias}
  className="shadow-xl border-2 border-purple-300"
/>
```

### Altura Máxima Personalizada

```tsx
<DistribuicaoClientesCategoria 
  categorias={categorias}
  alturaMaxima={400} // Altura máxima de 400px
/>
```

## ✨ Funcionalidades

### Labels Informativos

- **Nome da categoria** exibido no topo de cada seção
- **Quantidade de clientes** mostrada em negrito abaixo do nome
- **Posicionamento consistente** acima de cada caixa colorida
- **Z-index alto** para garantir visibilidade

### Animações de Água

- **Ondulação da superfície** com efeito realista
- **Bolhas flutuantes** que sobem continuamente
- **Transições suaves** entre estados
- **Timing personalizado** para cada barra

### Indicador de Porcentagem

- **Posicionado no canto inferior esquerdo** de cada barra
- **Fonte 18px em negrito** para máxima legibilidade
- **Cor branca** para contraste com fundos coloridos
- **Cálculo automático** baseado na altura da barra
- **Animação progressiva** durante a restauração

### Grade de Fundo

- **Linhas verticais** para separar as categorias
- **Bordas arredondadas** para design moderno
- **Z-index organizado** para sobreposição correta

### Botões de Controle

- **Botão "Atualizar"** (roxo) para esvaziar e encher automaticamente
- **Transições suaves** entre estados
- **Animações sincronizadas** de altura e porcentagem
- **Processo automático** após clicar no botão

## 🔍 Exemplos de Uso

### Dashboard de Relatórios

```tsx
// Em um dashboard de relatórios
<DistribuicaoClientesCategoria 
  categorias={dadosRelatorio.categorias}
  mostrarAnimacoes={true}
  className="mb-6"
/>
```

### Página de Analytics

```tsx
// Em uma página de analytics
<DistribuicaoClientesCategoria 
  categorias={analyticsData.categorias}
  mostrarAnimacoes={false} // Sem animações para performance
  alturaMaxima={300}
/>
```

## 🚨 Considerações

### Performance

- **Animações desabilitadas por padrão** para melhor performance
- **Use `mostrarAnimacoes={true}` apenas quando necessário**
- **Componente otimizado** para renderização eficiente

### Acessibilidade

- **Contraste adequado** entre texto e fundo
- **Estrutura semântica** com títulos apropriados
- **Suporte a leitores de tela** com labels descritivos

### Responsividade

- **Grid responsivo** que se adapta a diferentes tamanhos
- **Breakpoints** para dispositivos móveis e desktop
- **Alturas flexíveis** baseadas no container

## 🐛 Troubleshooting

### Problemas Comuns

1. **Labels não aparecem**: Verifique se as categorias têm propriedades `nome` e `quantidade`
2. **Barras não aparecem**: Verifique se `categorias` não está vazio
3. **Animações não funcionam**: Certifique-se de que `mostrarAnimacoes={true}`
4. **Cores não aplicam**: Use formato RGBA válido para transparência

### Debug

```tsx
// Adicione logs para debug
console.log('Categorias:', categorias);
console.log('Altura máxima:', alturaMaxima);
console.log('Mostrar animações:', mostrarAnimacoes);
```

## 📄 Licença

Este componente faz parte do projeto iFood Dashboard e segue as mesmas diretrizes de licenciamento.