import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import React from 'react';

const Stack = createStackNavigator();

function HomeStack() {

    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default HomeStack;
