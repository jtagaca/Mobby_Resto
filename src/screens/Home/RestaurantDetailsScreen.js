import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, LogBox, FlatList, Image, Dimensions, SafeAreaView, PushNotificationIOS } from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';
import { ActivityIndicator, Text, Button } from 'react-native-paper';
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
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 0.1 }}/>
                <View style={styles.container}>
                    <View style={{ flex: 0.1 }}/>
                    <View style={{ flex: 1 }}>
                        {/* <FlatList 

                        keyExtractor={(item) => item}
                        data={restaurant.photos}
                        horizontal
                        renderItem={({item}) => (
                            <View style={{ flex: 1 }}>
                                {console.log(item)}
                                <Image 
                                    style={styles.image}
                                    source={{ uri: item }}
                                    />
                            </View>
                        )}
                        /> */}
                        <GallerySwiper 
                            images={[{uri: restaurant.photos[0]},
                                    {uri: restaurant.photos[1]}]}
                            // images={[
                            //     // Version *1.1.0 update (or greater versions): 
                            //     // Can be used with different image object fieldnames.
                            //     // Ex. source, source.uri, uri, URI, url, URL
                            //     { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg" },
                            //         // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                            //         // to include a dimensions field with the
                            //         // actual width and height of the image or
                            //         // it will throw an error.
                            //     { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                            //     { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg" },
                            //     { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                            //     { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
                            // ]}
                        />
                    </View>
                    <View style={{ flex: 0.1 }}/>

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