import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { commentStyle } from '../styles/Comment.style';
import { userStyle } from '../styles/User.style';

function Comment({ navigation, comment }) {
  const session = navigation.getParam('session');

  return (
    <View style={commentStyle.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfilePage', {
          session,
          username: comment.author.username,
        })}
      >
        <Text style={userStyle.name}>{`${comment.author.name} (@${comment.author.username})`}</Text>

        <Text style={userStyle.specialization}>{comment.author.specialization}</Text>
      </TouchableOpacity>

      <Text style={commentStyle.description}>{comment.description}</Text>
    </View>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export { Comment };