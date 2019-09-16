import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';

import { footerComponentStyle } from './FooterComponent.style';

function FooterComponent({ navigation }) {
  return (
    <View style={footerComponentStyle.container}>
      <TouchableOpacity
        onLongPress={() => Toast.show('Create a new post')}
        onPress={() => navigation.navigate('NewPostPage')}
      >
        <Icon name='add-circle' style={footerComponentStyle.newPostIcon} />
      </TouchableOpacity>
    </View>
  );
}

FooterComponent.propTypes = {
  navigation: PropTypes.object.isRequired
};

export { FooterComponent };