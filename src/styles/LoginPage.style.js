import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const loginPageStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(16),
  },

  field: {
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(332),
    width: '100%',
  },

  fieldLabel: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
  },

  fieldInput: {
    backgroundColor: colors.input,
    borderColor: colors.bar,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(2),
    marginBottom: moderateScale(8),
    width: '100%',
  },

  fieldError: {
    color: colors.error,
    fontSize: moderateScale(16),
    fontStyle: 'italic',
    marginBottom: moderateScale(8),
  },

  submitButton: {
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    maxWidth: moderateScale(250),
    padding: moderateScale(8),
    width: '100%',
  },

  submitButtonText: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export { loginPageStyle };