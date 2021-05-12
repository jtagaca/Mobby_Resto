import {
  Provider as PaperProvider,
  Text,
  Button,
  Card,
  Title,
  ActivityIndicator,
  Searchbar,
  IconButton,
} from "react-native-paper";
import React, { useEffect, useState, useRef } from "react";
import Modal from "react-native-modal";
import { mdiMapMarkerLeft } from "@mdi/js";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  TextInput,
  Animated,
  Image,
  Map,
} from "react-native";
import { fetchRestaurants } from "../../redux/actions/RestaurantActions";
import { getUser } from "../../redux/actions/UserActions";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "react-native-ratings";
import openMap from "react-native-open-maps";
import { Overlay } from "react-native-elements";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import color from "color";
import { set } from "react-hook-form";

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
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [searchQuery, setSearchQuery] = useState("");

  const [rating, setRating] = useState(-1.0);
  const [sortRating, setSortRating] = useState(false);

  const [refreshStart, setRefreshStart] = useState(false);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const onSearch = () => {
    setRefreshStart(true);

    dispatch(fetchRestaurants(searchQuery, searchLocation));

    setRefreshStart(false);
  };
  const searchBarAnim = useRef(new Animated.Value(-45)).current;

  useEffect(() => {
    let isMounted = true;
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
    onSearch();
    dispatch(getUser());
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

  const toggleOverlay2 = () => {
    setVisible(!visible);
  };

  var iconArr = ["arrow-up-bold", "arrow-down-bold"];

  // testing randomizer stuff
  const [indexNum, setIndexNum] = useState(0);
  const randomize = () => {
    if (!isLoading) {
      if (restaurants) {
        setIndexNum(Math.floor(Math.random() * (restaurants.length - 1) + 0));
      } else {
        return "No available restaurants";
      }
    } else {
      return "Nothing";
    }
  };
  const restName = () => {
    if (!isLoading) {
      if (restaurants) {
        return restaurants[indexNum].name;
      } else {
        return "No available restaurants";
      }
    } else {
      return "Nothing";
    }
  };
  const restPhoto = () => {
    if (!isLoading) {
      if (restaurants) {
        return restaurants[indexNum].image_url;
      } else {
        return "No available restaurants";
      }
    } else {
      return "Nothing";
    }
  };

  let filteredRestaurants = [];
  if (!isLoading && restaurants) {
    filteredRestaurants = restaurants;
  }

  if (!isLoading && restaurants && rating !== -1.0) {
    filteredRestaurants = [];
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].rating >= rating) {
        filteredRestaurants.push(restaurants[i]);
      }
    }
  }
  if (sortRating) {
    filteredRestaurants.sort((a, b) => (a.rating < b.rating ? -1 : 1));
  }

  const [searchLocation, setSearchLocation] = useState("bakersfield");
  const [econ, setIcon] = useState(iconArr[0]);
  const onPressicon = (econ) => {
    if (econ == iconArr[0]) {
      setIcon(iconArr[1]);
      filteredRestaurants.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    } else {
      setIcon(iconArr[0]);
      filteredRestaurants.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    }
    setSortRating(!sortRating);
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
          {/* append the values of item.name, item.rating to the filterlist */}

          <View style={{ backgroundColor: theme.colors.background }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Searchbar
                  placeholder="What food are you thinking..."
                  onChangeText={(value) => setSearchQuery(value)}
                  value={searchQuery}
                  onSubmitEditing={onSearch}
                  iconColor={theme.colors.primary}
                  selectionColor={theme.colors.primary}
                  animate={true}
                  animationDuration={200}
                  focusOnLayout={true}
                  onHide
                />
              </View>

              <View style={{ flex: 0.2 }}>
                <FAB
                  icon="filter-plus"
                  size={30}
                  onPress={() => toggleModal()}
                  onBackdropPress={() => toggleModal()}
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </View>
            </View>
          </View>

          <Modal
            style={styles.popupmodal}
            onBackdropPress={() => toggleModal()}
            isVisible={isModalVisible}
          >
            <View>
              <Searchbar
                placeholder="location"
                onChangeText={(value) => setSearchLocation(value)}
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
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 30,
                paddingBottom: 30,
                borderWidth: 5,
                borderColor: theme.colors.primary,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginRight: 10,
                    marginLeft: 10,

                    // backgroundColor: theme.colors.primary,
                  }}
                >
                  <View
                    style={{
                      alignSelf: "flex-end",
                      padding: 10,
                      // marginTop: 10,
                      // marginRight: ,
                      // backgroundColor: "grey",
                      borderRadius: 10,
                      borderColor: theme.colors.primary,
                      borderWidth: 1,
                      backgroundColor: theme.colors.primary,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        padding: 5,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      0
                    </Text>
                  </View>

                  <Slider
                    style={{
                      width: 195,
                      height: 25,
                    }}
                    minimumValue={0}
                    maximumValue={5}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor="grey"
                    // onSlidingStartc
                    onSlidingComplete={(value) => {
                      setRating(value);
                    }}
                    value={0}
                    thumbTintColor={theme.colors.primary}
                  />
                  <View
                    style={{
                      alignSelf: "flex-end",
                      padding: 10,

                      borderRadius: 10,
                      borderColor: theme.colors.primary,
                      borderWidth: 1,
                      backgroundColor: theme.colors.primary,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        padding: 5,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      5
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 0.2 }}>
                  <FAB
                    icon={econ}
                    size={30}
                    onPress={() => onPressicon(econ)}
                    // onPress={() => onPressicon(econ)}
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                </View>
              </View>
            </View>
          </Modal>
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
            // style={{ transform: [{ translateY: searchBarAnim }] }}
            // style={{ transform: [{ translateY: searchBarAnim }] }}
            data={filteredRestaurants}
            onRefresh={onSearch}
            refreshing={refreshStart}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: theme.colors.primary }}>
                <Card style={(styles.card, styles.spacing)}>
                  <Card.Content>
                    <Title>{item.name}</Title>
                  </Card.Content>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("RestaurantDetails", {
                        name: item.name,
                        restaurant: item,
                      })
                    }
                  >
                    <Card.Cover
                      source={{ uri: item.image_url ? item.image_url : null }}
                    />
                  </TouchableOpacity>
                  <Card.Actions style={styles.actionContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={
                            (styles.buttonContainer,
                            {
                              borderWidth: 2,
                              borderColor: theme.colors.primary,
                            })
                          }
                        >
                          <IconButton
                            icon="directions"
                            color={theme.colors.background}
                            onPress={() => CallNum(item.display_phone)}
                          >
                            {/* <Icon
                          style={{ color: theme.colors.background }}
                          name="phone"
                          size={19}

                        /> */}
                          </IconButton>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            (styles.buttonContainer,
                            {
                              borderWidth: 2,
                              borderColor: theme.colors.primary,
                            })
                          }
                        >
                          <IconButton
                            // style={{ backgroundColor: theme.colors.primary }}
                            onPress={() =>
                              openMap({
                                end: item.location.display_address,
                              })
                            }
                            icon="map-search-outline"
                            // <Image
                            //   source={require("./directions.png")}
                            //   style={
                            //     ({
                            //       width: 25,
                            //       height: 25,
                            //       // tintColor: {
                            //       //   theme.colors.primary},
                            //     })
                            //     // { color: theme.colors.backgroundColor }
                            //   }
                            // />
                          >
                            {/* {" "}
                        style={{ color: theme.colors.background }}
                        size={19} */}
                          </IconButton>
                        </TouchableOpacity>
                        {/* need to move  */}
                        <View
                          style={
                            (styles.buttonContainer,
                            { backgroundColor: theme.colors.primary })
                          }
                        ></View>
                      </View>
                      <Rating
                        type="custom"
                        // defaultValue={item.rating}
                        imageSize={20}
                        startingValue={item.rating}
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
        <View>
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
          ></TouchableOpacity>
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
              onPress={() => {
                randomize();
                toggleOverlay();
              }}
              size={30}
              color={theme.colors.background}
            />
            <Overlay
              overlayStyle={styles.olStyle}
              isVisible={visible}
              onBackdropPress={toggleOverlay}
            >
              <View>
                <Text style={{ color: "black" }}>
                  {restName()}
                  {"\n"}
                </Text>
                <Card>
                  <Card.Cover source={{ uri: restPhoto() }} />
                </Card>
                <Button
                  style={{
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    paddingTop: 1,
                    paddingBottom: 1,
                    backgroundColor: theme.colors.background,
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    props.navigation.navigate("RestaurantDetails", {
                      name: restName(),
                      restaurant: restaurants[indexNum],
                    });
                    toggleOverlay();
                  }}
                >
                  More Details
                </Button>
              </View>
              <Button
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 10,
                  paddingTop: 1,
                  paddingBottom: 1,
                  backgroundColor: theme.colors.background,
                  borderRadius: 10,
                  borderWidth: 1,
                }}
                onPress={() => {
                  randomize();
                }}
              >
                Randomize
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
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  popupmodal: {
    margin: 20,
  },
});
