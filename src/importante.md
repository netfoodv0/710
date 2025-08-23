





6. src/pages/Modal.tsx
Problemas: 393 linhas, página de exemplo que pode ser removida ou simplificada
Refatoração necessária: Remover ou transformar em componente reutilizável

7. src/pages/HistoricoPedidos.tsx
Problemas: 304 linhas, hooks externos complexos (já documentado como resolvido)
Status: ✅ Já refatorado, mas pode ser otimizado
�� PRIORIDADE BAIXA

8. Arquivos com console.log excessivo:
src/hooks/useWhatsAppChats.ts - 50+ console.log
src/hooks/useWhatsAppConnection.ts - 20+ console.log
src/hooks/useCardapioActions.ts - 10+ console.log

9. Arquivos com uso excessivo de any:
src/services/firebaseDashboardService.ts
src/services/firebasePedidoService.ts
src/hooks/useWhatsAppConnection.ts

10. Componentes com estilos inline:
src/components/Table.tsx
src/pages/Dashboard.tsx
src/pages/Pedidos.tsx

�� Recomendações de Refatoração

1. Estratégia de Componentização
Separar componentes grandes em arquivos menores
Criar hooks customizados para lógica específica
Implementar padrão de composição

2. Tipagem TypeScript
Eliminar uso de any
Criar interfaces específicas para cada contexto
Implementar tipos genéricos onde apropriado

3. Limpeza de Código
Remover console.log de produção
Consolidar estilos duplicados
Eliminar dados mockados hardcoded

4. Padrões de Arquitetura
Seguir o padrão já estabelecido na página de relatórios
Implementar lazy loading para componentes grandes
Usar React.memo para otimização de performance

5. Organização de Arquivos
Mover componentes relacionados para diretórios específicos
Criar arquivos de índice para exportações
Separar lógica de negócio da UI
Esta refatoração seguirá as mesmas práticas já implementadas com sucesso na página de produtos, garantindo consistência e qualidade no código.