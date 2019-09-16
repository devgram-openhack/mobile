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

      <Text style={headerComponentStyle.title}>DEVGRAM</Text>

      <TouchableOpacity
        onLongPress={() => Toast.show('Manage account')}
        onPress={() => Toast.show('Not working yet')} // TODO: Implement account management page
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