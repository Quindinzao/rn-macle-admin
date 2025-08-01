// External libraries
import { createContext, useContext, useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

type SnackbarContextData = {
  showSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextData>({
  showSnackbar: () => {},
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{ label: 'OK', onPress: () => setVisible(false) }}
          duration={3000}
        >
          {message}
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
