import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import { api } from '../services/api';

import { commonStyle } from '../styles/Common.style';
import { postStyle } from '../styles/Post.style';

function Hackathon({ details, navigation }) {
  const session = navigation.getParam('session');

  const [hackathon, setHackathon] = useState(details);

  async function handleHackathon() {
    if (hackathon.isParticipating) {
      navigation.navigate('TeamsPage', { hackathon });
    } else {
      const response = await api.post(`/hackathon/${hackathon.id}/join`, {
        'Authorization': `Bearer ${session.token}`
      });

      if (response.data.success) {
        setHackathon({
          ...hackathon,
          isParticipating: true,
        });
      }
    }
  }

  return (
    <View style={postStyle.container}>
      <Text style={postStyle.title}>{hackathon.title}</Text>

      {
        hackathon.images.length > 0 && (
          <View style={postStyle.swiper}>
            <Swiper showsButtons={hackathon.images.length > 1}>
              {
                hackathon.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={postStyle.image} />
                ))
              }
            </Swiper>
          </View>
        )
      }

      <Text style={postStyle.description}>{hackathon.description}</Text>

      <TouchableOpacity
        disabled={!hackathon.isOpen}
        onPress={handleHackathon}
        style={commonStyle.buttonLarge}
      >
        <Text style={commonStyle.buttonText}>{hackathon.isParticipating ? 'VIEW TEAM' : (hackathon.isOpen ? 'JOIN' : 'ENDED')}</Text>
      </TouchableOpacity>
    </View>
  );
}

Hackathon.propTypes = {
  details: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export { Hackathon };