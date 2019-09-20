import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { colors } from './colors';

const postListStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    padding: moderateScale(16),
    paddingBottom: moderateScale(64),
  },

  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  emptyContainerIcon: {
    color: colors.main,
    fontSize: moderateScale(40),
    marginBottom: moderateScale(8),
  },

  emptyContainerText: {
    color: colors.main,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});

export { postListStyle };