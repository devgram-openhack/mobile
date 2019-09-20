import React, {
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { api } from '../services/api';

import { Page } from '../components/Page';
import { Header } from '../components/Header';
import { PostList } from '../components/PostList';

import { colors } from '../styles/colors';
import { commonStyle } from '../styles/Common.style';
import { profilePageStyle } from '../styles/ProfilePage.style';

async function loadUser(navigation, session, username, setState) {
  const response = await api.get(`/user/${username}`, {
    'Authorization': `Bearer ${session.token}`,
  });

  if (response.data.success) {
    setState({
      isLoading: false,
      isModalVisible: false,
      user: response.data.user,
    });
  } else {
    navigation.goBack();
  }
}

function ProfilePage({ navigation }) {
  const session = navigation.getParam('session');
  const username = navigation.getParam('username');

  const [state, setState] = useState({
    isLoading: true,
    isModalVisible: false,
    user: {},
  });

  useEffect(() => { loadUser(navigation, session, username, setState); }, []);

  return (
    <Page>
      <Header navigation={navigation} />

      {
        state.isLoading ? (
          <View style={commonStyle.containerCentered}>
            <ActivityIndicator
              color={colors.main}
              size={moderateScale(40)}
            />
          </View>
        ) : (
          <View style={profilePageStyle.container}>
            <View style={profilePageStyle.userContainer}>
              {
                state.user.avatar ? (
                  <Image source={{ uri: state.user.avatar }} style={profilePageStyle.userAvatar}/>
                ) : (
                  <Icon name='account-circle' style={profilePageStyle.userAvatarIcon} />
                )
              }

              <View style={profilePageStyle.userContainerRight}>
                <View>
                  <Text style={profilePageStyle.userName}>{`${state.user.name} (@${state.user.username})`}</Text>

                  <Text style={profilePageStyle.userRole}>{state.user.specialization}</Text>
                </View>

                <View style={profilePageStyle.userActions}>
                  {
                    username === session.username && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfilePage', {
                          session,
                          user: state.user,
                        })}
                      >
                        <Icon name='edit' style={profilePageStyle.userEditIcon} />
                      </TouchableOpacity>
                    )
                  }

                  <TouchableOpacity
                    onPress={() => setState({
                      ...state,
                      isModalVisible: true,
                    })}
                  >
                    <Icon name='note' style={profilePageStyle.userDescriptionIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <PostList
              navigation={navigation}
              params={{
                authorUsername: username,
              }}
            />
          </View>
        )
      }

      <Modal
        backdropOpacity={0.8}
        isVisible={state.isModalVisible}
        onBackButtonPress={() => setState({
          ...state,
          isModalVisible: false,
        })}
      >
        <View style={profilePageStyle.userDescriptionContainer}>
          <Text style={profilePageStyle.userDescription}>{state.user.description}</Text>

          <TouchableOpacity
            onPress={() => setState({
              ...state,
              isModalVisible: false,
            })}
            style={commonStyle.buttonLarge}
          >
            <Text style={commonStyle.buttonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Page>
  );
}

ProfilePage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { ProfilePage };