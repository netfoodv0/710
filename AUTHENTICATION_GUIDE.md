# 🔐 Guia de Autenticação e Isolamento de Dados

Este guia explica como implementamos um sistema robusto de autenticação e isolamento de dados por usuário no seu projeto iFood Dashboard.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura de Segurança](#arquitetura-de-segurança)
3. [Implementação](#implementação)
4. [Migração de Dados](#migração-de-dados)
5. [Testes e Validação](#testes-e-validação)
6. [Troubleshooting](#troubleshooting)

## 🎯 Visão Geral

### Problema Resolvido
- ✅ **Isolamento completo de dados por usuário/loja**
- ✅ **Regras de segurança do Firestore configuradas**
- ✅ **Validação de propriedade em todas as operações**
- ✅ **Autenticação obrigatória para todas as operações**

### Estrutura de Dados
```
usuarios/{userId}          # Dados do usuário
lojas/{lojaId}            # Dados da loja (lojaId = userId)
produtos/{produtoId}      # Produtos com campo lojaId
categorias/{categoriaId}  # Categorias com campo lojaId
pedidos/{pedidoId}        # Pedidos com campo lojaId
```

## 🛡️ Arquitetura de Segurança

### 1. Regras do Firestore
```javascript
// Regras para produtos - apenas produtos da loja do usuário
match /produtos/{produtoId} {
  allow read, write: if isAuthenticated() && 
    resource.data.lojaId == request.auth.uid;
}
```

### 2. Validação em Serviços
```typescript
// Sempre filtrar por loja do usuário
let q = query(
  this.produtosCollection,
  where('lojaId', '==', lojaId)
);
```

### 3. Hook de Autenticação Melhorado
```typescript
const { isAuthenticated, isOwner, hasPermission } = useAuth();
```

## 🔧 Implementação

### 1. Atualização das Regras do Firestore

Execute o comando para atualizar as regras:
```bash
npm run firebase:deploy-rules
```

### 2. Migração de Dados Existentes

Se você tem dados existentes, execute a migração:

```typescript
import { MigrationUtils } from './src/utils/migrationUtils';

// Verificar documentos que precisam de migração
const results = await MigrationUtils.checkMissingLojaId();

// Executar migração completa
await MigrationUtils.runAllMigrations();
```

### 3. Componente de Configurações de Segurança

Adicione o componente `SecuritySettings` à sua página de configurações:

```typescript
import { SecuritySettings } from './components/auth/SecuritySettings';

// No seu componente de configurações
<SecuritySettings />
```

## 📊 Migração de Dados

### Verificação Prévia
```typescript
// Verificar quantos documentos precisam ser migrados
const results = await MigrationUtils.checkMissingLojaId();
console.log(results);
// { produtos: 5, categorias: 2, pedidos: 10 }
```

### Execução da Migração
```typescript
// Executar migração completa
await MigrationUtils.runAllMigrations();
```

### Estrutura dos Dados Migrados
```javascript
// Antes
{
  id: "produto123",
  nome: "Pizza Margherita",
  preco: 35.90
}

// Depois
{
  id: "produto123",
  nome: "Pizza Margherita", 
  preco: 35.90,
  lojaId: "user123", // ✅ Campo adicionado
  dataAtualizacao: Timestamp
}
```

## 🧪 Testes e Validação

### 1. Teste de Isolamento
```typescript
// Usuário A só deve ver seus próprios dados
const produtosA = await produtosService.buscarProdutos();
// produtosA.length = 5 (apenas produtos do usuário A)

// Usuário B só deve ver seus próprios dados  
const produtosB = await produtosService.buscarProdutos();
// produtosB.length = 3 (apenas produtos do usuário B)
```

### 2. Teste de Segurança
```typescript
// Tentativa de acessar dados de outro usuário deve falhar
try {
  await produtosService.buscarProduto("produto-outro-usuario");
} catch (error) {
  // Deve lançar erro: "Produto não encontrado"
}
```

### 3. Validação de Hook
```typescript
const { isAuthenticated, isOwner, hasPermission } = useAuth();

// Verificar se usuário está autenticado
if (!isAuthenticated) {
  // Redirecionar para login
}

// Verificar se usuário é dono da loja
if (!isOwner(lojaId)) {
  // Acesso negado
}
```

## 🔍 Troubleshooting

### Problema: "Produto não encontrado" em produtos existentes
**Solução:** Execute a migração de dados
```typescript
await MigrationUtils.migrateProdutos();
```

### Problema: Erro de permissão no Firestore
**Solução:** Verifique se as regras foram deployadas
```bash
firebase deploy --only firestore:rules
```

### Problema: Usuário autenticado mas sem dados de loja
**Solução:** Verifique se o usuário tem documento na coleção `lojas`
```typescript
const loja = await AuthService.getCurrentLoja();
if (!loja) {
  // Criar dados da loja
}
```

### Problema: Dados não aparecem após login
**Solução:** Verifique se o campo `lojaId` está sendo adicionado
```typescript
// No serviço, sempre adicionar lojaId
const produtoData = {
  ...produto,
  lojaId: getCurrentLojaId(), // ✅ Sempre incluir
  dataCriacao: serverTimestamp()
};
```

## 📝 Checklist de Implementação

- [ ] Deploy das regras do Firestore
- [ ] Migração de dados existentes
- [ ] Atualização dos serviços Firebase
- [ ] Implementação do hook useAuth melhorado
- [ ] Atualização do ProtectedRoute
- [ ] Testes de isolamento de dados
- [ ] Validação de segurança

## 🚀 Próximos Passos

1. **Monitoramento**: Implementar logs de auditoria
2. **Backup**: Configurar backup automático dos dados
3. **Analytics**: Adicionar métricas de segurança
4. **Multi-tenancy**: Suporte a múltiplas lojas por usuário

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do console
2. Execute a migração de dados
3. Verifique as regras do Firestore
4. Teste com usuários diferentes

---

**✅ Sistema de autenticação e isolamento de dados implementado com sucesso!** 