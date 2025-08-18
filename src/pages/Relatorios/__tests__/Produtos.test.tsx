import React from 'react';
import { render, screen } from '@testing-library/react';
import { RelatoriosProdutos } from '../Produtos';

// Mock dos contextos necessários
jest.mock('../../context/notificationContextUtils', () => ({
  useNotificationContext: () => ({
    notifications: [],
    showSuccess: jest.fn(),
    showError: jest.fn(),
    removeNotification: jest.fn()
  })
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

describe('RelatoriosProdutos', () => {
  it('deve renderizar o título da página', () => {
    render(<RelatoriosProdutos />);
    expect(screen.getByText('Relatório de Produtos')).toBeInTheDocument();
  });

  it('deve renderizar as estatísticas de produtos', () => {
    render(<RelatoriosProdutos />);
    expect(screen.getByText('Total de Produtos')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
  });

  it('deve renderizar a distribuição por categoria', () => {
    render(<RelatoriosProdutos />);
    expect(screen.getByText('Distribuição por Categoria')).toBeInTheDocument();
  });
});
