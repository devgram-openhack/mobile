import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';

import { newPostComponentStyle } from './NewPostComponent.style';

function NewPostComponent({ navigation }) {
  function validate(values) {
    const errors = {};

    if (!values.title) {
      errors.title = 'Title required';
    }

    return errors;
  }

  function showImagePicker(images, setFieldError, setFieldValue) {
    ImagePicker.showImagePicker(response => {
      if (response.error) {
        setFieldError('images', response.error);
      } else if (!response.didCancel && !response.customButton) {
        setFieldValue('images', [...images, response.uri]);
      }
    });
  }

  function createPost(values) {
    Toast.show(`Not working yet, values: ${JSON.stringify(values)}`);

    navigation.popToTop();
  }

  return (
    <ScrollView contentContainerStyle={newPostComponentStyle.container}>
      <Formik
        initialValues={{
          title: '',
          images: [],
          text: ''
        }}
        onSubmit={createPost}
        validate={validate}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, setFieldError, setFieldValue, values }) => (
          <View style={newPostComponentStyle.form}>
            <View style={newPostComponentStyle.field}>
              <Text style={newPostComponentStyle.label}>Title</Text>

              <TextInput
                autoFocus={true}
                maxLength={100}
                onChangeText={handleChange('title')}
                placeholder='The title of your project / idea...'
                style={newPostComponentStyle.input}
                value={values.title}
              />

              {errors.title
                ? (
                  <Text style={newPostComponentStyle.error}>{errors.title}</Text>
                )
                : (
                  null
                )
              }
            </View>

            <View style={newPostComponentStyle.field}>
              <Text style={newPostComponentStyle.label}>Images</Text>

              <Swiper showsButtons={values.images.length > 1} style={newPostComponentStyle.imageContainer}>
                {
                  values.images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={newPostComponentStyle.image} />
                  ))
                }
              </Swiper>

              <TouchableOpacity
                disabled={isSubmitting}
                onLongPress={() => Toast.show('Add an image')}
                onPress={() => showImagePicker(values.images, setFieldError, setFieldValue)}
                style={newPostComponentStyle.submitButton}
              >
                <Text style={newPostComponentStyle.submitButtonText}>ADD IMAGE</Text>
              </TouchableOpacity>

              {errors.images
                ? (
                  <Text style={newPostComponentStyle.error}>{errors.images}</Text>
                )
                : (
                  null
                )
              }
            </View>

            <View style={newPostComponentStyle.field}>
              <Text style={newPostComponentStyle.label}>Description</Text>

              <TextInput
                maxLength={500}
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('text')}
                placeholder='The description of your project / idea...'
                style={newPostComponentStyle.input}
                value={values.text}
              />

              {errors.text
                ? (
                  <Text style={newPostComponentStyle.error}>{errors.text}</Text>
                )
                : (
                  null
                )
              }
            </View>

            <TouchableOpacity
              disabled={isSubmitting}
              onLongPress={() => Toast.show('Create a new post')}
              onPress={handleSubmit}
              style={newPostComponentStyle.submitButton}
            >
              <Text style={newPostComponentStyle.submitButtonText}>PUBLISH</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

NewPostComponent.propTypes = {
  navigation: PropTypes.object.isRequired
};

export { NewPostComponent };