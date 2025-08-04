import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { styles } from './styles';
import { ProductItemProps } from '../../interfaces/ProductProps';

const ProductItem: React.FC<ProductItemProps> = ({ name, price, image, description, onEdit, onDelete, onView }) => {
  return (
    <TouchableOpacity onPress={onView} style={styles.card}>
      <Image source={{ uri: 'data:image/png;base64,' + image }} style={styles.image} />
      <View style={styles.content}>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodySmall">R$ {price.toFixed(2)}</Text>
        <Text variant="bodySmall" numberOfLines={2}>{description}</Text>
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onEdit} style={styles.button}>Editar</Button>
          <Button mode="outlined" onPress={onDelete} style={styles.button}>Deletar</Button>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
