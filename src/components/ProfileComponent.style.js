import { StyleSheet } from 'react-native';

const profileComponentStyle = StyleSheet.create({
  container: {
    flex: 1
  },

  infoContainer: {
    backgroundColor: '#444',
    padding: 8
  },

  info: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8
  },

  avatar: {
    borderRadius: 20,
    height: 40,
    marginRight: 8,
    width: 40
  },

  name: {
    color: '#31c32e',
    fontWeight: 'bold'
  },

  role: {
    color: '#31c32e',
    fontStyle: 'italic'
  },

  about: {
    backgroundColor: '#333',
    color: '#31c32e',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8
  }
});

export { profileComponentStyle };