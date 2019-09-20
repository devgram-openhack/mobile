import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from './colors';

const postStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    marginBottom: moderateScale(16),
    width: moderateScale(332),
  },

  authorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(8),
  },

  authorAvatar: {
    borderRadius: moderateScale(20),
    height: moderateScale(40),
    marginRight: moderateScale(8),
    width: moderateScale(40),
  },

  authorAvatarIcon: {
    backgroundColor: colors.input,
    borderRadius: moderateScale(20),
    color: colors.bar,
    fontSize: moderateScale(40),
    marginRight: moderateScale(8),
  },

  authorName: {
    color: colors.main,
    fontWeight: 'bold',
  },

  authorRole: {
    color: colors.main,
    fontStyle: 'italic',
  },

  title: {
    backgroundColor: colors.bar,
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    padding: moderateScale(8),
  },

  imageContainer: {
    backgroundColor: colors.bar,
    height: verticalScale(200),
    padding: moderateScale(8),
  },

  image: {
    height: verticalScale(200),
    resizeMode: 'contain',
  },

  description: {
    color: colors.text,
    padding: moderateScale(8),
  },

  actionContainer: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(8),
  },

  actionContainerLeft: {
    flexDirection: 'row',
  },

  actionContainerRight: {
    flexDirection: 'row',
  },

  likeAction: {
    marginRight: moderateScale(24),
  },

  likeActionIcon: {
    color: colors.like,
    fontSize: moderateScale(24),
    opacity: 0.5,
  },

  likeActionText: {
    color: colors.like,
    textAlign: 'center',
    opacity: 0.5,
  },

  dislikeActionIcon: {
    color: colors.dislike,
    fontSize: moderateScale(24),
    opacity: 0.5,
  },

  dislikeActionText: {
    color: colors.dislike,
    textAlign: 'center',
    opacity: 0.5,
  },

  editPostAction: {
    marginRight: moderateScale(24),
  },

  editPostActionIcon: {
    color: colors.text,
    fontSize: moderateScale(24),
  },

  commentActionIcon: {
    color: colors.main,
    fontSize: moderateScale(24),
  },

  commentActionText: {
    color: colors.main,
    textAlign: 'center',
  },

  focusAction: {
    opacity: 1,
  },

  newCommentContainer: {
    alignItems: 'center',
  },

  newCommentIcon: {
    marginBottom: moderateScale(16),
  },

  commentsContainer: {
    padding: moderateScale(8),
  },

  commentContainer: {
    borderTopColor: colors.bar,
    borderTopWidth: moderateScale(2),
    marginBottom: moderateScale(8),
    paddingTop: moderateScale(8),
  },

  commentDescription: {
    color: colors.text,
  },
});

export { postStyle };