import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import SimpleToast from 'react-native-simple-toast';

import { api } from '../services/api';
import { EventEmitter } from '../services/EventEmitter';
import { PersistentStorage } from '../services/PersistentStorage';

import { Page } from './Page';
import { Header } from '../components/Header';
import { User } from '../components/User';
import { PostList } from '../components/PostList';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function ProfilePage({ navigation }) {
  const username = navigation.getParam('username');

  const [state, setState] = useState({
    isLoading: true,
    user: {},
  });

  useEffect(() => {
    const subscribers = [];

    function updateUser(updatedUser) {
      if (state.user.id === updatedUser.id) {
        setState({
          ...state,
          user: Object.assign({}, state.user, updatedUser),
        });
      }
    }

    function subscribe() {
      subscribers.push(
        EventEmitter.subscribe('edit-user', updateUser),
      );
    }

    function unsubscribe() {
      for (const subscriber of subscribers) {
        subscriber.unsubscribe();
      }
    }

    subscribe();

    return unsubscribe;
  }, [state]);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`/user/${username}`, {
        headers: {
          'Authorization': `Bearer ${PersistentStorage.session.token}`,
        },
      });

      if (response.data.success) {
        setState({
          isLoading: false,
          user: response.data.user,
        });
      } else {
        navigation.goBack();

        SimpleToast.show(response.data.message);
      }
    }

    loadUser();
  }, [navigation, username]);

  return (
    <Page>
      <Header navigation={navigation} />

      {
        state.isLoading ? (
          <View style={commonStyle.containerCentered}>
            <ActivityIndicator color={colors.main} size={sizes['40']} />
          </View>
        ) : (
          <View style={commonStyle.containerFull}>
            <User navigation={navigation} user={state.user} showDescription={true} />

            <PostList navigation={navigation} authorUsername={username} />
          </View>
        )
      }
    </Page>
  );
}

ProfilePage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { ProfilePage };