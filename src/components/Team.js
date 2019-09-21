import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { postStyle } from '../styles/Post.style';

function Team({ navigation, team }) {
  const session = navigation.getParam('session');

  return (
    <View style={postStyle.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TeamPage', {
          hackathon: team.hackathon,
          session,
          team: Object.assign({}, team),
        })}
      >
        <Text style={postStyle.title}>{team.title || `Team ${team.id}`}</Text>

        <Text style={postStyle.subtitle}>{team.hackathon.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

Team.propTypes = {
  navigation: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export { Team };