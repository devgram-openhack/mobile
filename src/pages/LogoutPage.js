import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';
import { LogoutForm } from '../components/forms/LogoutForm';

function LogoutPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <LogoutForm navigation={navigation} />
    </Page>
  );
}

LogoutPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LogoutPage };