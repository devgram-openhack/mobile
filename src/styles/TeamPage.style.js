import { StyleSheet } from 'react-native';

import { sizes } from './sizes';
import { colors } from './colors';

const teamPageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  editTeamIcon: {
    color: colors.text,
    fontSize: sizes['24'],
  },
});

export { teamPageStyle };