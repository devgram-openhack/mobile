import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';

import { headerComponentStyle } from './HeaderComponent.style';

function HeaderComponent({ navigation }) {
  return (
    <View style={headerComponentStyle.container}>
      <TouchableOpacity
        onLongPress={() => Toast.show('Open menu')}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" style={headerComponentStyle.menuIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onLongPress={() => Toast.show('Go to main page')}
        onPress={() => navigation.navigate('MainPage')}
      >
        <Text style={headerComponentStyle.title}>DEVGRAM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onLongPress={() => Toast.show('Manage account')}
        onPress={() => navigation.navigate('ProfilePage')}
      >
        <Icon name="account-circle" style={headerComponentStyle.accountIcon} />
      </TouchableOpacity>
    </View>
  );
}

HeaderComponent.propTypes = {
  navigation: PropTypes.object.isRequired
};

export { HeaderComponent };