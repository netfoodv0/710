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
  }
];

export function Operadores() {
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

  const getCargoBadge = (cargo: string) => {
    const cargoConfig = {
      'Gerente': { color: 'bg-purple-100 text-purple-800' },
      'Supervisor': { color: 'bg-blue-100 text-blue-800' },
      'Atendente': { color: 'bg-green-100 text-green-800' },
      'Cozinheiro': { color: 'bg-orange-100 text-orange-800' }
    };
    
    const config = cargoConfig[cargo as keyof typeof cargoConfig] || cargoConfig['Atendente'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {cargo}
      </span>
    );
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
      render: (operador) => getCargoBadge(operador.cargo)
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
      render: (operador) => getStatusBadge(operador.status)
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
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
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
