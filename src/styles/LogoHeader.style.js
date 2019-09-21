import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const logoHeaderStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    borderBottomColor: colors.darkerMain,
    borderBottomWidth: sizes['4'],
    borderTopColor: colors.main,
    borderTopWidth: sizes['4'],
    padding: sizes['8'],
  },

  logo: {
    color: colors.main,
    fontSize: sizes['24'],
  },
});

export { logoHeaderStyle };