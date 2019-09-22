import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import { api } from '../services/api';
import { EventEmitter } from '../services/EventEmitter';
import { PersistentStorage } from '../services/PersistentStorage';

import { Hackathon } from './Hackathon';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function HackathonList({ navigation }) {
  const [state, setState] = useState({
    hackathons: [],
    isLastPage: false,
    isLoading: true,
    isLoadingNext: false,
    isRefreshing: false,
    nextPage: 1,
  });

  useEffect(() => {
    const subscribers = [];

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
    async function loadHackathons() {
      const response = await api.get(`/hackathons?page=${state.nextPage}`, {
        headers: {
          'Authorization': `Bearer ${PersistentStorage.session.token}`,
        },
      });

      const hackathons = (state.isRefreshing ? response.data.hackathons : [...state.hackathons, ...response.data.hackathons])
        .map(hackathon => {
          if (!hackathon.uuid) {
            hackathon.uuid = uuid();
          }

          return hackathon;
        });

      setState({
        hackathons,
        isLastPage: response.data.isLastPage,
        isLoading: false,
        isLoadingNext: false,
        isRefreshing: false,
        nextPage: state.nextPage + 1,
      });
    }

    if (!state.isLastPage && (state.isLoading || state.isLoadingNext || state.isRefreshing)) {
      loadHackathons();
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
      state.hackathons.length > 0 ? (
        <FlatList
          contentContainerStyle={commonStyle.containerScrollable}
          data={state.hackathons}
          keyExtractor={item => item.uuid}
          onRefresh={refreshPage}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.5}
          refreshing={state.isRefreshing}
          renderItem={({ item }) => (
            <Hackathon navigation={navigation} details={item} />
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