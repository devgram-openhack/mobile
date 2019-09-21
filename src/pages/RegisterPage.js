import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';
import { UserForm } from '../components/forms/UserForm';

function RegisterPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <UserForm navigation={navigation} />
    </Page>
  );
}

RegisterPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { RegisterPage };