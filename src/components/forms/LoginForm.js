import React from 'react';
import { ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { api } from '../../services/api';
import { PersistentStorage } from '../../services/PersistentStorage';

import { colors } from '../../styles/colors';
import { sizes } from '../../styles/sizes';
import { commonStyle } from '../../styles/Common.style';

function LoginForm({ navigation }) {
  async function handleLogin(values, formikActions) {
    Keyboard.dismiss();

    const response = await api.post('/login', values);

    if (response.data.success) {
      await PersistentStorage.beginSession(response.data.session);

      navigation.navigate('MainPage');
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

  return (
    <Formik
      initialValues={{
        usernameOrEmail: '',
        password: '',
      }}
      onSubmit={handleLogin}
      validate={validateLoginForm}
      validateOnChange={false}
    >
      {
        ({ errors, handleChange, handleSubmit, isSubmitting, status, values }) => (
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

            <View style={commonStyle.formField}>
              {
                isSubmitting ? (
                  <ActivityIndicator color={colors.main} size={sizes['40']} />
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

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { LoginForm };