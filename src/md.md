
2. Hooks Duplicados
useDashboard existe em 3 locais diferentes
useDashboardOptimized duplicado
Lógica similar em múltiplos arquivos
�� Problemas de Organização
1. CSS Espalhado
Estilos do dashboard em index.css (710 linhas)
Estilos específicos em dashboard.css (84 linhas)
Muitas regras específicas misturadas com globais
2. Especificidade CSS Problemática
�� Recomendações para Correção
1. Limpar Duplicações
Consolidar estilos de cards em um local
Remover regras CSS duplicadas
Unificar hooks duplicados
2. Reduzir Uso de !important
Usar especificidade CSS adequada
Organizar estilos por prioridade
Criar classes utilitárias específicas
3. Reorganizar Estrutura
Mover estilos específicos para arquivos apropriados
Criar sistema de design tokens mais robusto
Separar estilos globais dos específicos
4. Consolidação de Hooks
Manter apenas uma versão de cada hook
Remover código duplicado
Centralizar lógica de dashboard
O CSS atual está com muitas duplicações e uso excessivo de !important, o que torna a manutenção difícil e pode causar conflitos de estilo.