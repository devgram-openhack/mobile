import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const drawerStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    flex: 1,
  },

  containerScrollable: {
    flexGrow: 1,
  },

  button: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: sizes['16'],
  },

  buttonActive: {
    alignItems: 'center',
    backgroundColor: colors.input,
    flexDirection: 'row',
    padding: sizes['16'],
  },

  buttonIcon: {
    color: colors.text,
    fontSize: sizes['24'],
    fontWeight: 'bold',
    marginRight: sizes['16'],
  },

  buttonIconActive: {
    color: colors.main,
    fontSize: sizes['24'],
    fontWeight: 'bold',
    marginRight: sizes['16'],
  },

  buttonText: {
    color: colors.text,
    fontSize: sizes['16'],
    fontWeight: 'bold',
  },

  buttonTextActive: {
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
  },
});

export { drawerStyle };