//TO DO clean the code to be more presentable use correct exports
import {
  Provider as PaperProvider,
  Avatar,
  Text,
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
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
  TextInput,
} from "react-native";
import { fetchRestaurants } from "../../redux/actions/RestaurantActions";
import { useSelector, useDispatch } from "react-redux";
// import Search from "../../components/search";
import TestScreen from "./TestScreen";
import ImageViewer from "react-native-image-zoom-viewer";
import { Rating, AirbnbRating } from "react-native-ratings";
import { set } from "react-hook-form";
// import { mdiPhone, mdiGoogleMaps  } from '@mdi/js';
import openMap from "react-native-open-maps";
import ModalDropdown from "react-native-modal-dropdown";
// import { Slider } from '@material-ui/core';
import { Overlay } from 'react-native-elements';
import { FAB } from 'react-native-paper';

export const CallNum = (number) => {
  let phoneNumber = "";
  if (Platform.OS === "android") {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

function newt(props) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshStart, setRefreshStart] = useState(false);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const onSearch = () => {
    setRefreshStart(true);
    dispatch(fetchRestaurants(searchQuery));
    setRefreshStart(false);
  };

  useEffect(() => {
    dispatch(fetchRestaurants(searchQuery));
  }, []);

  const restaurants = useSelector((state) =>
    state.restaurant.restaurants
      ? state.restaurant.restaurants.businesses
      : null
  );

  const isLoading = useSelector(
    (state) => state.restaurant.isFetchingRestaurants
  );

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //  console.log(theme);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Searchbar
          placeholder="What food would you like to eat..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={onSearch}
          iconColor={theme.colors.primary}
          selectionColor={theme.colors.primary}
          animate={true}
          animationDuration={200}
          focusOnLayout={true}
        />
        <Searchbar placeholder="location" />
        {/* 
        <Slider
          value={value}
          min={0}
          step={0.1}
          max={6}
          scale={(x) => x ** 10}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        /> */}

        {isLoading || !restaurants ? (
          <View
            style={{
              flex: 1,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.5,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : restaurants.length === 0 ? (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20 }}>
              No restaurants found near you. Try another search.
            </Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(item) => item.id}
            data={restaurants}
            onRefresh={onSearch}
            refreshing={refreshStart}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: theme.colors.primary }}>
                <Card style={(styles.card, styles.spacing)}>
                  <Card.Content>
                    <Title>{item.name}</Title>
                  </Card.Content>

                  {/* <ImageViewer imageUrls={{uri: item.image_url}}/> */}

                  <Card.Cover source={{ uri: item.image_url }} />
                  {/* <View style={styles.imgContainer}>
                        <ImageBackground source={item.image_url}>
                          <Text style={styles.text}>Inside</Text>
                        </ImageBackground>
                      </View> */}
                  <Card.Actions style={styles.actionContainer}>
                    <TouchableOpacity style={styles.buttonContainer}>
                      <Button
                        style={
                          (
                          { backgroundColor: theme.colors.primary })
                        }
                        back
                        onPress={() =>
                          props.navigation.navigate("RestaurantDetails", {
                            name: item.name,
                            restaurant: item,
                          })
                        }
                      >
                        <Text style={{color: theme.colors.background}}>More</Text>
                      </Button>
                    </TouchableOpacity>
                    {/* <Button>Placeholder</Button> */}
                    <TouchableOpacity style={styles.buttonContainer}>
                      <Button
                        style={
                          (
                          { backgroundColor: theme.colors.primary })
                        }
                        onPress={() => CallNum(item.display_phone)}
                      >
                        <Text style={{color: theme.colors.background}} >Call </Text>
                      </Button>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                      <Button
                        style={
                          (
                          { backgroundColor: theme.colors.primary })
                        }
                        onPress={() =>
                          openMap({
                            end: item.location.display_address,
                          })
                        }
                      >
                        <Text  style={{color: theme.colors.background}}>Map</Text>
                      </Button>
                    </TouchableOpacity>
                    {/* need to move  */}
                    <View
                      style={
                        (styles.buttonContainer,
                        { backgroundColor: theme.colors.primary })
                      }
                    >
                      <Rating
                        type="custom"
                        ratingCount={item.rating}
                        imageSize={20}
                        ratingBackgroundColor={theme.colors.surface}
                        tintColor={theme.colors.background}
                        ratingColor={theme.colors.primary}
                        ratingCount={5}
                        unSelectedColor="black"
                        readonly
                      />
                    </View>
                  </Card.Actions>
                </Card>
              </View>
            )}
          />
        )}
      </View>
      <FAB
          style={styles.fabStyle}
          icon="slot-machine"
          onPress={ toggleOverlay }
      />
      <Overlay overlayStyle={styles.olStyle} isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={{color: 'black'}}>
          I feel like eating...
        </Text>
        <TextInput placeholder='e.g. tacos,burgers,pizza'/>
        <Text style={{color: 'black'}}>
          I don't feel like eating...
        </Text>
        <TextInput placeholder='e.g. tacos,burgers,pizza'/>
        <Button>
          Random Pick
        </Button>
      </Overlay>

    </SafeAreaView>
  );
}

export default newt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  text: {},
  spacing: {
    marginTop: 40,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  actionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  card: {
    flexDirection: "row",
    height: 30,
    width: 10,
    borderRadius: 1,
    alignSelf: "center",
    marginBottom: 3,
    marginTop: 3,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rating: {
    flex: 1,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    // backgroundColor: "lightblue",
    borderRadius: 25,
    // paddingVertical:12,
    // paddingHorizontal:25,
    paddingTop: 0,
    paddingBottom: 0,
    marginRight: 1.8,
    marginLeft: 1.8,
    flex: 1,
    // height:100,
    // width:20
    borderRadius: 100,
  },

  appButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
    // textTransform: "uppercase",
    padding: 0,
    margin: 0,
  },
  phone: {
    height: 30,
    width: 30,
    backgroundColor: "#329df4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  fabStyle: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'lightblue',
  },
  olStyle: {
    position: 'absolute',
    top: 50,
    bottom: 180,
    left: 50,
    right: 50,
  },
});
