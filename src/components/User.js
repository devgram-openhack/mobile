import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import { commonStyle } from '../styles/Common.style';
import { userStyle } from '../styles/User.style';

function User({ navigation, showDescription, user }) {
  const session = navigation.getParam('session');

  const [isModalVisible, setModalVisible] = useState(false);

  const userView = (
    <View style={showDescription ? userStyle.containerWithDescription : userStyle.container}>
      {
        user.avatar ? (
          <Image source={{ uri: user.avatar }} style={userStyle.avatarImage} />
        ) : (
          <Icon name='account-circle' style={userStyle.avatarIcon} />
        )
      }

      <View style={userStyle.containerRight}>
        <View>
          <Text style={userStyle.name}>{`${user.name} (@${user.username})`}</Text>

          <Text style={userStyle.specialization}>{user.specialization}</Text>
        </View>

        {
          showDescription && (
            <View style={userStyle.actions}>
              {
                user.username === session.username && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfilePage', { session, user })}
                  >
                    <Icon name='edit' style={userStyle.editIcon} />
                  </TouchableOpacity>
                )
              }

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
              >
                <Icon name='note' style={userStyle.descriptionIcon} />
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </View>
  );

  return (
    <View>
      {
        showDescription ? (
          userView
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfilePage', {
              session,
              username: user.username,
            })}
          >
            {userView}
          </TouchableOpacity>
        )
      }

      <Modal
        backdropOpacity={0.8}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View style={commonStyle.containerCentered}>
          <Text style={userStyle.description}>{user.description}</Text>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={commonStyle.buttonLarge}
          >
            <Text style={commonStyle.buttonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

User.propTypes = {
  navigation: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

export { User };