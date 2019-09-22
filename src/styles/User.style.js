import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const userStyle = StyleSheet.create({
  editIcon: {
    color: colors.text,
    fontSize: sizes['24'],
    marginRight: sizes['24'],
  },

  descriptionIcon: {
    color: colors.main,
    fontSize: sizes['24'],
  },

  description: {
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
    marginBottom: sizes['16'],
  },
});

export { userStyle };