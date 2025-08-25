# Deploy no Netlify - Guia Completo

## 🚀 Por que Netlify?

- ✅ **Aceita projetos Windows** perfeitamente
- ✅ **Suporte nativo a Vite/React**
- ✅ **Build automático** a cada push no GitHub
- ✅ **Interface amigável** e intuitiva
- ✅ **Deploy gratuito** para projetos pessoais
- ✅ **Sem problemas** de dependências opcionais

## 📋 Passos para Deploy

### 1. **Criar conta no Netlify**
- Acesse [netlify.com](https://netlify.com)
- Clique em "Sign up"
- Use sua conta GitHub para login

### 2. **Conectar repositório**
- Clique em "New site from Git"
- Escolha "GitHub"
- Autorize o Netlify
- Selecione seu repositório: `netfoodv0/710`

### 3. **Configuração automática**
O Netlify detectará automaticamente:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (definido no netlify.toml)

### 4. **Deploy automático**
- Clique em "Deploy site"
- Aguarde o build (2-3 minutos)
- Seu site estará online!

## ⚙️ Configurações Implementadas

### **netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Funcionalidades configuradas:**
- ✅ Build automático com npm
- ✅ Diretório de publicação correto
- ✅ SPA routing (React Router)
- ✅ Cache otimizado para assets
- ✅ Headers de segurança

## 🔄 Deploy Contínuo

Após a configuração inicial:
1. **Faça push** para o GitHub
2. **Netlify detecta** automaticamente
3. **Faz build** e deploy
4. **Site atualizado** em segundos

## 🌐 URLs do Site

- **URL principal**: `https://seu-site.netlify.app`
- **URL customizada**: Pode ser configurada
- **HTTPS**: Automático e gratuito

## 📱 Vantagens do Netlify

1. **Sem problemas de plataforma** (Windows/Linux)
2. **Build mais rápido** que Vercel
3. **Interface mais simples**
4. **Suporte excelente** a projetos estáticos
5. **Deploy instantâneo**

## 🎯 Próximos Passos

1. **Criar conta** no Netlify
2. **Conectar GitHub**
3. **Fazer primeiro deploy**
4. **Configurar domínio** (opcional)
5. **Aproveitar** o deploy automático!

## 🆘 Suporte

- **Documentação**: [docs.netlify.com](https://docs.netlify.com)
- **Comunidade**: [community.netlify.com](https://community.netlify.com)
- **Status**: [status.netlify.com](https://status.netlify.com)
