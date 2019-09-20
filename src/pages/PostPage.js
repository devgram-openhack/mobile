import React from 'react';
import PropTypes from 'prop-types';

import { Page } from '../components/Page';
import { Header } from '../components/Header';
import { Post } from '../components/Post';

function PostPage({ navigation }) {
  const post = navigation.getParam('post');

  return (
    <Page>
      <Header navigation={navigation} />

      <Post
        navigation={navigation}
        params={{
          showAuthor: true,
          showComments: true,
        }}
        post={post}
      />
    </Page>
  );
}

PostPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { PostPage };