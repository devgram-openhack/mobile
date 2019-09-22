import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';
import { TeamForm } from '../components/forms/TeamForm';

function EditTeamPage({ navigation }) {
  const team = navigation.getParam('team');

  return (
    <Page>
      <LogoHeader />

      <TeamForm navigation={navigation} team={team} />
    </Page>
  );
}

EditTeamPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { EditTeamPage };