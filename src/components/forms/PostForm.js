import React from 'react';
import { ActivityIndicator, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import { api } from '../../services/api';
import { EventEmitter } from '../../services/EventEmitter';
import { PersistentStorage } from '../../services/PersistentStorage';

import { colors } from '../../styles/colors';
import { sizes } from '../../styles/sizes';
import { commonStyle } from '../../styles/Common.style';

function PostForm({ navigation, post }) {
  if (!post) {
    post = {};
  }

  async function handlePost(values, formikActions) {
    Keyboard.dismiss();

    const [method, url] = post.id ? ['patch', `/post/${post.id}`] : ['post', '/posts'];

    const response = await api[method](url, values, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      navigation.navigate('MainPage');

      if (post.id) {
        EventEmitter.dispatch('edit-post', response.data.post);
      } else {
        EventEmitter.dispatch('new-post');
      }
    } else {
      formikActions.setSubmitting(false);
      formikActions.setStatus(response.data.message);
    }
  }

  function validatePostForm(values) {
    const errors = {};

    if (!values.title) {
      errors.title = 'Cannot be empty!';
    }

    if (!values.description) {
      errors.description = 'Cannot be empty!';
    }

    return errors;
  }

  function addImage(images, setFieldError, setFieldValue) {
    ImagePicker.showImagePicker(response => {
      if (response.error) {
        setFieldError('images', 'Could not upload image!');
      } else if (!response.didCancel) {
        const { data, uri } = response;

        setFieldValue('images', [...images, { data, uri }]);
      }
    });
  }

  return (
    <Formik
      initialValues={{
        title: post.title || '',
        images: (post.images || []).map(uri => ({ data: '', uri })),
        description: post.description || '',
      }}
      onSubmit={handlePost}
      validate={validatePostForm}
      validateOnChange={false}
    >
      {
        ({ errors, handleChange, handleSubmit, isSubmitting, setFieldError, setFieldValue, status, values }) => (
          <ScrollView contentContainerStyle={commonStyle.containerScrollable}>
            <View style={commonStyle.formField}>
              <Text style={commonStyle.formFieldLabel}>Title (*)</Text>

              <TextInput
                autoCompleteType='off'
                onChangeText={handleChange('title')}
                placeholder='The title of your project / idea...'
                style={commonStyle.formFieldInput}
                value={values.title}
              />

              {
                errors.title && (
                  <Text style={commonStyle.formFieldError}>{errors.title}</Text>
                )
              }
            </View>

            <View style={commonStyle.formField}>
              <Text style={commonStyle.formFieldLabel}>Images</Text>

              <View style={commonStyle.formFieldSwiper}>
                <Swiper showsButtons={values.images.length > 1}>
                  {
                    values.images.map((image, index) => (
                      <Image key={index} source={{ uri: image.uri }} style={commonStyle.formFieldSwiperImage} />
                    ))
                  }
                </Swiper>
              </View>

              <TouchableOpacity
                onPress={() => addImage(values.images, setFieldError, setFieldValue)}
                style={commonStyle.buttonSmall}
              >
                <Text style={commonStyle.buttonText}>ADD IMAGE</Text>
              </TouchableOpacity>

              {
                errors.images && (
                  <Text style={commonStyle.formFieldError}>{errors.images}</Text>
                )
              }
            </View>

            <View style={commonStyle.formField}>
              <Text style={commonStyle.formFieldLabel}>Description (*)</Text>

              <TextInput
                autoCompleteType='off'
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('description')}
                placeholder='Tell everyone about your project / idea...'
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
              {
                isSubmitting ? (
                  <ActivityIndicator color={colors.main} size={sizes['40']} />
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>{post.id ? 'EDIT' : 'PUBLISH'}</Text>
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

PostForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  post: PropTypes.object,
};

export { PostForm };