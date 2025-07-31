# Funcionalidade: Pedidos Fictícios

## 📋 Descrição

Implementação de uma funcionalidade na página de pedidos que permite criar pedidos fictícios com dados realistas, salvando-os no Firebase e redirecionando para o histórico de pedidos.

## 🚀 Funcionalidades Implementadas

### 1. **Geração de Pedidos Fictícios**
- **Arquivo**: `src/utils/pedidoUtils.ts`
- **Função**: `gerarPedidoFicticio()`
- **Características**:
  - Gera dados realistas de clientes, produtos e endereços
  - Cria números de pedido únicos baseados em timestamp
  - Seleciona aleatoriamente formas de pagamento e entrega
  - Gera itens de pedido com quantidades variadas
  - Calcula totais automaticamente
  - **✅ Corrigido**: Remove campos `undefined` antes de enviar ao Firebase

### 2. **Interface de Usuário**
- **Arquivo**: `src/pages/Pedidos.tsx`
- **Características**:
  - Botão "Novo Pedido" com estado de loading
  - Feedback visual durante criação
  - Explicação da funcionalidade na página
  - Design responsivo e acessível

### 3. **Integração com Firebase**
- **Serviço**: `src/services/firebasePedidoService.ts`
- **Método**: `criarPedido()`
- **Características**:
  - Salva pedido na coleção `pedidos`
  - Inclui isolamento por loja (`lojaId`)
  - Timestamps automáticos de criação e atualização
  - **✅ Corrigido**: Validação de dados antes do envio

### 4. **Sistema de Notificações**
- **Contexto**: `src/context/notificationContext.tsx`
- **Hook**: `src/hooks/useNotifications.ts`
- **Componente**: `src/components/NotificationToast.tsx`
- **Características**:
  - Notificações de sucesso e erro
  - Auto-remoção após tempo definido
  - Design consistente com o sistema

### 5. **Navegação Automática**
- **Rota**: `/historico`
- **Comportamento**: Redirecionamento após criação bem-sucedida
- **Delay**: 1.5 segundos para visualização da notificação

## 🔧 Correções Implementadas

### Problema: Campos `undefined` no Firebase
**Erro**: `FirebaseError: Function addDoc() called with invalid data. Unsupported field value: undefined`

**Solução**:
1. **Função `removeUndefinedFields()`**: Remove campos `undefined` de objetos
2. **Limpeza de dados**: Aplicada em todos os objetos antes do envio
3. **Campos opcionais**: Usa spread operator condicional para campos opcionais

```typescript
// Antes (causava erro)
cliente: {
  nome: cliente.nome,
  telefone: cliente.telefone,
  endereco: enderecoEntrega?.rua // undefined causava erro
}

// Depois (corrigido)
cliente: {
  nome: cliente.nome,
  telefone: cliente.telefone,
  ...(enderecoEntrega?.rua && { endereco: enderecoEntrega.rua })
}
```

## 📊 Dados Gerados

### Produtos Disponíveis
- X-Burger Clássico (R$ 18,90)
- X-Bacon (R$ 22,50)
- X-Salada (R$ 20,00)
- X-Tudo (R$ 25,90)
- Batata Frita (R$ 12,00)
- Refrigerantes (R$ 6,00 - R$ 6,50)
- Suco Natural (R$ 8,00)
- Sorvete (R$ 5,50)
- Milk Shake (R$ 15,00)

### Clientes Fictícios
- 8 clientes diferentes com nomes e telefones realistas
- Endereços de São Paulo (Vila Madalena, Paulista, Augusta, etc.)

### Formas de Pagamento
- PIX
- Dinheiro
- Cartão de Crédito
- Cartão de Débito

### Formas de Entrega
- Delivery (com endereço completo)
- Retirada

## 🔧 Como Usar

1. **Acesse a página de pedidos** (`/pedidos`)
2. **Clique no botão "Novo Pedido"**
3. **Aguarde o processamento** (ícone de loading)
4. **Veja a notificação de sucesso**
5. **Seja redirecionado automaticamente** para o histórico

## 🛠️ Estrutura de Arquivos

```
src/
├── pages/
│   └── Pedidos.tsx                    # Página principal com botão
├── utils/
│   └── pedidoUtils.ts                 # Funções de geração de dados
├── services/
│   └── firebasePedidoService.ts       # Serviço Firebase
├── hooks/
│   └── useNotifications.ts            # Hook de notificações
├── context/
│   └── notificationContext.tsx        # Contexto de notificações
├── components/
│   └── NotificationToast.tsx          # Componente de notificação
└── types/
    └── pedidos.ts                     # Tipos TypeScript
```

## 🎯 Benefícios

### Para Desenvolvimento
- **Testes rápidos**: Criação instantânea de dados de teste
- **Demonstração**: Funcionalidade para apresentações
- **Debugging**: Dados consistentes para debug

### Para Usuários
- **Experiência realista**: Dados que simulam pedidos reais
- **Feedback imediato**: Notificações claras do status
- **Navegação intuitiva**: Redirecionamento automático

## 🔒 Segurança

- **Isolamento por loja**: Cada pedido é associado à loja do usuário
- **Validação de dados**: Tipos TypeScript rigorosos
- **Tratamento de erros**: Try/catch com feedback ao usuário
- **Limpeza de dados**: Remove campos inválidos antes do envio

## 🚀 Próximos Passos

1. **Adicionar mais variedade** de produtos e clientes
2. **Implementar configuração** de quantidade de pedidos
3. **Adicionar opção** de criar múltiplos pedidos
4. **Integrar com analytics** para rastrear uso
5. **Adicionar testes unitários** para as funções

## 📝 Notas Técnicas

- **Performance**: Geração síncrona para simplicidade
- **Escalabilidade**: Estrutura preparada para expansão
- **Manutenibilidade**: Código bem documentado e tipado
- **Acessibilidade**: Botões com estados disabled e loading
- **Robustez**: Validação e limpeza de dados antes do envio 