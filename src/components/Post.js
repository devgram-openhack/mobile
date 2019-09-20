import React, {
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import { api } from '../services/api';
import { utils } from '../utils';

import { colors } from '../styles/colors';
import { postStyle } from '../styles/Post.style';

async function handleLike(session, state, setState) {
  const response = await api.post(`/post/${state.post.id}/likes`, {
    'Authorization': `Bearer ${session.token}`,
  });

  if (response.data.success) {
    setState({
      ...state,
      post: response.data.post,
    });
  }
}

async function handleDislike(session, state, setState) {
  const response = await api.post(`/post/${state.post.id}/dislikes`, {
    'Authorization': `Bearer ${session.token}`,
  });

  if (response.data.success) {
    setState({
      ...state,
      post: response.data.post,
    });
  }
}

async function loadComments(session, state, setState) {
  if (!state.isLastPage) {
    const response = await api.get(`/post/${state.post.id}/comments?page=${state.nextPage}`, {
      'Authorization': `Bearer ${session.token}`,
    });

    setState({
      comments: state.isRefreshing ? response.data.comments : [...state.comments, ...response.data.comments],
      isLastPage: response.data.isLastPage,
      isLoading: false,
      isRefreshing: false,
      nextPage: state.nextPage + 1,
      post: response.data.post,
    });
  }
}

async function refreshPage(session, state, setState) {
  const newState = {
    ...state,
    isLastPage: false,
    isRefreshing: true,
    nextPage: 1,
  };

  setState(newState);

  await loadComments(session, newState, setState);
}

async function loadNextPage(session, state, setState) {
  setState({
    ...state,
    isLoadingNext: true,
  });

  await loadComments(session, state, setState);
}

async function handleNewComment(session, state, setState, values, formikActions) {
  Keyboard.dismiss();

  const response = await api.post(`/post/${state.post.id}/comments`, values, {
    'Authorization': `Bearer ${session.token}`,
  });

  if (response.data.success) {
    formikActions.setSubmitting(false);

    await refreshPage(session, state, setState);
  } else {
    formikActions.setSubmitting(false);
    formikActions.setStatus(response.data.message);
  }
}

function validateNewCommentForm(values) {
  const errors = {};

  if (!values.description) {
    errors.description = 'Cannot be empty!';
  }

  return errors;
}

function Post({ navigation, params, post }) {
  if (!params) {
    params = {};
  }

  const session = navigation.getParam('session');

  const [state, setState] = useState({
    comments: [],
    isLastPage: false,
    isLoading: true,
    isLoadingNext: false,
    isRefreshing: false,
    nextPage: 1,
    post,
  });

  if (params.showComments) {
    useEffect(() => { loadNextPage(session, state, setState); }, []);
  }

  const container = (
    <View style={postStyle.container}>
      {
        params.showAuthor ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfilePage', {
              session,
              username: state.post.author.username
            })}
          >
            <View style={postStyle.authorContainer}>
              <Image source={{ uri: state.post.author.avatar }} style={postStyle.authorAvatar} />

              <View>
                <Text style={postStyle.authorName}>{`${state.post.author.name} (@${state.post.author.username})`}</Text>

                <Text style={postStyle.authorRole}>{state.post.author.role}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          null
        )
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('PostPage', { post, session })}
      >
        <Text numberOfLines={params.showComments ? null : 2} style={postStyle.title}>{state.post.title}</Text>
      </TouchableOpacity>

      {
        state.post.images.length > 0 ? (
          <View style={postStyle.imageContainer}>
            <Swiper showsButtons={state.post.images.length > 1}>
              {
                state.post.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={postStyle.image} />
                ))
              }
            </Swiper>
          </View>
        ) : (
          null
        )
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('PostPage', { post, session })}
      >
        <Text numberOfLines={params.showComments ? null : 3} style={postStyle.description}>{state.post.description}</Text>
      </TouchableOpacity>

      <View style={postStyle.actionContainer}>
        <View style={postStyle.actionContainerLeft}>
          <TouchableOpacity
            onPress={() => handleLike(session, state, setState)}
            style={postStyle.likeAction}
          >
            <Icon name='sentiment-very-satisfied' style={[postStyle.likeActionIcon, state.post.liked ? postStyle.focusAction : null]} />

            <Text style={[postStyle.likeActionText, state.post.liked ? postStyle.focusAction : null]}>{state.post.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDislike(session, state, setState)}
          >
            <Icon name='sentiment-very-dissatisfied' style={[postStyle.dislikeActionIcon, state.post.disliked ? postStyle.focusAction : null]} />

            <Text style={[postStyle.dislikeActionText, state.post.disliked ? postStyle.focusAction : null]}>{state.post.dislikes}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('PostPage', { post, session })}
        >
          <Icon name='comment' style={postStyle.commentActionIcon} />

          <Text style={postStyle.commentActionText}>{state.post.comments}</Text>
        </TouchableOpacity>
      </View>

      {
        params.showComments
          ? (
            <View style={postStyle.commentsContainer}>
              <Formik
                initialValues={{
                  description: '',
                }}
                onSubmit={(values, formikActions) => handleNewComment(session, state, setState, values, formikActions)}
                validate={validateNewCommentForm}
              >
                {
                  ({
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    status,
                    values,
                  }) => (
                    <View style={postStyle.newCommentContainer}>
                      <View style={postStyle.newCommentField}>
                        <TextInput
                          autoCompleteType='off'
                          multiline={true}
                          numberOfLines={5}
                          onChangeText={handleChange('description')}
                          placeholder='Type your comment here....'
                          style={postStyle.newCommentFieldInput}
                          value={values.description}
                        />

                        {
                          errors.description && (
                            <Text style={postStyle.newCommentFieldError}>{errors.description}</Text>
                          )
                        }
                      </View>

                      {
                        !!status && (
                          <View style={postStyle.newCommentField}>
                            <Text style={postStyle.newCommentFieldError}>{status}</Text>
                          </View>
                        )
                      }

                      {
                        isSubmitting ? (
                          <ActivityIndicator
                            color={colors.main}
                            size={moderateScale(40)}
                            style={postStyle.newCommentIcon}
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={handleSubmit}
                            style={postStyle.newCommentSubmitButton}
                          >
                            <Text style={postStyle.newCommentSubmitButtonText}>ADD COMMENT</Text>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                  )
                }
              </Formik>

              {
                state.isLoading ? (
                  <ActivityIndicator
                    color={colors.main}
                    size={moderateScale(24)}
                  />
                ) : (
                  state.comments.length > 0 ? (
                    state.comments.map(comment => (
                      <View key={comment.id} style={postStyle.commentContainer}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('ProfilePage', {
                            session,
                            username: comment.author.username
                          })}
                        >
                          <Text style={postStyle.authorName}>{`${comment.author.name} (@${comment.author.username})`}</Text>

                          <Text style={postStyle.authorRole}>{comment.author.role}</Text>
                        </TouchableOpacity>

                        <Text style={postStyle.commentDescription}>{comment.description}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={postStyle.commentContainer}>
                      <Text style={postStyle.commentDescription}>There are no comments. Scroll up to refresh the page or create a new comment above.</Text>
                    </View>
                  )
                )
              }
            </View>
          )
          : (
            null
          )
      }
    </View>
  );

  if (params.showComments) {
    return (
      <ScrollView
        contentContainerStyle={postStyle.scrollContainer}
        onScroll={({ nativeEvent }) => {
          if (utils.isCloseToBottom(nativeEvent, moderateScale(64)) && !state.isLoadingNext && !state.isRefreshing && state.comments.length > 0) {
            loadNextPage(session, state, setState);
          }
        }}
        refreshControl={(
          <RefreshControl
            refreshing={state.isRefreshing}
            onRefresh={() => refreshPage(session, state, setState)}
          />
        )}
      >
        {container}
      </ScrollView>
    );
  } else {
    return container;
  }
}

Post.propTypes = {
  navigation: PropTypes.object.isRequired,
  params: PropTypes.shape({
    showAuthor: PropTypes.bool,
    showComments: PropTypes.bool,
  }),
  post: PropTypes.object.isRequired,
};

export { Post };