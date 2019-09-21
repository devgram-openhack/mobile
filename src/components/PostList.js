import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

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
    const subscriber = EventEmitter.subscribe('refresh', refreshPage);

    return () => subscriber.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadPosts() {
      if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
        const url = authorUsername ? `/user/${authorUsername}/posts?page=${state.nextPage}` : `/posts?page=${state.nextPage}`;

        const response = await api.get(url, {
          'Authorization': `Bearer ${session.token}`,
        });

        setState({
          isLastPage: response.data.isLastPage,
          isLoading: false,
          isLoadingNext: false,
          isRefreshing: false,
          nextPage: state.nextPage + 1,
          posts: state.isRefreshing ? response.data.posts : [...state.posts, ...response.data.posts],
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
          keyExtractor={item => `${item.id}_${item.timestamp}_${item.author.timestamp}`}
          onRefresh={refreshPage}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.5}
          refreshing={state.isRefreshing}
          renderItem={({ item }) => (
            <Post
              navigation={navigation}
              post={item}
              showAuthor={!authorUsername}
            />
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

            <Text style={commonStyle.containerCenteredText}>{authorUsername ? 'This user has no posts. Scroll up to refresh the page.' : 'There are no posts. Scroll up to refresh the page or press the floating button at the corner of the screen to create a new post.'}</Text>
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