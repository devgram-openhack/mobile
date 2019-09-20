import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from './colors';

const newPostPageStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    padding: moderateScale(16),
    paddingBottom: moderateScale(40),
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

  fieldInput: {
    backgroundColor: colors.input,
    borderColor: colors.bar,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(2),
    marginBottom: moderateScale(8),
    width: '100%',
  },

  fieldImageContainer: {
    backgroundColor: colors.bar,
    height: verticalScale(200),
    marginBottom: moderateScale(8),
    padding: moderateScale(8),
  },

  fieldImage: {
    height: verticalScale(200),
    resizeMode: 'cover',
  },

  fieldImageButton: {
    alignSelf: 'center',
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    maxWidth: moderateScale(150),
    padding: moderateScale(8),
    width: '100%',
  },

  fieldImageButtonText: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
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

export { newPostPageStyle };