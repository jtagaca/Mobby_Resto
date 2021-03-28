import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Alert} from 'react-native';
import { Button } from 'react-native-paper';

const ContactScreen = (props) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={{ flex: 1 }}>
                <Image 
                    style={{width: 100, height: 100}}
                    source={require("../../../assets/templogo.png")}
                />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
})
export default ContactScreen;