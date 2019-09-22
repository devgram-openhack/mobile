import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import { PersistentStorage } from '../services/PersistentStorage';

import { commonStyle } from '../styles/Common.style';
import { userStyle } from '../styles/User.style';

function User({ navigation, user, showDescription }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const userView = (
    <View style={showDescription ? commonStyle.infoFull : commonStyle.info}>
      {
        user.avatar ? (
          <Image source={{ uri: user.avatar }} style={commonStyle.infoAvatarImage} />
        ) : (
          <Icon name='account-circle' style={commonStyle.infoAvatarIcon} />
        )
      }

      <View style={commonStyle.infoRight}>
        <View>
          <Text style={commonStyle.infoTitle}>{`${user.name} (@${user.username})`}</Text>

          <Text style={commonStyle.infoSubtitle}>{user.specialization}</Text>
        </View>

        {
          showDescription && (
            <View style={commonStyle.infoActions}>
              {
                user.username === PersistentStorage.session.username && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfilePage', { user })}
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
  user: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
};

export { User };