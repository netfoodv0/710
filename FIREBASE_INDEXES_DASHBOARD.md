# Índices do Firestore para o Dashboard

## Índices Necessários

Para otimizar as consultas do dashboard, você pode criar os seguintes índices no Firestore:

### 1. Índice para Pedidos por Loja e Data
```
Collection: pedidos
Fields:
- lojaId (Ascending)
- dataHora (Descending)
```

### 2. Índice para Pedidos por Loja, Status e Data
```
Collection: pedidos
Fields:
- lojaId (Ascending)
- status (Ascending)
- dataHora (Descending)
```

### 3. Índice para Pedidos por Loja, Data e Status
```
Collection: pedidos
Fields:
- lojaId (Ascending)
- dataHora (Descending)
- status (Ascending)
```

## Como Criar os Índices

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Vá para Firestore Database
3. Clique na aba "Índices"
4. Clique em "Adicionar índice"
5. Configure os campos conforme listado acima

## Índices Automáticos

O Firebase criará automaticamente índices simples para:
- `lojaId` (quando usado sozinho)
- `dataHora` (quando usado sozinho)

## Performance

Os índices compostos melhoram significativamente a performance das consultas, especialmente quando:
- Há muitos pedidos na coleção
- As consultas usam múltiplos filtros
- Os dados são ordenados por data

## Nota Importante

O código atual foi otimizado para funcionar sem índices compostos, fazendo a filtragem no código JavaScript. Isso é adequado para:
- Coleções pequenas (até ~1000 documentos)
- Desenvolvimento e testes
- Protótipos

Para produção com muitos dados, recomenda-se criar os índices listados acima. 