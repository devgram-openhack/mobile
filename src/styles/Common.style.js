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

  card: {
    backgroundColor: colors.card,
    marginBottom: sizes['16'],
    width: sizes['332'],
  },

  cardTitle: {
    backgroundColor: colors.bar,
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
    padding: sizes['8'],
  },

  cardSubtitle: {
    backgroundColor: colors.input,
    color: colors.text,
    fontWeight: 'bold',
    padding: sizes['8'],
  },

  cardSubtitleFull: {
    backgroundColor: colors.input,
    color: colors.text,
    fontWeight: 'bold',
    paddingHorizontal: sizes['16'],
    paddingVertical: sizes['8'],
  },

  cardSwiper: {
    backgroundColor: colors.bar,
    height: sizes['200v'],
    padding: sizes['8'],
  },

  cardSwiperImage: {
    height: sizes['200v'],
    resizeMode: 'cover',
  },

  cardDescription: {
    color: colors.text,
    padding: sizes['8'],
  },

  cardFooter: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizes['8'],
  },

  cardActions: {
    flexDirection: 'row',
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
    marginBottom: sizes['16'],
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

  formFieldAvatarIcon: {
    backgroundColor: colors.input,
    borderRadius: sizes['32'],
    color: colors.bar,
    fontSize: sizes['64'],
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

  formFieldSwiperImage: {
    height: sizes['200v'],
    resizeMode: 'cover',
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

  info: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: sizes['8'],
  },

  infoFull: {
    alignItems: 'center',
    backgroundColor: colors.card,
    flexDirection: 'row',
    paddingHorizontal: sizes['16'],
    paddingVertical: sizes['8'],
  },

  infoAvatarImage: {
    borderRadius: sizes['20'],
    height: sizes['40'],
    marginRight: sizes['8'],
    width: sizes['40'],
  },

  infoAvatarIcon: {
    backgroundColor: colors.input,
    borderRadius: sizes['20'],
    color: colors.bar,
    fontSize: sizes['40'],
    marginRight: sizes['8'],
  },

  infoRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoTitle: {
    color: colors.main,
    fontWeight: 'bold',
  },

  infoTitleLarge: {
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
  },

  infoSubtitle: {
    color: colors.main,
    fontStyle: 'italic',
  },

  infoActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export { commonStyle };