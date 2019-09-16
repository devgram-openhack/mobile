import { StyleSheet } from 'react-native';

const postListComponentStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16
  },

  containerBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },

  emptyContainerBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },

  emptyContainer: {
    alignItems: 'center',
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