import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { Header } from '../components/Header';
import { PostList } from '../components/PostList';
import { Footer } from '../components/Footer';

function MainPage({ navigation }) {
  return (
    <Page>
      <Header navigation={navigation} />

      <PostList navigation={navigation} />

      <Footer navigation={navigation} />
    </Page>
  );
}

MainPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { MainPage };