import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from './colors';

const profilePageStyle = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

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

  userContainerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userName: {
    color: colors.main,
    fontWeight: 'bold',
  },

  userRole: {
    color: colors.main,
    fontStyle: 'italic',
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

  closeModalButton: {
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(250),
    padding: moderateScale(8),
    width: '100%',
  },

  closeModalButtonText: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export { profilePageStyle };