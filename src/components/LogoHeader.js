import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import { logoHeaderStyle } from '../styles/LogoHeader.style';

function LogoHeader() {
  return (
    <View style={logoHeaderStyle.container}>
      <Text style={logoHeaderStyle.logo}>DEVGRAM</Text>
    </View>
  );
}

export { LogoHeader };