import React, {
  useEffect,
} from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { Page } from '../components/Page';
import { LogoHeader } from '../components/LogoHeader';

import { colors } from '../styles/colors';
import { commonStyle } from '../styles/Common.style';

async function checkLoggedIn(navigation) {
  const session = JSON.parse((await AsyncStorage.getItem('session')) || '{}');

  if (session.token) {
    navigation.navigate('MainPage', { session });
  } else {
    navigation.navigate('AuthPage');
  }
}

function LandingPage({ navigation }) {
  useEffect(() => { checkLoggedIn(navigation); }, []);

  return (
    <Page>
      <LogoHeader />

      <View style={commonStyle.containerCentered}>
        <ActivityIndicator
          color={colors.main}
          size={moderateScale(40)}
        />
      </View>
    </Page>
  );
}

LandingPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LandingPage };