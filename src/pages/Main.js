import React from 'react';
import {
  SafeAreaView,
  Text,
  View
} from 'react-native';

import { mainStyle } from './Main.style';

/**
 * Creates the main element.
 *
 * @returns {React.ReactElement} The main element.
 */
function Main() {
  return (
    <SafeAreaView style={mainStyle.container}>
      <View>
        <Text>DevGram</Text>
      </View>
    </SafeAreaView>
  );
}

export { Main };