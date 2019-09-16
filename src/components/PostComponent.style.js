import { StyleSheet } from 'react-native';

const postComponentStyle = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    marginBottom: 16
  },

  authorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8
  },

  authorAvatar: {
    borderRadius: 20,
    height: 40,
    marginRight: 8,
    width: 40
  },

  authorName: {
    color: '#31c32e',
    fontWeight: 'bold'
  },

  authorRole: {
    color: '#31c32e',
    fontStyle: 'italic'
  },

  title: {
    backgroundColor: '#333',
    color: '#31c32e',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8
  },

  imageContainer: {
    alignSelf: 'center',
    backgroundColor: '#333',
    height: 196,
    padding: 8,
    width: '100%'
  },

  image: {
    height: 180,
    resizeMode: 'contain'
  },

  text: {
    color: '#31c32e',
    padding: 8
  },

  actions: {
    alignItems: 'center',
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  },

  rightActions: {
    flexDirection: 'row'
  },

  likeAction: {
    marginRight: 24
  },

  likeActionIcon: {
    color: '#2f93c2',
    fontSize: 24
  },

  likeActionText: {
    color: '#2f93c2',
    textAlign: 'center'
  },

  dislikeActionIcon: {
    color: '#c22f31',
    fontSize: 24
  },

  dislikeActionText: {
    color: '#c22f31',
    textAlign: 'center'
  },

  commentActionIcon: {
    color: '#31c32e',
    fontSize: 24
  },

  commentActionText: {
    color: '#31c32e',
    textAlign: 'center'
  },

  commentContainer: {
    padding: 8
  },

  comment: {
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    marginBottom: 8,
    paddingBottom: 8
  },

  commentText: {
    color: '#ccc'
  },

  newCommentContainer: {
    alignItems: 'center'
  },

  newCommentInput: {
    backgroundColor: '#555',
    borderRadius: 5,
    marginBottom: 8,
    width: 300
  },

  newCommentButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    width: 200
  },

  newCommentButtonText: {
    color: '#31c32e',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export { postComponentStyle };