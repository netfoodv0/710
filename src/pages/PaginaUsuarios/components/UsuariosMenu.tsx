import React from 'react';
import { Link } from 'react-router-dom';
import { UsuariosMenuProps } from '../types';

export function UsuariosMenu({ onNavigate }: UsuariosMenuProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card Operadores */}
      <Link to="/usuarios/operadores" className="block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="#7c3aed"
              >
                <path d="M560-680v-80h320v80H560Zm0 160v-80h320v80H560Zm0 160v-80h320v80H560Zm-240-40q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T320-360q56 0 106.5 13.5T522-306q18 11 28 30t10 40v76H80Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T360-520q0-17-11.5-28.5T320-560q-17 0-28.5 11.5T280-520q0 17 11.5 28.5T320-480Zm0-40Zm0 280Z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Operadores</h3>
              <p className="text-sm text-gray-600">Gerencie operadores e funcionários</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>• Criar e editar operadores</p>
            <p>• Gerenciar permissões</p>
            <p>• Controlar acesso ao sistema</p>
          </div>
        </div>
      </Link>

      {/* Card Motoboys */}
      <Link to="/usuarios/motoboys" className="block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="#2563eb"
              >
                <path d="M200-200v-80h80v-200q0-83 50-147.5T420-692v-28q0-25 17.5-42.5T480-780q25 0 42.5 17.5T540-720v28q80 20 130 84.5T720-480v200h80v80H200Zm280-300q-33 0-56.5-23.5T400-580q0-33 23.5-56.5T480-660q33 0 56.5 23.5T560-580q0 33-23.5 56.5T480-500ZM360-280h240v-200q0-50-35-85t-85-35q-50 0-85 35t-35 85v200Zm120-100Z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Motoboys</h3>
              <p className="text-sm text-gray-600">Gerencie entregadores</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>• Cadastrar motoboys</p>
            <p>• Acompanhar entregas</p>
            <p>• Avaliar performance</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
