import AsyncStorage from '@react-native-community/async-storage';

const PersistentStorage = {
  session: {},

  async loadSession() {
    this.session = JSON.parse((await AsyncStorage.getItem('session')) || '{}');
  },

  async beginSession(session) {
    this.session = session;

    await AsyncStorage.setItem('session', JSON.stringify(this.session));
  },

  async endSession() {
    this.session = {};

    await AsyncStorage.removeItem('session');
  },
};

export { PersistentStorage };