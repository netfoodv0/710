import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Dashboard,
  Pedidos,
  HistoricoPedidos,
  Cardapio,
  Configuracoes
} from '../pages';
import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LojaProtectedRoute } from '../components/auth/LojaProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      {/* Rotas protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Dashboard />
          </LojaProtectedRoute>
        </ProtectedRoute>
      } />
      
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
      
      <Route path="/cardapio" element={
        <ProtectedRoute>
          <LojaProtectedRoute>
            <Cardapio />
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
      
      {/* Rota 404 - redireciona para dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}