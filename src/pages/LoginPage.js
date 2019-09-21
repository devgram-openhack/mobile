import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';
import { LoginForm } from '../components/forms/LoginForm';

function LoginPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <LoginForm navigation={navigation} />
    </Page>
  );
}

LoginPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LoginPage };