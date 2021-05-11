// to do: UI improvements

import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import email from 'react-native-email';
import RestaurantReducer from "../../redux/reducers/RestaurantReducer";

const ContactScreen = (props) => {
  const testing = 'ppark3@csub.edu';
  const fullContacts = ['ppark3@csub.edu', 'dgonzalez94@csub.edu', 'laguilar21@csub.edu', 'jtagaca@csub.edu'];

  const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  
  const [emailText, setEmail] = useState('');
  const [subjectline, setSubjectline] = useState('');
  const [bodyText, setBody] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleEmail = () => {
    const to = fullContacts; // set this to whomever should receive the support email

    if (regEmail.test(emailText) === false)
    {
      alert('Not a valid email address');
      return;
    }
    if (subjectline.length < 1)
    {
      alert('Please enter a subject');
      return;
    }
    if (bodyText.length < 1)
    {
      alert('Please enter a message');
      return;
    }
    email(to, {
        cc: emailText,
        subject: subjectline,
        body: bodyText,
    }).catch(console.error);

    setSubmitted(true);

  }

  const theme = useSelector((state) => state.theme.theme);
  //error/bug is on theme-JT?
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor: theme.colors.primary}}>
      <View style={styles.container,{flex: 1, alignItems: 'center', backgroundColor: theme.colors.background}}>
      <View>
        <Image
          style={{ width: 100, height: 100, }}
          source={require("../../../assets/templogo.png")}
        />
      </View>
        <View>
        <TextInput
          value={emailText}
          onChangeText={(text) => setEmail(text)}
          placeholder="Your Email"
          name="email"
          style={styles.input}
        />
        <TextInput
          value={subjectline}
          onChangeText={(text) => setSubjectline(text)}
          placeholder="Subject"
          name="subject"
          style={styles.input}
        />
        <TextInput
          value={bodyText}
          onChangeText={(text) => setBody(text)}
          placeholder="Message"
          name="message"
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        </View>
        <View style ={{flexDirection:"row"}}>
        <Button
          style={styles.buttonStyle, {backgroundColor: theme.colors.primary}}
          color={theme.colors.background}
          //onPress={handleEmail}
          onPress={() => {
              handleEmail();
            }
          }
        >
          Submit
        </Button>
        <Button
          style={styles.buttonStyle, {backgroundColor: theme.colors.primary}}
          color={theme.colors.background}
          onPress={() =>
            Alert.alert((submitted) ? "Done?" : "Discard message?", "", [
              {
                text: "Yes",
                onPress: () => { 
                  props.navigation.goBack(); 
                  setEmail('');
                  setSubjectline('');
                  setBody('');
                  setSubmitted(false);
                },
              },
              { text: "No" },
            ])
          }
        >
          {(submitted) ? 'Done' : 'Cancel'}
        </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 4,
    margin: 10,
    width: 220,
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
  }
});

export default ContactScreen;