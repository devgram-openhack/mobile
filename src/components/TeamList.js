import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import { api } from '../services/api';
import { EventEmitter } from '../services/EventEmitter';
import { PersistentStorage } from '../services/PersistentStorage';

import { Team } from './Team';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function TeamList({ navigation }) {
  const [state, setState] = useState({
    isLastPage: false,
    isLoading: true,
    isLoadingNext: false,
    isRefreshing: false,
    nextPage: 1,
    teams: [],
  });

  useEffect(() => {
    const subscribers = [];

    function updateTeam(updatedTeam) {
      setState({
        ...state,
        teams: state.teams.map(team => {
          if (team.id === updatedTeam.id) {
            team = Object.assign({}, team, updatedTeam);
            team.uuid = uuid();
          }

          return team;
        }),
      });
    }

    function refreshPage() {
      setState({
        ...state,
        isLastPage: false,
        isRefreshing: true,
        nextPage: 1,
      });
    }

    function subscribe() {
      subscribers.push(
        EventEmitter.subscribe('edit-team', updateTeam),
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
    async function loadTeams() {
      const response = await api.get(`/me/teams?page=${state.nextPage}`, {
        headers: {
          'Authorization': `Bearer ${PersistentStorage.session.token}`,
        },
      });

      const teams = (state.isRefreshing ? response.data.teams : [...state.teams, ...response.data.teams])
        .map(team => {
          if (!team.uuid) {
            team.uuid = uuid();
          }

          return team;
        });

      setState({
        isLastPage: response.data.isLastPage,
        isLoading: false,
        isLoadingNext: false,
        isRefreshing: false,
        nextPage: state.nextPage + 1,
        teams,
      });
    }

    if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
      loadTeams();
    }
  }, [state]);

  function refreshPage() {
    setState({
      ...state,
      isLastPage: false,
      isRefreshing: true,
      nextPage: 1,
    });
  }

  function loadNextPage() {
    setState({
      ...state,
      isLoadingNext: true,
    });
  }

  return (
    state.isLoading ? (
      <View style={commonStyle.containerCentered}>
        <ActivityIndicator color={colors.main} size={sizes['40']} />
      </View>
    ) : (
      state.teams.length > 0 ? (
        <FlatList
          contentContainerStyle={commonStyle.containerScrollable}
          data={state.teams}
          keyExtractor={item => item.uuid}
          onRefresh={refreshPage}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.5}
          refreshing={state.isRefreshing}
          renderItem={({ item }) => (
            <Team navigation={navigation} team={item} />
          )}
        />
      ) : (
        <ScrollView
          contentContainerStyle={commonStyle.containerScrollable}
          refreshControl={(
            <RefreshControl
              refreshing={state.isRefreshing}
              onRefresh={refreshPage}
            />
          )}
        >
          <View style={commonStyle.containerCentered}>
            <Icon name='highlight-off' style={commonStyle.containerCenteredIcon} />

            <Text style={commonStyle.containerCenteredText}>{'You are not in any teams. Go to the hackathons page to join hackathons / teams.'}</Text>
          </View>
        </ScrollView>
      )
    )
  );
}

TeamList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { TeamList };