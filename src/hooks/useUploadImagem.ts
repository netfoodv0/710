import { useState, useCallback } from 'react';
import { useNotifications } from './useNotifications';

export interface UseUploadImagemReturn {
  uploadImagem: (file: File) => Promise<string>;
  uploadMultiplasImagens: (files: File[]) => Promise<string[]>;
  removerImagem: (url: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useUploadImagem = (): UseUploadImagemReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useNotifications();

  const validarArquivo = useCallback((file: File): boolean => {
    // Validar tipo de arquivo
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(file.type)) {
      showError('Tipo de arquivo não suportado. Use JPG, PNG ou WebP.');
      return false;
    }

    // Validar tamanho (máximo 5MB)
    const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
    if (file.size > tamanhoMaximo) {
      showError('Arquivo muito grande. Tamanho máximo: 5MB.');
      return false;
    }

    return true;
  }, [showError]);

  const simularUpload = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular URL de upload
        const url = URL.createObjectURL(file);
        resolve(url);
      }, 1000);
    });
  }, []);

  const uploadImagem = useCallback(async (file: File): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      if (!validarArquivo(file)) {
        throw new Error('Arquivo inválido');
      }

      const url = await simularUpload(file);
      showSuccess('Imagem enviada com sucesso!');
      return url;
    } catch (err) {
      const errorMessage = 'Erro ao enviar imagem';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao enviar imagem:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [validarArquivo, simularUpload, showSuccess, showError]);

  const uploadMultiplasImagens = useCallback(async (files: File[]): Promise<string[]> => {
    setLoading(true);
    setError(null);

    try {
      const urls: string[] = [];
      
      for (const file of files) {
        if (!validarArquivo(file)) {
          continue;
        }
        
        const url = await simularUpload(file);
        urls.push(url);
      }

      if (urls.length > 0) {
        showSuccess(`${urls.length} imagem(ns) enviada(s) com sucesso!`);
      }

      return urls;
    } catch (err) {
      const errorMessage = 'Erro ao enviar imagens';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao enviar imagens:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [validarArquivo, simularUpload, showSuccess, showError]);

  const removerImagem = useCallback(async (url: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Simular remoção
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Revogar URL do objeto se for uma blob URL
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }

      showSuccess('Imagem removida com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao remover imagem';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao remover imagem:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  return {
    uploadImagem,
    uploadMultiplasImagens,
    removerImagem,
    loading,
    error
  };
}; 