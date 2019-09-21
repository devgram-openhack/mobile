import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const floatingButtonStyle = StyleSheet.create({
  button: {
    bottom: sizes['16'],
    position: 'absolute',
    right: sizes['16'],
  },

  buttonIcon: {
    color: colors.main,
    fontSize: sizes['56'],
    shadowOpacity: 1,
    textShadowOffset: {
      height: sizes['4'],
      width: 0,
    },
    textShadowRadius: sizes['8'],
  },
});

export { floatingButtonStyle };