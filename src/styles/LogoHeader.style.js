import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const logoHeaderStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    borderBottomColor: colors.darkerMain,
    borderBottomWidth: moderateScale(4),
    borderTopColor: colors.main,
    borderTopWidth: moderateScale(4),
    padding: moderateScale(8),
  },

  logo: {
    color: colors.main,
    fontSize: moderateScale(24),
  },
});

export { logoHeaderStyle };