import { StyleSheet } from 'react-native';

const postListComponentStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16
  },

  emptyContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    justifyContent: 'center'
  },

  emptyContainerIcon: {
    color: '#31c32e',
    fontSize: 40,
    marginBottom: 8
  },

  emptyContainerText: {
    color: '#31c32e',
    fontSize: 16,
    textAlign: 'center'
  }
});

export { postListComponentStyle };