// Services
import { ProductProps } from '../interfaces/ProductProps';
import { useApi } from './useApi';

export const useProductsRequest = () => {
  const { api } = useApi();

  return {
    productAll: async (limit?: number, offset?: number) => {
      const response = await api.get('/products', {
        params: { limit, offset },
      });
      return response.data;
    },
    productById: async (id: number) => {
      return await api.get(`/products/product/${id}`);
    },
    productEditById: async (id: number, {name, image, price, description} : ProductProps) => {
      return await api.put(`/products/product/${id}`, {
        name,
        image,
        price,
        description
      });
    },
    productCreate: async ({name, image, price, description} : ProductProps) => {
      return await api.post(`/products`, {
        name,
        image,
        price,
        description
      });
    },
  };
};
