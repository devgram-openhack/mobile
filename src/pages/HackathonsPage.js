import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { Header } from '../components/Header';
import { HackathonList } from '../components/HackathonList';

function HackathonsPage({ navigation }) {
  return (
    <Page>
      <Header navigation={navigation} />

      <HackathonList navigation={navigation} />
    </Page>
  );
}

HackathonsPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { HackathonsPage };