# Relatórios de Clientes

Esta é uma subpágina especializada em relatórios focados na análise de clientes do restaurante.

## 🎯 Funcionalidades

### 1. **Visão Geral dos Clientes**
- **Total de Clientes**: Número total de clientes cadastrados
- **Novos Clientes**: Clientes que fizeram o primeiro pedido nos últimos 30 dias
- **Clientes Fiéis**: Clientes com 2-5 pedidos
- **Taxa de Retenção**: Percentual de clientes fiéis e super clientes

### 2. **Distribuição por Categoria**
- **Curiosos**: 0 pedidos (nunca fizeram pedido)
- **Novatos**: 1 pedido
- **Fiéis**: 2-5 pedidos
- **Super Clientes**: Mais de 5 pedidos

### 3. **Filtros e Exportação**
- Filtro por período (Semanal, Mensal, Trimestral, Anual)
- Exportação para Excel e PDF
- Dados em tempo real do Firebase

## 🚀 Como Acessar

1. **Navegação Principal**: Acesse `/relatorios` na aplicação
2. **Card de Clientes**: Clique no card "Relatórios de Clientes"
3. **URL Direta**: `/relatorios/clientes`

## 📊 Dados Exibidos

### Estatísticas Principais
- **Cards Informativos**: Métricas-chave em cards visuais
- **Gráfico de Distribuição**: Visualização das categorias de clientes
- **Tabela de Clientes**: Lista detalhada (em desenvolvimento)

### Fonte dos Dados
- **Firebase**: Dados reais dos pedidos e histórico
- **Cálculos Automáticos**: Estatísticas calculadas em tempo real
- **Categorização Inteligente**: Baseada no número de pedidos

## 🔧 Tecnologias Utilizadas

- **React 18+**: Interface moderna e responsiva
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Estilização utilitária e responsiva
- **Firebase**: Banco de dados em tempo real
- **Componentes Reutilizáveis**: Arquitetura modular

## 📱 Responsividade

- **Desktop**: Layout completo com todos os elementos
- **Tablet**: Adaptação para telas médias
- **Mobile**: Interface otimizada para dispositivos móveis

## 🎨 Design

- **Minimalista**: Seguindo as preferências do usuário
- **Cores Suaves**: Paleta de cores agradável e profissional
- **Ícones Intuitivos**: Navegação clara e fácil
- **Animações**: Transições suaves para melhor UX

## 🔄 Atualizações

- **Tempo Real**: Dados atualizados automaticamente
- **Cache Inteligente**: Otimização de performance
- **Retry Automático**: Tentativas automáticas em caso de erro

## 🚧 Funcionalidades Futuras

- **Tabela de Clientes Detalhada**: Lista completa com filtros
- **Gráficos Avançados**: Análises temporais e comparativas
- **Segmentação Personalizada**: Critérios customizáveis
- **Alertas e Notificações**: Avisos sobre mudanças importantes

## 📝 Notas de Desenvolvimento

### Estrutura de Arquivos
```
src/pages/Relatorios/
├── Clientes.tsx          # Página principal
├── index.ts              # Exportações
└── README.md             # Esta documentação
```

### Dependências
- `firebaseClientesService`: Serviço de dados dos clientes
- `DistribuicaoClientesCategoria`: Componente de visualização
- `PageHeader`: Cabeçalho da página
- `useNotificationContext`: Sistema de notificações

### Rotas
- **Principal**: `/relatorios` → Página de seleção
- **Clientes**: `/relatorios/clientes` → Relatórios específicos

## 🤝 Contribuição

Para melhorar esta funcionalidade:

1. **Mantenha a consistência** com o design existente
2. **Teste a responsividade** em diferentes dispositivos
3. **Valide os dados** do Firebase
4. **Documente mudanças** neste README

## 📞 Suporte

Em caso de problemas ou dúvidas:
- Verifique os logs do console
- Teste a conexão com o Firebase
- Valide as permissões de usuário
- Consulte a documentação do Firebase
