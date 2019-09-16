import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';

import { footerComponentStyle } from './FooterComponent.style';

function FooterComponent() {
  return (
    <View style={footerComponentStyle.container}>
      <TouchableOpacity
        onLongPress={() => Toast.show('Create a new post') }
        onPress={() => Toast.show('Not working yet')} // TODO: Implement new post page
      >
        <Icon name='add-circle' style={footerComponentStyle.newPostIcon} />
      </TouchableOpacity>
    </View>
  );
}

export { FooterComponent };