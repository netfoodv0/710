# Solução para Erro do Rollup no Vercel

## Problema Identificado

O projeto estava enfrentando o erro:
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies
```

Este é um problema conhecido do npm com dependências opcionais do Rollup, especialmente em ambientes Linux (Vercel).

## Causa do Problema

1. **Plugin Visualizer**: O `rollup-plugin-visualizer` estava sendo usado no build de produção
2. **Dependências Opcionais**: O Rollup tenta instalar dependências específicas da plataforma
3. **Ambiente Linux**: O Vercel roda em Linux, mas as dependências estavam configuradas para Windows

## Soluções Implementadas

### 1. Configuração de Produção Limpa (`vite.config.prod.ts`)

- **Removido**: `rollup-plugin-visualizer` do build de produção
- **Mantido**: Todas as otimizações essenciais (tree shaking, chunking, minificação)
- **Resultado**: Build mais limpo e sem dependências problemáticas

### 2. Configurações NPM (`.npmrc`)

```ini
# Configurações para resolver problemas do Rollup
optional=false
platform=linux
arch=x64
```

- **`optional=false`**: Desabilita instalação de dependências opcionais
- **`platform=linux`**: Especifica a plataforma correta
- **`arch=x64`**: Especifica a arquitetura correta

### 3. Comando de Instalação Otimizado (`vercel.json`)

```json
"installCommand": "npm ci --prefer-offline --no-audit --no-optional"
```

- **`--no-optional`**: Não instala dependências opcionais
- **`--prefer-offline`**: Usa cache local quando possível
- **`--no-audit`**: Pula auditoria de segurança para acelerar build

### 4. Variáveis de Ambiente

```json
"env": {
  "NPM_CONFIG_OPTIONAL": "false"
}
```

- Força a desabilitação de dependências opcionais via variável de ambiente

## Arquivos Modificados

1. **`vite.config.prod.ts`** - Removido plugin visualizer
2. **`.npmrc`** - Configurações específicas para Linux
3. **`vercel.json`** - Comando de instalação otimizado
4. **`SOLUCAO-ERRO-ROLLUP.md`** - Esta documentação

## Benefícios da Solução

1. **Estabilidade**: Build sem erros de dependências opcionais
2. **Performance**: Instalação mais rápida no Vercel
3. **Compatibilidade**: Configuração específica para ambiente Linux
4. **Manutenibilidade**: Configuração limpa e documentada

## Verificação

Após as correções, o build deve funcionar corretamente no Vercel:
- Sem erros de módulos Rollup faltando
- Instalação estável de dependências
- Build otimizado para produção
- Compatibilidade com ambiente Linux do Vercel

## Nota Importante

O `rollup-plugin-visualizer` ainda está disponível para desenvolvimento local e análise de bundle, mas foi removido do build de produção para evitar conflitos no Vercel.
