import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { footerStyle } from '../styles/Footer.style';

function Footer({ navigation }) {
  return (
    <View style={footerStyle.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HackathonsPage')}
      >
        <Icon name='code' style={footerStyle.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('NewPostPage')}
      >
        <Icon name='add-circle' style={footerStyle.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('TeamsPage')}
      >
        <Icon name='people' style={footerStyle.icon} />
      </TouchableOpacity>
    </View>
  );
}

Footer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { Footer };