import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import { api } from '../services/api';
import { EventEmitter } from '../services/EventEmitter';
import { utils } from '../utils';

import { User } from './User';
import { CommentForm } from './forms/CommentForm';
import { Comment } from './Comment';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';
import { commentStyle } from '../styles/Comment.style';
import { postStyle } from '../styles/Post.style';

function Post({ navigation, post, showAuthor, showComments }) {
  const session = navigation.getParam('session');

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
    const response = await api.post(`/post/${state.post.id}/likes`, {
      'Authorization': `Bearer ${session.token}`,
    });

    if (response.data.success) {
      setState({
        ...state,
        post: response.data.post,
      });

      if (showComments) {
        EventEmitter.dispatch('refresh');
      }
    }
  }

  async function handleDislike() {
    const response = await api.post(`/post/${state.post.id}/dislikes`, {
      'Authorization': `Bearer ${session.token}`,
    });

    if (response.data.success) {
      setState({
        ...state,
        post: response.data.post,
      });

      if (showComments) {
        EventEmitter.dispatch('refresh');
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
    const subscriber = EventEmitter.subscribe('refresh', refreshPage);

    return () => subscriber.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadComments() {
      if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
        const response = await api.get(`/post/${state.post.id}/comments?page=${state.nextPage}`, {
          'Authorization': `Bearer ${session.token}`,
        });

        setState({
          comments: state.isRefreshing ? response.data.comments : [...state.comments, ...response.data.comments],
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
  }, [state, session, showComments]);

  const container = (
    <View style={postStyle.container}>
      {
        showAuthor && (
          <User navigation={navigation} user={state.post.author} />
        )
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('PostPage', {
          post: state.post,
          session,
        })}
      >
        <Text numberOfLines={showComments ? null : 2} style={postStyle.title}>{state.post.title}</Text>
      </TouchableOpacity>

      {
        state.post.images.length > 0 && (
          <View style={postStyle.swiper}>
            <Swiper showsButtons={state.post.images.length > 1}>
              {
                state.post.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={postStyle.image} />
                ))
              }
            </Swiper>
          </View>
        )
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('PostPage', {
          post: state.post,
          session,
        })}
      >
        <Text numberOfLines={showComments ? null : 3} style={postStyle.description}>{state.post.description}</Text>
      </TouchableOpacity>

      <View style={postStyle.footer}>
        <View style={postStyle.actions}>
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

        <View style={postStyle.actions}>
          {
            showComments && state.post.author.username === session.username && (
              <TouchableOpacity
                onPress={() => navigation.navigate('NewPostPage', {
                  post: state.post,
                  session,
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
              session,
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
            <CommentForm
              navigation={navigation}
              post={state.post}
            />

            {
              state.isLoading ? (
                <ActivityIndicator color={colors.main} size={sizes['24']} />
              ) : (
                state.comments.length > 0 ? (
                  state.comments.map(comment => (
                    <Comment key={`${comment.id}_${comment.timestamp}`} comment={comment} navigation={navigation} />
                  ))
                ) : (
                  <View style={commentStyle.container}>
                    <Text style={commentStyle.description}>There are no comments. Scroll up to refresh the page or create a new comment above.</Text>
                  </View>
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