import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from './colors';

const postStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    marginBottom: moderateScale(16),
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

  focusAction: {
    opacity: 1,
  },

  commentActionIcon: {
    color: colors.main,
    fontSize: moderateScale(24),
  },

  commentActionText: {
    color: colors.main,
    textAlign: 'center',
  },

  newCommentContainer: {
    alignItems: 'center',
  },

  newCommentField: {
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(300),
    width: '100%',
  },

  newCommentFieldInput: {
    backgroundColor: colors.input,
    borderColor: colors.bar,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(2),
    marginBottom: moderateScale(8),
    width: '100%',
  },

  newCommentFieldError: {
    color: colors.error,
    fontSize: moderateScale(16),
    fontStyle: 'italic',
    marginBottom: moderateScale(8),
  },

  newCommentIcon: {
    marginBottom: moderateScale(16),
  },

  newCommentSubmitButton: {
    alignSelf: 'center',
    backgroundColor: colors.bar,
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(16),
    maxWidth: moderateScale(250),
    padding: moderateScale(8),
    width: '100%',
  },

  newCommentSubmitButtonText: {
    color: colors.main,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
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

  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
    padding: moderateScale(16),
    paddingBottom: moderateScale(64),
  },
});

export { postStyle };