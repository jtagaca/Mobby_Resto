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
import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
  TextInput,
  Animated,
} from "react-native";
import { fetchRestaurants } from "../../redux/actions/RestaurantActions";
import { useSelector, useDispatch } from "react-redux";

import TestScreen from "./TestScreen";
import ImageViewer from "react-native-image-zoom-viewer";
import { Rating, AirbnbRating } from "react-native-ratings";
import { set } from "react-hook-form";

import openMap from "react-native-open-maps";
import ModalDropdown from "react-native-modal-dropdown";

import { Overlay } from "react-native-elements";
import { FAB } from "react-native-paper";

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

  const [searchQuery, setSearchQuery] = useState("burger");
  const [refreshStart, setRefreshStart] = useState(false);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [searchLocation, setSearchLocation]=useState("bakersfield");



  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onChangeLocation = (query) => {
    setSearchLocation(query);
  };
  const onSearch = () => {
    setRefreshStart(true);
    dispatch(fetchRestaurants(searchQuery, searchLocation));
    setRefreshStart(false);
  };

  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  useEffect(() => {
    if (toggleSearchBar) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -90,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [toggleSearchBar]);

  useEffect(() => {
    dispatch(fetchRestaurants("burger", "bakersfield"));
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

  //testing randomizer stuff
  const randomize = (restLength) => {
    return restaurants[Math.floor(Math.random() * (restLength-1) + 0)].name;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={
            ({ transform: [{ translateY: searchBarAnim }] },
            { backgroundColor: "rgba(52, 52, 52, 0.8)" })
          }
        >
          <View style={styles.searchBarWrap}>
            <Searchbar
              placeholder="What food would you like to eat..."
              onChangeText={value =>setSearchQuery(value)}
              value={searchQuery}
              onSubmitEditing={onSearch}
              iconColor={theme.colors.primary}
              selectionColor={theme.colors.primary}
              animate={true}
              animationDuration={200}
              focusOnLayout={true}
              onHide
            />

            <Searchbar
              placeholder="location"
              onChangeText={value =>setSearchLocation(value)}
              value={searchLocation}
              onSubmitEditing={onSearch}
              iconColor={theme.colors.primary}
              selectionColor={theme.colors.primary}
              animate={true}
              animationDuration={200}
              focusOnLayout={true}
              onHide
              // location is not updating
            />
          </View>


        </Animated.View>

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
          <Animated.FlatList
            onScrollBeginDrag={() => setToggleSearchBar(false)}
            keyExtractor={(item) => item.id}
            style={{ transform: [{ translateY: searchBarAnim }] }}
            // style={{ transform: [{ translateY: searchBarAnim }] }}
            data={restaurants}
            onRefresh={onSearch}
            refreshing={refreshStart}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: theme.colors.primary }}>
                <Card style={(styles.card, styles.spacing)}>
                  <Card.Content>
                    <Title>{item.name}</Title>
                  </Card.Content>

                  <Card.Cover source={{ uri: (item.image_url) ? item.image_url : null }} />

                  <Card.Actions style={styles.actionContainer}>
                    <TouchableOpacity style={styles.buttonContainer}>
                      <Button
                        style={{ backgroundColor: theme.colors.primary }}
                        back
                        onPress={() =>
                          props.navigation.navigate("RestaurantDetails", {
                            name: item.name,
                            restaurant: item,
                          })
                        }
                      >
                        <Text style={{ color: theme.colors.background }}>
                          More
                        </Text>
                      </Button>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                      <Button
                        style={{ backgroundColor: theme.colors.primary }}
                        onPress={() => CallNum(item.display_phone)}
                      >
                        <Text style={{ color: theme.colors.background }}>
                          Call{" "}
                        </Text>
                      </Button>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                      <Button
                        style={{ backgroundColor: theme.colors.primary }}
                        onPress={() =>
                          openMap({
                            end: item.location.display_address,
                          })
                        }
                      >
                        <Text style={{ color: theme.colors.background }}>
                          Map
                        </Text>
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
      <View>
        {/* <View style={styles.invcontainer}>
        <FAB
          style={styles.allign}
          onPress={() => setToggleSearchBar(!toggleSearchBar)}
          label="Search"
          color={theme.colors.primary}
        />
      </View> */}
        <View style={{ background: theme.colors.background }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              position: "absolute",
              bottom: 10,
              right: 0,
              left: 10,
              height: 70,

              borderRadius: 100,
            }}
          >
            <FAB
              icon="magnify"
              size={30}
              color={theme.colors.background}
              onPress={() => setToggleSearchBar(!toggleSearchBar)}
              style={{ backgroundColor: theme.colors.primary }}
            />
          </TouchableOpacity>

          <View>
            <FAB
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#009387",

                borderRadius: 100,
              }}
              icon="slot-machine"
              onPress={toggleOverlay}
              size={30}
              color={theme.colors.background}
            />

            <Overlay
              overlayStyle={styles.olStyle}
              isVisible={visible}
              onBackdropPress={toggleOverlay}
            >
            <View>
              <Text style={{ color: "black" }}>I feel like eating...</Text>
              <TextInput placeholder="e.g. tacos,burgers,pizza" />
              <Text style={{ color: "black" }}>
                I don't feel like eating...
              </Text>
              <TextInput placeholder="e.g. tacos,burgers,pizza" />
              {/*<Text style={{ color: 'black'}}>{'\n'}{randomize(50)}</Text>*/}
              </View>
              <Button style={{ width: '100%', position: 'absolute', bottom: 30}}>
                  Random Pick
              </Button>
            </Overlay>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default newt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },

  invcontainer: {
    backgroundColor: "white",
    opacity: 0.7,
  },
  text: {},
  spacing: {
    marginTop: 40,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  allign: {
    textAlign: "left",
    alignSelf: "stretch",
    marginRight: 300,
    marginLeft: 0,
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
    borderRadius: 25,

    paddingTop: 0,
    paddingBottom: 0,
    marginRight: 1.8,
    marginLeft: 1.8,
    flex: 1,

    borderRadius: 100,
  },

  appButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",

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
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "lightblue",
  },
  olStyle: {
    position: "absolute",
    top: 50,
    bottom: 180,
    left: 50,
    right: 50,
  },
});
