import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import uuid from 'uuid/v4';

import { api } from '../services/api';
import { EventEmitter } from '../services/EventEmitter';
import { PersistentStorage } from '../services/PersistentStorage';
import { utils } from '../utils';

import { User } from './User';
import { CommentForm } from './forms/CommentForm';
import { Comment } from './Comment';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';
import { postStyle } from '../styles/Post.style';

function Post({ navigation, post, showAuthor, showComments }) {
  const [state, setState] = useState({
    comments: [],
    isLastPage: false,
    isLoading: true,
    isLoadingNext: false,
    isRefreshing: false,
    nextPage: 1,
    post,
  });

  async function handleLike() {
    const response = await api.post(`/post/${state.post.id}/likes`, null, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      setState({
        ...state,
        post: Object.assign({}, state.post, response.data.post),
      });

      if (showComments) {
        EventEmitter.dispatch('like', response.data.post);
      }
    }
  }

  async function handleDislike() {
    const response = await api.post(`/post/${state.post.id}/dislikes`, null, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      setState({
        ...state,
        post: Object.assign({}, state.post, response.data.post),
      });

      if (showComments) {
        EventEmitter.dispatch('dislike', response.data.post);
      }
    }
  }

  function refreshPage() {
    setState({
      ...state,
      isLastPage: false,
      isRefreshing: true,
      nextPage: 1,
    });
  }

  function loadNextPage() {
    setState({
      ...state,
      isLoadingNext: true,
    });
  }

  useEffect(() => {
    const subscribers = [];

    function updatePost(updatedPost) {
      if (state.post.id === updatedPost.id) {
        setState({
          ...state,
          post: Object.assign({}, state.post, updatedPost),
        });
      }
    }

    function updateAuthor(updatedAuthor) {
      if (state.post.author.id === updatedAuthor.id) {
        setState({
          ...state,
          comments: state.comments.map(comment => {
            if (comment.author.id === updatedAuthor.id) {
              comment.author = Object.assign({}, comment.author, updatedAuthor);
              comment.uuid = uuid();
            }

            return comment;
          }),
          post: Object.assign({}, state.post, {
            author: Object.assign({}, state.post.author, updatedAuthor),
          }),
        });
      }
    }

    function refreshPage() {
      setState({
        ...state,
        isLastPage: false,
        isRefreshing: true,
        nextPage: 1,
      });
    }

    function subscribe() {
      subscribers.push(
        EventEmitter.subscribe('edit-post', updatePost),
        EventEmitter.subscribe('edit-user', updateAuthor),
        EventEmitter.subscribe('new-comment', refreshPage),
      );
    }

    function unsubscribe() {
      for (const subscriber of subscribers) {
        subscriber.unsubscribe();
      }
    }

    if (showComments) {
      subscribe();

      return unsubscribe;
    }
  }, [showComments, state]);

  useEffect(() => {
    async function loadComments() {
      if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
        const response = await api.get(`/post/${state.post.id}/comments?page=${state.nextPage}`, {
          headers: {
            'Authorization': `Bearer ${PersistentStorage.session.token}`,
          },
        });

        const comments = (state.isRefreshing ? response.data.comments : [...state.comments, ...response.data.comments])
          .map(comment => {
            if (!comment.uuid) {
              comment.uuid = uuid();
            }

            return comment;
          });

        setState({
          comments,
          isLastPage: response.data.isLastPage,
          isLoading: false,
          isLoadingNext: false,
          isRefreshing: false,
          nextPage: state.nextPage + 1,
          post: response.data.post,
        });
      }
    }

    if (showComments) {
      loadComments();
    }
  }, [state, showComments]);

  const container = (
    <View style={commonStyle.card}>
      {
        showAuthor && (
          <User navigation={navigation} user={state.post.author} />
        )
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('PostPage', {
          post: state.post,
        })}
      >
        <Text numberOfLines={showComments ? null : 2} style={commonStyle.cardTitle}>{state.post.title}</Text>
      </TouchableOpacity>

      {
        state.post.images.length > 0 && (
          <View style={commonStyle.cardSwiper}>
            <Swiper showsButtons={state.post.images.length > 1}>
              {
                state.post.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={commonStyle.cardSwiperImage} />
                ))
              }
            </Swiper>
          </View>
        )
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('PostPage', {
          post: state.post,
        })}
      >
        <Text numberOfLines={showComments ? null : 3} style={commonStyle.cardDescription}>{state.post.description}</Text>
      </TouchableOpacity>

      <View style={commonStyle.cardFooter}>
        <View style={commonStyle.cardActions}>
          <TouchableOpacity
            onPress={handleLike}
            style={postStyle.likeAction}
          >
            <Icon name='sentiment-very-satisfied' style={[postStyle.likeActionIcon, state.post.liked ? postStyle.highlight : null]} />

            <Text style={[postStyle.likeActionText, state.post.liked ? postStyle.highlight : null]}>{state.post.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDislike}
          >
            <Icon name='sentiment-very-dissatisfied' style={[postStyle.dislikeActionIcon, state.post.disliked ? postStyle.highlight : null]} />

            <Text style={[postStyle.dislikeActionText, state.post.disliked ? postStyle.highlight : null]}>{state.post.dislikes}</Text>
          </TouchableOpacity>
        </View>

        <View style={commonStyle.cardActions}>
          {
            showComments && state.post.author.username === PersistentStorage.session.username && (
              <TouchableOpacity
                onPress={() => navigation.navigate('EditPostPage', {
                  post: state.post,
                })}
                style={postStyle.editPostAction}
              >
                <Icon name='edit' style={postStyle.editPostActionIcon} />
              </TouchableOpacity>
            )
          }

          <TouchableOpacity
            onPress={() => navigation.navigate('PostPage', {
              post: state.post,
            })}
          >
            <Icon name='comment' style={postStyle.commentActionIcon} />

            <Text style={postStyle.commentActionText}>{state.post.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {
        showComments && (
          <View style={postStyle.comments}>
            <CommentForm post={state.post} />

            {
              state.isLoading ? (
                <ActivityIndicator color={colors.main} size={sizes['24']} />
              ) : (
                state.comments.length > 0 ? (
                  state.comments.map(comment => (
                    <Comment key={comment.uuid} comment={comment} navigation={navigation} />
                  ))
                ) : (
                  <Comment
                    comment={{
                      description: 'There are no comments. Scroll up to refresh the page or create a new comment above.',
                    }}
                    navigation={navigation}
                  />
                )
              )
            }
          </View>
        )
      }
    </View>
  );

  if (showComments) {
    return (
      <ScrollView
        contentContainerStyle={commonStyle.containerScrollable}
        onScroll={({ nativeEvent }) => {
          if (utils.isCloseToBottom(nativeEvent, sizes['64']) && !state.isLoadingNext && !state.isRefreshing && state.comments.length > 0) {
            loadNextPage();
          }
        }}
        refreshControl={(
          <RefreshControl
            refreshing={state.isRefreshing}
            onRefresh={refreshPage}
          />
        )}
      >
        {container}
      </ScrollView>
    );
  } else {
    return container;
  }
}

Post.propTypes = {
  navigation: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  showAuthor: PropTypes.bool,
  showComments: PropTypes.bool,
};

export { Post };