import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const floatingButtonStyle = StyleSheet.create({
  button: {
    bottom: moderateScale(16),
    position: 'absolute',
    right: moderateScale(16),
  },

  buttonIcon: {
    color: colors.main,
    fontSize: moderateScale(56),
    shadowOpacity: 1,
    textShadowOffset: {
      height: moderateScale(4),
      width: 0,
    },
    textShadowRadius: moderateScale(8),
  },
});

export { floatingButtonStyle };