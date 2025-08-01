// External libraries
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

// Navigation
import Routes from './src/navigation';

// Contexts
import { AuthProvider } from './src/contexts/AuthContext';
import { SnackbarProvider } from './src/contexts/SnackbarContext';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <SnackbarProvider>
          <Routes />
        </SnackbarProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
