import React from 'react';
import { Clock, DollarSign, Tag } from 'lucide-react';
import { Produto, Categoria } from '../../../types';
import { CustomDropdown, DropdownOption } from '../ui/CustomDropdown';
import { GoogleFloatingInput } from '../ui/google-floating-input';

interface ModalProdutoInformacoesProps {
  produto: Produto;
  categorias: Categoria[];
  modoEdicao: boolean;
}

export function ModalProdutoInformacoes({ produto, categorias, modoEdicao }: ModalProdutoInformacoesProps) {
  // Opções para dropdown de categoria
  const categoriaOptions: DropdownOption[] = categorias.map((categoria) => ({
    value: categoria.id,
    label: categoria.nome,
    icon: <Tag className="w-4 h-4 text-blue-500" />
  }));

  return (
    <>
      {/* Informações básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <GoogleFloatingInput
            label="Nome do Produto"
            value={produto.nome}
            onChange={() => {}} // Em modo de edição, seria uma função para atualizar
            disabled={!modoEdicao}
            placeholder="Digite o nome do produto"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <CustomDropdown
            options={categoriaOptions}
            selectedValue={produto.categoriaId}
            onValueChange={() => {}} // Em modo de edição, seria uma função para atualizar
            disabled={!modoEdicao}
            size="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <GoogleFloatingInput
            label="Preço"
            value={produto.preco?.toString() || ''}
            onChange={() => {}} // Em modo de edição, seria uma função para atualizar
            type="number"
            step="0.01"
            disabled={!modoEdicao}
            placeholder="0,00"
          />
        </div>
        <div>
          <GoogleFloatingInput
            label="Tempo de Preparo (min)"
            value={produto.tempoPreparoMinutos?.toString() || ''}
            onChange={() => {}} // Em modo de edição, seria uma função para atualizar
            type="number"
            disabled={!modoEdicao}
            placeholder="20"
          />
        </div>
      </div>

      <div>
        <GoogleFloatingInput
          label="Descrição"
          value={produto.descricao || ''}
          onChange={() => {}} // Em modo de edição, seria uma função para atualizar
          disabled={!modoEdicao}
          placeholder="Descreva o produto..."
          as="textarea"
          rows={3}
        />
      </div>
    </>
  );
} 