import React from 'react';
import { PageHeader } from './PageHeader';
import { Plus, Download, Trash2, Edit } from 'lucide-react';

// Exemplo 1: Cabeçalho simples com título e subtítulo
export function ExemploCabeçalhoSimples() {
  return (
    <PageHeader
      title="Dashboard"
      subtitle="Visão geral do seu negócio"
    />
  );
}

// Exemplo 2: Cabeçalho com botão de ação primário
export function ExemploCabeçalhoComBotao() {
  const handleNovaOrdem = () => {
    console.log('Nova ordem criada');
  };

  return (
    <PageHeader
      title="Pedidos"
      subtitle="Gerencie os pedidos do seu restaurante"
      actionButton={{
        label: "Nova Ordem",
        onClick: handleNovaOrdem,
        variant: "primary",
        size: "md"
      }}
    />
  );
}

// Exemplo 3: Cabeçalho com botão de sucesso
export function ExemploCabeçalhoComBotaoSucesso() {
  const handleSalvar = () => {
    console.log('Configurações salvas');
  };

  return (
    <PageHeader
      title="Configurações"
      subtitle="Personalize seu restaurante"
      actionButton={{
        label: "Salvar Alterações",
        onClick: handleSalvar,
        variant: "success",
        size: "lg"
      }}
    />
  );
}

// Exemplo 4: Cabeçalho com botão de perigo
export function ExemploCabeçalhoComBotaoPerigo() {
  const handleExcluir = () => {
    console.log('Item excluído');
  };

  return (
    <PageHeader
      title="Gerenciar Produtos"
      subtitle="Adicione, edite ou remova produtos"
      actionButton={{
        label: "Excluir Selecionados",
        onClick: handleExcluir,
        variant: "danger",
        size: "sm"
      }}
    />
  );
}

// Exemplo 5: Cabeçalho com botão de carregamento
export function ExemploCabeçalhoComCarregamento() {
  const [salvando, setSalvando] = React.useState(false);

  const handleSalvar = async () => {
    setSalvando(true);
    // Simula uma operação assíncrona
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSalvando(false);
  };

  return (
    <PageHeader
      title="Relatórios"
      subtitle="Exporte dados do seu negócio"
      actionButton={{
        label: "Exportar PDF",
        onClick: handleSalvar,
        loading: salvando,
        variant: "secondary",
        size: "md"
      }}
    />
  );
}

// Exemplo 6: Cabeçalho com conteúdo personalizado
export function ExemploCabeçalhoPersonalizado() {
  const handleEditar = () => {
    console.log('Editando perfil');
  };

  return (
    <PageHeader
      title="Perfil do Usuário"
      leftContent={
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">U</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-gray-900">João Silva</h1>
            <p className="text-sm text-gray-600">joao@email.com</p>
          </div>
        </div>
      }
      rightContent={
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Edit className="w-5 h-5" />
        </button>
      }
      actionButton={{
        label: "Editar Perfil",
        onClick: handleEditar,
        variant: "primary",
        size: "md"
      }}
    />
  );
}

// Exemplo 7: Cabeçalho não fixo
export function ExemploCabeçalhoNaoFixo() {
  return (
    <PageHeader
      title="Página Interna"
      subtitle="Esta página não tem cabeçalho fixo"
      sticky={false}
    />
  );
}

// Exemplo 8: Cabeçalho com classe personalizada
export function ExemploCabeçalhoComClassePersonalizada() {
  return (
    <PageHeader
      title="Tema Escuro"
      subtitle="Configurações de aparência"
      className="bg-gray-800 text-white border-gray-700"
      actionButton={{
        label: "Aplicar Tema",
        onClick: () => console.log('Tema aplicado'),
        variant: "primary",
        size: "md"
      }}
    />
  );
}
