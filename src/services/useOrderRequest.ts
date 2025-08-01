// Services
import { useApi } from './useApi';

export const useOrderRequest = () => {
  const { api } = useApi();

  return {
    orderUpdate: async (
      orderId: number,
      status: string,
    ) => {

      return await api.put(`/orders/order/${orderId}`, {
        status
      });
    },
    orderAll: async () => {
      return await api.get(`/orders`);
    },
  };
};
