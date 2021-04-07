import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Alert, TextInput} from 'react-native';
import { Button } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
//npm install emailjs-com --save

const ContactScreen = (props) => {
    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_n7xrgju', e.target, 'user_oSCxckXQXJ0r5g1cCnlau')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        }
    return (
        <SafeAreaView style={ styles.container }>
            <View style={{ flex: 1 }}>
            <Image style={{width: 100, height: 100}} source={require("../../../assets/templogo.png")}/>
            <TextInput type="text" className="form-control" placeholder="Name" name="name" style={styles.input}/>
            <TextInput type="text" className="form-control" placeholder="Email" name="email" style={styles.input}/>
            <TextInput type="text" className="form-control" placeholder="Message" name="message" multiline style={styles.input}/> 
            <Button type="submit" value="Send Message" onPress={() => Alert.alert('Message sent!', 'Our team will reach out to you within 1-2 business days', [{text: "OK", onPress: () => props.navigation.navigate("Home")}])}>
                Submit
            </Button>
            <Button onPress={() => Alert.alert('Discard message?','', [{text: "Yes", onPress: () => props.navigation.navigate("Home")}, {text: "No"}])}>
                Cancel
            </Button>
            </View>
        </SafeAreaView>
    )
}
/*
                <Text> Email: </Text>
                <TextInput style={styles.input}/>
                <Text> Name: </Text>
                <TextInput style={styles.input}/>
                <Text> Subject </Text>
                <TextInput style={styles.input}/>
                <Text> Message: </Text>
                <TextInput style={styles.input}/> 
                <Button onPress={() => Alert.alert('Message sent!', 'Our team will reach out to you within 1-2 business days', [{text: "OK", onPress: () => props.navigation.navigate("Home")}])}>
                    Submit
                </Button>
                <Button onPress={() => Alert.alert('Discard message?','', [{text: "Yes", onPress: () => props.navigation.navigate("Home")}, {text: "No"}])}>
                    Cancel
                </Button>
*/
//const messageStyle = {height: 100};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
    }
});
export default ContactScreen;

/*
import './ContactUs.css';

export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <div>
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
    </div>
  );
}
*/