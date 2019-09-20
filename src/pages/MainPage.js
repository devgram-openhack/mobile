import React from 'react';
import PropTypes from 'prop-types';

import { Page } from '../components/Page';
import { Header } from '../components/Header';
import { PostList } from '../components/PostList';
import { FloatingButton } from '../components/FloatingButton';

function MainPage({ navigation }) {
  return (
    <Page>
      <Header navigation={navigation} />

      <PostList navigation={navigation} />

      <FloatingButton navigation={navigation} />
    </Page>
  );
}

MainPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { MainPage };