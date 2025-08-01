// Services
import { useApi } from './useApi';

// Interfaces
import { RegisterPayloadProps } from '../interfaces/AuthProps';

export const useUserRequest = () => {
  const { api } = useApi();

  return {
    userAuthentication: async ({
      username,
      password,
    }: RegisterPayloadProps) => {
      const response = await api.post('/users/login', {
        username,
        password,
      });

      return response.data;
    },
    userRegister: async ({ username, password }: RegisterPayloadProps) => {
      return await api.post('/users/register', {
        username,
        password,
        role: 'admin'
      });
    },
  };
};
