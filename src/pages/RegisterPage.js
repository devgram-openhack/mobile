import React from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { api } from '../services/api';

import { Page } from '../components/Page';
import { LogoHeader } from '../components/LogoHeader';

import { colors } from '../styles/colors';
import { registerPageStyle } from '../styles/RegisterPage.style';

async function handleRegister(navigation, values, formikActions) {
  Keyboard.dismiss();

  const response = await api.post('/register', values);

  if (response.data.success) {
    const { session } = response.data;

    await AsyncStorage.setItem('session', JSON.stringify(session));

    navigation.navigate('MainPage', { session });
  } else {
    formikActions.setSubmitting(false);
    formikActions.setStatus(response.data.message);
  }
}

function validateRegisterForm(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Cannot be empty!';
  }

  if (!values.name) {
    errors.name = 'Cannot be empty!';
  }

  if (!values.specialization) {
    errors.specialization = 'Cannot be empty!';
  }

  if (!values.email) {
    errors.email = 'Cannot be empty!';
  }

  if (!values.password) {
    errors.password = 'Cannot be empty!';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Does not match password!';
  }

  return errors;
}

function selectAvatar(setFieldError, setFieldValue) {
  ImagePicker.showImagePicker(response => {
    if (response.error) {
      setFieldError('avatar', 'Could not upload image!');
    } else if (!response.didCancel) {
      const { data, uri } = response;

      setFieldValue('avatar', { data, uri });
    }
  });
}

function RegisterPage({ navigation }) {
  return (
    <Page>
      <LogoHeader />

      <Formik
        initialValues={{
          avatar: {
            data: '',
            uri: '',
          },
          username: '',
          name: '',
          specialization: '',
          description: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values, formikActions) => handleRegister(navigation, values, formikActions)}
        validate={validateRegisterForm}
        validateOnChange={false}
      >
        {
          ({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldError,
            setFieldValue,
            status,
            values
          }) => (
            <ScrollView contentContainerStyle={registerPageStyle.container}>
              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Avatar</Text>

                <View style={registerPageStyle.fieldAvatar}>
                  {
                    values.avatar.uri ? (
                      <Image source={{ uri: values.avatar.uri }} style={registerPageStyle.fieldAvatarImage} />
                    ) : (
                      <Icon name='account-circle' style={registerPageStyle.fieldAvatarIcon} />
                    )
                  }

                  <TouchableOpacity
                    onPress={() => selectAvatar(setFieldError, setFieldValue)}
                    style={registerPageStyle.fieldAvatarButton}
                  >
                    <Text style={registerPageStyle.fieldAvatarButtonText}>SELECT</Text>
                  </TouchableOpacity>
                </View>

                {
                  errors.avatar && (
                    <Text style={registerPageStyle.fieldError}>{errors.avatar}</Text>
                  )
                }
              </View>

              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Username (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('username')}
                  placeholder='johndoe'
                  style={registerPageStyle.fieldInput}
                  value={values.username}
                />

                {
                  errors.username && (
                    <Text style={registerPageStyle.fieldError}>{errors.username}</Text>
                  )
                }
              </View>

              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Name (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('name')}
                  placeholder='John Doe'
                  style={registerPageStyle.fieldInput}
                  value={values.name}
                />

                {
                  errors.name && (
                    <Text style={registerPageStyle.fieldError}>{errors.name}</Text>
                  )
                }
              </View>

              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Specialization (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('specialization')}
                  placeholder='Front-end Developer'
                  style={registerPageStyle.fieldInput}
                  value={values.specialization}
                />

                {
                  errors.specialization && (
                    <Text style={registerPageStyle.fieldError}>{errors.specialization}</Text>
                  )
                }
              </View>

              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Description</Text>

                <TextInput
                  autoCompleteType='off'
                  numberOfLines={5}
                  onChangeText={handleChange('description')}
                  placeholder='Tell us a little about yourself...'
                  style={registerPageStyle.fieldInput}
                  value={values.description}
                />

                {
                  errors.description && (
                    <Text style={registerPageStyle.fieldError}>{errors.description}</Text>
                  )
                }
              </View>

              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Email (*)</Text>

                <TextInput
                  autoCompleteType='email'
                  keyboardType='email-address'
                  onChangeText={handleChange('email')}
                  placeholder='johndoe@example.com'
                  style={registerPageStyle.fieldInput}
                  value={values.email}
                />

                {
                  errors.email && (
                    <Text style={registerPageStyle.fieldError}>{errors.email}</Text>
                  )
                }
              </View>

              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Password (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('password')}
                  placeholder='********'
                  secureTextEntry={true}
                  style={registerPageStyle.fieldInput}
                  value={values.password}
                />

                {
                  errors.password && (
                    <Text style={registerPageStyle.fieldError}>{errors.password}</Text>
                  )
                }
              </View>

              <View style={registerPageStyle.field}>
                <Text style={registerPageStyle.fieldLabel}>Confirm Password (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('confirmPassword')}
                  placeholder='********'
                  secureTextEntry={true}
                  style={registerPageStyle.fieldInput}
                  value={values.confirmPassword}
                />

                {
                  errors.confirmPassword && (
                    <Text style={registerPageStyle.fieldError}>{errors.confirmPassword}</Text>
                  )
                }
              </View>

              {
                !!status && (
                  <View style={registerPageStyle.field}>
                    <Text style={registerPageStyle.fieldError}>{status}</Text>
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
                    style={registerPageStyle.submitButton}
                  >
                    <Text style={registerPageStyle.submitButtonText}>REGISTER</Text>
                  </TouchableOpacity>
                )
              }
            </ScrollView>
          )
        }
      </Formik>
    </Page>
  );
}

RegisterPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { RegisterPage };