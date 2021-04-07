import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ContactScreen from './ContactScreen';
import newt from "./newt.js";
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import TestScreen from './TestScreen';
import Restaurants from './newt.js'

import React from 'react';

function HomeStackV2(props) {

  const bottomTabNavigator = createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={25} color={tintColor} />
          )
        }
      },
      Explore: {
        screen: ExploreScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="search" size={25} color={tintColor} />
          )
        }
      },
    },
    {
      initialRouteName: 'Home',
      tabBarOptions: {
        activeTintColor: '#eb6e3d'
      }
    }
  );
  const AppContainer = createAppContainer(bottomTabNavigator);
  return (
        <SafeAreaView >

          <Restaurants/>

          <AppContainer></AppContainer>
        </SafeAreaView>
        
    );

  };
  


export default HomeStackV2;
