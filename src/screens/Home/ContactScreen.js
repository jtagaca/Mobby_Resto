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
import { Overlay } from 'react-native-elements';

// testing overlay button for randomizer
import { FAB } from 'react-native-paper';

const ContactScreen = (props) => {
  const testing = 'ppark3@csub.edu';
  const fullContacts = ['ppark3@csub.edu', 'dgonzalez94@csub.edu', 'laguilar21@csub.edu', 'jtagaca@csub.edu'];
  
  const [emailText, setEmail] = useState('');
  const [subjectline, setSubjectline] = useState('');
  const [bodyText, setBody] = useState('');

  // testing button actions for randomizer
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  handleEmail = () => {
    const to = fullContacts; // set this to whomever should receive the support email
    email(to, {
        cc: emailText,
        subject: subjectline,
        body: bodyText,
    }).catch(console.error);
  }

  const theme = useSelector((state) => state.theme.theme);
  //error/bug is on theme-JT?
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor: theme.colors.background}}>
      <View>
        <Image
          style={{ width: 100, height: 100, }}
          source={require("../../../assets/templogo.png")}
        />
      </View>
        <View>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Your Email"
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
          numberOfLines={4}
          style={styles.input}
        />
        </View>
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
        </View>
        <FAB
          style={styles.fabStyle}
          icon="slot-machine"
          onPress={ toggleOverlay }
        />
        <Overlay overlayStyle={styles.olStyle} isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>
            testing1
          </Text>
          <TextInput placeholder='e.g. tacos,burgers,pizza'/>
          <Text>
            testing2
          </Text>
          <TextInput placeholder='e.g. tacos,burgers,pizza'/>
          <Button style={styles.buttonStyle}>
            Random Pick
          </Button>
        </Overlay>
   
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