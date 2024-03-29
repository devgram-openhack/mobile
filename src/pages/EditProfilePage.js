import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { LogoHeader } from '../components/LogoHeader';
import { UserForm } from '../components/forms/UserForm';

function EditProfilePage({ navigation }) {
  const user = navigation.getParam('user');

  return (
    <Page>
      <LogoHeader />

      <UserForm navigation={navigation} user={user} />
    </Page>
  );
}

EditProfilePage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { EditProfilePage };