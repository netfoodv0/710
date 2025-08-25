# Solução para Erro de Build no Vercel

## Problema Identificado

O projeto estava enfrentando um erro durante o build no Vercel relacionado ao Rollup e dependências opcionais:

```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```

Este erro ocorre devido a:
1. Problemas com dependências nativas do Rollup no ambiente Linux do Vercel
2. Conflitos entre dependências opcionais e obrigatórias
3. Configuração inadequada do npm para ambientes de produção

## Solução Implementada

### 1. Configuração Específica para Vercel

Foi criada uma configuração específica do Vite (`vite.config.vercel.ts`) que:
- Desabilita completamente o Rollup
- Força o uso do esbuild
- Inclui plugin personalizado para garantir configurações corretas

### 2. Scripts de Build Otimizados

Foram criados múltiplos scripts de build para diferentes cenários:

- `build:vercel`: Build com configuração específica que desabilita Rollup
- `build:vercel:clean`: Limpa dependências e reinstala sem opcionais
- `build:vercel:script`: Script Node.js robusto para build no Vercel

### 3. Configuração do Vercel

Arquivo `vercel.json` atualizado com:
- Comando de build que usa configuração específica
- Instalação de dependências sem opcionais
- Variáveis de ambiente específicas

### 4. Configuração do NPM

Arquivo `.npmrc` criado para:
- Omitir dependências opcionais durante instalação
- Configurar compatibilidade com dependências legadas
- Otimizar instalação para produção

## Como Usar

### Build Local
```bash
npm run build
```

### Build para Vercel (Recomendado)
```bash
npm run build:vercel
```

### Build Limpo (recomendado para produção)
```bash
npm run build:vercel:clean
```

### Script Alternativo
```bash
npm run build:vercel:script
```

## Variáveis de Ambiente

- `VITE_FORCE_ESBUILD=true`: Força uso do esbuild
- `VITE_SKIP_OPTIONAL_DEPS=true`: Pula dependências opcionais

## Arquivos Modificados

1. `package.json` - Scripts de build atualizados
2. `vite.config.ts` - Configuração base otimizada
3. `vite.config.vercel.ts` - Configuração específica para Vercel (sem Rollup)
4. `vercel.json` - Configuração específica do Vercel
5. `.npmrc` - Configuração do npm para produção
6. `.vercelignore` - Arquivos ignorados durante deploy
7. `scripts/build-vercel.js` - Script de build alternativo

## Benefícios da Solução

- ✅ Elimina completamente erros de dependências nativas do Rollup
- ✅ Build mais rápido e confiável usando esbuild
- ✅ Compatibilidade total com ambiente Linux do Vercel
- ✅ Mantém funcionalidade local intacta
- ✅ Configuração limpa e manutenível
- ✅ Múltiplas opções de build para diferentes cenários

## Troubleshooting

Se ainda houver problemas:

1. Verifique se o arquivo `vite.config.vercel.ts` está sendo usado
2. Execute `npm run build:vercel` localmente para testar
3. Verifique se o arquivo `.npmrc` está sendo respeitado
4. Use `npm run build:vercel:script` como fallback

## Notas Técnicas

- A configuração `vite.config.vercel.ts` desabilita completamente o Rollup
- O esbuild é mais rápido e confiável que o Rollup para builds de produção
- Dependências opcionais são completamente evitadas durante instalação
- A configuração mantém compatibilidade com desenvolvimento local
- Plugin personalizado garante que as configurações sejam aplicadas corretamente
