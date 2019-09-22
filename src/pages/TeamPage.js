import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import SimpleToast from 'react-native-simple-toast';

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
  const team = navigation.getParam('team');

  const [state, setState] = useState({
    isLeavingTeam: false,
    isLoading: !team,
    isRefreshing: false,
    memberToKick: null,
    team,
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

    function refreshPage() {
      setState({
        ...state,
        isRefreshing: true,
        memberToKick: null,
      });
    }

    function subscribe() {
      subscribers.push(
        EventEmitter.subscribe('edit-team', updateTeam),
        EventEmitter.subscribe('edit-user', updateMember),
        EventEmitter.subscribe('update-team', refreshPage),
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
      const response = await api.get(`/me/hackathon/${hackathon.id}/team`, {
        headers: {
          'Authorization': `Bearer ${PersistentStorage.session.token}`,
        },
      });

      setState({
        isLoading: false,
        isRefreshing: false,
        team: response.data.team,
      });
    }

    if (typeof state.team === 'undefined' || state.isRefreshing) {
      loadTeam();
    }
  }, [hackathon, state]);

  async function kickMember() {
    const response = await api.delete(`/user/${state.memberToKick}/hackathon/${hackathon.id}/team`, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      refreshPage();
    } else {
      SimpleToast.show(response.data.message);

      setState({
        ...state,
        memberToKick: null,
      });
    }
  }

  async function leaveTeam() {
    const response = await api.delete(`/me/hackathon/${hackathon.id}/team`, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      navigation.goBack();

      EventEmitter.dispatch('update-team');
    } else {
      SimpleToast.show(response.data.message);

      setState({
        ...state,
        isLeavingTeam: false,
      });
    }
  }

  function refreshPage() {
    setState({
      ...state,
      isRefreshing: true,
    });
  }

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

              <ScrollView
                contentContainerStyle={commonStyle.containerScrollable}
                refreshControl={(
                  <RefreshControl
                    onRefresh={refreshPage}
                    refreshing={state.isRefreshing}
                  />
                )}
              >
                {
                  state.team.members.map(member => (
                    <View key={member.id} style={commonStyle.card}>
                      <User navigation={navigation} user={member} />

                      {
                        member.username !== PersistentStorage.session.username && (
                          <View style={commonStyle.cardSubtitle}>
                            <TouchableOpacity
                              onPress={() => setState({
                                ...state,
                                memberToKick: member.id,
                              })}
                              style={commonStyle.buttonSmall}
                            >
                              <Text style={commonStyle.buttonText}>KICK MEMBER</Text>
                            </TouchableOpacity>
                          </View>
                        )
                      }
                    </View>
                  ))
                }

                {
                  state.team.hackathon.isOpen && state.team.members.length < state.team.hackathon.maxMembersPerTeam && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TeamMateSearchPage', { hackathon })}
                      style={commonStyle.buttonLarge}
                    >
                      <Text style={commonStyle.buttonText}>FIND TEAMMATES</Text>
                    </TouchableOpacity>
                  )
                }

                <TouchableOpacity
                  onPress={() => setState({
                    ...state,
                    isLeavingTeam: true,
                  })}
                  style={commonStyle.buttonLarge}
                >
                  <Text style={commonStyle.buttonText}>LEAVE TEAM</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={commonStyle.containerScrollable}
              refreshControl={(
                <RefreshControl
                  onRefresh={refreshPage}
                  refreshing={state.isRefreshing}
                />
              )}
            >
              <View style={commonStyle.containerCentered}>
                <Text style={commonStyle.containerCenteredText}>You do not have a team for this hackathon yet.</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('TeamMateSearchPage', { hackathon })}
                  style={commonStyle.buttonLarge}
                >
                  <Text style={commonStyle.buttonText}>FIND TEAMMATES</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )
        )
      }

      <ConfirmDialog
        title='Confirm Dialog'
        message='Are you sure you want to kick this member?'
        visible={!!state.memberToKick}
        onTouchOutside={() => setState({
          ...state,
          memberToKick: null,
        })}
        positiveButton={{
          title: 'YES',
          onPress: kickMember,
        }}
        negativeButton={{
          title: 'NO',
          onPress: () => setState({
            ...state,
            memberToKick: null,
          })
        }}
      />

      <ConfirmDialog
        title='Confirm Dialog'
        message='Are you sure you want to leave this team?'
        visible={state.isLeavingTeam}
        onTouchOutside={() => setState({
          ...state,
          isLeavingTeam: false,
        })}
        positiveButton={{
          title: 'YES',
          onPress: leaveTeam,
        }}
        negativeButton={{
          title: 'NO',
          onPress: () => setState({
            ...state,
            isLeavingTeam: false,
          })
        }}
      />
    </Page>
  );
}

TeamPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { TeamPage };