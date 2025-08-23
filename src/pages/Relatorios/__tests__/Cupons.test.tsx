import React from 'react';
import { render, screen } from '@testing-library/react';
import { RelatoriosCupons } from '../Cupons';

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

describe('RelatoriosCupons', () => {
  it('deve renderizar o título da página', () => {
    render(<RelatoriosCupons />);
    expect(screen.getByText('Relatório de Cupons')).toBeInTheDocument();
  });

  it('deve renderizar as estatísticas de cupons', () => {
    render(<RelatoriosCupons />);
    expect(screen.getByText('Total de Cupons')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('deve renderizar a distribuição por categoria', () => {
    render(<RelatoriosCupons />);
    expect(screen.getByText('Distribuição por Categoria')).toBeInTheDocument();
  });
});
