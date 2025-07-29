import React, { useState } from 'react';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Percent,
  DollarSign,
  Users,
  X,
  Save
} from 'lucide-react';
import { Card, Table, StatusBadge, TableActions } from '../components';
import { promocoesMock } from '../data';
import { Promocao, TableColumn } from '../types';

export function Promocoes() {
  const [promocoes, setPromocoes] = useState(promocoesMock);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todas' | 'ativas' | 'inativas'>('todas');

  const handleToggleAtiva = (promocaoId: string) => {
    setPromocoes(prev => 
      prev.map(promocao => 
        promocao.id === promocaoId 
          ? { ...promocao, ativa: !promocao.ativa }
          : promocao
      )
    );
  };

  const handleDeletePromocao = (promocaoId: string) => {
    if (confirm('Tem certeza que deseja excluir esta promoção?')) {
      setPromocoes(prev => prev.filter(promocao => promocao.id !== promocaoId));
    }
  };

  const promocoesFiltradas = promocoes.filter(promocao => {
    const matchBusca = busca === '' || 
      promocao.nome.toLowerCase().includes(busca.toLowerCase()) ||
      promocao.descricao.toLowerCase().includes(busca.toLowerCase());
    
    const matchStatus = filtroStatus === 'todas' || 
      (filtroStatus === 'ativas' && promocao.ativa) ||
      (filtroStatus === 'inativas' && !promocao.ativa);
    
    return matchBusca && matchStatus;
  });

  const columns = [
    {
      key: 'nome',
      label: 'Promoção',
      sortable: true,
      render: (nome, promocao) => (
        <div>
                      <p className="text-sm font-medium text-gray-900">{nome}</p>
          <p className="text-sm text-gray-500">{promocao.descricao}</p>
        </div>
      )
    },
    {
      key: 'tipo',
      label: 'Tipo',
      render: (tipo, promocao) => {
        const tipos = {
          desconto_percentual: { label: `${promocao.valor}% OFF`, color: 'bg-green-100 text-green-800' },
          desconto_valor: { label: `R$ ${promocao.valor} OFF`, color: 'bg-blue-100 text-blue-800' },
          frete_gratis: { label: 'Frete Grátis', color: 'bg-purple-100 text-purple-800' }
        };
        const config = tipos[tipo];
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        );
      }
    },
    {
      key: 'dataInicio',
      label: 'Período',
      render: (_, promocao) => (
        <div className="text-sm">
          <p className="text-gray-900">
            {promocao.dataInicio.toLocaleDateString('pt-BR')} -
          </p>
          <p className="text-gray-900">
            {promocao.dataFim.toLocaleDateString('pt-BR')}
          </p>
        </div>
      )
    },
    {
      key: 'horarioInicio',
      label: 'Horário',
      render: (_, promocao) => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{promocao.horarioInicio} - {promocao.horarioFim}</span>
        </div>
      )
    },
    {
      key: 'usoAtual',
      label: 'Uso',
      render: (uso, promocao) => (
        <div className="text-sm">
                      <p className="text-sm font-medium text-gray-900">{uso}</p>
          {promocao.usoMaximo && (
            <p className="text-gray-500">de {promocao.usoMaximo}</p>
          )}
        </div>
      )
    },
    {
      key: 'ativa',
      label: 'Status',
      render: (ativa) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          ativa 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {ativa ? 'Ativa' : 'Inativa'}
        </span>
      )
    },
    {
      key: 'id',
      label: 'Ações',
      render: (_, promocao) => (
        <TableActions
          onEdit={() => console.log('Editar', promocao.id)}
          onDelete={() => handleDeletePromocao(promocao.id)}
          customActions={[
            {
              label: promocao.ativa ? 'Desativar' : 'Ativar',
              onClick: () => handleToggleAtiva(promocao.id)
            }
          ]}
        />
      )
    }
  ];

  const promocoesAtivas = promocoes.filter(p => p.ativa).length;
  const usoTotal = promocoes.reduce((acc, p) => acc + p.usoAtual, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-gray-900">Promoções</h1>
            <p className="text-gray-600 mt-1">
              Gerencie campanhas promocionais e descontos
            </p>
          </div>
          
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nova Promoção
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-base font-bold text-gray-900">{promocoes.length}</p>
            <p className="text-sm text-gray-600">Total de Promoções</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-base font-bold text-gray-600">{promocoesAtivas}</p>
            <p className="text-sm text-gray-600">Promoções Ativas</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-base font-bold text-gray-600">{usoTotal}</p>
            <p className="text-sm text-gray-600">Usos Totais</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-base font-bold text-gray-600">
              {promocoesAtivas > 0 ? Math.round(usoTotal / promocoesAtivas) : 0}
            </p>
            <p className="text-sm text-gray-600">Uso Médio</p>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {(['todas', 'ativas', 'inativas'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFiltroStatus(status)}
            className={`btn text-sm ${
              filtroStatus === status
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Busca */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar promoções..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full pl-10 pr-4 h-[38px] border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
      </Card>

      {/* Tabela */}
      <Table
        data={promocoesFiltradas}
        columns={columns}
        emptyMessage="Nenhuma promoção encontrada"
      />
    </div>
  );
}