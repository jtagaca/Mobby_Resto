import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ContactScreen from './ContactScreen';
import React from 'react';
import newt from "./newt.js";
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import TestScreen from './TestScreen';
import RestaurantDetailsScreen from './RestaurantDetailsScreen';
import EditProfileScreen from './EditProfileScreen';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Contact Us" component={ContactScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="newt" component={newt} options={{ headerShown: false}}/>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} options={{ headerShown: false}}/>
            
        </Stack.Navigator>
    );
}

export default HomeStack;
