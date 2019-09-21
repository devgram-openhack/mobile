import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';
import { PostForm } from '../components/forms/PostForm';

function NewPostPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <PostForm navigation={navigation} />
    </Page>
  );
}

NewPostPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { NewPostPage };