import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const headerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    borderBottomColor: colors.darkerMain,
    borderBottomWidth: moderateScale(4),
    borderTopColor: colors.main,
    borderTopWidth: moderateScale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
  },

  menuIcon: {
    backgroundColor: colors.main,
    fontSize: moderateScale(30),
  },

  logo: {
    color: colors.main,
    fontSize: moderateScale(24),
  },

  accountIcon: {
    color: colors.main,
    fontSize: moderateScale(40),
  },
});

export { headerStyle };