import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { HomeIcon } from '@/components/ui';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Ícone ou número 404 */}
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="text-9xl font-bold text-purple-600/20 leading-none">
              404
            </h1>
          </div>
        </div>

        {/* Mensagem principal */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleGoHome}
            variant="default"
            size="lg"
            className="min-w-[200px]"
          >
            <HomeIcon />
            Ir para o Dashboard
          </Button>
          
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            Voltar
          </Button>
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}


