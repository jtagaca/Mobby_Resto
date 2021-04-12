import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, TouchableOpacity, LogBox, FlatList } from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantDetails } from '../../redux/actions/RestaurantDetailsActions';

const RestaurantDetailsScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRestaurantDetails(props.route.params.restaurant.id));
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);

    const restaurant = useSelector((state) =>
    state.restaurantDetails.restaurantDetails
      ? state.restaurantDetails.restaurantDetails
      : null
    );
    //if there is something here then you are returning that restaurant that was passed into the variable restaurant.
    //how is Dylan showing the top as the name of the restaurant?

    const isLoading = useSelector((state) => state.restaurantDetails.isFetchingRestaurantDetails)
    const theme = useSelector((state) => state.theme.theme)

    if (!restaurant || isLoading)
    {
        return (
            <View style={styles.container} >
                <ActivityIndicator size="large" />

            </View>
        )
    } else
    {
        return (

            <View style={styles.container}>
                <View style={styles.container}>

                    <Text style={{ color: theme.colors.surface}}>
                        Hello
                    </Text>
                    {/* <FlatList 

                    keyExtractor={(item) => item}
                    data={restaurant.photos}
                    renderItem={({item}) => (
                        <GallerySwiper 
                            
                            images={[{ uri: item }]}
                            resizeMode="contain"
                            pageMargin={0}
                        />
                    )}
                    /> */}
                </View>
            </View>

        );
    }
};

export default RestaurantDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
})