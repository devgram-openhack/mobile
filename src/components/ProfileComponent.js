import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { PostListComponent } from './PostListComponent';

import { profileComponentStyle } from './ProfileComponent.style';

// To simulate the profile until the functionality is implemented
const FAKE_PROFILE = {
  avatar: 'https://avatars0.githubusercontent.com/u/25509361?s=460',
  name: 'Carl Grimes',
  username: 'carl',
  role: 'Designer',
  team: 'Bookcademers',
  about: 'I\'m from California, 22 years old, and have 3-year experience with UX design.'
};

function ProfileComponent({ details, navigation }) {
  if (!details) {
    details = FAKE_PROFILE;
  }

  return (
    <View style={profileComponentStyle.container}>
      <View style={profileComponentStyle.infoContainer}>
        <View style={profileComponentStyle.info}>
          <Image source={{uri: details.avatar }} style={profileComponentStyle.avatar}/>

          <View>
            <Text style={profileComponentStyle.name}>{`${details.name} (@${details.username})`}</Text>

            <Text style={profileComponentStyle.role}>{`${details.role} (${details.team})`}</Text>
          </View>
        </View>

        <Text style={profileComponentStyle.about}>{details.about}</Text>
      </View>

      <PostListComponent authorUsername={details.username} navigation={navigation} isMainList={true} />
    </View>
  );
}

ProfileComponent.propTypes = {
  details: PropTypes.object,
  navigation: PropTypes.object.isRequired
};

export { ProfileComponent };