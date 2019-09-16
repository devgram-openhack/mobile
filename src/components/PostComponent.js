import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';

import { postComponentStyle } from './PostComponent.style';

function PostComponent({ details, isMainList, navigation }) {
  const [comment, setComment] = useState('');

  return (
    <View style={postComponentStyle.container}>
      <View style={postComponentStyle.authorContainer}>
        <Image source={{uri: details.authorAvatar }} style={postComponentStyle.authorAvatar}/>

        <View>
          <Text style={postComponentStyle.authorName}>{`${details.authorName} (@${details.authorUsername})`}</Text>

          <Text style={postComponentStyle.authorRole}>{`${details.authorRole} (${details.authorTeam})`}</Text>
        </View>
      </View>

      <Text numberOfLines={isMainList ? 2 : undefined} style={postComponentStyle.title}>{details.title}</Text>

      <Swiper showsButtons={true} style={postComponentStyle.imageContainer}>
        {
          details.images.map(image => (
            <Image key={image.id} source={{ uri: image.url }} style={postComponentStyle.image} />
          ))
        }
      </Swiper>

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
              <View style={postComponentStyle.newCommentContainer}>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={value => setComment(value)}
                  placeholder='Type your comment here....'
                  style={postComponentStyle.newCommentInput}
                  value={comment}
                />
                <TouchableOpacity
                  onLongPress={() => Toast.show('Create a new comment')}
                  onPress={() => Toast.show('Not working yet')}
                  style={postComponentStyle.newCommentButton}
                >
                  <Text style={postComponentStyle.newCommentButtonText}>COMMENT</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
      }
    </View>
  );
}

PostComponent.propTypes = {
  details: PropTypes.object.isRequired,
  isMainList: PropTypes.bool,
  navigation: PropTypes.object.isRequired
};

export { PostComponent };