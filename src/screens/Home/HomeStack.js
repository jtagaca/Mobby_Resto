import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import React from 'react';

const Stack = createStackNavigator();

function HomeStack() {

    return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default HomeStack;
