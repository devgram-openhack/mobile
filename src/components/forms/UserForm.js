import React from 'react';
import { ActivityIndicator, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';

import { api } from '../../services/api';
import { EventEmitter } from '../../services/EventEmitter';
import { PersistentStorage } from '../../services/PersistentStorage';

import { colors } from '../../styles/colors';
import { sizes } from '../../styles/sizes';
import { commonStyle } from '../../styles/Common.style';

function UserForm({ navigation, user }) {
  if (!user) {
    user = {};
  }

  async function handleUser(values, formikActions) {
    Keyboard.dismiss();

    const [method, url] = user.id ? ['patch', '/me'] : ['post', '/register'];

    const response = await api[method](url, values, PersistentStorage.session && {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      await PersistentStorage.beginSession(response.data.session);

      navigation.goBack();

      if (user.id) {
        EventEmitter.dispatch('edit-user', response.data.user);
      }
    } else {
      formikActions.setSubmitting(false);
      formikActions.setStatus(response.data.message);
    }
  }

  function validateUserForm(values) {
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
    } else if (!values.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = 'Invalid email!';
    }

    if (!values.password) {
      errors.password = 'Cannot be empty!';
    } else if (values.confirmPassword !== values.password) {
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

  return (
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
      onSubmit={handleUser}
      validate={validateUserForm}
      validateOnChange={false}
    >
      {
        ({ errors, handleChange, handleSubmit, isSubmitting, setFieldError, setFieldValue, status, values }) => (
          <ScrollView contentContainerStyle={commonStyle.containerScrollable}>
            <View style={commonStyle.formField}>
              <Text style={commonStyle.formFieldLabel}>Avatar</Text>

              <View style={commonStyle.formFieldAvatar}>
                {
                  values.avatar.uri ? (
                    <Image source={{ uri: values.avatar.uri }} style={commonStyle.formFieldAvatarImage} />
                  ) : (
                    <Icon name='account-circle' style={commonStyle.formFieldAvatarIcon} />
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
                placeholder='Front-End Developer'
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
                multiline={true}
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

            <View style={commonStyle.formField}>
              {
                isSubmitting ? (
                  <ActivityIndicator color={colors.main} size={sizes['40']} />
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>{user.username ? 'EDIT' : 'REGISTER'}</Text>
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
          </ScrollView>
        )
      }
    </Formik>
  );
}

UserForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export { UserForm };