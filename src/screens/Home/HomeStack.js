import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import ContactScreen from './ContactScreen';
import React from 'react';
import newt from "./newt.js";

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Contact Us" component={ContactScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="newt" component={newt} options={{ headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default HomeStack;
