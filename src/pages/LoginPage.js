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
import { loginPageStyle } from '../styles/LoginPage.style';

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
            <View style={loginPageStyle.container}>
              <View style={loginPageStyle.field}>
                <Text style={loginPageStyle.fieldLabel}>Username or Email (*)</Text>

                <TextInput
                  autoCompleteType='email'
                  autoFocus={true}
                  keyboardType='email-address'
                  onChangeText={handleChange('usernameOrEmail')}
                  placeholder='johndoe@example.com'
                  style={loginPageStyle.fieldInput}
                  value={values.usernameOrEmail}
                />

                {
                  errors.usernameOrEmail && (
                    <Text style={loginPageStyle.fieldError}>{errors.usernameOrEmail}</Text>
                  )
                }
              </View>

              <View style={loginPageStyle.field}>
                <Text style={loginPageStyle.fieldLabel}>Password (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('password')}
                  placeholder='********'
                  secureTextEntry={true}
                  style={loginPageStyle.fieldInput}
                  value={values.password}
                />

                {
                  errors.password && (
                    <Text style={loginPageStyle.fieldError}>{errors.password}</Text>
                  )
                }
              </View>

              {
                !!status && (
                  <View style={loginPageStyle.field}>
                    <Text style={loginPageStyle.fieldError}>{status}</Text>
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
                    style={loginPageStyle.submitButton}
                  >
                    <Text style={loginPageStyle.submitButtonText}>LOG IN</Text>
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