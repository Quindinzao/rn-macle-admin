import { useState } from 'react';
import { View, Image } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useProductsRequest } from '../../services/useProductsRequest';
import { styles } from './styles';

const AddScreen = () => {
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const {productCreate} = useProductsRequest();

  const handleRegisterProduct = async () => {
    if (!name || !description || !price || !image) {
      setErrorMessage('Preencha todos os campos e selecione uma imagem.');
      setIsError(true);
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      setErrorMessage('Preço inválido.');
      setIsError(true);
      return;
    }

    if (!image.split(',')[1]) {
      setErrorMessage('Selecione uma imagem.');
    }

    setErrorMessage(null);
    setIsError(false);
    try {
      setRegisterLoading(true);

      const result = await productCreate({
        name, 
        image: image.split(',')[1], 
        price: numericPrice, 
        description
      });

      if (result) {
        cleanForm();
      }    
    } catch (e) {
      setErrorMessage('Erro ao registrar. Tente novamente.');
    } finally {
      setRegisterLoading(false);
    }
  };

  const cleanForm = () => {
    setName('');
    setImage(null);
    setDescription('');
    setPrice('');
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setErrorMessage('Permissão para acessar imagens negada.');
      setIsError(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Cadastro de Produto
      </Text>

      {errorMessage && (
        <HelperText type="error" visible={true}>
          {errorMessage}
        </HelperText>
      )}

      <TextInput
        label="Nome"
        mode="outlined"
        style={styles.input}
        keyboardType="default"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
        error={isError}
      />

      <TextInput
        label="Descrição"
        mode="outlined"
        style={styles.input}
        multiline
        value={description}
        onChangeText={setDescription}
        error={isError}
      />

      <TextInput
        label="Preço"
        mode="outlined"
        style={styles.input}
        keyboardType="decimal-pad"
        value={price}
        onChangeText={setPrice}
        error={isError}
      />

      <Button
        mode="outlined"
        onPress={pickImage}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Selecionar Imagem
      </Button>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 16 }}
          resizeMode="contain"
        />
      )}

      <Button
        mode="contained"
        onPress={handleRegisterProduct}
        style={styles.button}
        contentStyle={styles.buttonContent}
        disabled={registerLoading}
      >
        {registerLoading ? <ActivityIndicator color="#fff" /> : 'Registrar'}
      </Button>
    </View>
  );
};

export default AddScreen;
