// External libraries
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { AUTH_KEY } from '../constants/authKey';

export const setupInterceptors = (
  api: AxiosInstance,
  showSnackbar: (message: string) => void,
  handleSignOut: () => void,
) => {
  if ((api as any)._interceptorsConfigured) return;
  (api as any)._interceptorsConfigured = true;

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const auth = await AsyncStorage.getItem(AUTH_KEY);
        if (auth) {
          const token = JSON.parse(auth).token;
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.log('Erro ao obter token:', err);
        showSnackbar('Erro ao preparar requisição de autenticação.');
      }
      return config;
    },
    error => {
      console.log('Erro na requisição:', error);
      showSnackbar('Erro ao preparar requisição.');
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (error.response) {
        const { status, config, data } = error.response;

        const isLoginRoute = config.url?.includes('/users/login');

        const backendMessage =
          (typeof data === 'object' && data && 'error' in data && data.error) ||
          (typeof data === 'string' && data) ||
          (typeof data === 'object' &&
            data &&
            'message' in data &&
            data.message);

        const message =
          typeof backendMessage === 'string'
            ? backendMessage
            : `Erro inesperado (${status}).`;

        if (status === 401 && !isLoginRoute) {
          if (backendMessage === 'Token inválido') {
            showSnackbar(message);
            handleSignOut();
          } else {
            showSnackbar(message);
          }
        } else {
          showSnackbar(message);
        }
      } else if (error.request) {
        console.log('Erro sem resposta:', error);
        showSnackbar('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        console.log('Erro desconhecido:', error.message);
        showSnackbar(`Erro desconhecido: ${error.message}`);
      }

      return Promise.reject(error);
    },
  );
};
