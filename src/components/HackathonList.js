import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { api } from '../services/api';

import { Hackathon } from './Hackathon';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function HackathonList({ navigation }) {
  const session = navigation.getParam('session');

  const [state, setState] = useState({
    hackathons: [],
    isLastPage: false,
    isLoading: true,
    isLoadingNext: false,
    isRefreshing: false,
    nextPage: 1,
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
    async function loadHackathons() {
      if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
        const response = await api.get(`/hackathons?page=${state.nextPage}`, {
          'Authorization': `Bearer ${session.token}`,
        });

        setState({
          hackathons: state.isRefreshing ? response.data.hackathons : [...state.hackathons, ...response.data.hackathons],
          isLastPage: response.data.isLastPage,
          isLoading: false,
          isLoadingNext: false,
          isRefreshing: false,
          nextPage: state.nextPage + 1,
        });
      }
    }

    loadHackathons();
  }, [state, session]);

  return (
    state.isLoading ? (
      <View style={commonStyle.containerCentered}>
        <ActivityIndicator color={colors.main} size={sizes['40']} />
      </View>
    ) : (
      state.hackathons.length > 0 ? (
        <FlatList
          contentContainerStyle={commonStyle.containerScrollable}
          data={state.hackathons}
          keyExtractor={item => item.id}
          onRefresh={refreshPage}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.5}
          refreshing={state.isRefreshing}
          renderItem={({ item }) => (
            <Hackathon details={item} navigation={navigation} />
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

            <Text style={commonStyle.containerCenteredText}>There are no hackathons. Scroll up to refresh the page.</Text>
          </View>
        </ScrollView>
      )
    )
  );
}

HackathonList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { HackathonList };