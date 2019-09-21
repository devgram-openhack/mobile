import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const commentStyle = StyleSheet.create({
  container: {
    borderTopColor: colors.bar,
    borderTopWidth: sizes['2'],
    marginBottom: sizes['8'],
    paddingTop: sizes['8'],
  },

  description: {
    color: colors.text,
  },
});

export { commentStyle };