import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const authPageStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  button: {
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(250),
    padding: moderateScale(8),
    width: '100%',
  },

  buttonText: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export { authPageStyle };