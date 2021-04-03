import {
  Provider as PaperProvider,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, FlatList } from "react-native";
import { fetchRestaurants } from "../../redux/actions/RestaurantActions";
import { useSelector, useDispatch } from "react-redux";
import Bot from "./botNav";
import Search from "./search";
import TestScreen from "./TestScreen"
import ImageViewer from 'react-native-image-zoom-viewer';
import { Rating, AirbnbRating } from 'react-native-ratings';


//this is still in progress
function newt(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants("burger"));
  }, []);

  const restaurants = useSelector((state) =>
    state.restaurant.restaurants
      ? state.restaurant.restaurants.businesses
      : null
  );

  
  console.log(restaurants.display_phone);
  // const categories= {restaurant.categories.alias};
  // console.log(categories);
  const isLoading = useSelector(
    (state) => state.restaurant.isFetchingRestaurants
  );
  if (isLoading || !restaurants) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
    
  
  } else {
    return (
      <SafeAreaView>
         
        <Search style={styles.background} />
        <FlatList
          keyExtractor={(item) => item.id}
          data={restaurants}
          
          renderItem={({ item }) => (
            
            <View style={styles.container}>
            <Card style={ styles.card, styles.spacing}>
              <Text>{item.categories.alias}</Text>

              {/* use the method replace to remove the dashes but we need to store the output first to a variable*/}
              <Card.Content>
                <Title>{item.alias}</Title>
              </Card.Content>
       
              <Card.Cover 
              
              source={{ uri: item.image_url }} />
              <Card.Actions>
                <Button>More Info</Button>
                {/* <Button>Placeholder</Button> */}
                <Text style={styles.text}>Phone: {item.phone}</Text>
                {/* need to move  */}
                <View style={styles.rating}>
                <Rating 
                
                type='custom'
                ratingCount= {item.rating}
                imageSize={25}
                ratingBackgroundColor= 'grey'
                ratingColor= "lightblue"
                ratingCount={5}
                />
                </View>
              </Card.Actions>
            </Card>
            </View>
          )}
          
        />
        {/* <Bot/> */}
        {/* <Button onPress={() => navigation.navigate(TestScreen)}>Hit me</Button> //not working */}
       
      </SafeAreaView>
    );
  }
}

export default newt;

const styles = StyleSheet.create({
  
  container:{
    backgroundColor: "lightblue",
  },
  text: {
    
  },
  spacing: {
    marginTop:40,
    paddingLeft:0,
    paddingRight:0,
    paddingBottom:0
  },
  card: {
    flexDirection: 'row',
    height: 20,
    width: 10,
    borderRadius: 1,
    alignSelf: 'center',
    marginBottom: 3,
    marginTop: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#ea7e7a'
    
  },
  rating: {
    flex: 1
   
  }
});

