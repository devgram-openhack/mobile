import { StyleSheet } from 'react-native';

import { sizes } from './sizes';
import { colors } from './colors';

const teamPageStyle = StyleSheet.create({
  editTeamIcon: {
    color: colors.text,
    fontSize: sizes['24'],
  },

  kickMemberIcon: {
    color: colors.error,
    fontSize: sizes['24'],
  },
});

export { teamPageStyle };