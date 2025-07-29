# Firestore Indexes - iFood Dashboard

Este documento descreve os índices necessários para otimizar as consultas do Firestore.

## 📊 Índices Configurados

### 1. **Coleção: lojas**
- **Índice 1:** `email` (ASCENDING)
  - **Uso:** Verificar se e-mail já existe no cadastro
  - **Query:** `where('email', '==', email)`

- **Índice 2:** `ativa` + `dataCriacao` (ASCENDING + DESCENDING)
  - **Uso:** Listar lojas ativas ordenadas por data de criação
  - **Query:** `where('ativa', '==', true).orderBy('dataCriacao', 'desc')`

### 2. **Coleção: usuarios**
- **Índice 1:** `email` (ASCENDING)
  - **Uso:** Buscar usuário por e-mail
  - **Query:** `where('email', '==', email)`

- **Índice 2:** `dataCriacao` (DESCENDING)
  - **Uso:** Listar usuários por data de criação
  - **Query:** `orderBy('dataCriacao', 'desc')`

## 🚀 Como Deployar os Índices

### Opção 1: Script Automático
```bash
node deploy-indexes.js
```

### Opção 2: Manual
```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Fazer login
firebase login

# 3. Deploy dos índices
firebase deploy --only firestore:indexes
```

## 📋 Consultas que Requerem Índices

### **AuthService.checkEmailExists()**
```typescript
const q = query(lojasRef, where('email', '==', email));
```
- **Índice necessário:** `lojas.email ASC`

### **Futuras consultas de listagem**
```typescript
// Listar lojas ativas
const q = query(lojasRef, 
  where('ativa', '==', true),
  orderBy('dataCriacao', 'desc')
);

// Listar usuários por data de criação
const q = query(usuariosRef, 
  orderBy('dataCriacao', 'desc')
);
```

## ⚠️ Importante

1. **Índices compostos** são criados automaticamente pelo Firestore
2. **Índices simples** podem ser criados sob demanda
3. **Consultas sem índice** resultam em erro no console
4. **Deploy de índices** pode levar alguns minutos

## 🔍 Monitoramento

Para verificar o status dos índices:
1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Vá para Firestore Database
3. Clique na aba "Indexes"
4. Verifique se todos os índices estão "Enabled"

## 📈 Performance

- **Consultas com índice:** ~10-50ms
- **Consultas sem índice:** Erro ou timeout
- **Índices compostos:** Mais rápidos para consultas complexas

## 🛠️ Troubleshooting

### Erro: "The query requires an index"
1. Verifique se o índice está criado no Firebase Console
2. Aguarde alguns minutos para o índice ser ativado
3. Se necessário, crie o índice manualmente no console

### Erro: "Index not found"
1. Execute `firebase deploy --only firestore:indexes`
2. Aguarde a criação do índice
3. Teste a consulta novamente

## 📝 Notas

- Índices são criados automaticamente para consultas simples
- Índices compostos devem ser criados manualmente
- O Firebase CLI facilita o gerenciamento de índices
- Considere o custo de armazenamento dos índices 