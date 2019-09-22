import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import { api } from '../services/api';
import { PersistentStorage } from '../services/PersistentStorage';

import { commonStyle } from '../styles/Common.style';

function Hackathon({ navigation, details }) {
  const [hackathon, setHackathon] = useState(details);

  async function handleHackathon() {
    if (hackathon.isParticipating) {
      navigation.navigate('TeamPage', { hackathon });
    } else {
      const response = await api.post(`/hackathon/${hackathon.id}/join`, null, {
        headers: {
          'Authorization': `Bearer ${PersistentStorage.session.token}`,
        },
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
    <View style={commonStyle.card}>
      <Text style={commonStyle.cardTitle}>{hackathon.name}</Text>

      {
        hackathon.images.length > 0 && (
          <View style={commonStyle.cardSwiper}>
            <Swiper showsButtons={hackathon.images.length > 1}>
              {
                hackathon.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={commonStyle.cardSwiperImage} />
                ))
              }
            </Swiper>
          </View>
        )
      }

      <Text style={commonStyle.cardDescription}>{hackathon.description}</Text>

      <TouchableOpacity
        disabled={!hackathon.isParticipating && !hackathon.isOpen}
        onPress={handleHackathon}
        style={commonStyle.buttonLarge}
      >
        <Text style={commonStyle.buttonText}>{hackathon.isParticipating ? 'VIEW TEAM' : (hackathon.isOpen ? 'JOIN' : 'ENDED')}</Text>
      </TouchableOpacity>
    </View>
  );
}

Hackathon.propTypes = {
  navigation: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
};

export { Hackathon };