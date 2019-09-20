import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from './colors';

const profilePageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  userContainer: {
    alignItems: 'center',
    backgroundColor: colors.card,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
  },

  userAvatar: {
    borderRadius: moderateScale(20),
    height: moderateScale(40),
    marginRight: moderateScale(8),
    width: moderateScale(40),
  },

  userAvatarIcon: {
    backgroundColor: colors.input,
    borderRadius: moderateScale(20),
    color: colors.bar,
    fontSize: moderateScale(40),
    marginRight: moderateScale(8),
  },

  userContainerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userActions: {
    flexDirection: 'row',
  },

  userName: {
    color: colors.main,
    fontWeight: 'bold',
  },

  userRole: {
    color: colors.main,
    fontStyle: 'italic',
  },

  userEditIcon: {
    color: colors.text,
    fontSize: moderateScale(40),
    marginRight: moderateScale(8),
  },

  userDescriptionIcon: {
    color: colors.main,
    fontSize: moderateScale(40),
  },

  userDescriptionContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(16),
  },

  userDescription: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(16),
  },
});

export { profilePageStyle };