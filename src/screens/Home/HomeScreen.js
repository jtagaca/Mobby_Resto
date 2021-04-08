import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { fetchRestaurants } from '../../redux/actions/RestaurantActions';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_LOGOUT } from '../../redux/actions/types';


const HomeScreen = (props) => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchRestaurants("burger"))
    }, []);

    const logout = () => {
        dispatch({ type: AUTH_LOGOUT })
    }

    const restaurants = useSelector(state => (state.restaurant.restaurants) ? state.restaurant.restaurants.businesses : null)

    const isLoading = useSelector(state => state.restaurant.isFetchingRestaurants)

    if (isLoading || !restaurants)
    {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            </SafeAreaView>
        )
    }
    else
    {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30 }}>
                        This is the Home Screen.
                    </Text>
                    <Button onPress={() => props.navigation.navigate("newt")}>
                        after sign in
                    </Button>
                    <Button onPress={() => props.navigation.navigate("ProfileScreen")}>
                        My Profile
                    </Button>
                    <Button onPress={() => props.navigation.navigate("SettingsScreen")}>
                        Setting Screen
                    </Button>
                    <Button onPress={() => props.navigation.navigate("EditProfileScreen")}>
                        Edit Profile Screen Screen
                    </Button>
                    <Button onPress={() => props.navigation.navigate("TestScreen")}>
                        Test Screen
                    </Button>
                    <Button onPress={() => props.navigation.navigate("Contact Us")}>
                        Contact Us
                    </Button>
                    <Button onPress={logout}>
                        Log Out
                    </Button>
                    <Button onPress={() => props.navigation.navigate("MapScreen")}>
                        map screen test
                    </Button>
                    
                </View>
               
            </SafeAreaView>
        )
    }
}

export default HomeScreen;