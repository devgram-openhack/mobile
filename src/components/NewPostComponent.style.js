import { StyleSheet } from 'react-native';

const newPostComponentStyle = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flexGrow: 1,
    padding: 16
  },

  form: {
    backgroundColor: '#444',
    padding: 16
  },

  field: {
    marginBottom: 16,
    width: 300
  },

  label: {
    color: '#31c32e',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },

  input: {
    alignSelf: 'center',
    backgroundColor: '#555',
    borderRadius: 5,
    marginBottom: 8,
    width: '100%'
  },

  error: {
    color: '#c22f31',
    fontSize: 16,
    fontStyle: 'italic'
  },

  imageContainer: {
    backgroundColor: '#333',
    height: 196,
    marginBottom: 8,
    padding: 8,
    width: '100%'
  },

  image: {
    height: 180,
    marginTop: 8,
    resizeMode: 'contain'
  },

  submitButton: {
    alignSelf: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    width: 200
  },

  submitButtonText: {
    color: '#31c32e',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export { newPostComponentStyle };