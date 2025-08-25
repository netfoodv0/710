# 🔥 Configuração do Firebase - Sistema Voult

## 📋 Visão Geral

Este documento explica como configurar o Firebase para funcionar em modo de **PRODUÇÃO** ou **DESENVOLVIMENTO** com emuladores.

## 🚀 Configuração para PRODUÇÃO

### 1. Criar arquivo `.env` na raiz do projeto

```bash
# Configuração do Ambiente
VITE_NODE_ENV=production
VITE_APP_ENVIRONMENT=production

# Firebase Configuration (Produção)
VITE_FIREBASE_API_KEY=AIzaSyC2I0Cy3olXowdUmDRFIKoqMS6Tgy4PqPQ
VITE_FIREBASE_AUTH_DOMAIN=vault-v2-ef6d6.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vault-v2-ef6d6
VITE_FIREBASE_STORAGE_BUCKET=vault-v2-ef6d6.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=848566827539
VITE_FIREBASE_APP_ID=1:848566827539:web:9004fa618db6534501dde6
VITE_FIREBASE_MEASUREMENT_ID=G-ZELND5C5HC

# IMPORTANTE: Emuladores DESABILITADOS em produção
VITE_USE_EMULATORS=false

# Configurações do App
VITE_APP_NAME=Sistema Voult
VITE_APP_VERSION=1.0.0
VITE_DEBUG=false
```

### 2. Build de Produção

```bash
# Build para produção (sem emuladores)
npm run build:prod

# Ou build padrão
npm run build
```

### 3. Preview de Produção

```bash
# Preview com configuração de produção
npm run start:prod
```

## 🔧 Configuração para DESENVOLVIMENTO

### 1. Criar arquivo `.env` na raiz do projeto

```bash
# Configuração do Ambiente
VITE_NODE_ENV=development
VITE_APP_ENVIRONMENT=development

# Firebase Configuration (Desenvolvimento)
VITE_FIREBASE_API_KEY=AIzaSyC2I0Cy3olXowdUmDRFIKoqMS6Tgy4PqPQ
VITE_FIREBASE_AUTH_DOMAIN=vault-v2-ef6d6.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vault-v2-ef6d6
VITE_FIREBASE_STORAGE_BUCKET=vault-v2-ef6d6.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=848566827539
VITE_FIREBASE_APP_ID=1:848566827539:web:9004fa618db6534501dde6
VITE_FIREBASE_MEASUREMENT_ID=G-ZELND5C5HC

# Emuladores HABILITADOS em desenvolvimento
VITE_USE_EMULATORS=true

# Configurações do App
VITE_APP_NAME=Sistema Voult
VITE_APP_VERSION=1.0.0
VITE_DEBUG=true
```

### 2. Iniciar Emuladores (Opcional)

```bash
# Iniciar emuladores do Firebase
firebase emulators:start

# Ou apenas Firestore
firebase emulators:start --only firestore
```

### 3. Build de Desenvolvimento

```bash
# Build para desenvolvimento (com emuladores)
npm run build:dev

# Ou desenvolvimento normal
npm run dev
```

## 📊 Scripts Disponíveis

### Build
- `npm run build` - Build padrão
- `npm run build:prod` - Build para produção (sem emuladores)
- `npm run build:dev` - Build para desenvolvimento (com emuladores)

### Preview
- `npm run preview` - Preview padrão
- `npm run start:prod` - Preview com configuração de produção

### Desenvolvimento
- `npm run dev` - Servidor de desenvolvimento

## 🔍 Verificação da Configuração

### 1. Verificar Console do Navegador

**Produção:**
```
🚀 Firebase configurado para PRODUÇÃO
```

**Desenvolvimento (sem emuladores):**
```
🔧 Firebase configurado para DESENVOLVIMENTO (sem emuladores)
```

**Desenvolvimento (com emuladores):**
```
🔧 Conectado ao emulador do Firestore
🔧 Conectado ao emulador do Auth
```

### 2. Verificar Variáveis de Ambiente

```javascript
// No console do navegador
console.log(import.meta.env.VITE_NODE_ENV);
console.log(import.meta.env.VITE_USE_EMULATORS);
console.log(import.meta.env.VITE_APP_ENVIRONMENT);
```

## 🚨 Solução de Problemas

### Problema: "Running in emulator mode. Do not use with production credentials."

**Causa:** O projeto está configurado para usar emuladores.

**Solução:**
1. Criar arquivo `.env` com `VITE_USE_EMULATORS=false`
2. Usar `npm run build:prod` para build de produção
3. Verificar se não há emuladores rodando

### Problema: Firebase não conecta

**Causa:** Configuração incorreta ou emuladores não disponíveis.

**Solução:**
1. Verificar arquivo `.env`
2. Verificar console do navegador
3. Verificar se emuladores estão rodando (se necessário)

### Problema: Erro de build

**Causa:** Variáveis de ambiente não configuradas.

**Solução:**
1. Criar arquivo `.env`
2. Verificar se todas as variáveis estão definidas
3. Usar script correto (`build:prod` ou `build:dev`)

## 📁 Estrutura de Arquivos

```
sistema-voult/
├── .env                    # Configuração de ambiente (criar)
├── .env.example           # Exemplo de configuração
├── src/
│   ├── config/
│   │   └── environment.ts # Configuração centralizada
│   └── lib/
│       └── firebase.ts    # Configuração do Firebase
├── package.json           # Scripts de build
└── README.md
```

## ✅ Checklist de Configuração

- [ ] Arquivo `.env` criado na raiz
- [ ] `VITE_USE_EMULATORS` configurado corretamente
- [ ] `VITE_NODE_ENV` configurado corretamente
- [ ] Script de build correto executado
- [ ] Console do navegador mostra configuração correta
- [ ] Firebase conectando corretamente

## 🔗 Links Úteis

- [Firebase Console](https://console.firebase.google.com/project/vault-v2-ef6d6)
- [Firebase Emulators](https://firebase.google.com/docs/emulator-suite)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Última atualização**: $(date)
**Versão**: 1.0.0
**Autor**: Sistema de Configuração Firebase
