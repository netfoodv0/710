import { useAuth as useAuthContext } from '../context/authContext';

export const useAuth = () => {
  const auth = useAuthContext();
  
  return {
    ...auth,
    isAuthenticated: auth.status === 'authenticated',
    isLoading: auth.status === 'loading',
    isIdle: auth.status === 'idle',
    hasError: auth.status === 'error'
  };
}; 