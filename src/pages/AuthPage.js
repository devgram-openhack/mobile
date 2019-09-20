import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { Page } from '../components/Page';
import { LogoHeader } from '../components/LogoHeader';

import { authPageStyle } from '../styles/AuthPage.style';

function AuthPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <View style={authPageStyle.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginPage')}
          style={authPageStyle.button}
        >
          <Text style={authPageStyle.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterPage')}
          style={authPageStyle.button}
        >
          <Text style={authPageStyle.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}

AuthPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { AuthPage };