import React from 'react';
import { YellowBox } from 'react-native';

import { Routes } from './routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
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