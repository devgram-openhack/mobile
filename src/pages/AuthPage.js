import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { Page } from '../components/Page';
import { LogoHeader } from '../components/LogoHeader';

import { commonStyle } from '../styles/Common.style';

function AuthPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <View style={commonStyle.containerCentered}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginPage')}
          style={commonStyle.buttonLarge}
        >
          <Text style={commonStyle.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterPage')}
          style={commonStyle.buttonLarge}
        >
          <Text style={commonStyle.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}

AuthPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { AuthPage };