import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { HeaderComponent } from '../components/HeaderComponent';
import { PostListComponent } from '../components/PostListComponent';

import { postPageStyle } from './PostPage.style';

import matrix from '../assets/matrix.jpg';

function PostPage({ navigation }) {
  const details = navigation.getParam('details');

  return (
    <SafeAreaView style={postPageStyle.container}>
      <ImageBackground source={matrix} style={postPageStyle.background}>
        <HeaderComponent navigation={navigation} />
        <PostListComponent initialPosts={[details]} navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
}

PostPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

export { PostPage };