import AsyncStorage from '@react-native-community/async-storage';

const PersistentStorage = {
  async getSession() {
    return JSON.parse((await AsyncStorage.getItem('session')) || '{}');
  },

  async setSession(session) {
    await AsyncStorage.setItem('session', JSON.stringify(session));
  },

  async removeSession() {
    await AsyncStorage.removeItem('session');
  },
};

export { PersistentStorage };