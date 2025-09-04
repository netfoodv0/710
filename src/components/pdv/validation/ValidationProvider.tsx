import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ValidationError {
  field: string;
  message: string;
  type: 'error' | 'warning' | 'info';
}

interface ValidationContextType {
  errors: ValidationError[];
  addError: (error: ValidationError) => void;
  removeError: (field: string) => void;
  clearErrors: () => void;
  hasErrors: () => boolean;
  getFieldErrors: (field: string) => ValidationError[];
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation deve ser usado dentro de ValidationProvider');
  }
  return context;
};

interface ValidationProviderProps {
  children: ReactNode;
}

export const ValidationProvider: React.FC<ValidationProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const addError = (error: ValidationError) => {
    setErrors(prev => [...prev.filter(e => e.field !== error.field), error]);
  };

  const removeError = (field: string) => {
    setErrors(prev => prev.filter(e => e.field !== field));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const hasErrors = () => {
    return errors.length > 0;
  };

  const getFieldErrors = (field: string) => {
    return errors.filter(e => e.field === field);
  };

  const value: ValidationContextType = {
    errors,
    addError,
    removeError,
    clearErrors,
    hasErrors,
    getFieldErrors
  };

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
};
