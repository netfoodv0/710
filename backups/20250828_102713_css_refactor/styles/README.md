# Organização dos Estilos CSS

## Estrutura dos Arquivos

### `index.css` - Arquivo Principal
- Importa todos os outros arquivos de estilo
- Contém apenas estilos base e variáveis CSS
- Não contém estilos duplicados

### `animations.css` - Animações Centralizadas
- Todas as animações do sistema (`@keyframes`)
- Classes de animação (`.fade-in`, `.slide-up`, etc.)
- Transições e transformações
- Estados de drag and drop

### `components.css` - Estilos de Componentes
- Estilos para modais e dropdowns
- Estilos para formulários e validações
- Estilos para gráficos (Recharts)
- Estilos para scrollbars personalizados
- Estilos para sidebar

### `utilities.css` - Classes Utilitárias
- Classes para backgrounds, bordas, alturas, larguras
- Classes para padding e margens específicos
- Classes para scrollbars personalizados
- Classes responsivas

### `dashboard.css` - Estilos do Dashboard
- Estilos específicos do dashboard
- Classes para cards e containers
- Estilos para botões
- Variáveis CSS do dashboard

## Como Usar

### Para adicionar novos estilos:

1. **Animações**: Adicione em `animations.css`
2. **Componentes**: Adicione em `components.css`
3. **Utilitários**: Adicione em `utilities.css`
4. **Dashboard**: Adicione em `dashboard.css`

### Para importar:

```css
/* No arquivo principal */
@import './styles/index.css';

/* Ou individualmente */
@import './styles/animations.css';
@import './styles/components.css';
@import './styles/utilities.css';
@import './styles/dashboard.css';
```

## Benefícios da Nova Organização

- ✅ **Sem duplicações**: Cada estilo está em um lugar
- ✅ **Fácil manutenção**: Encontre estilos rapidamente
- ✅ **Organização clara**: Separação por responsabilidade
- ✅ **Imports limpos**: Um único import no arquivo principal
- ✅ **Performance**: Evita carregar estilos duplicados

## Regras Importantes

1. **Nunca duplique estilos** entre arquivos
2. **Use imports** para organizar dependências
3. **Mantenha a responsabilidade** de cada arquivo
4. **Documente mudanças** neste README
