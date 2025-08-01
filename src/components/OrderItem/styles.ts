import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    flexDirection: 'column',
  },
  mediumSpace: {
    marginVertical: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  smallSpace: {
    marginVertical: 2,
    color: '#555',
  },
  line: {
    marginTop: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    marginTop: 6,
    marginRight: 6,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});