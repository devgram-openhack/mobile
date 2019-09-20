import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const logoutPageStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(16),
  },

  field: {
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(300),
    width: '100%',
  },

  fieldLabel: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
  },

  fieldError: {
    color: colors.error,
    fontSize: moderateScale(16),
    fontStyle: 'italic',
    marginBottom: moderateScale(8),
  },

  button: {
    alignSelf: 'center',
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(8),
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

export { logoutPageStyle };