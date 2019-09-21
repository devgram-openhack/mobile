import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const headerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    borderBottomColor: colors.darkerMain,
    borderBottomWidth: sizes['4'],
    borderTopColor: colors.main,
    borderTopWidth: sizes['4'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes['16'],
    paddingVertical: sizes['8'],
  },

  menuIcon: {
    backgroundColor: colors.main,
    fontSize: sizes['30'],
  },

  logo: {
    color: colors.main,
    fontSize: sizes['24'],
  },

  accountIcon: {
    color: colors.main,
    fontSize: sizes['40'],
  },
});

export { headerStyle };