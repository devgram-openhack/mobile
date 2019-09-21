import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import { api } from '../services/api';
import { EventEmitter } from '../services/EventEmitter';

import { Post } from './Post';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function PostList({ authorUsername, navigation }) {
  const session = navigation.getParam('session');

  const [state, setState] = useState({
    isLastPage: false,
    isLoading: true,
    isLoadingNext: false,
    isRefreshing: false,
    nextPage: 1,
    posts: [],
  });

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
      setState({
        ...state,
        posts: state.posts.map(post => {
          if (post.id === updatedPost.id) {
            post = Object.assign({}, post, updatedPost);
            post.uuid = uuid();
          }

          return post;
        }),
      });
    }

    function updateAuthor(updatedAuthor) {
      setState({
        ...state,
        posts: state.posts.map(post => {
          if (post.author.id === updatedAuthor.id) {
            post.author = Object.assign({}, post.author, updatedAuthor);
            post.uuid = uuid();
          }

          return post;
        }),
      });
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
        EventEmitter.subscribe('new-post', refreshPage),
        EventEmitter.subscribe('edit-post', updatePost),
        EventEmitter.subscribe('edit-user', updateAuthor),
        EventEmitter.subscribe('like', updatePost),
        EventEmitter.subscribe('dislike', updatePost),
        EventEmitter.subscribe('new-comment', updatePost),
      );
    }

    function unsubscribe() {
      for (const subscriber of subscribers) {
        subscriber.unsubscribe();
      }
    }

    subscribe();

    return unsubscribe;
  }, [state]);

  useEffect(() => {
    async function loadPosts() {
      if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
        const url = authorUsername ? `/user/${authorUsername}/posts?page=${state.nextPage}` : `/posts?page=${state.nextPage}`;

        const response = await api.get(url, {
          'Authorization': `Bearer ${session.token}`,
        });

        const posts = (state.isRefreshing ? response.data.posts : [...state.posts, ...response.data.posts])
          .map(post => {
            if (!post.uuid) {
              post.uuid = uuid();
            }

            return post;
          });

        setState({
          isLastPage: response.data.isLastPage,
          isLoading: false,
          isLoadingNext: false,
          isRefreshing: false,
          nextPage: state.nextPage + 1,
          posts,
        });
      }
    }

    loadPosts();
  }, [authorUsername, state, session]);

  return (
    state.isLoading ? (
      <View style={commonStyle.containerCentered}>
        <ActivityIndicator color={colors.main} size={sizes['40']} />
      </View>
    ) : (
      state.posts.length > 0 ? (
        <FlatList
          contentContainerStyle={commonStyle.containerScrollable}
          data={state.posts}
          keyExtractor={item => item.uuid}
          onRefresh={refreshPage}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.5}
          refreshing={state.isRefreshing}
          renderItem={({ item }) => (
            <Post navigation={navigation} post={item} showAuthor={!authorUsername} />
          )}
        />
      ) : (
        <ScrollView
          contentContainerStyle={commonStyle.containerScrollable}
          refreshControl={(
            <RefreshControl
              refreshing={state.isRefreshing}
              onRefresh={refreshPage}
            />
          )}
        >
          <View style={commonStyle.containerCentered}>
            <Icon name='highlight-off' style={commonStyle.containerCenteredIcon} />

            <Text style={commonStyle.containerCenteredText}>{authorUsername ? 'This user has no posts. Scroll up to refresh the page.' : 'There are no posts. Scroll up to refresh the page or use the button at the footer to create a new post.'}</Text>
          </View>
        </ScrollView>
      )
    )
  );
}

PostList.propTypes = {
  authorUsername: PropTypes.string,
  navigation: PropTypes.object.isRequired,
};

export { PostList };