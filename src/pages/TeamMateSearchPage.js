import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import SimpleToast from 'react-native-simple-toast';

import { api } from '../services/api';
import { PersistentStorage } from '../services/PersistentStorage';

import { Page } from './Page';
import { Header } from '../components/Header';
import { User } from '../components/User';

import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import { commonStyle } from '../styles/Common.style';

function TeamMateSearchPage({ navigation }) {
  const hackathon = navigation.getParam('hackathon');

  const [state, setState] = useState({
    isSearching: false,
    keywords: [],
    result: null,
  });

  useEffect(() => {
    async function loadSearchResult() {
      const response = await api.get(`/hackathon/${hackathon.id}/user?keywords=${state.keywords.filter(keyword => keyword).join(',')}`, {
        headers: {
          'Authorization': `Bearer ${PersistentStorage.session.token}`,
        },
      });

      if (response.data.success) {
        setState({
          ...state,
          isSearching: false,
          result: response.data.result,
        });
      } else {
        setState({
          ...state,
          isSearching: false,
          result: null,
        });
      }
    }

    if (state.isSearching) {
      loadSearchResult();
    }
  }, [hackathon, state]);

  function refreshPage() {
    setState({
      ...state,
      isSearching: true,
    });
  }

  async function sendInviteToUser() {
    const response = await api.post(`/hackathon/${hackathon.id}/user/${state.result.user.id}/invite`, null, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      refreshPage();
    } else {
      SimpleToast.show(response.data.message);
    }
  }

  async function ignoreUser() {
    const response = await api.post(`/hackathon/${hackathon.id}/user/${state.result.user.id}/ignore`, null, {
      headers: {
        'Authorization': `Bearer ${PersistentStorage.session.token}`,
      },
    });

    if (response.data.success) {
      refreshPage();
    } else {
      SimpleToast.show(response.data.message);
    }
  }

  const otherMembers = state.result && state.result.team ? state.result.team.members.filter(member => member.id !== state.result.user.id) : [];

  return (
    <Page>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={commonStyle.containerScrollable}>
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
            onPress={refreshPage}
            style={commonStyle.buttonLarge}
          >
            <Text style={commonStyle.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        {
          state.isSearching ? (
            <View style={commonStyle.containerCenteredHorizontal}>
              <ActivityIndicator color={colors.main} size={sizes['40']} />
            </View>
          ) : (
            state.result ? (
              <View style={commonStyle.card}>
                <User navigation={navigation} user={state.result.user} showDescription={true}  />

                {
                  state.result.team ? (
                    <View style={commonStyle.cardTitle}>
                      <Text style={commonStyle.infoTitleMargin}>
                        Member of <Text style={commonStyle.infoTitleHighlight}>{state.result.team.name || `Team ${state.result.team.id}`}</Text>. Missing <Text style={commonStyle.infoTitleHighlight}>{state.result.team.missing}</Text> members.
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
                      <Text style={commonStyle.infoTitle}>Not in any team.</Text>
                    </View>
                  )
                }

                <View style={commonStyle.cardDescription}>
                  <TouchableOpacity
                    onPress={sendInviteToUser}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>SEND INVITE</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={ignoreUser}
                    style={commonStyle.buttonLarge}
                  >
                    <Text style={commonStyle.buttonText}>IGNORE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={commonStyle.containerCenteredHorizontal}>
                <Icon name='highlight-off' style={commonStyle.containerCenteredIcon} />

                <Text style={commonStyle.containerCenteredText}>No results.</Text>
              </View>
            )
          )
        }
      </ScrollView>
    </Page>
  );
}

TeamMateSearchPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { TeamMateSearchPage };