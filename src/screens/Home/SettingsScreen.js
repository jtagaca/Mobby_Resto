import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { lightTheme, darkTheme } from "../../global/";
import { themeSwitch } from "../../redux/actions/ThemeActions";
import { AUTH_LOGOUT } from "../../redux/actions/types";
import { Button, IconButton } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, TouchableRipple, Switch } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { removeAllFavorites } from "../../redux/actions/UserActions";
// import ToggleButton from "react-theme-toggle-button";

export default function SettingsScreen(props) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);

  let iconArr = ["weather-sunny", "brightness-4"];
  const [icon, setIcon] = useState(iconArr[0]);

  const switchTheme = (payload) => {
    dispatch(themeSwitch(payload));
  };
  const logout = () => {
    dispatch({ type: AUTH_LOGOUT });
  };

  const onHit = () => {
    !theme.dark ? (nextTheme = darkTheme) : (nextTheme = lightTheme);
    if (icon == iconArr[0]) {
      setIcon(iconArr[1]);
    } else {
      setIcon(iconArr[0]);
    }
    switchTheme(nextTheme);
  };
  const clearFavorites = () => {
    Alert.alert("Clear Favorites", "Are you sure you want to clear all of your favorited restaurants?", [
      {
        text: "Yes",
        onPress: () => { 
          dispatch(removeAllFavorites());
          Alert.alert("Cleared", "", [
            { text: "Done" }
          ])
        },
      },
      { text: "No" },
    ])
  }

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  let nextTheme;
  const theme = useSelector((state) => state.theme.theme);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.root}>
        <LinearGradient
          colors={["#009387", theme.colors.background]}
          style={{ height: "20%" }}
        />
        <View style={{ alignItems: "center", flex: 0.1 }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 70,
              marginTop: -125,
            }}
            source={require("../../../assets/templogo.png")}
          />
        </View>

        <View style={{ alignItems: "center", flex: 0.1 }}>
          <Title style={{ fontSize: 25, fontWeight: "900" }}> Settings </Title>
        </View>

        <View style={{ flexDirection: "row", flex: 0.5 }}>
          <View
            style={{
              justifyContent: "center", //Centered vertically
              alignItems: "center", // Centered horizontally
              flex: 1,
            }}
          >
            <View>
              <IconButton size={70} icon={icon}></IconButton>
            </View>

            <Switch
              trackColor={{ false: "#696969", true: "#009387" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              onChange={() => onHit()}
            />
          </View>
        </View>

        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            style={styles.ScreenButton}
            onPress={clearFavorites}
            underlayColor="#fff"
            
          >
            <Text style={styles.text}> Clear Favorites </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ScreenButton}
            onPress={logout}
            underlayColor="#fff"
          >
            <Text style={styles.text}> Logout </Text>
          </TouchableOpacity>
        </View>

        {/* END OF MAIN VIEW */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
  },
  cardContents: {
    flexDirection: "row",
    padding: 8,
  },
  myText: {
    fontSize: 30,
    alignItems: "center",
    fontWeight: "100",
  },
  ScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#009387",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
  },
});

// export default SettingsScreen;
