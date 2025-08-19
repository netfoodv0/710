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
const Cupons = lazy(() => import('../pages/Cupons').then(module => ({ default: module.Cupons })));
const Atendimento = lazy(() => import('../pages/Atendimento').then(module => ({ default: module.Atendimento })));
const Configuracoes = lazy(() => import('../pages/Configuracoes').then(module => ({ default: module.Configuracoes })));
const Horarios = lazy(() => import('../pages/Horarios/Horarios').then(module => ({ default: module.Horarios })));

const Relatorios = lazy(() => import('../pages/Relatorios').then(module => ({ default: module.Relatorios })));
const RelatoriosClientes = lazy(() => import('../pages/Relatorios/Clientes').then(module => ({ default: module.RelatoriosClientes })));
const RelatoriosProdutos = lazy(() => import('../pages/Relatorios/Produtos').then(module => ({ default: module.RelatoriosProdutos })));
const Mapa = lazy(() => import('../pages/Mapa').then(module => ({ default: module.Mapa })));

const Login = lazy(() => import('../pages/Login').then(module => ({ default: module.Login })));
const Cadastro = lazy(() => import('../pages/Cadastro').then(module => ({ default: module.Cadastro })));

// Componente de fallback otimizado
const RouteFallback = ({ type = 'historico' }: { type?: string }) => <SkeletonLoading type={type as any} />;

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={
        <Suspense fallback={<RouteFallback />}>
          <Login />
        </Suspense>
      } />
      <Route path="/cadastro" element={
        <Suspense fallback={<RouteFallback />}>
          <Cadastro />
        </Suspense>
      } />
      
      {/* Rotas protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Dashboard />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Dashboard />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/pedidos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
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
            <Suspense fallback={<RouteFallback />}>
              <CadastroProduto />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio/editar-produto/:id" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <CadastroProduto />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Cardapio />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/cupons" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Cupons />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/atendimento" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Atendimento />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Configuracoes />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/horarios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Horarios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Relatorios />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/relatorios/clientes" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <RelatoriosClientes />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/relatorios/produtos" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <RelatoriosProdutos />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />

       <Route path="/mapa" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Suspense fallback={<RouteFallback />}>
              <Mapa />
            </Suspense>
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      

      
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