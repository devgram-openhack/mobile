import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from './colors';

const newPostPageStyle = StyleSheet.create({
  fieldImageContainer: {
    backgroundColor: colors.bar,
    height: verticalScale(200),
    marginBottom: moderateScale(8),
    padding: moderateScale(8),
  },

  fieldImage: {
    height: verticalScale(200),
    resizeMode: 'cover',
  },
});

export { newPostPageStyle };