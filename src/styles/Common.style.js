import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const commonStyle = StyleSheet.create({
  buttonLarge: {
    alignSelf: 'center',
    backgroundColor: colors.bar,
    borderRadius: sizes['4'],
    marginBottom: sizes['16'],
    maxWidth: sizes['250'],
    padding: sizes['8'],
    width: '100%',
  },

  buttonSmall: {
    alignSelf: 'center',
    backgroundColor: colors.bar,
    borderRadius: sizes['4'],
    maxWidth: sizes['150'],
    padding: sizes['8'],
    width: '100%',
  },

  buttonText: {
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
    textAlign: 'center',
  },

  containerCentered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: sizes['16'],
  },

  containerCenteredIcon: {
    color: colors.main,
    fontSize: sizes['40'],
    marginBottom: sizes['16'],
  },

  containerCenteredText: {
    color: colors.main,
    fontSize: sizes['16'],
    textAlign: 'center',
  },

  containerScrollable: {
    alignItems: 'center',
    flexGrow: 1,
    padding: sizes['16'],
    paddingBottom: sizes['64'],
  },

  formField: {
    marginBottom: sizes['16'],
    maxWidth: sizes['332'],
    width: '100%',
  },

  formFieldLabel: {
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
    marginBottom: sizes['8'],
  },

  formFieldAvatar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  formFieldAvatarImage: {
    borderColor: colors.bar,
    borderRadius: sizes['32'],
    borderWidth: sizes['2'],
    height: sizes['64'],
    width: sizes['64'],
  },

  formFieldSwiper: {
    backgroundColor: colors.bar,
    height: sizes['200v'],
    marginBottom: sizes['8'],
    padding: sizes['8'],
  },

  formFieldImage: {
    height: sizes['200v'],
    resizeMode: 'cover',
  },

  formFieldAvatarIcon: {
    backgroundColor: colors.input,
    borderRadius: sizes['32'],
    color: colors.bar,
    fontSize: sizes['64'],
  },

  formFieldInput: {
    backgroundColor: colors.input,
    borderColor: colors.bar,
    borderRadius: sizes['4'],
    borderWidth: sizes['2'],
    marginBottom: sizes['8'],
    width: '100%',
  },

  formFieldInputSmall: {
    backgroundColor: colors.input,
    borderColor: colors.bar,
    borderRadius: sizes['4'],
    borderWidth: sizes['2'],
    marginBottom: sizes['8'],
    width: sizes['150'],
  },

  formFieldError: {
    color: colors.error,
    fontSize: sizes['16'],
    fontStyle: 'italic',
    marginBottom: sizes['8'],
  },
});

export { commonStyle };