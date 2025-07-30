# 🔥 Firestore Indexes - Solução de Problemas

## ❌ Problema Atual

Os erros indicam que faltam índices compostos no Firestore para as seguintes consultas:

### 1. Produtos
```
lojaId (ASC) + dataAtualizacao (DESC)
```

### 2. Categorias  
```
lojaId (ASC) + ordem (ASC)
```

### 3. Categorias Adicionais
```
lojaId (ASC) + nome (ASC)
```

### 4. Pedidos
```
lojaId (ASC) + dataHora (DESC)
```

### 5. Histórico de Pedidos
```
lojaId (ASC) + dataHora (DESC)
```

## ✅ Solução

### Opção 1: Deploy Automático
```bash
npm run deploy:indexes
```

### Opção 2: Deploy Manual
```bash
# 1. Login no Firebase
firebase login

# 2. Deploy dos índices
firebase deploy --only firestore:indexes
```

### Opção 3: Links Diretos

Se preferir criar manualmente no console:

#### Produtos:
https://console.firebase.google.com/v1/r/project/vault-v2-ef6d6/firestore/indexes?create_composite=Ck9wcm9qZWN0cy92YXVsdC12Mi1lZjZkNi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvcHJvZHV0b3MvaW5kZXhlcy9fEAEaCgoGbG9qYUlkEAEaEwoPZGF0YUF0dWFsaXphY2FvEAIaDAoIX19uYW1lX18QAg

#### Categorias:
https://console.firebase.google.com/v1/r/project/vault-v2-ef6d6/firestore/indexes?create_composite=ClFwcm9qZWN0cy92YXVsdC12Mi1lZjZkNi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvY2F0ZWdvcmlhcy9pbmRleGVzL18QARoKCgZsb2phSWQQARoJCgVvcmRlbRABGgwKCF9fbmFtZV9fEAE

#### Categorias Adicionais:
https://console.firebase.google.com/v1/r/project/vault-v2-ef6d6/firestore/indexes?create_composite=Cltwcm9qZWN0cy92YXVsdC12Mi1lZjZkNi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvY2F0ZWdvcmlhc0FkaWNpb25haXMvaW5kZXhlcy9fEAEaCgoGbG9qYUlkEAEaCAoEbm9tZRABGgwKCF9fbmFtZV9fEAE

## ⏱️ Tempo de Ativação

Após criar os índices, aguarde **2-5 minutos** para que fiquem ativos.

## 🔍 Verificação

Para verificar se os índices estão ativos:

1. Acesse: https://console.firebase.google.com/project/vault-v2-ef6d6/firestore/indexes
2. Procure pelos índices criados
3. Status deve ser "Enabled"

## 🚀 Próximos Passos

Após criar os índices:

1. ✅ **Sidebar funcionando** - Já está funcionando
2. ✅ **Autenticação funcionando** - Já está funcionando  
3. 🔄 **Aguardar índices** - 2-5 minutos
4. ✅ **Testar funcionalidades** - Dashboard, Cardápio, etc.

## 📝 Notas

- Os índices são necessários para consultas compostas no Firestore
- Sem os índices, as consultas falham com erro "requires an index"
- Os índices já estão configurados no `firestore.indexes.json`
- Basta fazer o deploy para ativá-los 