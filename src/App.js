import React from 'react';
import { YellowBox } from 'react-native';

import { Routes } from './routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'componentWillMount is deprecated',
  'componentWillUpdate is deprecated',
  'componentWillReceiveProps is deprecated',
  'ViewPagerAndroid has been extracted',
]);

/**
 * Creates the app element.
 *
 * @returns {React.ReactElement} The app element.
 */
function App() {
  return (
    <Routes />
  );
}

export { App };