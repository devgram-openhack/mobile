import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { api } from '../services/api';
import { PersistentStorage } from '../services/PersistentStorage';

import { Page } from './Page';
import { Header } from '../components/Header';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function TeamMateSearchPage({ hackathon, navigation, team }) {
  const [state, setState] = useState({
    isSearching: false,
    keywords: [],
    results: [],
  });

  useEffect(() => {
    async function loadSearchResults() {
      if (state.isSearching) {
        const response = await api.get(`/hackathon/${hackathon.id}/users?keywords=${state.keywords.filter(keyword => keyword).join(',')}`, {
          headers: {
            'Authorization': `Bearer ${PersistentStorage.session.token}`,
          },
        });

        if (response.data.success) {
          setState({
            ...state,
            isSearching: false,
            results: response.data.results,
          });
        } else {
          setState({
            ...state,
            isSearching: false,
            results: [],
          });
        }
      }
    }

    loadSearchResults();
  }, [hackathon, state]);

  return (
    <Page>
      <Header navigation={navigation} />

      <View style={commonStyle.containerScrollable}>
        <View style={commonStyle.formField}>
          <Text style={commonStyle.formFieldLabel}>What are you looking for? Enter keywords below separated by a comma.</Text>

          <TextInput
            autoCapitalize='none'
            autoCompleteType='off'
            editable={!state.isSearching}
            onChangeText={text => setState({
              ...state,
              keywords: text.toLowerCase()
                .replace(/,\s+/g, ',')
                .split(',')
            })}
            placeholder='developer,react,vue,designer'
            style={commonStyle.formFieldInput}
            value={state.keywords.join(',')}
          />

          <TouchableOpacity
            disabled={state.isSearching}
            onPress={() => setState({
              ...state,
              isSearching: true,
            })}
            style={commonStyle.buttonLarge}
          >
            <Text style={commonStyle.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        {
          state.isSearching ? (
            <View style={commonStyle.containerCentered}>
              <ActivityIndicator color={colors.main} size={sizes['40']} />
            </View>
          ) : (
            state.results.length ? (
              null
            ) : (
              <View style={commonStyle.containerCentered}>
                <Icon name='highlight-off' style={commonStyle.containerCenteredIcon} />

                <Text style={commonStyle.containerCenteredText}>No results.</Text>
              </View>
            )
          )
        }
      </View>
    </Page>
  );
}

TeamMateSearchPage.propTypes = {
  hackathon: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  team: PropTypes.object,
};

export { TeamMateSearchPage };