import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from './styles';
import ProductItem from '../../components/ProductItem';
import { useProductsRequest } from '../../services/useProductsRequest';
import { ProductProps } from '../../interfaces/ProductProps';

const LIMIT = 10;

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { productAll, productDelete } = useProductsRequest();

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await productAll(LIMIT, offset); // ⬅️ `limit` e `offset`
      setProducts(prev => [...prev, ...data.products]);
      setHasMore(data.hasMore);
      setOffset(prev => prev + LIMIT);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await productDelete(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 12 }}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            {...item}
            onEdit={() => console.log('Editar', item.id)}
            onDelete={() => handleDelete(item.id)}
            onView={() => console.log('Ver', item.id)}
          />
        )}
      />

      {hasMore && (
        <Button
          mode="outlined"
          onPress={fetchProducts}
          style={styles.button}
          contentStyle={styles.buttonContent}
          loading={loading}
        >
          {loading ? 'Carregando...' : 'Carregar mais'}
        </Button>
      )}
    </View>
  );
};

export default HomeScreen;