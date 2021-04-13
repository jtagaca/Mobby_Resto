import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, LogBox, FlatList, Image, Dimensions, SafeAreaView, PushNotificationIOS } from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';
import { ActivityIndicator, Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
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

    console.log(restaurant)

    // if we are awaiting the api still, then we will display a loading icon instead of content
    if (!restaurant || isLoading)
    {
        return (
            <View style={styles.container, { 
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0, 
                }} >
                <ActivityIndicator size="large" />

            </View>
        )
    } else
    {
        // I am creating an array of objects containing the urls of each photo
        // to pass into our gallery swiper
        let photos = new Array(restaurant.photos.length);
        for (var i = 0; i < photos.length; i++)
        {
            photos[i] = new Object();
            photos[i].uri = restaurant.photos[i];
        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        
                        <GallerySwiper 
                            // images={[{uri: restaurant.photos[0]},
                            //         {uri: restaurant.photos[1]}]}
                            images={photos}
                            
                        />

                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialIcons name="star" size={20} color="gold" size={20}/>
                            <Text >
                                {restaurant.rating} ({restaurant.review_count} ratings)
                            </Text>
                        </View>
                    </View>

                </View> 
            </SafeAreaView>

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
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  }
})