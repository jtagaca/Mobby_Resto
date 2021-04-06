import {
  Provider as PaperProvider,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Searchbar,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { fetchRestaurants } from "../../redux/actions/RestaurantActions";
import { useSelector, useDispatch } from "react-redux";
// import Search from "../../components/search";
import TestScreen from "./TestScreen";
import ImageViewer from "react-native-image-zoom-viewer";
import { Rating, AirbnbRating } from "react-native-ratings";
// import { CallNum } from "./PhoneButton";

function newt(props) {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    dispatch(fetchRestaurants("burger"));
  }, []);

  const CallNum = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const restaurants = useSelector((state) =>
    state.restaurant.restaurants
      ? state.restaurant.restaurants.businesses
      : null
  );


  // console.log(restaurants);
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
     
        <Searchbar
          placeholder="Search Restaurants"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        
       
        
        <FlatList
          keyExtractor={(item) => item.id}
          data={restaurants}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Card style={(styles.card, styles.spacing)}>
           
             
                <Card.Content>
                  <Title>{item.name}</Title>
                </Card.Content>

                <Card.Cover source={{ uri: item.image_url }} />
                {/* <View style={styles.imgContainer}>
                  <ImageBackground source={item.image_url}>
                    <Text style={styles.text}>Inside</Text>
                  </ImageBackground>
                </View> */}
                <Card.Actions>
                  <TouchableOpacity style={styles.appButtonContainer}>
                    <Button style={styles.appButtonText}>More Info</Button>
                  </TouchableOpacity>
                  {/* <Button>Placeholder</Button> */}
                  <TouchableOpacity>
                    <Button onPress={() => CallNum(item.display_phone)}>
                      Phone{" "}
                    </Button>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.appButtonContainer}>
                    <Button style={styles.appButtonText}>Directions</Button>
                  </TouchableOpacity>
                  {/* need to move  */}
                  <View style={styles.rating}>
                    <Rating
                      type="custom"
                      ratingCount={item.rating}
                      imageSize={25}
                      ratingBackgroundColor="grey"
                      ratingColor="lightblue"
                      ratingCount={5}
                      readonly
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
  console.log(setSearchQuery);
}

export default newt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
  },
  text: {},
  spacing: {
    marginTop: 40,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  card: {
    flexDirection: "row",
    height: 20,
    width: 10,
    borderRadius: 1,
    alignSelf: "center",
    marginBottom: 3,
    marginTop: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#ea7e7a",
  },
  rating: {
    flex: 1,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  phone: {
    height: 30,
    width: 30,
    backgroundColor: "#329df4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
