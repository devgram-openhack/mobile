import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';

import { api } from '../services/api';

import { Page } from './Page';
import { Header } from '../components/Header';
import { User } from '../components/User';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';
import { postStyle } from '../styles/Post.style';
import { profilePageStyle } from '../styles/ProfilePage.style';
import { teamPageStyle } from '../styles/TeamPage.style';

function TeamPage({ navigation }) {
  const hackathon = navigation.getParam('hackathon');
  const session = navigation.getParam('session');
  const teamDetails = navigation.getParam('teamDetails');

  const [state, setState] = useState({
    isEditing: false,
    isLoading: !teamDetails,
    team: teamDetails,
  });

  async function editTeamTitle() {
    const data = {
      title: state.team.title,
    };

    const response = await api.patch(`/team/${state.team.id}`, data, {
      'Authorization': `Bearer ${session.token}`,
    });

    if (!response.data.success) {
      Toast.show(response.data.message);
    }

    setState({
      isEditing: false,
      isLoading: false,
      team: response.data.team,
    });
  }

  useEffect(() => {
    async function loadTeam() {
      if (!state.team) {
        const response = await api.get(`/hackathon/${hackathon.id}/team`, {
          'Authorization': `Bearer ${session.token}`,
        });

        setState({
          isEditing: false,
          isLoading: false,
          team: response.data.team,
        });
      }
    }

    loadTeam();
  }, [hackathon, session, state]);

  return (
    <Page>
      <Header navigation={navigation} />

      {
        state.isLoading ? (
          <View style={commonStyle.containerCentered}>
            <ActivityIndicator color={colors.main} size={sizes['40']} />
          </View>
        ) : (
          state.team ? (
            <View style={profilePageStyle.container}>
              {
                state.isEditing ? (
                  <View style={teamPageStyle.team}>
                    <TextInput
                      autoCompleteType='off'
                      onChangeText={text => setState({
                        ...state,
                        team: Object.assign({}, state.team, {
                          title: text,
                        }),
                      })}
                      style={commonStyle.formFieldInputSmall}
                      value={state.team.title}
                    />

                    <TouchableOpacity
                      onPress={() => editTeamTitle()}
                    >
                      <Icon name={'check'} style={teamPageStyle.editTeamIcon} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={teamPageStyle.team}>
                    <Text style={teamPageStyle.teamTitle}>{state.team.title || `Team ${state.team.id}`}</Text>

                    <TouchableOpacity
                      onPress={() => setState({
                        ...state,
                        isEditing: true,
                      })}
                    >
                      <Icon name='edit' style={teamPageStyle.editTeamIcon} />
                    </TouchableOpacity>
                  </View>

                )
              }

              <Text style={teamPageStyle.hackathon}>{state.team.hackathon.title}</Text>

              <View style={commonStyle.containerScrollable}>
                {
                  state.team.members.map(member => (
                    <View key={member.id} style={postStyle.container}>
                      <User navigation={navigation} user={member} />
                    </View>
                  ))
                }
              </View>
            </View>
          ) : (
            null
          )
        )
      }
    </Page>
  );
}

TeamPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { TeamPage };