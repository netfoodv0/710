# Página Horários - Sistema de Horários de Funcionamento

## Estrutura Organizada

A página de Horários foi reorganizada seguindo o mesmo padrão do Dashboard e KDS para manter consistência e facilitar manutenção.

### Estrutura de Pastas

```
src/pages/PaginaHorarios/
├── Horarios.tsx (componente principal)
├── components/
│   ├── HorariosLayout.tsx (layout principal)
│   ├── HorariosForm.tsx (formulário de horários)
│   ├── HorariosError.tsx (tratamento de erros)
│   └── index.ts (exportações)
├── hooks/
│   ├── useHorarios.ts (lógica principal)
│   ├── useHorariosActions.ts (ações do horários)
│   ├── useHorariosTranslation.ts (traduções)
│   └── index.ts (exportações)
├── types/
│   ├── horarios.types.ts (tipos TypeScript)
│   └── index.ts (exportações)
├── services/ (preparado para futuras implementações)
├── utils/ (preparado para futuras implementações)
├── index.ts (exportação principal)
└── README.md (esta documentação)
```

### Componentes

- **Horarios**: Componente principal que orquestra toda a página
- **HorariosLayout**: Layout principal com estrutura responsiva
- **HorariosForm**: Formulário para configuração de horários
- **HorariosError**: Componente para tratamento de erros

### Hooks

- **useHorarios**: Gerencia dados e estados principais
- **useHorariosActions**: Ações como salvar e retry
- **useHorariosTranslation**: Traduções específicas dos horários

### Tipos

- **HorariosData**: Interface principal com todos os dados
- **HorariosLayoutProps, HorariosFormProps**: Props dos componentes
- **UseHorariosReturn**: Retorno dos hooks
- **DiaSemana, HorarioDiaConfig**: Tipos específicos de horários

### Características

✅ **Modular**: Cada componente tem responsabilidade específica
✅ **Reutilizável**: Hooks e componentes podem ser reutilizados
✅ **Tipado**: TypeScript bem estruturado
✅ **Limpo**: Separação clara de responsabilidades
✅ **Manutenível**: Fácil de encontrar e modificar código
✅ **Escalável**: Estrutura preparada para crescimento
✅ **Consistente**: Segue o mesmo padrão do Dashboard e KDS

### Funcionalidades

- Configuração de horários por dia da semana
- Gerenciamento de pausas
- Horários especiais (feriados, eventos)
- Validação de horários
- Salvamento automático
- Tratamento de erros
- Interface responsiva

### Melhorias Implementadas

- **De 288 linhas** em um arquivo para **estrutura modular**
- **Separação de responsabilidades** clara
- **Hooks específicos** para lógica de negócio
- **Tipos TypeScript** bem definidos
- **Componentes reutilizáveis**
- **Tratamento de erros** centralizado
- **Traduções** organizadas
