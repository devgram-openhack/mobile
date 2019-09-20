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

function App() {
  return (
    <Routes />
  );
}

export { App };