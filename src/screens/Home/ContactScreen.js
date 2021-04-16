import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import email from 'react-native-email';

export const ContactScreen = (props) => {
  subjectText = '';
  bodyText = '';
  handleEmail = () => {
    const to = ['ppark3@csub.edu'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        subject: subjectText,
        body: bodyText
    }).catch(console.error)
}
  const theme = useSelector((state) => state.theme.theme);
  //error/bug is on theme-JT?
  return (
    //  <SafeAreaView style={ styles.container, {backgroundColor: theme.colors.background} }>
    <SafeAreaView style={{backgroundColor: theme.colors.background},styles.lgcontainer}>
      {/*  <View style={{ flex: 1 }}> */}
        <View>
        <Image
          style={{ width: 100, height: 100, }}
          source={require("../../../assets/templogo.png")}
        />
        </View>
        <TextInput
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          style={styles.input}
        />
        <TextInput
          type="text"
          className="form-control"
          placeholder="Email"
          name="email"
          style={styles.input}
        />
        <TextInput
          type="text"
          className="form-control"
          placeholder="Message"
          name="message"
          multiline
          style={styles.input}
        />
        <View style ={{flexDirection:"row"}}>
        <Button
          style={styles.buttonStyle}
          color="blue"
          type="submit"
          value="Send Message"
          onPress={() =>
            Alert.alert(
              "Message sent!",
              "Our team will reach out to you within 1-2 business days",
              [
                {
                  text: "OK",
                  onPress: () => props.navigation.navigate("Profile"),
                },
              ]
            )
          }
        >
          Submit
        </Button>
        <Button
          style={styles.buttonStyle}
          color="blue"
          onPress={() =>
            Alert.alert("Discard message?", "", [
              {
                text: "Yes",
                onPress: () => props.navigation.navigate("Profile"),
              },
              { text: "No" },
            ])
          }
        >
          Cancel
        </Button>
        </View>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    lgcontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"black"
    },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  buttonStyle: {
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    paddingTop:1,
    paddingBottom:1,
    backgroundColor:'lightblue',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  }
});
