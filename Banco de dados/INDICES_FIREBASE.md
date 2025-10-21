# 🔥 Índices Firebase - Operadores, Motoboys e Cupons

## 📋 Instruções para Criar Índices

### 1. Acesse o Console do Firebase
- Vá para: https://console.firebase.google.com/project/vault-v2-ef6d6/firestore/indexes
- Clique em **"Criar Índice"**

### 2. Índices para Operadores

#### Índice 1: Listagem por Loja e Data
- **Coleção:** `operadores`
- **Campos:**
  - `lojaId` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 2: Filtro por Status
- **Coleção:** `operadores`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 3: Filtro por Cargo
- **Coleção:** `operadores`
- **Campos:**
  - `lojaId` - Ascendente
  - `cargo` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 4: Busca por Nome
- **Coleção:** `operadores`
- **Campos:**
  - `lojaId` - Ascendente
  - `nome` - Ascendente

### 3. Índices para Motoboys

#### Índice 1: Listagem por Loja e Data
- **Coleção:** `motoboys`
- **Campos:**
  - `lojaId` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 2: Filtro por Status
- **Coleção:** `motoboys`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 3: Ordenação por Avaliação
- **Coleção:** `motoboys`
- **Campos:**
  - `lojaId` - Ascendente
  - `avaliacao` - Descendente

#### Índice 4: Ordenação por Total de Entregas
- **Coleção:** `motoboys`
- **Campos:**
  - `lojaId` - Ascendente
  - `totalEntregas` - Descendente

#### Índice 5: Busca por Nome
- **Coleção:** `motoboys`
- **Campos:**
  - `lojaId` - Ascendente
  - `nome` - Ascendente

### 4. Índices para Cupons

#### Índice 1: Listagem por Loja, Status e Data
- **Coleção:** `cupons`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 2: Filtro por Tipo
- **Coleção:** `cupons`
- **Campos:**
  - `lojaId` - Ascendente
  - `tipo` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 3: Filtro por Categoria
- **Coleção:** `cupons`
- **Campos:**
  - `lojaId` - Ascendente
  - `categoria` - Ascendente
  - `dataCriacao` - Descendente

#### Índice 4: Busca por Código
- **Coleção:** `cupons`
- **Campos:**
  - `lojaId` - Ascendente
  - `codigo` - Ascendente

#### Índice 5: Ordenação por Data de Expiração
- **Coleção:** `cupons`
- **Campos:**
  - `lojaId` - Ascendente
  - `dataExpiracao` - Ascendente

#### Índice 6: Filtro Combinado (Status + Tipo)
- **Coleção:** `cupons`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `tipo` - Ascendente
  - `dataCriacao` - Descendente

### 5. Índices para Fidelidade

#### Índice 1: Produtos Resgatáveis - Listagem por Loja, Status e Nome
- **Coleção:** `produtosResgataveis`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `nome` - Ascendente

#### Índice 2: Produtos Resgatáveis - Filtro por Categoria
- **Coleção:** `produtosResgataveis`
- **Campos:**
  - `lojaId` - Ascendente
  - `categoria` - Ascendente
  - `status` - Ascendente

#### Índice 3: Produtos Resgatáveis - Ordenação por Pontos
- **Coleção:** `produtosResgataveis`
- **Campos:**
  - `lojaId` - Ascendente
  - `pontosNecessarios` - Ascendente
  - `status` - Ascendente

#### Índice 4: Produtos Resgatáveis - Ordenação por Data de Criação
- **Coleção:** `produtosResgataveis`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `createdAt` - Descendente

#### Índice 5: Clientes Pontos - Listagem por Loja, Status e Nome
- **Coleção:** `clientesPontos`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `nome` - Ascendente

#### Índice 6: Clientes Pontos - Ordenação por Saldo
- **Coleção:** `clientesPontos`
- **Campos:**
  - `lojaId` - Ascendente
  - `saldoAtual` - Ascendente
  - `status` - Ascendente

#### Índice 7: Clientes Pontos - Ordenação por Data de Criação
- **Coleção:** `clientesPontos`
- **Campos:**
  - `lojaId` - Ascendente
  - `status` - Ascendente
  - `createdAt` - Descendente

#### Índice 8: Clientes Pontos - Busca por Telefone
- **Coleção:** `clientesPontos`
- **Campos:**
  - `lojaId` - Ascendente
  - `telefone` - Ascendente

#### Índice 9: Configuração Fidelidade - Ordenação por Sistema
- **Coleção:** `configuracaoFidelidade`
- **Campos:**
  - `sistemaAtivo` - Ascendente
  - `updatedAt` - Descendente


## 🚀 Como Criar

1. **Acesse:** https://console.firebase.google.com/project/vault-v2-ef6d6/firestore/indexes
2. **Clique em:** "Criar Índice"
3. **Selecione:** "Coleção de grupo"
4. **Digite:** O nome da coleção (ex: `operadores`, `motoboys`, `cupons`)
5. **Adicione os campos** conforme especificado acima
6. **Clique em:** "Criar"

## ⏱️ Tempo de Criação
- Cada índice leva de 2-10 minutos para ser criado
- Você pode criar todos de uma vez
- O Firebase notificará quando estiver pronto

## ✅ Verificação
Após criar, você pode verificar se foram criados executando:
```bash
firebase firestore:indexes
```

## 🎯 Benefícios
- **Consultas mais rápidas** nas páginas de operadores, motoboys, cupons e fidelidade
- **Filtros otimizados** por status, cargo, avaliação, tipo, categoria, pontos
- **Ordenação eficiente** por data, nome, avaliação, código, saldo de pontos
- **Busca rápida** por código de cupom e telefone de cliente
- **Sistema de fidelidade otimizado** com consultas rápidas de produtos e clientes
- **Melhor performance** geral da aplicação

---
*Criado em: $(date)*
*Projeto: Vault v2 - Sistema de Gestão*
