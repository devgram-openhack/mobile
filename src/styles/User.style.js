import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const userStyle = StyleSheet.create({
  containerWithDescription: {
    alignItems: 'center',
    backgroundColor: colors.card,
    flexDirection: 'row',
    paddingHorizontal: sizes['16'],
    paddingVertical: sizes['8'],
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: sizes['8'],
  },

  avatarImage: {
    borderRadius: sizes['20'],
    height: sizes['40'],
    marginRight: sizes['8'],
    width: sizes['40'],
  },

  avatarIcon: {
    backgroundColor: colors.input,
    borderRadius: sizes['20'],
    color: colors.bar,
    fontSize: sizes['40'],
    marginRight: sizes['8'],
  },

  containerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    color: colors.main,
    fontWeight: 'bold',
  },

  specialization: {
    color: colors.main,
    fontStyle: 'italic',
  },

  actions: {
    alignItems: 'center',
    flexDirection: 'row',
  },

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