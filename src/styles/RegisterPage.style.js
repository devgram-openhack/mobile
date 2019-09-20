import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const registerPageStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    padding: moderateScale(16),
    paddingBottom: moderateScale(40),
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

  fieldAvatar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  fieldAvatarImage: {
    borderColor: colors.bar,
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(2),
    height: moderateScale(64),
    width: moderateScale(64),
  },

  fieldAvatarIcon: {
    backgroundColor: colors.input,
    borderRadius: moderateScale(32),
    color: colors.bar,
    fontSize: moderateScale(64),
  },

  fieldAvatarButton: {
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    maxWidth: moderateScale(150),
    padding: moderateScale(8),
    width: '100%',
  },

  fieldAvatarButtonText: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
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

export { registerPageStyle };