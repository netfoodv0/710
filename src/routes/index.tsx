import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Dashboard,
  Pedidos,
  HistoricoPedidos,
  Cardapio,
  Promocoes,
  Relatorios,
  Avaliacoes,
  Configuracoes
} from '../pages';
import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      {/* Rotas protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/pedidos" element={
        <ProtectedRoute>
          <Pedidos />
        </ProtectedRoute>
      } />
      
      <Route path="/historico" element={
        <ProtectedRoute>
          <HistoricoPedidos />
        </ProtectedRoute>
      } />
      
      <Route path="/cardapio" element={
        <ProtectedRoute>
          <Cardapio />
        </ProtectedRoute>
      } />
      
      <Route path="/promocoes" element={
        <ProtectedRoute>
          <Promocoes />
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios" element={
        <ProtectedRoute>
          <Relatorios />
        </ProtectedRoute>
      } />
      
      <Route path="/avaliacoes" element={
        <ProtectedRoute>
          <Avaliacoes />
        </ProtectedRoute>
      } />
      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <Configuracoes />
        </ProtectedRoute>
      } />
      
      {/* Rota 404 - redireciona para dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}