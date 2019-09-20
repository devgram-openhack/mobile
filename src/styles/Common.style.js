import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const commonStyle = StyleSheet.create({
  buttonLarge: {
    alignSelf: 'center',
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(250),
    padding: moderateScale(8),
    width: '100%',
  },

  buttonSmall: {
    alignSelf: 'center',
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    maxWidth: moderateScale(150),
    padding: moderateScale(8),
    width: '100%',
  },

  buttonText: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  containerCentered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(16),
  },

  containerScrollable: {
    alignItems: 'center',
    flexGrow: 1,
    padding: moderateScale(16),
    paddingBottom: moderateScale(64),
  },

  formField: {
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(332),
    width: '100%',
  },

  formFieldLabel: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
  },

  formFieldInput: {
    backgroundColor: colors.input,
    borderColor: colors.bar,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(2),
    marginBottom: moderateScale(8),
    width: '100%',
  },

  formFieldError: {
    color: colors.error,
    fontSize: moderateScale(16),
    fontStyle: 'italic',
    marginBottom: moderateScale(8),
  },
});

export { commonStyle };