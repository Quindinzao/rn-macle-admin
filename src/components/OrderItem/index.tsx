import { View } from 'react-native';
import { Text, TouchableRipple, Button } from 'react-native-paper';
import { styles } from './styles';
import { OrderDetailModalProps } from '../../interfaces/OrderProps';

const OrderItem: React.FC<OrderDetailModalProps> = ({
  orderId,
  orderStatus,
  orderRequestDate,
  orderUpdateDate,
  onUpdateStatus,
}) => {
  const showActions = orderStatus !== 'concluído' && orderStatus !== 'cancelado';

  return (
    <TouchableRipple style={styles.container} borderless={true}>
      <View style={styles.content}>
        <Text style={styles.mediumSpace}>Pedido #{orderId}</Text>
        <Text style={styles.smallSpace}>Solicitado no dia {orderRequestDate}</Text>
        <Text style={styles.mediumSpace}>Atualizado no dia {orderUpdateDate}</Text>
        <Text>Status: <Text>{orderStatus}</Text></Text>

        {showActions && (
          <View style={styles.buttonGroup}>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onUpdateStatus(orderId, 'em andamento')}
            >
              Em andamento
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => onUpdateStatus(orderId, 'concluído')}
            >
              Concluir
            </Button>
            <Button
              mode="text"
              textColor="red"
              onPress={() => onUpdateStatus(orderId, 'cancelado')}
            >
              Cancelar
            </Button>
          </View>
        )}

        <View style={styles.line} />
      </View>
    </TouchableRipple>
  );
};

export default OrderItem;