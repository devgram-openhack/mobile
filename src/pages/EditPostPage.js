import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';
import { PostForm } from '../components/forms/PostForm';

function EditPostPage({ navigation }) {
  const post = navigation.getParam('post');

  return (
    <Page>
      <LogoHeader />

      <PostForm navigation={navigation} post={post} />
    </Page>
  );
}

EditPostPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { EditPostPage };