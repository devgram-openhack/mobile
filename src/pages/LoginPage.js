import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
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

async function handleLogin(navigation, values, formikActions) {
  Keyboard.dismiss();

  const response = await api.post('/login', values);

  if (response.data.success) {
    const { session } = response.data;

    await AsyncStorage.setItem('session', JSON.stringify(session));

    navigation.navigate('MainPage', { session });
  } else {
    formikActions.setSubmitting(false);
    formikActions.setStatus(response.data.message);
  }
}

function validateLoginForm(values) {
  const errors = {};

  if (!values.usernameOrEmail) {
    errors.usernameOrEmail = 'Cannot be empty!';
  }

  if (!values.password) {
    errors.password = 'Cannot be empty!';
  }

  return errors;
}

function LoginPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        onSubmit={(values, formikActions) => handleLogin(navigation, values, formikActions)}
        validate={validateLoginForm}
        validateOnChange={false}
      >
        {
          ({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            status,
            values,
          }) => (
            <View style={commonStyle.containerCentered}>
              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Username or Email (*)</Text>

                <TextInput
                  autoCompleteType='email'
                  autoFocus={true}
                  keyboardType='email-address'
                  onChangeText={handleChange('usernameOrEmail')}
                  placeholder='johndoe@example.com'
                  style={commonStyle.formFieldInput}
                  value={values.usernameOrEmail}
                />

                {
                  errors.usernameOrEmail && (
                    <Text style={commonStyle.formFieldError}>{errors.usernameOrEmail}</Text>
                  )
                }
              </View>

              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Password (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('password')}
                  placeholder='********'
                  secureTextEntry={true}
                  style={commonStyle.formFieldInput}
                  value={values.password}
                />

                {
                  errors.password && (
                    <Text style={commonStyle.formFieldError}>{errors.password}</Text>
                  )
                }
              </View>

              {
                !!status && (
                  <View style={commonStyle.formField}>
                    <Text style={commonStyle.formFieldError}>{status}</Text>
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
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>LOG IN</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          )
        }
      </Formik>
    </Page>
  );
}

LoginPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LoginPage };