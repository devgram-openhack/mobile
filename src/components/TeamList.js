import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { api } from '../services/api';

import { Team } from './Team';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function TeamList({ navigation }) {
  const session = navigation.getParam('session');

  const [state, setState] = useState({
    isLastPage: false,
    isLoading: true,
    isLoadingNext: false,
    isRefreshing: false,
    nextPage: 1,
    teams: [],
  });

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

  useEffect(() => {
    async function loadTeams() {
      if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
        const response = await api.get(`/teams?page=${state.nextPage}`, {
          'Authorization': `Bearer ${session.token}`,
        });

        setState({
          isLastPage: response.data.isLastPage,
          isLoading: false,
          isLoadingNext: false,
          isRefreshing: false,
          nextPage: state.nextPage + 1,
          teams: state.isRefreshing ? response.data.teams : [...state.teams, ...response.data.teams],
        });
      }
    }

    loadTeams();
  }, [state, session]);

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
          keyExtractor={item => item.id}
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