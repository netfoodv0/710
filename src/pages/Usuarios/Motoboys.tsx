import React, { useState, useMemo } from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PageHeader, DataTable, DataTableColumn } from '../../components/ui';
import { ModalCriarUsuario } from '../../components/modals';

// Dados fictícios de motoboys para a tabela
const motoboysFicticios = [
  {
    id: 1,
    nome: 'Roberto Alves',
    telefone: '(11) 99999-1111',
    status: 'ativo',
    dataContratacao: '2023-02-15',
    ultimaEntrega: '2024-01-20',
    avaliacao: 4.8,
    totalEntregas: 156
  },
  {
    id: 2,
    nome: 'Fernando Lima',
    telefone: '(11) 88888-2222',
    status: 'ativo',
    dataContratacao: '2023-04-10',
    ultimaEntrega: '2024-01-19',
    avaliacao: 4.6,
    totalEntregas: 89
  },
  {
    id: 3,
    nome: 'Lucas Santos',
    telefone: '(11) 77777-3333',
    status: 'ativo',
    dataContratacao: '2023-07-05',
    ultimaEntrega: '2024-01-18',
    avaliacao: 4.9,
    totalEntregas: 203
  },
  {
    id: 4,
    nome: 'Diego Costa',
    telefone: '(11) 66666-4444',
    status: 'inativo',
    dataContratacao: '2023-09-20',
    ultimaEntrega: '2023-12-15',
    avaliacao: 4.2,
    totalEntregas: 67
  },
  {
    id: 5,
    nome: 'Rafael Oliveira',
    telefone: '(11) 55555-5555',
    status: 'ativo',
    dataContratacao: '2022-12-10',
    ultimaEntrega: '2024-01-21',
    avaliacao: 4.7,
    totalEntregas: 312
  }
];

export function Motoboys() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funções auxiliares para a tabela
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR');
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

  const getAvaliacaoBadge = (avaliacao: number) => {
    let color = 'bg-gray-100 text-gray-800';
    if (avaliacao >= 4.5) color = 'bg-green-100 text-green-800';
    else if (avaliacao >= 4.0) color = 'bg-blue-100 text-blue-800';
    else if (avaliacao >= 3.5) color = 'bg-yellow-100 text-yellow-800';
    else color = 'bg-red-100 text-red-800';

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {avaliacao.toFixed(1)}
        <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
          <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
        </svg>
      </span>
    );
  };



  // Definir colunas da tabela
  const columns: DataTableColumn<typeof motoboysFicticios[0]>[] = [
    {
      key: 'nome',
      label: 'Motoboy',
      sortable: true,
      render: (motoboy) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-gray-600">
              {motoboy.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{motoboy.nome}</div>
            <div className="text-xs text-gray-500">{motoboy.telefone}</div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (motoboy) => getStatusBadge(motoboy.status)
    },
    {
      key: 'avaliacao',
      label: 'Avaliação',
      sortable: true,
      render: (motoboy) => getAvaliacaoBadge(motoboy.avaliacao)
    },
    {
      key: 'totalEntregas',
      label: 'Total Entregas',
      sortable: true,
      render: (motoboy) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">{motoboy.totalEntregas}</div>
        </div>
      )
    },
    {
      key: 'dataContratacao',
      label: 'Data Contratação',
      sortable: true,
      render: (motoboy) => formatDate(motoboy.dataContratacao)
    },
    {
      key: 'ultimaEntrega',
      label: 'Última Entrega',
      sortable: true,
      render: (motoboy) => formatDate(motoboy.ultimaEntrega)
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false
    }
  ];

  // Status únicos para filtros
  const statusOptions = useMemo(() => {
    const status = [...new Set(motoboysFicticios.map(m => m.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, []);

  // Avaliações para filtros
  const avaliacoes = useMemo(() => {
    return [
      { value: 'excelente', label: 'Excelente (4.5+)' },
      { value: 'bom', label: 'Bom (4.0-4.4)' },
      { value: 'regular', label: 'Regular (3.5-3.9)' },
      { value: 'ruim', label: 'Ruim (<3.5)' }
    ];
  }, []);

  const handleCriarUsuario = (usuarioData: any) => {
    console.log('Novo usuário criado:', usuarioData);
    // Aqui você implementaria a lógica para salvar o usuário
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Cabeçalho da página */}
        <PageHeader
          title="Motoboys"
          subtitle="Gerencie a equipe de motoboys"
          actionButton={{
            label: "Novo Motoboy",
            onClick: () => setIsModalOpen(true),
            variant: "primary",
            size: "md"
          }}
        />

        {/* Main Content */}
        <div className="px-6 pt-6">
          {/* Tabela de Motoboys */}
          <DataTable
            data={motoboysFicticios}
            columns={columns}
            searchPlaceholder="Buscar motoboys..."
            searchFields={['nome', 'telefone']}
            filters={{
              categories: avaliacoes,
              statuses: statusOptions,
              showDateRange: true
            }}
            actions={{
              onView: (motoboy) => console.log('Visualizar:', motoboy),
              onEdit: (motoboy) => console.log('Editar:', motoboy)
            }}
            pagination={{
              itemsPerPageOptions: [5, 8, 10, 15, 20],
              defaultItemsPerPage: 8
            }}
            onAdd={() => setIsModalOpen(true)}
            addButtonText="Novo Motoboy"
          />
          
          {/* Margem inferior da página */}
          <div className="h-6"></div>
        </div>

        {/* Modal Criar Usuário */}
        <ModalCriarUsuario
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCriarUsuario}
          tipoUsuario="motoboy"
        />
      </div>
    </ErrorBoundary>
  );
}
