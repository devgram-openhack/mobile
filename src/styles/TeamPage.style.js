import { StyleSheet } from 'react-native';

import { sizes } from './sizes';
import { colors } from './colors';

const teamPageStyle = StyleSheet.create({
  team: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes['16'],
    paddingVertical: sizes['8'],
  },

  teamTitle: {
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
  },

  hackathon: {
    backgroundColor: colors.input,
    color: colors.text,
    fontWeight: 'bold',
    paddingHorizontal: sizes['16'],
    paddingVertical: sizes['8'],
  },

  editTeamIcon: {
    color: colors.text,
    fontSize: sizes['24'],
  },
});

export { teamPageStyle };