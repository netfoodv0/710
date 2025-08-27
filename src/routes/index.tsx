import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, LojaProtectedRoute } from '../components/auth';
import { 
  RouteFallback, 
  DashboardFallback, 
  ChartsFallback, 
  TableFallback, 
  FormFallback 
} from '../components/ui/RouteFallback';

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
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      {/* Rotas protegidas */}
      
      <Route path="/" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<DashboardFallback />}>
              <Dashboard />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<DashboardFallback />}>
              <Dashboard />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/pedidos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Pedidos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/historico" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <HistoricoPedidos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio/novo-produto" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<FormFallback />}>
              <CadastroProduto />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio/editar-produto/:id" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<FormFallback />}>
              <CadastroProduto />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Cardapio />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/atendimento" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Atendimento />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      

      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<FormFallback />}>
              <Configuracoes />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/horarios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<FormFallback />}>
              <Horarios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios/geral" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<ChartsFallback />}>
              <Relatorios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios/clientes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<ChartsFallback />}>
              <RelatoriosClientes />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios/produtos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<ChartsFallback />}>
              <RelatoriosProdutos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cupons" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <RelatoriosCupons />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/fidelidade" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<ChartsFallback />}>
              <Fidelidade />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Usuarios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios/operadores" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Operadores />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios/motoboys" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Motoboys />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      {/* Redirecionamento da rota antiga */}
      <Route path="/relatorios" element={<Navigate to="/relatorios/geral" replace />} />

       <Route path="/mapa" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback message="Carregando mapa..." />}>
              <Mapa />
            </Suspense>
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
            <Suspense fallback={<TableFallback />}>
              <Estoque />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/estoque/insumos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Insumos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/estoque/acompanhamentos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<TableFallback />}>
              <Acompanhamentos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      {/* Redirecionamento da rota antiga */}
      <Route path="/estoque" element={<Navigate to="/estoque/produtos" replace />} />
      <Route path="/acompanhamentos" element={<Navigate to="/estoque/acompanhamentos" replace />} />
      
      {/* Rota 404 - redireciona para dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}