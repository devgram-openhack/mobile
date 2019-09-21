import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { Header } from '../components/Header';
import { TeamList } from '../components/TeamList';

function TeamsPage({ navigation }) {
  return (
    <Page>
      <Header navigation={navigation} />

      <TeamList navigation={navigation} />
    </Page>
  );
}

TeamsPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { TeamsPage };