// External libraries
import { NavigationContainer } from '@react-navigation/native';

// Routes
import AppStack from './AppStack';
import AuthStack from './AuthStack';

// Contexts
import { useAuth } from '../contexts/AuthContext';

const Routes: React.FC = () => {
  const { authData, isLoading } = useAuth();

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
