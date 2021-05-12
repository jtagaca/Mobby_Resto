import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, LogBox, FlatList, Image, Dimensions, SafeAreaView, PushNotificationIOS } from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';
import { ActivityIndicator, Text, Button, Avatar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantDetails } from '../../redux/actions/RestaurantDetailsActions';
import openMap from "react-native-open-maps";
import { CallNum } from './newt';
import { addFavorite, removeFavorite } from '../../redux/actions/UserActions';

const RestaurantDetailsScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRestaurantDetails(props.route.params.restaurant.id));
    }, []);

    const restaurant = useSelector((state) =>
    state.restaurantDetails.restaurantDetails
      ? state.restaurantDetails.restaurantDetails
      : null
    );
    const isLoading = useSelector((state) => state.restaurantDetails.isFetchingRestaurantDetails)
    const theme = useSelector((state) => state.theme.theme)
    const favorites = useSelector((state) => state.user.favorites)
    
    const [favorited, setFavorited] = useState(false)

    // console.log(favorites)
    
    

    const setFavorite = () => {
        if (!favorited)
        {
            dispatch(addFavorite(restaurant.name, restaurant.id, restaurant.image_url));
            setFavorited(true);
        }
    }
    const deleteFavorite = () => {
        if (favorited)
        {
            dispatch(removeFavorite(restaurant.id));
            setFavorited(false);
        }
    }

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        if (!favorited && favorites.find(function(favorite, index) {
            if (props.route.params.restaurant.id === favorite.id)
                return true;
        }))
        {
            setFavorited(true);
        }
    }, []);

    function timeFormat (numStr) {
        var temp = '';
        var post = '';

        if (numStr >= 1300)
        {
            temp = '0' + String(numStr - 1200);
            post = 'PM';
        }
        else
        {
            temp = String(numStr);
            post = 'AM';
        }

        if (temp < 1000)
            return temp.substring(1, 2) + ':' + temp.substring(2) + post;
        else
            return temp.substring(0, 2) + ':' + temp.substring(2) + post;
    };

    

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
        let today = new Date();

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        
                        <GallerySwiper 
                            // images={[{uri: restaurant.photos[0]},
                            //         {uri: restaurant.photos[1]}]}
                            images={photos}
                            resizeMode="cover"
                            
                        />

                        <View style={{ padding: 8 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <View style={{ fontSize: 22 }}>
                                    <Text style={{ fontSize: 16 }}>
                                        Opens at: {timeFormat(restaurant.hours[0].open[today.getDay()].start)} 
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        Closes at: {timeFormat(restaurant.hours[0].open[today.getDay()].end)} 
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 8 }}>
                                    <MaterialIcons name="star" size={25} color="gold" />
                                    <Text style={{ fontSize: 18 }} >
                                        {restaurant.rating} ({restaurant.review_count} ratings)
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 8 }}>
                            <TouchableOpacity onPress={() => (!favorited) ? setFavorite() : deleteFavorite() } >
                                <AntDesign name={(!favorited) ? "staro" : "star" } size={25} />
                            </TouchableOpacity>

                            <Button mode="contained" onPress={() => openMap({ end: restaurant.location.display_address })} >
                                <Text>
                                    Directions
                                </Text>
                            </Button>
                            <Button mode="contained" onPress={() => CallNum(restaurant.phone)} >
                                <Text>
                                    {restaurant.display_phone}
                                </Text>
                            </Button>
                        </View>
                    </View>
                        
                    <View style={{ flex: 1, padding: 8 }}>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 24 }}>
                                Reviews
                            </Text>
                        </View>

                        <FlatList 
                            keyExtractor={(item) => item.id}
                            data={restaurant.reviews.reviews}
                            showsVerticalScrollIndicator={false}
                            // stickyHeaderIndices={[0]}
                            // ListHeaderComponent={
                            //     <View style={{ alignItems: 'center' }}>
                            //         <Text style={{ fontSize: 24 }}>
                            //             Reviews
                            //         </Text>
                            //     </View>
                            // }
                            renderItem={({item}) => (
                                <View style={{ flex: 1, backgroundColor: theme.colors.primary, borderRadius: 15, borderTopLeftRadius: 0, borderTopRightRadius: 0, marginBottom: 8, padding: 2 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 18, marginLeft: 2, color: theme.colors.background }}>
                                            {item.user.name}
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginRight: 15 }}>
                                            <MaterialIcons name="star" size={20} color={theme.colors.background} style={{ padding: 1 }}/>
                                            <Text style={{ fontSize: 18, color: theme.colors.background }} >
                                                {item.rating}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: theme.colors.surface, borderRadius: 15, borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: 2 }}>
                                        <Text style={{ fontSize: 16 }}>
                                            {`\t\t`}{item.text}{`\n`}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />

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