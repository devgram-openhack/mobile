import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { commonStyle } from '../styles/Common.style';

function Team({ navigation, team }) {
  return (
    <View style={commonStyle.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TeamPage', {
          hackathon: team.hackathon,
          team,
        })}
      >
        <View style={commonStyle.info}>
          {
            team.avatar ? (
              <Image source={{ uri: team.avatar }} style={commonStyle.infoAvatarImage} />
            ) : (
              <Icon name='account-circle' style={commonStyle.infoAvatarIcon} />
            )
          }

          <View style={commonStyle.infoRight}>
            <Text style={commonStyle.infoTitleLarge}>{team.name || `Team ${team.id}`}</Text>
          </View>
        </View>

        <Text style={commonStyle.cardSubtitle}>{team.hackathon.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

Team.propTypes = {
  navigation: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export { Team };