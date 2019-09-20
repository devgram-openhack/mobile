import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { api } from '../services/api';

import { Page } from '../components/Page';
import { LogoHeader } from '../components/LogoHeader';

import { colors } from '../styles/colors';
import { logoutPageStyle } from '../styles/LogoutPage.style';

async function handleLogout(navigation, formikActions) {
  const session = JSON.parse((await AsyncStorage.getItem('session')) || '{}');

  const response = await api.post('/logout', session);

  if (response.data.success) {
    await AsyncStorage.removeItem('session');

    navigation.navigate('AuthPage');
  } else {
    formikActions.setSubmitting(false);
    formikActions.setStatus(response.data.message);
  }
}

function LogoutPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <Formik
        onSubmit={(values, formikActions) => handleLogout(navigation, formikActions)}
      >
        {
          ({
            handleSubmit,
            isSubmitting,
            status,
          }) => (
            <View style={logoutPageStyle.container}>
              {
                !!status && (
                  <View style={logoutPageStyle.field}>
                    <Text style={logoutPageStyle.fieldError}>{status}</Text>
                  </View>
                )
              }

              {
                isSubmitting ? (
                  <ActivityIndicator
                    color={colors.main}
                    size={moderateScale(40)}
                  />
                ) : (
                  <View style={logoutPageStyle.field}>
                    <Text style={logoutPageStyle.fieldLabel}>Are you sure you want to log out?</Text>

                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={logoutPageStyle.button}
                    >
                      <Text style={logoutPageStyle.buttonText}>YES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={logoutPageStyle.button}
                    >
                      <Text style={logoutPageStyle.buttonText}>NO</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            </View>
          )
        }
      </Formik>
    </Page>
  );
}

LogoutPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LogoutPage };