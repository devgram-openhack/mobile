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
import { commonStyle } from '../styles/Common.style';

async function handleLogout(navigation, formikActions) {
  const session = JSON.parse((await AsyncStorage.getItem('session')) || '{}');

  const response = await api.post('/logout', null, {
    'Authorization': `Bearer ${session.token}`,
  });

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
            <View style={commonStyle.containerCentered}>
              {
                !!status && (
                  <View style={commonStyle.formField}>
                    <Text style={commonStyle.formError}>{status}</Text>
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
                  <View style={commonStyle.formField}>
                    <Text style={commonStyle.formFieldLabel}>Are you sure you want to log out?</Text>

                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={commonStyle.buttonLarge}
                    >
                      <Text style={commonStyle.buttonText}>YES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={commonStyle.buttonLarge}
                    >
                      <Text style={commonStyle.buttonText}>NO</Text>
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