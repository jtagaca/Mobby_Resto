import {
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import React, { useState, useRef } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { registerWithUsernameAndPassword } from "../../redux/actions/AuthActions";
const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const dispatch = useDispatch();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const regPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const register = ({ username, email, password, rePassword }) => {
    Keyboard.dismiss();

    if (regEmail.test(email) === false) {
      alert("Not a valid Email Address");
      return;
    }
    if (regPassword.test(password) === false) {
      alert(
        "Password must be at least 8 characters and must contain a special character, a number, a lowercase, and an uppercase"
      );
      return;
    }
    if (password !== rePassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      dispatch(registerWithUsernameAndPassword(username, email, password));
    } catch (error) {
      alert(error);
    }
  };

  const theme = useSelector((state) => state.theme.theme);
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              returnKeyType={"next"}
              mode="outlined"
              blurOnSubmit={false}
              autoCorrect={false}
              label="Username"
              value={username}
              onChangeText={(username) => setUsername(username)}
              onSubmitEditing={() => ref_input2.current.focus()}
            />
          </View>

          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              returnKeyType={"next"}
              blurOnSubmit={false}
              mode="outlined"
              label="Email"
              value={email}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
              onSubmitEditing={() => ref_input3.current.focus()}
              ref={ref_input2}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              returnKeyType={"next"}
              blurOnSubmit={false}
              mode="outlined"
              label="Password"
              value={password}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => setPassword(password)}
              onSubmitEditing={() => ref_input4.current.focus()}
              secureTextEntry
              ref={ref_input3}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              label="Re-enter Password"
              value={rePassword}
              mode="outlined"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(rePassword) => setRePassword(rePassword)}
              onSubmitEditing={() =>
                register({ username, email, password, rePassword })
              }
              secureTextEntry
              ref={ref_input4}
            />
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={() => {}}>
              <Button
                mode="contained"
                style={styles.textInput}
                onPress={() =>
                  register({ username, email, password, rePassword })
                }
              >
                Sign up
              </Button>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: 200,
    // padding: 100,
    height: 20,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
