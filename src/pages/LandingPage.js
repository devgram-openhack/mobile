import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';

import { PersistentStorage } from '../services/PersistentStorage';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function LandingPage({ navigation }) {
  useEffect(() => {
    async function checkLoggedIn() {
      await PersistentStorage.loadSession();

      if (PersistentStorage.session.token) {
        navigation.navigate('MainPage');
      } else {
        navigation.navigate('AuthPage');
      }
    }

    checkLoggedIn();
  }, [navigation]);

  return (
    <Page>
      <LogoHeader />

      <View style={commonStyle.containerCentered}>
        <ActivityIndicator color={colors.main} size={sizes['40']} />
      </View>
    </Page>
  );
}

LandingPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LandingPage };