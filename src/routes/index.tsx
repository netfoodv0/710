import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SkeletonLoading } from '../components/skeletons/SkeletonLoading';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LojaProtectedRoute } from '../components/auth/LojaProtectedRoute';
import { LoadingTest } from '../components/LoadingTest';

// Lazy loading das páginas para melhor performance
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Pedidos = lazy(() => import('../pages/Pedidos').then(module => ({ default: module.Pedidos })));
const HistoricoPedidos = lazy(() => import('../pages/HistoricoPedidos').then(module => ({ default: module.HistoricoPedidos })));
const Cardapio = lazy(() => import('../pages/Cardapio').then(module => ({ default: module.Cardapio })));
const CadastroProduto = lazy(() => import('../pages/CadastroProduto').then(module => ({ default: module.CadastroProduto })));

const Atendimento = lazy(() => import('../pages/Atendimento').then(module => ({ default: module.Atendimento })));
const Configuracoes = lazy(() => import('../pages/Configuracoes').then(module => ({ default: module.Configuracoes })));
const Horarios = lazy(() => import('../pages/Horarios/Horarios').then(module => ({ default: module.Horarios })));

const Relatorios = lazy(() => import('../pages/Relatorios').then(module => ({ default: module.Relatorios })));
const RelatoriosClientes = lazy(() => import('../pages/Relatorios/Clientes').then(module => ({ default: module.RelatoriosClientes })));
const RelatoriosProdutos = lazy(() => import('../pages/Relatorios/Produtos').then(module => ({ default: module.RelatoriosProdutos })));
const RelatoriosCupons = lazy(() => import('../pages/Relatorios/Cupons').then(module => ({ default: module.RelatoriosCupons })));
const Fidelidade = lazy(() => import('../pages/Fidelidade'));
const Usuarios = lazy(() => import('../pages/Usuarios').then(module => ({ default: module.Usuarios })));
const Operadores = lazy(() => import('../pages/Usuarios/Operadores').then(module => ({ default: module.Operadores })));
const Motoboys = lazy(() => import('../pages/Usuarios/Motoboys').then(module => ({ default: module.Motoboys })));
const Mapa = lazy(() => import('../pages/Mapa').then(module => ({ default: module.Mapa })));
const Estoque = lazy(() => import('../pages/Estoque/Estoque').then(module => ({ default: module.Estoque })));
const Insumos = lazy(() => import('../pages/Estoque/Insumos').then(module => ({ default: module.Insumos })));
const Acompanhamentos = lazy(() => import('../pages/Estoque/Acompanhamentos'));

const Login = lazy(() => import('../pages/Login').then(module => ({ default: module.Login })));
const Cadastro = lazy(() => import('../pages/Cadastro').then(module => ({ default: module.Cadastro })));

// Componente de fallback otimizado
const RouteFallback = ({ type = 'cards' }: { type?: string }) => <SkeletonLoading type={type as any} />;

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={
        <Suspense fallback={<RouteFallback type="cards" />}>
          <Login />
        </Suspense>
      } />
      <Route path="/cadastro" element={
        <Suspense fallback={<RouteFallback type="cards" />}>
          <Cadastro />
        </Suspense>
      } />
      
      {/* Rotas protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="stats" />}>
              <Dashboard />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="stats" />}>
              <Dashboard />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/pedidos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="pedidos" />}>
              <Pedidos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/historico" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="historico" />}>
              <HistoricoPedidos />
            </Suspense>
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
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Atendimento />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Configuracoes />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/horarios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Horarios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios/geral" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="stats" />}>
              <Relatorios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/relatorios/clientes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="stats" />}>
              <RelatoriosClientes />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/relatorios/produtos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="stats" />}>
              <RelatoriosProdutos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/cupons" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="stats" />}>
              <RelatoriosCupons />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/fidelidade" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Fidelidade />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Usuarios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios/operadores" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Operadores />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/usuarios/motoboys" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
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
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Mapa />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/estoque/produtos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Estoque />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/estoque/insumos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Insumos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/estoque/acompanhamentos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback type="cards" />}>
              <Acompanhamentos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      {/* Redirecionamento da rota antiga */}
      <Route path="/estoque" element={<Navigate to="/estoque/produtos" replace />} />
      <Route path="/acompanhamentos" element={<Navigate to="/estoque/acompanhamentos" replace />} />
      

      
      {/* Rota de teste para o sistema de carregamento */}
      <Route path="/loading-test" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <LoadingTest />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      {/* Rota 404 - redireciona para dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}