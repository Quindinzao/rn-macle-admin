import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

// Interfaces
import {
  AuthContextDataProps,
  AuthDataProps,
  AuthProviderProps,
} from '../interfaces/AuthProps';

// Constants
import { AUTH_KEY } from '../constants/authKey';
import { useUserRequest } from '../services/useUserRequest';

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return decoded.exp;
  } catch (error) {
    console.log('Erro ao decodificar o token JWT:', error);
    return null;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthDataProps | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userAuthentication } = useUserRequest();

  const isTokenExpired = (exp: number): boolean => {
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  };

  const loadFromStorage = useCallback(async () => {
    try {
      const storedAuth = await AsyncStorage.getItem(AUTH_KEY);

      if (storedAuth) {
        const parsed = JSON.parse(storedAuth) as AuthDataProps;

        if (!isTokenExpired(parsed.exp)) {
          setAuthData(parsed);
        } else {
          await AsyncStorage.removeItem(AUTH_KEY);
        }
      }
    } catch (error) {
      console.log('[Auth] Failed to load auth data from storage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleSignIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await userAuthentication({ username, password });

      if (!result?.token) {
        throw new Error('[Auth] Token não encontrado na resposta');
      }

      const exp = decodeToken(result.token);

      if (!exp) {
        throw new Error('[Auth] Expiração do token inválida');
      }

      const auth: AuthDataProps = {
        token: result.token,
        exp,
        userId: result.user.id,
      };

      setAuthData(auth);
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    } catch (error) {
      console.log('[Auth] Failed to sign in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      setAuthData(undefined);
    } catch (error) {
      console.log('[Auth] Failed to sign out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        handleSignIn,
        handleSignOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
