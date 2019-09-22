import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const postStyle = StyleSheet.create({
  likeAction: {
    marginRight: sizes['24'],
  },

  likeActionIcon: {
    color: colors.like,
    fontSize: sizes['24'],
    opacity: 0.5,
  },

  likeActionText: {
    color: colors.like,
    textAlign: 'center',
    opacity: 0.5,
  },

  dislikeActionIcon: {
    color: colors.dislike,
    fontSize: sizes['24'],
    opacity: 0.5,
  },

  dislikeActionText: {
    color: colors.dislike,
    textAlign: 'center',
    opacity: 0.5,
  },

  editPostAction: {
    marginRight: sizes['24'],
  },

  editPostActionIcon: {
    color: colors.text,
    fontSize: sizes['24'],
  },

  commentActionIcon: {
    color: colors.main,
    fontSize: sizes['24'],
  },

  commentActionText: {
    color: colors.main,
    textAlign: 'center',
  },

  highlight: {
    opacity: 1,
  },

  comments: {
    padding: sizes['8'],
  },
});

export { postStyle };