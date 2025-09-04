# Exemplos de Uso do ModalCustomizado

O `ModalCustomizado` é um componente reutilizável que pode ser usado para criar diferentes tipos de modais no sistema.

## Características Principais

- **Flexível**: Pode ser usado com ou sem formulário
- **Customizável**: Botões, cores, tamanhos e comportamentos configuráveis
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessível**: Segue as melhores práticas de acessibilidade

## Exemplos de Uso

### 1. Modal Simples (Sem Formulário)

```tsx
import { ModalCustomizado } from '../modals/ModalCustomizado';

function ExemploModalSimples() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>

      <ModalCustomizado
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Informação Importante"
        size="sm"
        showSubmitButton={false}
        cancelButtonText="Fechar"
      >
        <div className="text-center py-4">
          <p className="text-gray-600">
            Esta é uma mensagem informativa para o usuário.
          </p>
        </div>
      </ModalCustomizado>
    </>
  );
}
```

### 2. Modal com Formulário

```tsx
import { ModalCustomizado } from '../modals/ModalCustomizado';
import { FormInput } from '../forms/FormInput';

function ExemploModalFormulario() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '' });

  const handleSubmit = async () => {
    // Lógica para salvar dados
    console.log('Dados do formulário:', formData);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Criar Usuário
      </button>

      <ModalCustomizado
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        title="Criar Novo Usuário"
        submitButtonText="Criar"
        cancelButtonText="Cancelar"
        submitButtonVariant="primary"
      >
        <FormInput
          label="Nome"
          type="text"
          value={formData.nome}
          onChange={(value) => setFormData(prev => ({ ...prev, nome: value as string }))}
          required
        />
        
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value as string }))}
          required
        />
      </ModalCustomizado>
    </>
  );
}
```

### 3. Modal de Confirmação

```tsx
import { ModalCustomizado } from '../modals/ModalCustomizado';

function ExemploModalConfirmacao() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmar = async () => {
    // Lógica para confirmar ação
    console.log('Ação confirmada!');
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Excluir Item
      </button>

      <ModalCustomizado
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleConfirmar}
        title="Confirmar Exclusão"
        submitButtonText="Excluir"
        cancelButtonText="Cancelar"
        submitButtonVariant="danger"
        size="sm"
      >
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">
            Tem certeza que deseja excluir este item?
          </p>
          <p className="text-sm text-gray-500">
            Esta ação não pode ser desfeita.
          </p>
        </div>
      </ModalCustomizado>
    </>
  );
}
```

### 4. Modal com Conteúdo Personalizado

```tsx
import { ModalCustomizado } from '../modals/ModalCustomizado';

function ExemploModalPersonalizado() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Ver Detalhes
      </button>

      <ModalCustomizado
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Detalhes do Produto"
        size="lg"
        maxHeight="40rem"
        showSubmitButton={false}
        showCancelButton={false}
        className="modal-produto-detalhes"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src="/produto.jpg" 
              alt="Produto" 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Nome do Produto</h3>
            <p className="text-gray-600">
              Descrição detalhada do produto com todas as informações relevantes.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Preço:</span>
                <span className="font-semibold text-green-600">R$ 99,90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estoque:</span>
                <span className="font-semibold text-blue-600">15 unidades</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </ModalCustomizado>
    </>
  );
}
```

## Propriedades Disponíveis

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `isOpen` | boolean | - | Controla se o modal está aberto |
| `onClose` | function | - | Função chamada ao fechar o modal |
| `onSubmit` | function | - | Função chamada ao submeter o formulário |
| `title` | string | - | Título do modal |
| `size` | "sm" \| "md" \| "lg" \| "xl" | "md" | Tamanho do modal |
| `className` | string | "" | Classes CSS adicionais |
| `children` | ReactNode | - | Conteúdo do modal |
| `submitButtonText` | string | "Confirmar" | Texto do botão de confirmação |
| `cancelButtonText` | string | "Cancelar" | Texto do botão de cancelamento |
| `showSubmitButton` | boolean | true | Mostra o botão de confirmação |
| `showCancelButton` | boolean | true | Mostra o botão de cancelamento |
| `submitButtonVariant` | "primary" \| "secondary" \| "danger" | "primary" | Variante do botão de confirmação |
| `maxHeight` | string | "32rem" | Altura máxima do conteúdo |
| `formId` | string | "modal-form" | ID do formulário (quando aplicável) |

## Vantagens

1. **Reutilização**: Um componente para todos os tipos de modal
2. **Consistência**: Interface uniforme em todo o sistema
3. **Manutenibilidade**: Mudanças centralizadas em um local
4. **Flexibilidade**: Configurável para diferentes necessidades
5. **Performance**: Otimizado e eficiente

