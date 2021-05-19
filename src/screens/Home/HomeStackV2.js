import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { DrawerActions } from "react-navigation";

import HomeScreen from "./HomeScreen";
import ContactScreen from "./ContactScreen";
import HomePage from "./newt.js";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import TestScreen from "./TestScreen";
import RestaurantDetailsScreen from "./RestaurantDetailsScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import EditProfileScreen from "./EditProfileScreen";
import { useDispatch, useSelector } from "react-redux";

import { StyleSheet, View } from "react-native";
import FavoriteRestaurantsScreen from "./FavoriteRestaurantsScreen";

const HomeStack = createStackNavigator();

const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: theme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: theme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarColor: theme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-settings" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: "Contact",
          tabBarColor: theme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="help-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#009387",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomePage}
      options={{
        title: "Mobby Resto",
        headerTitleAlign: "center",
      }}
    />

    <HomeStack.Screen
      name="RestaurantDetails"
      component={RestaurantDetailsScreen}
      options={{ headerShown: true, headerStyle: { alignItems: "center" } }}
      options={({ route }) => ({ title: route.params.name })}
    />
    <HomeStack.Screen name="EditProfileScreen" component={EditProfileScreen} />

    <HomeStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: true, headerStyle: { alignItems: "center" } }}
      options={({ route }) => ({ title: route.params.name })}
    />

    <HomeStack.Screen
      name="FavoriteRestaurants"
      component={FavoriteRestaurantsScreen}
      options={{ headerShown: true }}
    />
    {/* why is this not working? not showing the header*/}
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1f65ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={
        {
          // headerLeft: () => (
          //     <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
          // )
        }
      }
    />
  </DetailsStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
});
