import React, { useState } from 'react';
import {
  Star,
  Search,
  Filter,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  Calendar,
  User
} from 'lucide-react';
import { Card, Table, TableActions } from '../components';
import { Avaliacao, TableColumn } from '../types';

// Dados mockados
const avaliacoesMock: Avaliacao[] = [
  {
    id: '1',
    clienteNome: 'Maria Silva',
    pedidoId: 'PED-001',
    nota: 5,
    comentario: 'Excelente! Pizza chegou quentinha e muito saborosa. Entrega rápida e atendimento perfeito.',
    data: new Date('2024-01-15T19:30:00'),
    respondida: true,
    resposta: 'Muito obrigado pelo feedback, Maria! Ficamos felizes em saber que gostou da nossa pizza.',
    dataResposta: new Date('2024-01-15T20:15:00')
  },
  {
    id: '2',
    clienteNome: 'João Santos',
    pedidoId: 'PED-002',
    nota: 4,
    comentario: 'Comida boa, mas demorou um pouco mais que o esperado. No geral, recomendo.',
    data: new Date('2024-01-14T20:45:00'),
    respondida: false
  },
  {
    id: '3',
    clienteNome: 'Ana Costa',
    pedidoId: 'PED-003',
    nota: 5,
    comentario: 'Hambúrguer artesanal incrível! Ingredientes frescos e sabor excepcional.',
    data: new Date('2024-01-14T18:20:00'),
    respondida: true,
    resposta: 'Obrigado Ana! Nossos hambúrgueres são feitos com muito carinho e ingredientes selecionados.',
    dataResposta: new Date('2024-01-14T19:00:00')
  },
  {
    id: '4',
    clienteNome: 'Carlos Oliveira',
    pedidoId: 'PED-004',
    nota: 2,
    comentario: 'Pedido chegou frio e com atraso de 40 minutos. Qualidade abaixo do esperado.',
    data: new Date('2024-01-13T21:10:00'),
    respondida: true,
    resposta: 'Lamentamos muito pelo ocorrido, Carlos. Vamos revisar nossos processos para evitar que isso aconteça novamente.',
    dataResposta: new Date('2024-01-14T09:30:00')
  },
  {
    id: '5',
    clienteNome: 'Fernanda Lima',
    pedidoId: 'PED-005',
    nota: 5,
    comentario: 'Lasanha maravilhosa! Já é a terceira vez que peço e sempre supera as expectativas.',
    data: new Date('2024-01-13T19:15:00'),
    respondida: false
  },
  {
    id: '6',
    clienteNome: 'Roberto Mendes',
    pedidoId: 'PED-006',
    nota: 3,
    comentario: 'Comida ok, mas o preço está um pouco alto para a quantidade servida.',
    data: new Date('2024-01-12T20:30:00'),
    respondida: false
  }
];

export function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(avaliacoesMock);
  const [busca, setBusca] = useState('');
  const [filtroNota, setFiltroNota] = useState<number | 'todas'>('todas');
  const [filtroResposta, setFiltroResposta] = useState<'todas' | 'respondidas' | 'pendentes'>('todas');
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<Avaliacao | null>(null);
  const [respostaTexto, setRespostaTexto] = useState('');

  const handleResponder = (avaliacaoId: string, resposta: string) => {
    setAvaliacoes(prev => 
      prev.map(avaliacao => 
        avaliacao.id === avaliacaoId 
          ? { 
              ...avaliacao, 
              respondida: true, 
              resposta,
              dataResposta: new Date()
            }
          : avaliacao
      )
    );
    setAvaliacaoSelecionada(null);
    setRespostaTexto('');
  };

  const avaliacoesFiltradas = avaliacoes.filter(avaliacao => {
    const matchBusca = busca === '' || 
      avaliacao.clienteNome.toLowerCase().includes(busca.toLowerCase()) ||
      avaliacao.comentario.toLowerCase().includes(busca.toLowerCase()) ||
      avaliacao.pedidoId.toLowerCase().includes(busca.toLowerCase());
    
    const matchNota = filtroNota === 'todas' || avaliacao.nota === filtroNota;
    
    const matchResposta = filtroResposta === 'todas' || 
      (filtroResposta === 'respondidas' && avaliacao.respondida) ||
      (filtroResposta === 'pendentes' && !avaliacao.respondida);
    
    return matchBusca && matchNota && matchResposta;
  });

  const columns: TableColumn<Avaliacao>[] = [
    {
      key: 'clienteNome',
      label: 'Cliente',
      sortable: true,
      render: (nome, avaliacao) => (
        <div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">{nome}</span>
          </div>
          <p className="text-sm text-gray-500">{avaliacao.pedidoId}</p>
        </div>
      )
    },
    {
      key: 'nota',
      label: 'Avaliação',
      render: (nota) => (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= nota 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">
            {nota}/5
          </span>
        </div>
      )
    },
    {
      key: 'comentario',
      label: 'Comentário',
      render: (comentario) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-900 line-clamp-2">
            {comentario}
          </p>
        </div>
      )
    },
    {
      key: 'data',
      label: 'Data',
      sortable: true,
      render: (data) => (
        <div className="text-sm text-gray-600">
          <p>{data.toLocaleDateString('pt-BR')}</p>
          <p>{data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      )
    },
    {
      key: 'respondida',
      label: 'Status',
      render: (respondida) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          respondida 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {respondida ? 'Respondida' : 'Pendente'}
        </span>
      )
    },
    {
      key: 'id',
      label: 'Ações',
      render: (_, avaliacao) => (
        <TableActions
          onView={() => setAvaliacaoSelecionada(avaliacao)}
          customActions={[
            ...(avaliacao.respondida ? [] : [
              {
                label: 'Responder',
                onClick: () => setAvaliacaoSelecionada(avaliacao),
                icon: Reply
              }
            ]),
            {
              label: 'Denunciar',
              onClick: () => console.log('Denunciar', avaliacao.id),
              icon: Flag
            }
          ]}
        />
      )
    }
  ];

  // Estatísticas
  const mediaGeral = avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length;
  const totalAvaliacoes = avaliacoes.length;
  const avaliacoesPositivas = avaliacoes.filter(av => av.nota >= 4).length;
  const avaliacoesPendentes = avaliacoes.filter(av => !av.respondida).length;
  const distribuicaoNotas = [1, 2, 3, 4, 5].map(nota => ({
    nota,
    quantidade: avaliacoes.filter(av => av.nota === nota).length
  }));

  return (
    <div className="p-4 space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-gray-900">Avaliações</h1>
            <p className="text-gray-600 mt-1">
              Gerencie feedback e comentários dos clientes
            </p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
                          <p className="text-base font-bold text-gray-900">
              {mediaGeral.toFixed(1)}
            </p>
            </div>
            <p className="text-sm text-gray-600">Média Geral</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900">{totalAvaliacoes}</p>
            <p className="text-sm text-gray-600">Total de Avaliações</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-base font-bold text-gray-600">
              {Math.round((avaliacoesPositivas / totalAvaliacoes) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Avaliações Positivas</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-base font-bold text-gray-600">{avaliacoesPendentes}</p>
            <p className="text-sm text-gray-600">Pendentes de Resposta</p>
          </div>
        </Card>
      </div>

      {/* Distribuição de Notas */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Distribuição de Notas
          </h3>
          <div className="space-y-3">
            {distribuicaoNotas.reverse().map(({ nota, quantidade }) => {
              const porcentagem = totalAvaliacoes > 0 ? (quantidade / totalAvaliacoes) * 100 : 0;
              return (
                <div key={nota} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{nota}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${porcentagem}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm text-gray-600">
                      {quantidade} ({porcentagem.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        {/* Filtro por Nota */}
        <div className="flex gap-2">
          <button
            onClick={() => setFiltroNota('todas')}
            className={`btn text-sm ${
              filtroNota === 'todas'
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
          >
            Todas
          </button>
          {[5, 4, 3, 2, 1].map((nota) => (
            <button
              key={nota}
              onClick={() => setFiltroNota(nota)}
              className={`btn text-sm flex items-center gap-1 ${
                filtroNota === nota
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {nota} <Star className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Filtro por Resposta */}
        <div className="flex gap-2">
          {(['todas', 'respondidas', 'pendentes'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFiltroResposta(status)}
              className={`btn text-sm ${
                filtroResposta === status
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Busca */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, pedido ou comentário..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full pl-10 pr-4 h-[38px] border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
      </Card>

      {/* Tabela */}
      <Table
        data={avaliacoesFiltradas}
        columns={columns}
        emptyMessage="Nenhuma avaliação encontrada"
      />

      {/* Modal de Detalhes/Resposta */}
      {avaliacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Avaliação - {avaliacaoSelecionada.pedidoId}
                </h3>
                <button
                  onClick={() => setAvaliacaoSelecionada(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Informações do Cliente */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <User className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {avaliacaoSelecionada.clienteNome}
                    </p>
                    <p className="text-sm text-gray-600">
                      {avaliacaoSelecionada.data.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Avaliação */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= avaliacaoSelecionada.nota 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-700">
                      {avaliacaoSelecionada.nota}/5
                    </span>
                  </div>
                  <p className="text-gray-900 leading-relaxed">
                    {avaliacaoSelecionada.comentario}
                  </p>
                </div>

                {/* Resposta Existente */}
                {avaliacaoSelecionada.respondida && avaliacaoSelecionada.resposta && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Reply className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Sua Resposta</span>
                      <span className="text-sm text-blue-600">
                        {avaliacaoSelecionada.dataResposta?.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-blue-900">{avaliacaoSelecionada.resposta}</p>
                  </div>
                )}

                {/* Formulário de Resposta */}
                {!avaliacaoSelecionada.respondida && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sua Resposta
                    </label>
                    <textarea
                      value={respostaTexto}
                      onChange={(e) => setRespostaTexto(e.target.value)}
                      placeholder="Digite sua resposta para o cliente..."
                      rows={4}
                      className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          if (respostaTexto.trim()) {
                            handleResponder(avaliacaoSelecionada.id, respostaTexto.trim());
                          }
                        }}
                        disabled={!respostaTexto.trim()}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Enviar Resposta
                      </button>
                      <button
                        onClick={() => {
                          setAvaliacaoSelecionada(null);
                          setRespostaTexto('');
                        }}
                        className="btn btn-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}