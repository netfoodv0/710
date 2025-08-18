import React from 'react';
import { List } from 'lucide-react';
import { CouponIcon } from '../ui';
import { Cupom } from '../../types/cupons';
import { CupomCard } from './CupomCard';
import { FormSection } from '../forms/FormSection';

interface CupomListProps {
  cupons: Cupom[];
  onEdit: (cupom: Cupom) => void;
  onToggleStatus: (id: string) => void;
}

export function CupomList({ cupons, onEdit, onToggleStatus }: CupomListProps) {
  if (cupons.length === 0) {
    return (
      <FormSection
        title="Cupons Cadastrados"
        description="Lista de todos os cupons disponíveis"
        icon={<List className="w-5 h-5" />}
        className="mt-4"
      >
        <div className="text-center py-8">
          <CouponIcon size={48} color="#9ca3af" />
          <p className="text-gray-600">Nenhum cupom cadastrado ainda.</p>
          <p className="text-gray-500 text-sm">Clique em "Novo Cupom" para criar o primeiro.</p>
        </div>
      </FormSection>
    );
  }

  return (
    <FormSection
      title="Cupons Cadastrados"
      description="Lista de todos os cupons disponíveis"
      icon={<List className="w-5 h-5" />}
      className="mt-4"
    >
      <div className="space-y-4">
        {cupons.map((cupom) => (
          <CupomCard
            key={cupom.id}
            cupom={cupom}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>
    </FormSection>
  );
}