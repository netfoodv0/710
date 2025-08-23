# Componente Modal

Um componente de modal reutilizável e acessível baseado no Radix UI Dialog, que suporta diferentes tamanhos e é totalmente customizável.

## Características

- ✅ **Acessível**: Baseado no Radix UI para acessibilidade completa
- ✅ **Responsivo**: Adapta-se a diferentes tamanhos de tela
- ✅ **Customizável**: Suporta classes CSS personalizadas
- ✅ **Tipos TypeScript**: Totalmente tipado para melhor DX
- ✅ **Componentes auxiliares**: ModalHeader, ModalBody e ModalFooter para organização

## Tamanhos Disponíveis

- `sm` - Modal pequeno (max-w-md)
- `lg` - Modal grande (padrão, max-w-4xl)
- `xl` - Modal extra grande (max-w-7xl)

## Uso Básico

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/modals';

function MeuComponente() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Meu Modal"
        size="lg"
      >
        <ModalBody>
          <p>Conteúdo do modal aqui...</p>
        </ModalBody>
        
        <ModalFooter>
          <button onClick={() => setIsOpen(false)}>Cancelar</button>
          <button onClick={() => setIsOpen(false)}>Confirmar</button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Props

### Modal

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `isOpen` | `boolean` | - | Controla se o modal está aberto |
| `onClose` | `() => void` | - | Função chamada quando o modal é fechado |
| `title` | `string` | - | Título do modal (opcional) |
| `children` | `ReactNode` | - | Conteúdo do modal |
| `size` | `'sm' \| 'lg' \| 'xl'` | `'lg'` | Tamanho do modal |
| `showCloseButton` | `boolean` | `true` | Mostra o botão de fechar |
| `className` | `string` | - | Classes CSS para o modal |
| `contentClassName` | `string` | - | Classes CSS para o conteúdo |

## Componentes Auxiliares

### ModalHeader
Para adicionar cabeçalhos personalizados:

```tsx
<ModalHeader>
  <h2 className="text-xl font-bold">Título Personalizado</h2>
  <p className="text-gray-600">Subtítulo ou descrição</p>
</ModalHeader>
```

### ModalBody
Para o conteúdo principal do modal:

```tsx
<ModalBody>
  <div className="space-y-4">
    <p>Conteúdo principal...</p>
    <form>...</form>
  </div>
</ModalBody>
```

### ModalFooter
Para botões de ação no rodapé:

```tsx
<ModalFooter>
  <button className="btn btn-secondary">Cancelar</button>
  <button className="btn btn-primary">Salvar</button>
</ModalFooter>
```

## Exemplos de Uso

### Modal Simples
```tsx
<Modal isOpen={isOpen} onClose={closeModal}>
  <ModalBody>
    <p>Conteúdo simples sem título</p>
  </ModalBody>
</Modal>
```

### Modal com Título e Sem Botão de Fechar
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={closeModal}
  title="Modal Importante"
  showCloseButton={false}
>
  <ModalBody>
    <p>Este modal não pode ser fechado pelo usuário</p>
  </ModalBody>
</Modal>
```

### Modal Extra Grande com Layout Personalizado
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={closeModal}
  title="Relatório Detalhado"
  size="xl"
  className="max-w-8xl"
>
  <ModalBody>
    <div className="grid grid-cols-2 gap-6">
      <div>Coluna 1</div>
      <div>Coluna 2</div>
    </div>
  </ModalBody>
</Modal>
```

## Estilização

O componente usa Tailwind CSS por padrão, mas você pode personalizar com suas próprias classes:

```tsx
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  className="bg-gray-900 text-white"
  contentClassName="p-8"
>
  {/* conteúdo */}
</Modal>
```

## Acessibilidade

- Suporte completo a navegação por teclado
- Foco gerenciado automaticamente
- ARIA labels apropriados
- Escape para fechar
- Overlay clicável para fechar
- Anúncio de screen reader
