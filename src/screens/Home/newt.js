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
  console.log(restaurants);
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
            <Card style={styles.card, styles.spacing}>
              <Text>{item.categories.alias}</Text>
              <Card.Content>
                <Title>{item.alias}</Title>
              </Card.Content>

              <Card.Cover source={{ uri: item.image_url }} />
              <Card.Actions>
                <Button>More Info</Button>
                {/* <Button>Placeholder</Button> */}
                <Text style={styles.spacing}>Phone: {item.phone}</Text>
                {/* need to move  */}
                <Text>Ratings: {item.rating}</Text>
              </Card.Actions>
            </Card>
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
  // background: {
  //   backgroundColor: '#68a0cf',
  //   borderBottomColor: "black",
  //   borderRadius: 3,
  //   color: "white",
  // },
  text: {
    
  },
  spacing: {
    marginTop:40,
    paddingLeft:0,
    paddingRight:0
  },
  card: {
    flexDirection: 'row',
    // height: cardHeight,
    // width: cardWidth,
    // borderRadius: cardRadius,
    alignSelf: 'center',
    marginBottom: 3,
    marginTop: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#ea7e7a'
  }
});

