// External libraries
import { useEffect, useMemo } from 'react';

// Contexts
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from '../contexts/SnackbarContext';

// Services
import { api } from '../services/api';
import { setupInterceptors } from '../services/apiInterceptors';

export const useApi = () => {
  const { handleSignOut } = useAuth();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setupInterceptors(api, showSnackbar, handleSignOut);
  }, [showSnackbar, handleSignOut]);

  return useMemo(() => ({ api }), []);
};
