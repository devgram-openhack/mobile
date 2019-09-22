import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const footerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes['16'],
    paddingVertical: sizes['8'],
  },

  icon: {
    color: colors.main,
    fontSize: sizes['40'],
  },
});

export { footerStyle };