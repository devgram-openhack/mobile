import React from 'react';
import PropTypes from 'prop-types';

import { Page } from '../components/Page';
import { LogoHeader } from '../components/LogoHeader';
import { UserForm } from '../components/forms/UserForm';

function EditProfilePage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <UserForm navigation={navigation} />
    </Page>
  );
}

EditProfilePage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { EditProfilePage };