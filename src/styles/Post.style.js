import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

const postStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    marginBottom: sizes['16'],
    width: sizes['332'],
  },

  title: {
    backgroundColor: colors.bar,
    color: colors.main,
    fontSize: sizes['16'],
    fontWeight: 'bold',
    padding: sizes['8'],
  },

  subtitle: {
    backgroundColor: colors.input,
    color: colors.text,
    fontWeight: 'bold',
    padding: sizes['8'],
  },

  swiper: {
    backgroundColor: colors.bar,
    height: sizes['200v'],
    padding: sizes['8'],
  },

  image: {
    height: sizes['200v'],
    resizeMode: 'cover',
  },

  description: {
    color: colors.text,
    padding: sizes['8'],
  },

  footer: {
    alignItems: 'center',
    backgroundColor: colors.bar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizes['8'],
  },

  actions: {
    flexDirection: 'row',
  },

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