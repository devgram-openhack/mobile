import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { commonStyle } from '../styles/Common.style';
import { commentStyle } from '../styles/Comment.style';

function Comment({ navigation, comment }) {
  return (
    <View style={commentStyle.container}>
      {
        comment.author && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfilePage', {
              username: comment.author.username,
            })}
          >
            <Text style={commonStyle.infoTitle}>{`${comment.author.name} (@${comment.author.username})`}</Text>

            <Text style={commonStyle.infoSubtitle}>{comment.author.specialization}</Text>
          </TouchableOpacity>
        )
      }

      <Text style={commentStyle.description}>{comment.description}</Text>
    </View>
  );
}

Comment.propTypes = {
  navigation: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

export { Comment };