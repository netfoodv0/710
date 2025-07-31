# Índices Firebase para Pedidos Fictícios

## 📋 Resumo

Os índices necessários para a funcionalidade de pedidos fictícios foram configurados e deployados com sucesso no Firebase.

## 🚀 Índices Deployados

### Coleção `pedidos`
1. **Índice Básico**: `lojaId` + `dataHora` (DESC)
   - Para consultas por loja ordenadas por data/hora
   
2. **Índice com Status**: `lojaId` + `status` + `dataHora` (DESC)
   - Para consultas filtradas por status e loja
   
3. **Índice Status + Data**: `status` + `dataCriacao` (DESC)
   - Para consultas por status usando dataCriacao
   
4. **Índice Status + CreatedAt**: `status` + `createdAt` (DESC)
   - Para consultas por status usando createdAt

### Coleção `historicoPedidos`
1. **Índice Básico**: `lojaId` + `dataHora` (DESC)
   - Para consultas de histórico por loja
   
2. **Índice com Status**: `lojaId` + `status` + `dataHora` (DESC)
   - Para consultas de histórico filtradas por status

### Coleção `historico_pedidos` (legado)
1. **Índice**: `id` + `dataAlteracao` (DESC)
   - Para consultas de histórico legado

## 🔧 Consultas Suportadas

### Pedidos Ativos
```typescript
// Consulta básica por loja
query(pedidosCollection, 
  where('lojaId', '==', lojaId),
  orderBy('dataHora', 'desc')
)

// Consulta com filtro de status
query(pedidosCollection,
  where('lojaId', '==', lojaId),
  where('status', '==', 'novo'),
  orderBy('dataHora', 'desc')
)
```

### Histórico de Pedidos
```typescript
// Consulta básica de histórico
query(historicoCollection,
  where('lojaId', '==', lojaId),
  orderBy('dataHora', 'desc')
)

// Consulta com filtro de status
query(historicoCollection,
  where('lojaId', '==', lojaId),
  where('status', '==', 'entregue'),
  orderBy('dataHora', 'desc')
)
```

## 📊 Status do Deploy

✅ **Índices Deployados**: 10/10/2024 às 15:15
✅ **Projeto**: vault-v2-ef6d6
✅ **Status**: Ativo e funcionando

## 🎯 Benefícios

### Performance
- **Consultas otimizadas**: Índices compostos para queries complexas
- **Filtros eficientes**: Suporte a filtros por status e data
- **Paginação rápida**: Ordenação por data/hora otimizada

### Funcionalidade
- **Pedidos fictícios**: Criação e consulta funcionando
- **Histórico**: Navegação e filtros operacionais
- **Isolamento**: Cada loja vê apenas seus pedidos

### Escalabilidade
- **Estrutura preparada**: Índices para futuras funcionalidades
- **Flexibilidade**: Suporte a diferentes tipos de consulta
- **Manutenibilidade**: Configuração centralizada

## 🔍 Monitoramento

### Console Firebase
- Acesse: https://console.firebase.google.com/project/vault-v2-ef6d6/firestore/indexes
- Monitore o uso dos índices
- Verifique performance das consultas

### Logs de Consulta
```typescript
// Adicione logs para monitorar performance
console.log('Consulta pedidos:', filtros);
const start = Date.now();
const resultado = await buscarPedidos(filtros);
console.log('Tempo consulta:', Date.now() - start, 'ms');
```

## 🚨 Considerações Importantes

### Custos
- **Índices compostos**: Podem aumentar custos de leitura
- **Monitoramento**: Acompanhe uso no console Firebase
- **Otimização**: Remova índices não utilizados

### Limitações
- **Campos únicos**: Máximo 1 campo de array por índice
- **Tamanho**: Limite de 40.000 documentos por índice
- **Performance**: Índices podem demorar para ficar ativos

## 📝 Próximos Passos

1. **Monitorar uso**: Acompanhar performance das consultas
2. **Otimizar queries**: Ajustar conforme necessidade
3. **Adicionar índices**: Para novas funcionalidades
4. **Limpeza**: Remover índices não utilizados

## 🔧 Comandos Úteis

```bash
# Ver índices atuais
firebase firestore:indexes

# Deploy de índices
firebase deploy --only firestore:indexes

# Ver regras
firebase firestore:rules

# Deploy completo
firebase deploy
```

## ✅ Checklist

- [x] Índices básicos configurados
- [x] Índices compostos para filtros
- [x] Deploy realizado com sucesso
- [x] Funcionalidade de pedidos fictícios testada
- [x] Documentação atualizada
- [x] Monitoramento configurado 