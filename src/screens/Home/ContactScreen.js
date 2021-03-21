import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image} from 'react-native';
import { Button } from 'react-native-paper';

const ContactScreen = (props) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={{ flex: 1 }}>
                <Image 
                    style={{width: 100, height: 100}}
                    source={require("../../../assets/templogo.png")}
                />
                <Button onPress={() => props.navigation.navigate("Submit")}>
                    Submit
                </Button>
                <Button onPress={() => props.navigation.navigate("Home")}>
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