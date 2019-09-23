import React from 'react';
import { ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { api } from '../../services/api';
import { EventEmitter } from '../../services/EventEmitter';
import { PersistentStorage } from '../../services/PersistentStorage';

import { colors } from '../../styles/colors';
import { sizes } from '../../styles/sizes';
import { commonStyle } from '../../styles/Common.style';

function CommentForm({ post }) {
  async function handleComment(values, formikActions) {
    Keyboard.dismiss();

    values.description = values.description.trim();

    const response = await api.post(`/post/${post.id}/comments`, values, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      formikActions.resetForm();

      EventEmitter.dispatch('new-comment', response.data.post);
    } else {
      formikActions.setSubmitting(false);
      formikActions.setStatus(response.data.message);
    }
  }

  function validateCommentForm(values) {
    const errors = {};

    if (!values.description) {
      errors.description = 'Cannot be empty!';
    }

    return errors;
  }

  return (
    <Formik
      initialValues={{
        description: '',
      }}
      onSubmit={handleComment}
      validate={validateCommentForm}
    >
      {
        ({ errors, handleChange, handleSubmit, isSubmitting, status, values }) => (
          <View>
            <View style={commonStyle.formField}>
              <TextInput
                autoCompleteType='off'
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('description')}
                placeholder='Type your comment here....'
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
                    <Text style={commonStyle.buttonText}>ADD COMMENT</Text>
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

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export { CommentForm };