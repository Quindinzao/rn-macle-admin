// External libraries
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Routes
import TabNavigator from './TabNavigator';

// Interfaces
import { RoutesProps } from '../interfaces/RoutesProps';

const { Navigator, Screen } = createNativeStackNavigator<RoutesProps>();

const AppStack: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={'Tabs'} component={TabNavigator} />
    </Navigator>
  );
};

export default AppStack;