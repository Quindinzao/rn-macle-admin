import { View } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, HelperText } from 'react-native-paper';
import { styles } from './styles';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const LoginRegisterScreen = () => {
  const { handleSignIn, isLoading } = useAuth();
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Preencha todos os campos.');
      setIsError(true);
      return;
    }

    setErrorMessage(null);
    setIsError(false);
    try {
      await handleSignIn(username, password);
    } catch (e) {
      setIsError(true);
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      setErrorMessage('Preencha todos os campos.');
      setIsError(true);
      return;
    }

    setErrorMessage(null);
    setIsError(false);
    try {
      setRegisterLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (e) {
      setErrorMessage('Erro ao registrar. Tente novamente.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login ou Registro
      </Text>

      {errorMessage && (
        <HelperText type="error" visible={true}>
          {errorMessage}
        </HelperText>
      )}

      <TextInput
        label="Username"
        mode="outlined"
        style={styles.input}
        keyboardType="default"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        error={isError}
      />

      <TextInput
        label="Senha"
        mode="outlined"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={isError}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        contentStyle={styles.buttonContent}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : 'Entrar'}
      </Button>

      <Button
        mode="outlined"
        onPress={handleRegister}
        style={styles.button}
        contentStyle={styles.buttonContent}
        disabled={registerLoading}
      >
        {registerLoading ? <ActivityIndicator /> : 'Registrar'}
      </Button>
    </View>
  );
};

export default LoginRegisterScreen;