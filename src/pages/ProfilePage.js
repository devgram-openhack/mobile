import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { HeaderComponent } from '../components/HeaderComponent';
import { ProfileComponent } from '../components/ProfileComponent';

import { profilePageStyle } from './ProfilePage.style';

import matrix from '../assets/matrix.jpg';

function ProfilePage({ navigation }) {
  return (
    <SafeAreaView style={profilePageStyle.container}>
      <ImageBackground source={matrix} style={profilePageStyle.background}>
        <HeaderComponent navigation={navigation} />
        <ProfileComponent navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
}

ProfilePage.propTypes = {
  navigation: PropTypes.object.isRequired
};

export { ProfilePage };