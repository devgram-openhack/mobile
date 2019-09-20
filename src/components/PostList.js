import React, {
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { api } from '../services/api';

import { Post } from './Post';

import { colors } from '../styles/colors';
import { postListStyle } from '../styles/PostList.style';

async function loadPosts(params, session, state, setState) {
  if (!state.isLastPage) {
    const url = params.authorUsername ? `/user/${params.authorUsername}/posts?page=${state.nextPage}` : `/posts?page=${state.nextPage}`;

    const response = await api.get(url, {
      'Authorization': `Bearer ${session.token}`,
    });

    setState({
      isLastPage: response.data.isLastPage,
      isLoading: false,
      isRefreshing: false,
      nextPage: state.nextPage + 1,
      posts: state.isRefreshing ? response.data.posts : [...state.posts, ...response.data.posts],
    });
  }
}

async function refreshPage(params, session, state, setState) {
  const newState = {
    ...state,
    isLastPage: false,
    isRefreshing: true,
    nextPage: 1,
  };

  setState(newState);

  await loadPosts(params, session, newState, setState);
}

function PostList({ navigation, params }) {
  if (!params) {
    params = {};
  }

  const session = navigation.getParam('session');

  const [state, setState] = useState({
    isLastPage: false,
    isLoading: true,
    isRefreshing: false,
    nextPage: 1,
    posts: [],
  });

  useEffect(() => { loadPosts(params, session, state, setState); }, []);

  return (
    state.isLoading ? (
      <View style={postListStyle.emptyContainer}>
        <ActivityIndicator
          color={colors.main}
          size={moderateScale(40)}
        />
      </View>
    ) : (
      state.posts.length > 0 ? (
        <FlatList
          contentContainerStyle={postListStyle.container}
          data={state.posts}
          keyExtractor={item => `${item.id}_${item.modifiedTimestamp}`}
          onRefresh={() => refreshPage(params, session, state, setState)}
          onEndReached={() => loadPosts(params, session, state, setState)}
          onEndReachedThreshold={0.5}
          refreshing={state.isRefreshing}
          renderItem={({ item }) => (
            <Post
              navigation={navigation}
              params={{
                showAuthor: !params.authorUsername,
              }}
              post={item}
            />
          )}
        />
      ) : (
        <ScrollView
          contentContainerStyle={postListStyle.container}
          refreshControl={(
            <RefreshControl
              refreshing={state.isRefreshing}
              onRefresh={() => refreshPage(params, session, state, setState)}
            />
          )}
        >
          <View style={postListStyle.emptyContainer}>
            <Icon name='highlight-off' style={postListStyle.emptyContainerIcon} />

            <Text style={postListStyle.emptyContainerText}>
              {
                params.authorUsername ? (
                  'This user has no posts. Scroll up to refresh the page.'
                ) : (
                  'There are no posts. Scroll up to refresh the page or press the button at the bottom of the screen to create a new post.'
                )
              }
            </Text>
          </View>
        </ScrollView>
      )
    )
  );
}

PostList.propTypes = {
  navigation: PropTypes.object.isRequired,
  params: PropTypes.shape({
    authorUsername: PropTypes.string,
  }),
};

export { PostList };