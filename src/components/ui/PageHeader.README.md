# PageHeader Component

Um componente reutilizável para cabeçalhos de página que segue as melhores práticas de design e acessibilidade.

## 🚀 Características

- ✅ **Reutilizável**: Pode ser usado em qualquer página da aplicação
- ✅ **Responsivo**: Adapta-se a diferentes tamanhos de tela
- ✅ **Acessível**: Segue as melhores práticas de acessibilidade (ARIA)
- ✅ **Customizável**: Múltiplas variantes de botões e estilos
- ✅ **Semântico**: HTML semântico com roles apropriados
- ✅ **Performance**: Otimizado com Tailwind CSS

## 📋 Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | **obrigatório** | Título principal do cabeçalho |
| `subtitle` | `string` | `undefined` | Subtítulo opcional |
| `actionButton` | `ActionButtonProps` | `undefined` | Configuração do botão de ação |
| `leftContent` | `React.ReactNode` | `undefined` | Conteúdo personalizado à esquerda |
| `rightContent` | `React.ReactNode` | `undefined` | Conteúdo personalizado à direita |
| `sticky` | `boolean` | `true` | Se o cabeçalho deve ser fixo |
| `className` | `string` | `''` | Classes CSS adicionais |

### ActionButtonProps

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | **obrigatório** | Texto do botão |
| `onClick` | `() => void` | **obrigatório** | Função executada ao clicar |
| `loading` | `boolean` | `false` | Estado de carregamento |
| `disabled` | `boolean` | `false` | Se o botão está desabilitado |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger'` | `'primary'` | Variante visual do botão |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do botão |

## 🎨 Variantes de Botão

### Cores
- **Primary**: Azul (`bg-blue-600`)
- **Secondary**: Cinza (`bg-gray-600`)
- **Success**: Verde (`bg-[#19a84e]`)
- **Danger**: Vermelho (`bg-red-600`)

### Tamanhos
- **Small**: `h-8 px-4 text-xs`
- **Medium**: `h-10 px-6 text-sm` (padrão)
- **Large**: `h-12 px-8 text-base`

## 📱 Responsividade

- **Desktop**: Texto completo do botão
- **Mobile**: Texto abreviado para botões com mais de 10 caracteres
- **Container**: Centralização automática com `container mx-auto`

## ♿ Acessibilidade

- **Role**: `role="banner"` para leitores de tela
- **ARIA Label**: Descrição automática baseada no título
- **Focus States**: Anéis de foco visíveis para navegação por teclado
- **Loading States**: Labels dinâmicos para estados de carregamento
- **Ícones**: Marcados como `aria-hidden="true"` quando decorativos

## 💻 Uso Básico

```tsx
import { PageHeader } from '../../components/ui';

function MinhaPagina() {
  const handleSalvar = () => {
    console.log('Salvando...');
  };

  return (
    <PageHeader
      title="Minha Página"
      subtitle="Descrição da página"
      actionButton={{
        label: "Salvar",
        onClick: handleSalvar,
        variant: "success"
      }}
    />
  );
}
```

## 🔧 Exemplos Avançados

### Cabeçalho com Conteúdo Personalizado

```tsx
<PageHeader
  title="Perfil do Usuário"
  leftContent={
    <div className="flex items-center gap-4">
      <Avatar user={user} />
      <UserInfo user={user} />
    </div>
  }
  rightContent={<ThemeToggle />}
  actionButton={{
    label: "Editar Perfil",
    onClick: handleEdit,
    variant: "primary"
  }}
/>
```

### Cabeçalho com Estado de Carregamento

```tsx
<PageHeader
  title="Relatórios"
  actionButton={{
    label: "Exportar",
    onClick: handleExport,
    loading: isExporting,
    variant: "secondary"
  }}
/>
```

### Cabeçalho Não Fixo

```tsx
<PageHeader
  title="Página Interna"
  sticky={false}
/>
```

## 🎯 Casos de Uso

- **Páginas de configuração**: Com botões de salvar/cancelar
- **Páginas de listagem**: Com botões de adicionar/exportar
- **Páginas de perfil**: Com informações do usuário
- **Páginas de relatórios**: Com botões de exportação
- **Páginas de dashboard**: Com títulos e subtítulos informativos

## 🔄 Migração

Para migrar de um cabeçalho customizado para o PageHeader:

1. **Substitua o JSX** pelo componente PageHeader
2. **Configure as props** conforme necessário
3. **Remova estilos inline** e classes customizadas
4. **Teste a responsividade** em diferentes tamanhos de tela

## 🧪 Testes

O componente inclui:
- Estados de loading
- Estados desabilitados
- Diferentes variantes de botão
- Responsividade
- Acessibilidade

## 📚 Dependências

- React 18+
- Tailwind CSS
- Lucide React (para ícones)
- TypeScript

## 🤝 Contribuição

Para melhorar o componente:
1. Mantenha a acessibilidade
2. Teste em diferentes dispositivos
3. Siga os padrões de código existentes
4. Adicione exemplos para novos casos de uso
