import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { HeaderComponent } from '../components/HeaderComponent';
import { NewPostComponent } from '../components/NewPostComponent';

import { newPostPageStyle } from './NewPostPage.style';

import matrix from '../assets/matrix.jpg';

function NewPostPage({ navigation }) {
  return (
    <SafeAreaView style={newPostPageStyle.container}>
      <ImageBackground source={matrix} style={newPostPageStyle.background}>
        <HeaderComponent navigation={navigation} />
        <NewPostComponent navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
}

NewPostPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

export { NewPostPage };