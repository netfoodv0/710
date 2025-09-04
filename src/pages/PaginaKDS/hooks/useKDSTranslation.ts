import { useTranslation } from '../../../hooks/useTranslation';

export function useKDSTranslation() {
  const { t } = useTranslation();

  const kds = {
    title: 'KDS',
    subtitle: 'Kitchen Display System',
    pedidosEmAndamento: t('Pedidos em Andamento'),
    preparando: t('Preparando'),
    pronto: t('Pronto'),
    pendente: t('Pendente'),
    moverPedido: t('Mover Pedido'),
    atualizarStatus: t('Atualizar Status'),
    prepararTodos: t('Preparar Todos'),
    finalizarTodos: t('Finalizar Todos')
  };

  return { kds };
}
