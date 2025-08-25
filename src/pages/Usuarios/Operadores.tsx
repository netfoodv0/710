import React, { useState, useMemo } from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PageHeader, DataTable, DataTableColumn } from '../../components/ui';
import { ModalCriarUsuario } from '../../components/modals';

// Dados fictícios de operadores para a tabela
const operadoresFicticios = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@restaurante.com',
    telefone: '(11) 99999-1111',
    cargo: 'Gerente',
    status: 'ativo',
    dataAdmissao: '2023-01-15',
    ultimoAcesso: '2024-01-20',
    permissoes: ['pedidos', 'estoque', 'relatorios']
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@restaurante.com',
    telefone: '(11) 88888-2222',
    cargo: 'Atendente',
    status: 'ativo',
    dataAdmissao: '2023-03-10',
    ultimoAcesso: '2024-01-19',
    permissoes: ['pedidos', 'atendimento']
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    email: 'pedro.oliveira@restaurante.com',
    telefone: '(11) 77777-3333',
    cargo: 'Cozinheiro',
    status: 'ativo',
    dataAdmissao: '2023-06-05',
    ultimoAcesso: '2024-01-18',
    permissoes: ['cardapio', 'estoque']
  },
  {
    id: 4,
    nome: 'Ana Costa',
    email: 'ana.costa@restaurante.com',
    telefone: '(11) 66666-4444',
    cargo: 'Atendente',
    status: 'inativo',
    dataAdmissao: '2023-08-20',
    ultimoAcesso: '2023-12-15',
    permissoes: ['pedidos']
  },
  {
    id: 5,
    nome: 'Carlos Ferreira',
    email: 'carlos.ferreira@restaurante.com',
    telefone: '(11) 55555-5555',
    cargo: 'Supervisor',
    status: 'ativo',
    dataAdmissao: '2022-11-10',
    ultimoAcesso: '2024-01-21',
    permissoes: ['pedidos', 'estoque', 'relatorios', 'usuarios']
  },
  {
    id: 6,
    nome: 'Fernanda Lima',
    email: 'fernanda.lima@restaurante.com',
    telefone: '(11) 44444-6666',
    cargo: 'Atendente',
    status: 'ativo',
    dataAdmissao: '2023-09-12',
    ultimoAcesso: '2024-01-22',
    permissoes: ['pedidos', 'atendimento', 'cupons']
  },
  {
    id: 7,
    nome: 'Roberto Almeida',
    email: 'roberto.almeida@restaurante.com',
    telefone: '(11) 33333-7777',
    cargo: 'Cozinheiro',
    status: 'ativo',
    dataAdmissao: '2023-04-18',
    ultimoAcesso: '2024-01-21',
    permissoes: ['cardapio', 'estoque', 'pedidos']
  },
  {
    id: 8,
    nome: 'Juliana Pereira',
    email: 'juliana.pereira@restaurante.com',
    telefone: '(11) 22222-8888',
    cargo: 'Supervisor',
    status: 'ativo',
    dataAdmissao: '2022-07-25',
    ultimoAcesso: '2024-01-20',
    permissoes: ['pedidos', 'estoque', 'relatorios', 'usuarios', 'configuracoes']
  },
  {
    id: 9,
    nome: 'Lucas Mendes',
    email: 'lucas.mendes@restaurante.com',
    telefone: '(11) 11111-9999',
    cargo: 'Atendente',
    status: 'inativo',
    dataAdmissao: '2023-02-14',
    ultimoAcesso: '2023-11-30',
    permissoes: ['pedidos']
  },
  {
    id: 10,
    nome: 'Camila Rocha',
    email: 'camila.rocha@restaurante.com',
    telefone: '(11) 00000-0000',
    cargo: 'Gerente',
    status: 'ativo',
    dataAdmissao: '2021-12-01',
    ultimoAcesso: '2024-01-22',
    permissoes: ['pedidos', 'estoque', 'relatorios', 'usuarios', 'configuracoes', 'financeiro']
  },
  {
    id: 11,
    nome: 'Diego Souza',
    email: 'diego.souza@restaurante.com',
    telefone: '(11) 12345-6789',
    cargo: 'Cozinheiro',
    status: 'ativo',
    dataAdmissao: '2023-10-05',
    ultimoAcesso: '2024-01-19',
    permissoes: ['cardapio', 'estoque', 'pedidos']
  },
  {
    id: 12,
    nome: 'Patrícia Costa',
    email: 'patricia.costa@restaurante.com',
    telefone: '(11) 98765-4321',
    cargo: 'Atendente',
    status: 'ativo',
    dataAdmissao: '2023-05-20',
    ultimoAcesso: '2024-01-21',
    permissoes: ['pedidos', 'atendimento', 'cupons', 'fidelidade']
  },
  {
    id: 13,
    nome: 'Rafael Santos',
    email: 'rafael.santos@restaurante.com',
    telefone: '(11) 55555-1234',
    cargo: 'Supervisor',
    status: 'ativo',
    dataAdmissao: '2022-09-15',
    ultimoAcesso: '2024-01-18',
    permissoes: ['pedidos', 'estoque', 'relatorios', 'usuarios']
  },
  {
    id: 14,
    nome: 'Amanda Silva',
    email: 'amanda.silva@restaurante.com',
    telefone: '(11) 44444-5678',
    cargo: 'Atendente',
    status: 'inativo',
    dataAdmissao: '2023-07-08',
    ultimoAcesso: '2023-10-25',
    permissoes: ['pedidos', 'atendimento']
  },
  {
    id: 15,
    nome: 'Thiago Oliveira',
    email: 'thiago.oliveira@restaurante.com',
    telefone: '(11) 33333-9012',
    cargo: 'Cozinheiro',
    status: 'ativo',
    dataAdmissao: '2023-01-30',
    ultimoAcesso: '2024-01-22',
    permissoes: ['cardapio', 'estoque', 'pedidos']
  }
];

export default function Operadores() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funções auxiliares para a tabela
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    return status === 'ativo' 
      ? 'bg-purple-100 text-purple-800'
      : 'bg-gray-100 text-gray-800';
  };

  const getCargoColor = (cargo: string) => {
    const cargoColors: { [key: string]: string } = {
      'Administrador': { color: 'bg-purple-100 text-purple-800' },
      'Supervisor': { color: 'bg-purple-100 text-purple-800' },
      'Atendente': { color: 'bg-purple-100 text-purple-800' },
      'Cozinheiro': { color: 'bg-purple-100 text-purple-800' }
    };
    
    return cargoColors[cargo] || { color: 'bg-gray-100 text-gray-800' };
  };

  const getPermissoesBadge = (permissoes: string[]) => {
    return (
      <div className="flex flex-wrap gap-1">
        {permissoes.map((permissao, index) => (
          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            {permissao}
          </span>
        ))}
      </div>
    );
  };

  // Definir colunas da tabela
  const columns: DataTableColumn<typeof operadoresFicticios[0]>[] = [
    {
      key: 'nome',
      label: 'Operador',
      sortable: true,
      render: (operador) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-gray-600">
              {operador.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{operador.nome}</div>
            <div className="text-xs text-gray-500">{operador.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'cargo',
      label: 'Cargo',
      sortable: true,
      render: (operador) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCargoColor(operador.cargo).color}`}>
          {operador.cargo}
        </span>
      )
    },
    {
      key: 'telefone',
      label: 'Telefone',
      sortable: false,
      render: (operador) => (
        <div className="text-sm text-gray-900">{operador.telefone}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (operador) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(operador.status)}`}>
          {operador.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </span>
      )
    },
    {
      key: 'dataAdmissao',
      label: 'Data Admissão',
      sortable: true,
      render: (operador) => formatDate(operador.dataAdmissao)
    },
    {
      key: 'ultimoAcesso',
      label: 'Último Acesso',
      sortable: true,
      render: (operador) => formatDate(operador.ultimoAcesso)
    },
    {
      key: 'permissoes',
      label: 'Permissões',
      sortable: false,
      render: (operador) => getPermissoesBadge(operador.permissoes)
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false
    }
  ];

  // Cargos únicos para filtros
  const cargos = useMemo(() => {
    const cargosUnicos = [...new Set(operadoresFicticios.map(o => o.cargo))];
    return cargosUnicos.map(cargo => ({ value: cargo, label: cargo }));
  }, []);

  // Status únicos para filtros
  const statusOptions = useMemo(() => {
    const status = [...new Set(operadoresFicticios.map(o => o.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, []);

  const handleCriarUsuario = (usuarioData: any) => {
    console.log('Novo usuário criado:', usuarioData);
    // Aqui você implementaria a lógica para salvar o usuário
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dashboard">
        {/* Cabeçalho da página */}
        <PageHeader
          title="Operadores"
          subtitle="Gerencie os operadores do sistema"
          actionButton={{
            label: "Novo Operador",
            onClick: () => setIsModalOpen(true),
            variant: "primary",
            size: "md"
          }}
        />

        {/* Main Content */}
        <div className="px-6 pt-6">
          {/* Tabela de Operadores */}
          <DataTable
            data={operadoresFicticios}
            columns={columns}
            searchPlaceholder="Buscar operadores..."
            searchFields={['nome', 'email', 'cargo']}
            filters={{
              categories: cargos,
              statuses: statusOptions,
              showDateRange: true
            }}
            actions={{
              onView: (operador) => console.log('Visualizar:', operador),
              onEdit: (operador) => console.log('Editar:', operador)
            }}
            pagination={{
              itemsPerPageOptions: [5, 8, 10, 15, 20],
              defaultItemsPerPage: 8
            }}
            onAdd={() => setIsModalOpen(true)}
            addButtonText="Novo Operador"
          />
          
          {/* Margem inferior da página */}
          <div className="h-6"></div>
        </div>

        {/* Modal Criar Usuário */}
        <ModalCriarUsuario
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCriarUsuario}
          tipoUsuario="operador"
        />
      </div>
    </ErrorBoundary>
  );
}
