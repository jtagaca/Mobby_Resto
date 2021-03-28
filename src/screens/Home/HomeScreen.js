import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { fetchRestaurants } from '../../redux/actions/RestaurantActions';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = (props) => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchRestaurants("burger"))
    }, []);

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
                    <Button onPress={() => props.navigation.navigate("Register")}>
                        Go to Register Screen
                    </Button>
                    <Button onPress={() => props.navigation.navigate("Contact Us")}>
                        Contact Us
                    </Button>
                    <Button onPress={() => props.navigation.navigate("newt")}>
                        after sign in
                    </Button>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>
                        {restaurants[0].name}
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default HomeScreen;