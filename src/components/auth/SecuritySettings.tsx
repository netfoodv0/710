import React, { useState } from 'react';
import { Shield, Key, User, Store, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { MigrationUtils } from '../../utils/migrationUtils';

export const SecuritySettings: React.FC = () => {
  const { user, loja, isAuthenticated } = useAuth();
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string>('');

  const handleRunMigration = async () => {
    if (!isAuthenticated) {
      alert('Você precisa estar autenticado para executar a migração');
      return;
    }

    setIsMigrating(true);
    setMigrationStatus('Iniciando migração...');

    try {
      await MigrationUtils.runAllMigrations();
      setMigrationStatus('Migração concluída com sucesso!');
    } catch (error) {
      console.error('Erro na migração:', error);
      setMigrationStatus(`Erro na migração: ${error}`);
    } finally {
      setIsMigrating(false);
    }
  };

  const handleCheckMigration = async () => {
    try {
      const results = await MigrationUtils.checkMissingLojaId();
      const totalMissing = Object.values(results).reduce((sum, count) => sum + count, 0);
      
      if (totalMissing > 0) {
        setMigrationStatus(`Encontrados ${totalMissing} documentos sem lojaId que precisam ser migrados`);
      } else {
        setMigrationStatus('Todos os documentos já possuem lojaId');
      }
    } catch (error) {
      setMigrationStatus(`Erro ao verificar: ${error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Configurações de Segurança</h2>
              <p className="text-slate-600">Gerencie a segurança e isolamento de dados da sua loja</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status da Autenticação */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Status da Autenticação
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Usuário:</span>
                <span className="font-medium">{user?.email || 'Não autenticado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Loja:</span>
                <span className="font-medium">{loja?.nomeLoja || 'Não configurada'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className={`font-medium ${
                  isAuthenticated ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isAuthenticated ? 'Autenticado' : 'Não autenticado'}
                </span>
              </div>
            </div>
          </div>

          {/* Informações da Loja */}
          {loja && (
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <Store className="w-4 h-4" />
                Informações da Loja
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">ID da Loja:</span>
                  <span className="font-mono text-sm">{loja.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Segmento:</span>
                  <span className="font-medium">{loja.segmento}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <span className={`font-medium ${
                    loja.ativa ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {loja.ativa ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Migração de Dados */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Migração de Dados
            </h3>
            <p className="text-amber-800 mb-4">
              Se você tem dados existentes sem o campo lojaId, execute a migração para garantir 
              o isolamento completo dos dados por usuário.
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleCheckMigration}
                  disabled={isMigrating}
                  className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50"
                >
                  Verificar Migração
                </button>
                
                <button
                  onClick={handleRunMigration}
                  disabled={isMigrating}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isMigrating ? 'Migrando...' : 'Executar Migração'}
                </button>
              </div>
              
              {migrationStatus && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <p className="text-sm">{migrationStatus}</p>
                </div>
              )}
            </div>
          </div>

          {/* Regras de Segurança */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-3 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Regras de Segurança Ativas
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Isolamento completo de dados por loja</li>
              <li>• Validação de propriedade em todas as operações</li>
              <li>• Regras do Firestore configuradas</li>
              <li>• Autenticação obrigatória para todas as operações</li>
              <li>• Sanitização de dados antes do envio</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 