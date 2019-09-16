import { StyleSheet } from 'react-native';

const headerComponentStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8
  },

  menuIcon: {
    backgroundColor: '#31c32e',
    fontSize: 30
  },

  title: {
    color: '#31c32e',
    fontSize: 24
  },

  accountIcon: {
    color: '#31c32e',
    fontSize: 40
  }
});

export { headerComponentStyle };