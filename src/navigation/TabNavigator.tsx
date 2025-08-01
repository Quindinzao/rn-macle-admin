// External libraries
import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';

const HomeRoute = () => <HomeScreen />;
const AddRoute = () => <AddScreen />;

const TabNavigator: React.FC = () => {
  const routeItem = useRoute();

  const [index, setIndex] = useState(() => {
    const initialTab = (routeItem.params as any)?.initialTab;
    switch (initialTab) {
      case 'add':
        return 1;
      case 'home':
      default:
        return 0;
    }
  });

  const [routes] = useState([
    { key: 'home', title: 'Início', icon: 'home' },
    { key: 'add', title: 'Adicionar', icon: 'plus-box' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    add: AddRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={false}
      labeled={true}
      sceneAnimationEnabled={false}
    />
  );
};

export default TabNavigator;