import React, { useState, useEffect } from 'react';
import { FormInput } from '../forms/FormInput';
import { FormAvatarUpload } from '../forms/FormAvatarUpload';
import { CustomDropdown, DropdownOption } from '../ui';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModalClose } from './Modal';

// Componente interno que usa o hook (só é renderizado quando o Modal está ativo)
function ModalFooterContent({ isSubmitting, onClose, usuarioEditando }: { isSubmitting: boolean; onClose: () => void; usuarioEditando?: UsuarioFormData | null }) {
  const closeWithAnimation = useModalClose();
  
  return (
    <>
      <button
        type="button"
        onClick={closeWithAnimation}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
        disabled={isSubmitting}
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="usuario-form"
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (usuarioEditando ? 'Salvando...' : 'Criando...') : (usuarioEditando ? 'Salvar Alterações' : 'Criar Usuário')}
      </button>
    </>
  );
}

interface UsuarioFormData {
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
  funcao: string;
  avatar: string;
}

interface ModalCriarUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (usuarioData: UsuarioFormData) => void;
  usuarioEditando?: UsuarioFormData | null;
}

const funcoesUsuario: DropdownOption[] = [
  { value: 'operador', label: 'Operador (Sem permissão ao financeiro e Relatórios)' },
  { value: 'gerente', label: 'Gerente' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'atendente', label: 'Atendente' },
  { value: 'cozinheiro', label: 'Cozinheiro' }
];

export function ModalCriarUsuario({ isOpen, onClose, onSubmit, usuarioEditando }: ModalCriarUsuarioProps) {
  const [formData, setFormData] = useState<UsuarioFormData>({
    nome: '',
    email: '',
    whatsapp: '',
    cpf: '',
    funcao: 'operador',
    avatar: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (usuarioEditando) {
      setFormData(usuarioEditando);
    } else {
      setFormData({
        nome: '',
        email: '',
        whatsapp: '',
        cpf: '',
        funcao: 'operador',
        avatar: ''
      });
    }
    setErrors({});
    setTouched({});
  }, [usuarioEditando, isOpen]);

  const handleInputChange = (field: keyof UsuarioFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Marcar campo como tocado
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validar campo em tempo real
    validateField(field, value);
  };

  const validateField = (field: keyof UsuarioFormData, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'nome':
        if (!value.trim()) {
          newErrors.nome = 'Nome é obrigatório';
        } else {
          delete newErrors.nome;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Email deve ter um formato válido';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'whatsapp':
        if (!value.trim()) {
          newErrors.whatsapp = 'WhatsApp é obrigatório';
        } else if (!validateWhatsApp(value)) {
          newErrors.whatsapp = 'WhatsApp deve ter um formato válido';
        } else {
          delete newErrors.whatsapp;
        }
        break;
        
      case 'cpf':
        if (!value.trim()) {
          newErrors.cpf = 'CPF é obrigatório';
        } else if (!validateCPF(value)) {
          newErrors.cpf = 'CPF deve ter 11 dígitos';
        } else {
          delete newErrors.cpf;
        }
        break;
        
      case 'funcao':
        if (!value) {
          newErrors.funcao = 'Função do usuário é obrigatória';
        } else {
          delete newErrors.funcao;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleBlur = (field: keyof UsuarioFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Verificar se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validação básica dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  const validateWhatsApp = (whatsapp: string): boolean => {
    const cleanWhatsApp = whatsapp.replace(/\D/g, '');
    
    // WhatsApp brasileiro: 10 ou 11 dígitos (com ou sem DDD)
    if (cleanWhatsApp.length < 10 || cleanWhatsApp.length > 11) return false;
    
    // Verificar se começa com 1 (DDD) ou 9 (celular)
    if (cleanWhatsApp.length === 11 && !/^1[0-9]/.test(cleanWhatsApp)) return false;
    if (cleanWhatsApp.length === 10 && !/^[0-9]/.test(cleanWhatsApp)) return false;
    
    return true;
  };

  const formatCPF = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatWhatsApp = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 10) {
      return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email deve ter um formato válido';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp deve ter um formato válido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }

    if (!formData.funcao) {
      newErrors.funcao = 'Função do usuário é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        handleClose();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      email: '',
      whatsapp: '',
      cpf: '',
      funcao: 'operador',
      avatar: ''
    });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={usuarioEditando ? `Editar usuário: ${usuarioEditando.nome}` : "Criar novo usuário"}
      size="sm"
      className="modal-criar-usuario"
    >
      <ModalBody className="max-h-[32rem] overflow-y-auto">
        <form id="usuario-form" onSubmit={handleSubmit} className="space-y-4">
          <FormAvatarUpload
            label="Foto do usuário"
            value={formData.avatar}
            onChange={(value) => handleInputChange('avatar', value)}
            dimensions="84x84"
            maxSize={2}
            error={errors.avatar}
            showAvatarSelector={true}
          />
          
          <FormInput
            label="Nome"
            type="text"
            value={formData.nome}
            onChange={(value) => handleInputChange('nome', value as string)}
            onBlur={() => handleBlur('nome')}
            required
            validationMessage="Por favor, informe o nome completo"
            helperText={errors.nome}
          />
          
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value as string)}
            onBlur={() => handleBlur('email')}
            required
            validationMessage="Por favor, informe um email válido"
            helperText={errors.email}
          />

          <FormInput
            label="Whatsapp"
            type="text"
            value={formData.whatsapp}
            onChange={(value) => {
              const formatted = formatWhatsApp(value as string);
              handleInputChange('whatsapp', formatted);
            }}
            onBlur={() => handleBlur('whatsapp')}
            required
            validationMessage="Por favor, informe o número do WhatsApp"
            helperText={errors.whatsapp}
          />
          
          <FormInput
            label="CPF"
            type="text"
            value={formData.cpf}
            onChange={(value) => {
              const formatted = formatCPF(value as string);
              handleInputChange('cpf', formatted);
            }}
            onBlur={() => handleBlur('cpf')}
            required
            validationMessage="Por favor, informe o CPF completo"
            helperText={errors.cpf}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Função do usuário
            </label>
            <CustomDropdown
              options={funcoesUsuario}
              selectedValue={formData.funcao}
              onValueChange={(value) => handleInputChange('funcao', value)}
              size="md"
              dropUp={true}
            />
            {touched.funcao && errors.funcao && (
              <p className="modal-error-message">{errors.funcao}</p>
            )}
          </div>
        </form>
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <ModalFooterContent 
          isSubmitting={isSubmitting} 
          onClose={onClose}
          usuarioEditando={usuarioEditando}
        />
      </ModalFooter>
    </Modal>
  );
}
