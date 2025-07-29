# Componentes de Autenticação

Este diretório contém os componentes relacionados à autenticação do sistema.

## Componentes

### LoginForm
Formulário de login com validação usando Zod e React Hook Form.

**Props:**
- `onSubmit`: Função chamada quando o formulário é submetido
- `isLoading`: Estado de carregamento
- `error`: Mensagem de erro

**Características:**
- Validação de e-mail e senha
- Opção de mostrar/ocultar senha
- Design responsivo com Tailwind CSS
- Ícones do Lucide React

### CadastroForm
Formulário completo de cadastro de loja com todos os campos necessários.

**Props:**
- `onSubmit`: Função chamada quando o formulário é submetido
- `isLoading`: Estado de carregamento
- `error`: Mensagem de erro

**Campos incluídos:**
- Nome da loja
- WhatsApp
- Segmento (dropdown)
- E-mail
- Senha (com validação de mínimo 8 caracteres)
- Endereço completo (CEP, rua, número, bairro, cidade, estado)
- Aceite dos termos de uso

**Características:**
- Validação completa com Zod
- Formatação automática de CEP
- Estados brasileiros em dropdown
- Checkbox obrigatório para termos
- Design responsivo

### ProtectedRoute
Componente para proteger rotas que requerem autenticação.

**Props:**
- `children`: Conteúdo a ser renderizado se autenticado

**Funcionalidades:**
- Redireciona para `/login` se não autenticado
- Mostra loading enquanto verifica autenticação
- Renderiza o conteúdo apenas se autenticado

## Integração com Firebase

Todos os componentes estão integrados com:
- Firebase Authentication
- Firestore para dados de usuário e loja
- Context API para estado global

## Validações

As validações são feitas usando:
- **Zod**: Schemas de validação
- **React Hook Form**: Gerenciamento de formulários
- **@hookform/resolvers**: Integração entre Zod e React Hook Form

## Estilos

Os componentes usam:
- **Tailwind CSS**: Para estilização
- **Lucide React**: Para ícones
- **Design responsivo**: Mobile-first
- **Estados de loading**: Com spinners
- **Feedback visual**: Para erros e sucessos

## Uso

```tsx
import { LoginForm, CadastroForm, ProtectedRoute } from '../components/auth';

// Página de login
<LoginForm 
  onSubmit={handleLogin}
  isLoading={isLoading}
  error={error}
/>

// Página de cadastro
<CadastroForm 
  onSubmit={handleCadastro}
  isLoading={isLoading}
  error={error}
/>

// Rota protegida
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
``` 