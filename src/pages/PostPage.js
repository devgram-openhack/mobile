import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { Header } from '../components/Header';
import { Post } from '../components/Post';

function PostPage({ navigation }) {
  const post = navigation.getParam('post');

  return (
    <Page>
      <Header navigation={navigation} />

      <Post navigation={navigation} post={post} showAuthor={true} showComments={true} />
    </Page>
  );
}

PostPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { PostPage };