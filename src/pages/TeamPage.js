import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { api } from '../services/api';
import { EventEmitter } from '../services/EventEmitter';
import { PersistentStorage } from '../services/PersistentStorage';

import { Page } from './Page';
import { Header } from '../components/Header';
import { User } from '../components/User';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';
import { teamPageStyle } from '../styles/TeamPage.style';

function TeamPage({ navigation }) {
  const hackathon = navigation.getParam('hackathon');
  const teamDetails = navigation.getParam('team');

  const [state, setState] = useState({
    isLoading: !teamDetails,
    team: teamDetails,
  });

  useEffect(() => {
    const subscribers = [];

    function updateTeam(updatedTeam) {
      if (state.team.id === updatedTeam.id) {
        setState({
          ...state,
          team: Object.assign({}, state.team, updatedTeam),
        });
      }
    }

    function updateMember(updatedMember) {
      setState({
        ...state,
        team: Object.assign({}, state.team, {
          members: state.team.members.map(member => {
            if (member.id === updatedMember.id) {
              member = Object.assign({}, member, updatedMember);
            }

            return member;
          }),
        }),
      });
    }

    function subscribe() {
      subscribers.push(
        EventEmitter.subscribe('edit-team', updateTeam),
        EventEmitter.subscribe('edit-user', updateMember),
      );
    }

    function unsubscribe() {
      for (const subscriber of subscribers) {
        subscriber.unsubscribe();
      }
    }

    subscribe();

    return unsubscribe;
  }, [state]);

  useEffect(() => {
    async function loadTeam() {
      if (typeof state.team === 'undefined') {
        const response = await api.get(`/me/hackathon/${hackathon.id}/team`, {
          headers: {
            'Authorization': `Bearer ${PersistentStorage.session.token}`,
          },
        });

        setState({
          isLoading: false,
          team: response.data.team,
        });
      }
    }

    loadTeam();
  }, [hackathon, state]);

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
            <View style={commonStyle.containerFull}>
              <View style={commonStyle.infoFull}>
                {
                  state.team.avatar ? (
                    <Image source={{ uri: state.team.avatar }} style={commonStyle.infoAvatarImage} />
                  ) : (
                    <Icon name='account-circle' style={commonStyle.infoAvatarIcon} />
                  )
                }

                <View style={commonStyle.infoRight}>
                  <View>
                    <Text style={commonStyle.infoTitleLarge}>{state.team.name || `Team ${state.team.id}`}</Text>
                  </View>

                  <View style={commonStyle.infoActions}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('EditTeamPage', {
                        team: state.team,
                      })}
                    >
                      <Icon name='edit' style={teamPageStyle.editTeamIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Text style={commonStyle.cardSubtitleFull}>{state.team.hackathon.name}</Text>

              <View style={commonStyle.containerScrollable}>
                {
                  state.team.members.map(member => (
                    <View key={member.id} style={commonStyle.card}>
                      <User navigation={navigation} user={member} />
                    </View>
                  ))
                }

                {
                  state.team.hackathon.isOpen && state.team.members.length < state.team.hackathon.maxMembersPerTeam && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TeamMateSearchPage', {
                        hackathon: state.team.hackathon,
                        team: state.team,
                      })}
                      style={commonStyle.buttonLarge}
                    >
                      <Text style={commonStyle.buttonText}>FIND TEAMMATES</Text>
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
          ) : (
            <View style={commonStyle.containerCentered}>
              <Text style={commonStyle.containerCenteredText}>You do not have a team for this hackathon yet.</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('TeamMateSearchPage', { hackathon })}
                style={commonStyle.buttonLarge}
              >
                <Text style={commonStyle.buttonText}>FIND TEAMMATES</Text>
              </TouchableOpacity>
            </View>
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