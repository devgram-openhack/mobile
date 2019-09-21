import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { floatingButtonStyle } from '../styles/FloatingButton.style';

function FloatingButton({ navigation }) {
  const session = navigation.getParam('session');

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewPostPage', { session })}
      style={floatingButtonStyle.button}
    >
      <Icon name='add-circle' style={floatingButtonStyle.buttonIcon} />
    </TouchableOpacity>
  );
}

FloatingButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { FloatingButton };