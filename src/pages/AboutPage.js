import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { Header } from '../components/Header';

import { commonStyle } from '../styles/Common.style';

function AboutPage({ navigation }) {
  const creators = [
    {
      avatar: 'https://avatars2.githubusercontent.com/u/45578619?s=96&v=4',
      name: 'W_K.O',
      specialization: 'Design',
      url: 'https://github.com/WKO8',
    },
    {
      avatar: 'https://avatars1.githubusercontent.com/u/48861311?s=96&v=4',
      name: 'João Oliveira',
      specialization: 'Business / Design',
      url: 'https://github.com/devgram-openhack',
    },
    {
      avatar: 'https://avatars1.githubusercontent.com/u/48861311?s=96&v=4',
      name: 'Moretti',
      specialization: 'Back-End Developer',
      url: 'https://github.com/morettigustavo',
    },
    {
      avatar: 'https://avatars0.githubusercontent.com/u/25509361?s=96&v=4',
      name: 'Rafael Gomes',
      specialization: 'Front-End Developer',
      url: 'https://github.com/rafaelgssa',
    },
  ];

  return (
    <Page>
      <Header navigation={navigation} />

      <View style={commonStyle.containerScrollable}>
        <Text style={commonStyle.containerCenteredText}>This app was created by: </Text>

        {
          creators.map(creator => (
            <TouchableOpacity
              key={creator.name}
              onPress={() => Linking.openURL(creator.url)}
            >
              <View style={commonStyle.card}>
                <View style={commonStyle.info}>
                  <Image source={{ uri: creator.avatar }} style={commonStyle.infoAvatarImage} />

                  <View style={commonStyle.infoRight}>
                    <View>
                      <Text style={commonStyle.infoTitle}>{creator.name}</Text>

                      <Text style={commonStyle.infoSubtitle}>{creator.specialization}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }

        <TouchableOpacity
          onPress={() => Linking.openURL('https://producthunt.com/')}
          style={commonStyle.buttonLarge}
        >
          <Text style={commonStyle.buttonText}>RATE US</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://github.com/devgram-openhack')}
          style={commonStyle.buttonLarge}
        >
          <Text style={commonStyle.buttonText}>GITHUB</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}

AboutPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { AboutPage };