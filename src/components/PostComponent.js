import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';

import { postComponentStyle } from './PostComponent.style';

function PostComponent({ details, isMainList, isProfilePage, navigation }) {
  function validate(values) {
    const errors = {};

    if (!values.text) {
      errors.text = 'Comment is empty';
    }

    return errors;
  }

  function createComment(values) {
    Toast.show(`Not working yet, values: ${JSON.stringify(values)}`);
  }

  return (
    <View style={postComponentStyle.container}>
      {isProfilePage
        ? (
          null
        )
        : (
          <View style={postComponentStyle.authorContainer}>
            <Image source={{uri: details.authorAvatar }} style={postComponentStyle.authorAvatar}/>

            <View>
              <Text style={postComponentStyle.authorName}>{`${details.authorName} (@${details.authorUsername})`}</Text>

              <Text style={postComponentStyle.authorRole}>{`${details.authorRole} (${details.authorTeam})`}</Text>
            </View>
          </View>
        )
      }

      <Text numberOfLines={isMainList ? 2 : undefined} style={postComponentStyle.title}>{details.title}</Text>

      {details.images.length > 0
        ? (
          <Swiper showsButtons={details.images.length > 1} style={postComponentStyle.imageContainer}>
            {
              details.images.map(image => (
                <Image key={image.id} source={{ uri: image.url }} style={postComponentStyle.image} />
              ))
            }
          </Swiper>
        )
        : (
          null
        )
      }

      <Text numberOfLines={isMainList ? 3 : undefined} style={postComponentStyle.text}>{details.text}</Text>

      <View style={postComponentStyle.actions}>
        <View style={postComponentStyle.rightActions}>
          <TouchableOpacity
            onLongPress={() => Toast.show('Like post')}
            onPress={() => Toast.show('Not working yet')}
            style={postComponentStyle.likeAction}
          >
            <Icon name='sentiment-very-satisfied' style={postComponentStyle.likeActionIcon} />

            <Text style={postComponentStyle.likeActionText}>{details.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onLongPress={() => Toast.show('Dislike post')}
            onPress={() => Toast.show('Not working yet')}
          >
            <Icon name='sentiment-very-dissatisfied' style={postComponentStyle.dislikeActionIcon} />

            <Text style={postComponentStyle.dislikeActionText}>{details.dislikes}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onLongPress={() => Toast.show('Open post')}
          onPress={() => navigation.navigate('PostPage', { details })}
        >
          <Icon name='comment' style={postComponentStyle.commentActionIcon} />

          <Text style={postComponentStyle.commentActionText}>{details.comments.length}</Text>
        </TouchableOpacity>
      </View>

      {
        isMainList
          ? (
            null
          )
          : (
            <View style={postComponentStyle.commentContainer}>
              {
                details.comments.length > 0
                  ? (
                    details.comments.map(comment => (
                      <View key={comment.id} style={postComponentStyle.comment}>
                        <Text style={postComponentStyle.authorName}>{`${comment.authorName} (@${comment.authorUsername})`}</Text>

                        <Text style={postComponentStyle.authorRole}>{`${comment.authorRole} (${comment.authorTeam})`}</Text>

                        <Text style={postComponentStyle.commentText}>{comment.text}</Text>
                      </View>
                    ))
                  )
                  : (
                    <View style={postComponentStyle.comment}>
                      <Text style={postComponentStyle.commentText}>No comments.</Text>
                    </View>
                  )
              }

              <Formik
                initialValues={{
                  text: ''
                }}
                onSubmit={createComment}
                validate={validate}
              >
                {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                  <View style={postComponentStyle.newCommentForm}>
                    <View style={postComponentStyle.newCommentField}>
                      <TextInput
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={handleChange('text')}
                        placeholder='Type your comment here....'
                        style={postComponentStyle.newCommentInput}
                        value={values.text}
                      />

                      {errors.text
                        ? (
                          <Text style={postComponentStyle.newCommentError}>{errors.text}</Text>
                        )
                        : (
                          null
                        )
                      }
                    </View>

                    <TouchableOpacity
                      disabled={isSubmitting}
                      onLongPress={() => Toast.show('Create a new comment')}
                      onPress={handleSubmit}
                      style={postComponentStyle.newCommentSubmitButton}
                    >
                      <Text style={postComponentStyle.newCommentSubmitButtonText}>COMMENT</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          )
      }
    </View>
  );
}

PostComponent.propTypes = {
  details: PropTypes.object.isRequired,
  isMainList: PropTypes.bool,
  isProfilePage: PropTypes.bool,
  navigation: PropTypes.object.isRequired
};

export { PostComponent };