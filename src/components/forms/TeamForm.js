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

function TeamForm({ navigation, team }) {
  async function handleTeam(values, formikActions) {
    Keyboard.dismiss();

    const response = await api.patch(`/team/${team.id}`, values, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      navigation.goBack();

      EventEmitter.dispatch('edit-team', response.data.team);
    } else {
      formikActions.setSubmitting(false);
      formikActions.setStatus(response.data.message);
    }
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
          uri: team.avatar,
        },
        name: team.name,
      }}
      onSubmit={handleTeam}
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
              <Text style={commonStyle.formFieldLabel}>Name</Text>

              <TextInput
                autoCompleteType='off'
                onChangeText={handleChange('name')}
                placeholder='MyTeamName'
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
              {
                isSubmitting ? (
                  <ActivityIndicator color={colors.main} size={sizes['40']} />
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>EDIT</Text>
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

TeamForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export { TeamForm };