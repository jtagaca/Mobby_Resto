// to do: UI improvements

import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import email from 'react-native-email';

// testing overlay button for randomizer
import { FloatingAction } from "react-native-floating-action";

const ContactScreen = (props) => {
  const testing = 'ppark3@csub.edu';
  const fullContacts = ['ppark3@csub.edu', 'dgonzalez94@csub.edu', 'laguilar21@csub.edu', 'jtagaca@csub.edu'];
  
  const [emailText, setEmail] = useState('');
  const [subjectline, setSubjectline] = useState('');
  const [bodyText, setBody] = useState('');

  // testing button actions for randomizer
  const actions = [
    {
      text: "test1",
      name: "testing",
      position: 1
    }
  ]

  handleEmail = () => {
    const to = fullContacts // set this to whomever should receive the support email
    email(to, {
        cc: emailText,
        subject: subjectline,
        body: bodyText,
    }).catch(console.error)
  }

  const theme = useSelector((state) => state.theme.theme);
  //error/bug is on theme-JT?
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor: theme.colors.background}}>
        <Image
          style={{ width: 100, height: 100, }}
          source={require("../../../assets/templogo.png")}
        />

        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          name="email"
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => setSubjectline(text)}
          placeholder="Subject"
          name="subject"
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => setBody(text)}
          placeholder="Message"
          name="message"
          multiline
          style={styles.input}
        />

        <View style ={{flexDirection:"row"}}>
        <Button
          style={styles.buttonStyle}
          color="blue"
          value="Send Message"
          onPress={handleEmail}
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
                onPress: () => props.navigation.goBack(),
              },
              { text: "No" },
            ])
          }
        >
          Cancel
        </Button>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            console.log('select');
          }}
          />
        </View>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    lgcontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: 'white',
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
  }
});

export default ContactScreen;
/*
          onPress={() =>
            Alert.alert(
              "Message sent!",
              "Our team will reach out to you within 1-2 business days",
              [
                {
                  text: "OK",
                  onPress: () => props.navigation.goBack(),
                },
              ]
            )
            */