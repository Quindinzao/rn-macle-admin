// External libraries
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginRegister from '../screens/LoginRegister';

// Interfaces
import { RoutesProps } from '../interfaces/RoutesProps';

const { Navigator, Screen } = createNativeStackNavigator<RoutesProps>();

const AuthStack: React.FC = () => {
  return (
    <Navigator
      initialRouteName="LoginRegister"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="LoginRegister" component={LoginRegister} />
    </Navigator>
  );
};

export default AuthStack;
