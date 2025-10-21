import { CardapioProvider } from '../../context/CardapioContext';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Componentes
import { CardapioLayout } from './components/CardapioLayout';

export default function Cardapio() {
  return (
    <ErrorBoundary>
      <CardapioProvider>
        <CardapioLayout />
      </CardapioProvider>
    </ErrorBoundary>
  );
}

