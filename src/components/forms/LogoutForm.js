import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { api } from '../../services/api';
import { PersistentStorage } from '../../services/PersistentStorage';

import { colors } from '../../styles/colors';
import { sizes } from '../../styles/sizes';
import { commonStyle } from '../../styles/Common.style';

function LogoutForm({ navigation }) {
  async function handleLogout(values, formikActions) {
    const session = await PersistentStorage.getSession();

    const response = await api.post('/logout', null, {
      'Authorization': `Bearer ${session.token}`,
    });

    if (response.data.success) {
      await PersistentStorage.removeSession();

      navigation.navigate('AuthPage');
    } else {
      formikActions.setSubmitting(false);
      formikActions.setStatus(response.data.message);
    }
  }

  return (
    <Formik onSubmit={handleLogout}>
      {
        ({ handleSubmit, isSubmitting, status }) => (
          <View style={commonStyle.containerCentered}>
            {
              isSubmitting ? (
                <View style={commonStyle.formField}>
                  <ActivityIndicator color={colors.main} size={sizes['40']} />
                </View>
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

            {
              !!status && (
                <View style={commonStyle.formField}>
                  <Text style={commonStyle.formFieldError}>{status}</Text>
                </View>
              )
            }
          </View>
        )
      }
    </Formik>
  );
}

LogoutForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LogoutForm };