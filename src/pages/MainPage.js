import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { HeaderComponent } from '../components/HeaderComponent';
import { PostListComponent } from '../components/PostListComponent';
import { FooterComponent } from '../components/FooterComponent';

import { mainPageStyle } from './MainPage.style';

import matrix from '../assets/matrix.jpg';

function MainPage({ navigation }) {
  return (
    <SafeAreaView style={mainPageStyle.container}>
      <ImageBackground source={matrix} style={mainPageStyle.background}>
        <HeaderComponent navigation={navigation} />
        <PostListComponent isMainList={true} navigation={navigation} />
        <FooterComponent />
      </ImageBackground>
    </SafeAreaView>
  );
}

MainPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

export { MainPage };