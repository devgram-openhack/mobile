import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const registerPageStyle = StyleSheet.create({
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
});

export { registerPageStyle };