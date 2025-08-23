import React from 'react';
import { DataTableColumn } from '../../components/ui';

interface Cupom {
  id: number;
  codigo: string;
  descricao: string;
  tipo: string;
  valor: number;
  status: string;
  categoria: string;
  dataCriacao: string;
  dataExpiracao: string;
  usoMaximo: number;
  usosAtuais: number;
  valorMinimo: number;
}

export const useConfiguracaoTabelaCupons = () => {
  // Funções auxiliares para a tabela de cupons
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === 'ativo';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? 'Ativo' : 'Inativo'}
      </span>
    );
  };

  const getTipoBadge = (tipo: string) => {
    const isPercentual = tipo === 'percentual';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPercentual 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-purple-100 text-purple-800'
      }`}>
        {isPercentual ? 'Percentual' : 'Valor Fixo'}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getValorDesconto = (cupom: Cupom) => {
    if (cupom.tipo === 'percentual') {
      return `${cupom.valor}%`;
    } else {
      return formatCurrency(cupom.valor);
    }
  };

  const columns: DataTableColumn<Cupom>[] = [
    {
      key: 'codigo',
      label: 'Código',
      sortable: true,
      render: (cupom) => (
        <div className="font-mono text-sm font-medium text-gray-900">
          {cupom.codigo}
        </div>
      )
    },
    {
      key: 'descricao',
      label: 'Descrição',
      sortable: true,
      render: (cupom) => (
        <div className="max-w-xs">
          <div className="text-xs font-medium text-gray-900 truncate" title={cupom.descricao}>{cupom.descricao}</div>
        </div>
      )
    },
    {
      key: 'tipo',
      label: 'Tipo',
      sortable: true,
      render: (cupom) => getTipoBadge(cupom.tipo)
    },
    {
      key: 'valor',
      label: 'Desconto',
      sortable: true,
      render: (cupom) => (
        <div className="text-sm font-medium text-gray-900">
          {getValorDesconto(cupom)}
        </div>
      )
    },
    {
      key: 'categoria',
      label: 'Categoria',
      sortable: true,
      render: (cupom) => (
        <div className="max-w-32">
          <div className="text-sm text-gray-900 truncate" title={cupom.categoria}>{cupom.categoria}</div>
        </div>
      )
    },
    {
      key: 'usos',
      label: 'Usos',
      sortable: true,
      render: (cupom) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">
            {cupom.usosAtuais}/{cupom.usoMaximo}
          </div>
        </div>
      )
    },
    {
      key: 'dataExpiracao',
      label: 'Expira em',
      sortable: true,
      render: (cupom) => (
        <div className="text-sm text-gray-900">
          {formatDate(cupom.dataExpiracao)}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (cupom) => getStatusBadge(cupom.status)
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false
    }
  ];

  return { columns, formatCurrency, getStatusBadge, getTipoBadge, formatDate };
};
