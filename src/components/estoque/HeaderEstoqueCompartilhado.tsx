import React from 'react';
import { PageHeader } from '../../components/ui';
import NavigationToggle from '../ui/NavigationToggle';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderEstoqueCompartilhadoProps {
  actionButton?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: string;
    size?: string;
  };
}

export const HeaderEstoqueCompartilhado: React.FC<HeaderEstoqueCompartilhadoProps> = ({
  actionButton
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determinar qual opção está ativa baseado na rota atual
  const getActiveEstoqueType = () => {
    if (location.pathname.includes('/insumos')) return 'insumos';
    if (location.pathname.includes('/acompanhamentos')) return 'acompanhamentos';
    return 'estoque';
  };

  const [selectedEstoqueType, setSelectedEstoqueType] = React.useState<string>(getActiveEstoqueType());
  
  // Opções para o componente Radio (tipos de estoque)
  const estoqueTypeOptions = [
    { id: 'estoque', label: 'Produtos' },
    { id: 'insumos', label: 'Insumos' },
    { id: 'acompanhamentos', label: 'Acompanhamentos' }
  ];

  const handleEstoqueTypeChange = React.useCallback((estoqueType: string) => {
    setSelectedEstoqueType(estoqueType);
    
    // Navegar para a página correspondente
    switch (estoqueType) {
      case 'estoque':
        navigate('/estoque');
        break;
      case 'insumos':
        navigate('/estoque/insumos');
        break;
      case 'acompanhamentos':
        navigate('/estoque/acompanhamentos');
        break;
      default:
        navigate('/estoque');
    }
  }, [navigate]);

  // Atualizar o tipo selecionado quando a rota mudar
  React.useEffect(() => {
    setSelectedEstoqueType(getActiveEstoqueType());
  }, [location.pathname]);

  return (
    <PageHeader
      title=""
      subtitle=""
      leftContent={
        <div className="flex items-center gap-2">
          <NavigationToggle
            options={estoqueTypeOptions}
            name="estoqueType"
            defaultValue={selectedEstoqueType}
            onChange={handleEstoqueTypeChange}
            size="small"
            color="#8b5cf6"
            backgroundColor="#f3f4f6"
          />
        </div>
      }
      actionButton={actionButton}
    />
  );
};
