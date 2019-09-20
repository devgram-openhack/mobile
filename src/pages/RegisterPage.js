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
import { commonStyle } from '../styles/Common.style';
import { registerPageStyle } from '../styles/RegisterPage.style';

async function handleRegister(navigation, session, user, values, formikActions) {
  Keyboard.dismiss();

  const [method, url] = user.username ? ['patch', `/user/${user.username}`] : ['post', '/register'];

  const response = await api[method](url, values, session ? {
    'Authorization': `Bearer ${session.token}`
  } : null);

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
  const session = navigation.getParam('session');
  const user = navigation.getParam('user') || {};

  return (
    <Page>
      <LogoHeader />

      <Formik
        initialValues={{
          avatar: {
            data: '',
            uri: user.avatar || '',
          },
          username: user.username || '',
          name: user.name || '',
          specialization: user.specialization || '',
          description: user.description || '',
          email: user.email || '',
          password: user.password || '',
          confirmPassword: user.confirmPassword || '',
        }}
        onSubmit={(values, formikActions) => handleRegister(navigation, session, user, values, formikActions)}
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
            <ScrollView contentContainerStyle={commonStyle.containerScrollable}>
              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Avatar</Text>

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
                    style={commonStyle.buttonSmall}
                  >
                    <Text style={commonStyle.buttonText}>SELECT</Text>
                  </TouchableOpacity>
                </View>

                {
                  errors.avatar && (
                    <Text style={commonStyle.formFieldError}>{errors.avatar}</Text>
                  )
                }
              </View>

              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Username (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('username')}
                  placeholder='johndoe'
                  style={commonStyle.formFieldInput}
                  value={values.username}
                />

                {
                  errors.username && (
                    <Text style={commonStyle.formFieldError}>{errors.username}</Text>
                  )
                }
              </View>

              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Name (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('name')}
                  placeholder='John Doe'
                  style={commonStyle.formFieldInput}
                  value={values.name}
                />

                {
                  errors.name && (
                    <Text style={commonStyle.formFieldError}>{errors.name}</Text>
                  )
                }
              </View>

              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Specialization (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('specialization')}
                  placeholder='Front-end Developer'
                  style={commonStyle.formFieldInput}
                  value={values.specialization}
                />

                {
                  errors.specialization && (
                    <Text style={commonStyle.formFieldError}>{errors.specialization}</Text>
                  )
                }
              </View>

              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Description</Text>

                <TextInput
                  autoCompleteType='off'
                  numberOfLines={5}
                  onChangeText={handleChange('description')}
                  placeholder='Tell us a little about yourself...'
                  style={commonStyle.formFieldInput}
                  value={values.description}
                />

                {
                  errors.description && (
                    <Text style={commonStyle.formFieldError}>{errors.description}</Text>
                  )
                }
              </View>

              <View style={commonStyle.formField}>
                <Text style={commonStyle.formFieldLabel}>Email (*)</Text>

                <TextInput
                  autoCompleteType='email'
                  keyboardType='email-address'
                  onChangeText={handleChange('email')}
                  placeholder='johndoe@example.com'
                  style={commonStyle.formFieldInput}
                  value={values.email}
                />

                {
                  errors.email && (
                    <Text style={commonStyle.formFieldError}>{errors.email}</Text>
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
                <Text style={commonStyle.formFieldLabel}>Confirm Password (*)</Text>

                <TextInput
                  autoCompleteType='off'
                  onChangeText={handleChange('confirmPassword')}
                  placeholder='********'
                  secureTextEntry={true}
                  style={commonStyle.formFieldInput}
                  value={values.confirmPassword}
                />

                {
                  errors.confirmPassword && (
                    <Text style={commonStyle.formFieldError}>{errors.confirmPassword}</Text>
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
                    <Text style={commonStyle.buttonText}>
                      {
                        user.username ? (
                          'EDIT'
                        ) : (
                          'REGISTER'
                        )
                      }
                    </Text>
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