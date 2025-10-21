import { useTranslation } from '../../../hooks/useTranslation';

export function useCuponsTranslation() {
  const { t } = useTranslation();

  const cupons = {
    title: t('Relatório de Cupons'),
    subtitle: t('Acompanhe o desempenho dos seus cupons de desconto'),
    exportar: t('Exportar Relatório'),
    novoCupom: t('Novo Cupom'),
    buscarCupons: t('Buscar cupons...'),
    visualizar: t('Visualizar'),
    editar: t('Editar'),
    excluir: t('Excluir'),
    adicionar: t('Adicionar'),
    categorias: {
      descontoPercentual: t('Desconto Percentual'),
      freteGratis: t('Frete Grátis'),
      valorFixo: t('Valor Fixo'),
      promocao: t('Promoção')
    },
    status: {
      ativo: t('Ativo'),
      inativo: t('Inativo')
    },
    tipos: {
      percentual: t('Percentual'),
      valorFixo: t('Valor Fixo')
    },
    mensagens: {
      sucessoExportar: t('Relatório de cupons exportado com sucesso!'),
      erroExportar: t('Erro ao exportar relatório de cupons'),
      sucessoSalvar: t('Cupom salvo com sucesso!'),
      erroSalvar: t('Erro ao salvar cupom'),
      sucessoExcluir: t('Cupom excluído com sucesso!'),
      erroExcluir: t('Erro ao excluir cupom')
    }
  };

  return { cupons };
}


