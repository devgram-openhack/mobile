import React, { useState } from 'react';
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { utils } from '../utils';
import { PostComponent } from './PostComponent';

import { postListComponentStyle } from './PostListComponent.style';

// To simulate the posts until the API call is implemented
const FAKE_POSTS = [
  {
    id: '0',
    authorAvatar: 'https://avatars0.githubusercontent.com/u/25509361?s=460',
    authorName: 'Carl Grimes',
    authorUsername: 'carl',
    authorRole: 'Designer',
    authorTeam: 'Bookcademers',
    title: 'Project: Bookcademy',
    images: [
      {
        id: '0',
        url: 'https://ph-files.imgix.net/d6e8efc6-3f40-4fc4-89e7-8b7322929eb8?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=627.97583081571&h=380&fit=max'
      },
      {
        id: '1',
        url: 'https://ph-files.imgix.net/84cb3681-d9eb-4c6f-98ee-930ef39c6f08?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=492.4260355029586&h=380&fit=max'
      }
    ],
    text: 'Hello everyone, this is the first draft of our project, we would appreciate your feedback.\n\nBooks are no longer theoretical knowledge. We turn non-fiction books into a fun, useful and practical way to learn. Each book is a course!',
    likes: 195,
    dislikes: 6,
    comments: [{
      id: '0',
      authorName: 'Enid',
      authorUsername: 'enid',
      authorRole: 'Designer',
      authorTeam: 'Team 10',
      text: 'Very cool!'
    }, {
      id: '1',
      authorName: 'Henry Peletier',
      authorUsername: 'henry',
      authorRole: 'Developer',
      authorTeam: 'Team 10',
      text: 'Wow!'
    }, {
      id: '2',
      authorName: 'Maggie Rhee',
      authorUsername: 'maggie',
      authorRole: 'Mentor',
      authorTeam: 'Staff',
      text: 'This is a really good project that could solve many problems. Congratulations!'
    }]
  },
  {
    id: '1',
    authorAvatar: 'https://avatars0.githubusercontent.com/u/25509362?s=460',
    authorName: 'Henry Peletier',
    authorUsername: 'henry',
    authorRole: 'Developer',
    authorTeam: 'Team 10',
    title: 'Idea: Humans',
    images: [
      {
        id: '0',
        url: 'https://ph-files.imgix.net/a6c447c1-de7f-4e96-9062-f9d3b4dcbb05?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=635&h=380&fit=max'
      }
    ],
    text: 'We don\'t have much experience with Hackathons, so we just want some feedback for the idea that we had.\n\nWe thought about implementing a curated gallery featuring the world\'s best personal websites. The list would consist of projects built with various technologies and services: React, Angular, Vue, WP and even Wix or About.me sites.\n\nYou can see a very basic prototype in the image above.',
    likes: 155,
    dislikes: 3,
    comments: []
  }
];

function PostListComponent({ initialPosts, isMainList, navigation }) {
  const [postList, setPostList] = useState({ isRefreshing: false, posts: initialPosts || [] });

  // TODO: Implement API call
  async function refreshPosts() {
    setPostList({ isRefreshing: true, posts: [] });

    await utils.timeout(1);

    setPostList({ isRefreshing: false, posts: FAKE_POSTS });
  }

  return (
    <ScrollView
      contentContainerStyle={postListComponentStyle.container}
      refreshControl={
        isMainList
          ? (
            <RefreshControl onRefresh={refreshPosts} refreshing={postList.isRefreshing} />
          )
          : (
            null
          )
      }
    >
      {
        postList.posts.length > 0
          ? (
            <FlatList
              data={postList.posts}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <PostComponent details={item} isMainList={isMainList} navigation={navigation} />
              )}
            />
          )
          : (
            <View style={postListComponentStyle.emptyContainer}>
              <Icon name='highlight-off' style={postListComponentStyle.emptyContainerIcon} />

              <Text style={postListComponentStyle.emptyContainerText}>No posts to show. Scroll up to refresh the page or press the button at the bottom of the screen to create a new post.</Text>
            </View>
          )
      }
    </ScrollView>
  );
}

PostListComponent.propTypes = {
  initialPosts: PropTypes.array,
  isMainList: PropTypes.bool,
  navigation: PropTypes.object.isRequired
};

export { PostListComponent };