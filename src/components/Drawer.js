import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { drawerStyle } from '../styles/Drawer.style';

function Drawer({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      icon: 'home',
      title: 'Home',
      routeName: 'MainPage',
    },
    {
      icon: 'code',
      title: 'Hackathons',
      routeName: 'HackathonsPage',
    },
    {
      icon: 'people',
      title: 'Teams',
      routeName: 'TeamsPage',
    },
    {
      icon: 'info',
      title: 'About',
      routeName: 'AboutPage',
    },
    {
      icon: 'power-settings-new',
      title: 'Logout',
      routeName: 'LogoutPage',
    },
  ];

  function handleItem(index) {
    navigation.navigate(items[index].routeName);

    setActiveIndex(index);
  }

  useEffect(() => {
    function getActiveRouteName(navigationState) {
      if (!navigationState) {
        return null;
      }

      const route = navigationState.routes[navigationState.index];

      if (route.routes) {
        return getActiveRouteName(route);
      }

      return route.routeName;
    }

    function updateActiveIndex() {
      const routeName = getActiveRouteName(navigation.state);

      for (const [index, item] of items.entries()) {
        if (item.routeName === routeName) {
          setActiveIndex(index);

          return;
        }
      }

      setActiveIndex(0);
    }

    updateActiveIndex();
  }, [items, navigation.state]);

  return (
    <SafeAreaView style={drawerStyle.container}>
      <ScrollView contentContainerStyle={drawerStyle.containerScrollable}>
        {
          items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleItem(index)}
              style={activeIndex === index ? drawerStyle.buttonActive : drawerStyle.button}
            >
              <Icon name={item.icon} style={activeIndex === index ? drawerStyle.buttonIconActive : drawerStyle.buttonIcon} />

              <Text style={activeIndex === index ? drawerStyle.buttonTextActive : drawerStyle.buttonText}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

Drawer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export { Drawer };