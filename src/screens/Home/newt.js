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
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  TextInput,
  Animated,
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
    dispatch(fetchRestaurants("burger", "bakersfield"));
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
  //testing randomizer stuff
  var iconArr = ["arrow-up-bold", "arrow-down-bold"];

  const randomize = () => {
    let indexNum;
    if (!isLoading) {
      if (restaurants) {
        indexNum = Math.floor(Math.random() * (restaurants.length - 1) + 0);
        return restaurants[indexNum].name;
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

  const [searchLocation, setSearchLocation] = useState("");
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
                  placeholder="What food would you like to eat..."
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
                  icon="map-marker-plus"
                  size={30}
                  onPress={() => toggleModal()}
                  onBackdropPress={() => toggleModal()}
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View style={styles.leftContainer}>
                  <Text>0</Text>
                </View>

                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={0}
                  maximumValue={5}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor="grey"
                  // onSlidingStartc
                  onSlidingComplete={(value) => {
                    setRating(value);
                  }}
                  // how is value changing shouldn't value be initialized to be rating value
                  value={0}
                  thumbTintColor="blue"
                />
                <Text>5</Text>
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

          <View style={styles.popupmodal}>
            <Button style title="Show modal" onPress={toggleModal} />

            <Modal
              style={styles.popupmodal}
              onBackdropPress={() => toggleModal()}
              isVisible={isModalVisible}
            >
              <View
                style={
                  (styles.popupmodal,
                  { marginTop: 100 },
                  { backgroundColor: "#ffffff" })
                }
              >
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
            </Modal>
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
                  <Card.Cover
                    source={{ uri: item.image_url ? item.image_url : null }}
                  />
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
                <Text style={{ color: "black" }}>
                  {"\n\n"}
                  {randomize()}
                </Text>
              </View>
              <Button
                style={{ width: "100%", position: "absolute", bottom: 30 }}
              >
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
    margin: 50,
  },
});
