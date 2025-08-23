# Componente RadioSwitch

## Visão Geral

O `RadioSwitch` é um componente de toggle estilizado que permite alternar entre duas opções com uma interface visual atrativa e animada. É baseado no design do componente original fornecido pelo usuário, mas adaptado para o projeto com styled-components.

## Características

- **Design Moderno**: Interface limpa com bordas arredondadas e animações suaves
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessível**: Suporte completo a navegação por teclado e leitores de tela
- **Customizável**: Cores e estilos podem ser facilmente ajustados
- **TypeScript**: Totalmente tipado para melhor experiência de desenvolvimento

## Uso Básico

```tsx
import { RadioSwitch } from '../components/fidelidade';

function MeuComponente() {
  const [valor, setValor] = useState('opcao1');

  return (
    <RadioSwitch
      value={valor}
      onChange={setValor}
      options={[
        { value: 'opcao1', label: 'Opção 1' },
        { value: 'opcao2', label: 'Opção 2' }
      ]}
      name="meu-radio"
    />
  );
}
```

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `value` | `string` | ✅ | Valor atualmente selecionado |
| `onChange` | `(value: string) => void` | ✅ | Função chamada quando o valor muda |
| `options` | `Array<{value: string, label: string}>` | ✅ | Array com as opções disponíveis |
| `name` | `string` | ✅ | Nome único para o grupo de radio buttons |

## Exemplos de Uso

### 1. Sistema de Fidelidade

```tsx
const [sistemaAtivo, setSistemaAtivo] = useState('pontos');

<RadioSwitch
  value={sistemaAtivo}
  onChange={setSistemaAtivo}
  options={[
    { value: 'cashback', label: 'Cashback' },
    { value: 'pontos', label: 'Pontos' }
  ]}
  name="sistema-fidelidade"
/>
```

### 2. Tipo de Configuração

```tsx
const [tipoConfig, setTipoConfig] = useState('basica');

<RadioSwitch
  value={tipoConfig}
  onChange={setTipoConfig}
  options={[
    { value: 'basica', label: 'Básica' },
    { value: 'avancada', label: 'Avançada' }
  ]}
  name="tipo-configuracao"
/>
```

### 3. Modo de Exibição

```tsx
const [modoExibicao, setModoExibicao] = useState('lista');

<RadioSwitch
  value={modoExibicao}
  onChange={setModoExibicao}
  options={[
    { value: 'lista', label: 'Lista' },
    { value: 'grid', label: 'Grid' }
  ]}
  name="modo-exibicao"
/>
```

## Estilização

O componente usa styled-components e pode ser facilmente customizado. As cores padrão seguem o esquema do projeto:

- **Borda**: `#8b5cf6` (roxo)
- **Background ativo**: `#8b5cf6` (roxo)
- **Texto ativo**: `#ffffff` (branco)
- **Texto inativo**: `#6b7280` (cinza)

### Customizando Cores

Para alterar as cores, modifique o arquivo `RadioSwitch.tsx`:

```tsx
const StyledWrapper = styled.div`
  .filter-switch {
    border: 2px solid #sua-cor; // Altere a cor da borda
  }
  
  .filter-switch .background {
    background-color: #sua-cor; // Altere a cor do background ativo
  }
`;
```

## Animações

O componente inclui várias animações suaves:

- **Transição do background**: Movimento suave entre as opções
- **Hover effects**: Mudança de cor no hover
- **Transições**: Todas as mudanças de estado são animadas

## Acessibilidade

- **Labels associados**: Cada opção tem um label associado via `htmlFor`
- **Navegação por teclado**: Suporte completo a navegação por Tab e Enter
- **ARIA**: Atributos apropriados para leitores de tela
- **Contraste**: Cores com contraste adequado para acessibilidade

## Integração com o Sistema

O `RadioSwitch` está integrado ao sistema de fidelidade e pode ser usado em:

- Seleção de sistema (Cashback vs Pontos)
- Configurações de interface
- Filtros de dados
- Preferências do usuário
- Qualquer situação que requeira escolha entre duas opções

## Dependências

- `styled-components`: Para estilização
- `@types/styled-components`: Para suporte TypeScript

## Instalação

O componente já está incluído no projeto. Se precisar instalar as dependências:

```bash
npm install styled-components @types/styled-components
```

## Conclusão

O `RadioSwitch` é um componente versátil e elegante que melhora significativamente a experiência do usuário ao selecionar entre opções. Sua integração com o sistema de fidelidade demonstra como componentes reutilizáveis podem ser aplicados em diferentes contextos.
