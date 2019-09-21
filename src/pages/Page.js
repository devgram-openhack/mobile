import React from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';

import { pageStyle } from '../styles/Page.style';

import matrix from '../assets/matrix.jpg';

function Page({ children }) {
  return (
    <SafeAreaView>
      <ImageBackground source={matrix} style={pageStyle.background}>
        <View style={pageStyle.container}>
          {children}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export { Page };