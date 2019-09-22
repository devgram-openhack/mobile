import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

function PendingInvitesPage({ navigation }) {
  const [state, setState] = useState({
    isLoading: true,
    isRefreshing: false,
    invite: null,
  });

  useEffect(() => {
    async function loadPendingInvite() {
      const response = await api.get('/me/invite', {
        headers: {
          'Authorization': `Bearer ${PersistentStorage.session.token}`,
        },
      });

      setState({
        isLoading: false,
        isRefreshing: false,
        invite: response.data.invite,
      });
    }

    if (state.isLoading || state.isRefreshing) {
      loadPendingInvite();
    }
  }, [state]);

  function refreshPage() {
    setState({
      ...state,
      isRefreshing: true,
    });
  }

  async function handleInvite(status) {
    const data = { status };

    const response = await api.patch(`/invite/${state.invite.id}`, data, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      if (status === 'accepted') {
        SimpleToast.show('Success! Go to your teams page to view your new teammate.');

        EventEmitter.dispatch('update-team');
      }

      refreshPage();
    } else {
      SimpleToast.show(response.data.message);
    }
  }

  const otherMembers = state.invite && state.invite.team ? state.invite.team.members.filter(member => member.id !== state.invite.from.id) : [];

  return (
    <Page>
      <Header navigation={navigation} />

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
          state.isLoading ? (
            <View style={commonStyle.containerCentered}>
              <ActivityIndicator color={colors.main} size={sizes['40']} />
            </View>
          ) : (
            state.invite ? (
              <View style={commonStyle.card}>
                <User navigation={navigation} user={state.invite.from} showDescription={true}  />

                {
                  state.invite.team ? (
                    <View style={commonStyle.cardTitle}>
                      <Text style={commonStyle.infoTitleMargin}>
                        Member of <Text style={commonStyle.infoTitleHighlight}>{state.invite.team.name || `Team ${state.invite.team.id}`}</Text> from <Text style={commonStyle.infoTitleHighlight}>{state.invite.hackathon.name}</Text>. Missing <Text style={commonStyle.infoTitleHighlight}>{state.invite.team.missing}</Text> members.
                      </Text>

                      {
                        otherMembers.length > 0 && (
                          <Text style={commonStyle.cardSubtitle}>Other members:</Text>
                        )
                      }

                      {
                        otherMembers.map(member => (
                          <View key={member.id} style={commonStyle.cardPadded}>
                            <User navigation={navigation} user={member} />
                          </View>
                        ))
                      }
                    </View>
                  ) : (
                    <View style={commonStyle.cardTitle}>
                      <Text style={commonStyle.infoTitle}>Not in any team from <Text style={commonStyle.infoTitleHighlight}>{state.invite.hackathon.name}</Text>.</Text>
                    </View>
                  )
                }

                <View style={commonStyle.cardDescription}>
                  <TouchableOpacity
                    onPress={() => handleInvite('accepted')}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>ACCEPT</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleInvite('rejected')}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>REJECT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={commonStyle.containerCentered}>
                <Icon name='highlight-off' style={commonStyle.containerCenteredIcon} />

                <Text style={commonStyle.containerCenteredText}>No pending invites.</Text>
              </View>
            )
          )
        }
      </ScrollView>
    </Page>
  );
}

PendingInvitesPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { PendingInvitesPage };