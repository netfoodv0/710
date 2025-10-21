# 🗄️ Banco de Dados - Vault v2

Esta pasta contém todos os arquivos relacionados ao banco de dados Firebase Firestore.

## 📁 Estrutura de Arquivos

```
Banco de dados/
├── firestore.indexes.json    # Índices do Firestore
├── firestore.rules          # Regras de segurança
├── INDICES_FIREBASE.md      # Documentação dos índices
└── README.md               # Este arquivo
```

## 🔧 Configuração

O arquivo `firebase.json` na raiz do projeto aponta para os arquivos desta pasta:

```json
{
  "firestore": {
    "rules": "Banco de dados/firestore.rules",
    "indexes": "Banco de dados/firestore.indexes.json"
  }
}
```

## 📊 Índices

- **firestore.indexes.json**: Contém todos os índices compostos para otimizar consultas
- **INDICES_FIREBASE.md**: Documentação detalhada dos índices e instruções de criação

## 🔒 Regras de Segurança

- **firestore.rules**: Define as regras de acesso e segurança do Firestore

## 🚀 Comandos Úteis

```bash
# Deploy dos índices
firebase deploy --only firestore:indexes

# Deploy das regras
firebase deploy --only firestore:rules

# Deploy completo do Firestore
firebase deploy --only firestore

# Listar índices ativos
firebase firestore:indexes
```

## 📝 Notas

- Todos os arquivos de configuração do banco de dados estão centralizados nesta pasta
- O arquivo `firebase.json` deve permanecer na raiz do projeto
- Sempre atualize a documentação quando modificar índices ou regras




