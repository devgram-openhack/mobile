import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { PersistentStorage } from '../services/PersistentStorage';

import { headerStyle } from '../styles/Header.style';

function Header({ navigation }) {
  const { username } = PersistentStorage.session;

  return (
    <View style={headerStyle.container}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
      >
        <Icon name='menu' style={headerStyle.menuIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MainPage')}
      >
        <Text style={headerStyle.logo}>DEVGRAM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ProfilePage', { username })}
      >
        <Icon name='account-circle' style={headerStyle.accountIcon} />
      </TouchableOpacity>
    </View>
  );
}

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { Header };