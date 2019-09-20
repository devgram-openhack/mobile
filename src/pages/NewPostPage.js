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
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import { api } from '../services/api';

import { Page } from '../components/Page';
import { LogoHeader } from '../components/LogoHeader';

import { colors } from '../styles/colors';
import { commonStyle } from '../styles/Common.style';
import { newPostPageStyle } from '../styles/NewPostPage.style';

async function handleNewPost(navigation, session, post, values, formikActions) {
  Keyboard.dismiss();

  const [method, url] = post.id ? ['patch', `/post/${post.id}`] : ['post', '/posts'];

  const response = await api[method](url, values, {
    'Authorization': `Bearer ${session.token}`,
  });

  if (response.data.success) {
    navigation.navigate('MainPage', { session });
  } else {
    formikActions.setSubmitting(false);
    formikActions.setStatus(response.data.message);
  }
}

function validateNewPostForm(values) {
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

function NewPostPage({ navigation }) {
  const post = navigation.getParam('post') || {};
  const session = navigation.getParam('session');

  return (
    <Page>
      <LogoHeader />

      <Formik
        initialValues={{
          title: post.title || '',
          images: (post.images || []).map(uri => ({ data: '', uri })),
          description: post.description || '',
        }}
        onSubmit={(values, formikActions) => handleNewPost(navigation, session, post, values, formikActions)}
        validate={validateNewPostForm}
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
            values,
          }) => (
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

                <View style={newPostPageStyle.fieldImageContainer}>
                  <Swiper showsButtons={values.images.length > 1}>
                    {
                      values.images.map((image, index) => (
                        <Image key={index} source={{ uri: image.uri }} style={newPostPageStyle.fieldImage} />
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
                        post.id ? (
                          'EDIT'
                        ) : (
                          'PUBLISH'
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

NewPostPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { NewPostPage };