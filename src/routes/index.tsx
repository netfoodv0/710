import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, LojaProtectedRoute } from '../components/auth';

// Importação estática para OrganogramaPage para resolver problema de 404
import OrganogramaPage from '../pages/OrganogramaPage';
import LandingPage from '../pages/LandingPage';

// Lazy loading das páginas para melhor performance
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Pedidos = lazy(() => import('../pages/Pedidos'));
const HistoricoPedidos = lazy(() => import('../pages/HistoricoPedidos'));
const Cardapio = lazy(() => import('../pages/Cardapio'));
const CadastroProduto = lazy(() => import('../pages/CadastroProduto'));

const Atendimento = lazy(() => import('../pages/Atendimento'));
const Configuracoes = lazy(() => import('../pages/Configuracoes'));
const Horarios = lazy(() => import('../pages/Horarios/Horarios'));

const Relatorios = lazy(() => import('../pages/Relatorios'));
const RelatoriosClientes = lazy(() => import('../pages/Relatorios/Clientes'));
const RelatoriosProdutos = lazy(() => import('../pages/Relatorios/Produtos'));
const RelatoriosCupons = lazy(() => import('../pages/Relatorios/Cupons'));
const Fidelidade = lazy(() => import('../pages/Fidelidade'));
const Usuarios = lazy(() => import('../pages/Usuarios'));
const Operadores = lazy(() => import('../pages/Usuarios/Operadores'));
const Motoboys = lazy(() => import('../pages/Usuarios/Motoboys'));
const Mapa = lazy(() => import('../pages/Mapa'));
const Estoque = lazy(() => import('../pages/Estoque/Estoque'));
const Insumos = lazy(() => import('../pages/Estoque/Insumos'));
const Acompanhamentos = lazy(() => import('../pages/Estoque/Acompanhamentos'));

const Login = lazy(() => import('../pages/Login'));
const Cadastro = lazy(() => import('../pages/Cadastro'));

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      {/* Rotas protegidas */}
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Dashboard />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/pedidos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Pedidos />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/historico" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <HistoricoPedidos />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio/novo-produto" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <CadastroProduto />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio/editar-produto/:id" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <CadastroProduto />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Cardapio />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/atendimento" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Atendimento />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Configuracoes />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/horarios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Horarios />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios/geral" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Relatorios />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios/clientes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <RelatoriosClientes />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios/produtos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <RelatoriosProdutos />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cupons" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <RelatoriosCupons />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/fidelidade" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Fidelidade />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Usuarios />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios/operadores" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Operadores />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios/motoboys" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Motoboys />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      {/* Redirecionamento da rota antiga */}
      <Route path="/relatorios" element={<Navigate to="/relatorios/geral" replace />} />

       <Route path="/mapa" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Mapa />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/organograma" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <OrganogramaPage />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/estoque/produtos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Estoque />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/estoque/insumos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Insumos />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/estoque/acompanhamentos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Acompanhamentos />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      {/* Redirecionamento da rota antiga */}
      <Route path="/estoque" element={<Navigate to="/estoque/produtos" replace />} />
      <Route path="/acompanhamentos" element={<Navigate to="/estoque/acompanhamentos" replace />} />
      
      {/* Rota 404 - redireciona para dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}