import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Alert, TextInput} from 'react-native';
import { Button } from 'react-native-paper';

const ContactScreen = (props) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={{ flex: 1 }}>
                <Image 
                    style={{width: 100, height: 100}}
                    source={require("../../../assets/templogo.png")}
                />
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
            </View>
        </SafeAreaView>
    )
}

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