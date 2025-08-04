// External libraries
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

// Components
import OrderItem from '../../components/OrderItem';

// Services
import { useOrderRequest } from '../../services/useOrderRequest';

// Styles
import { styles } from './styles';

const OrderScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { orderAll, orderUpdate } = useOrderRequest();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderAll();
      setOrders(response.data);
    } catch (error) {
      console.error({error});
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: number, status: string) => {
    try {
      await orderUpdate(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <OrderItem
          orderId={item.id}
          orderStatus={item.status}
          orderRequestDate={item.createdAt}
          orderUpdateDate={item.updatedAt}
          onUpdateStatus={updateStatus}
        />
      )}
    />
  );
};

export default OrderScreen;