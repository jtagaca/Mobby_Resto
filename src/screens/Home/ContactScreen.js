import React from 'react';
import { SafeAreaView, Text, View, } from 'react-native';
import { Button } from 'react-native-paper';

const ContactScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30 }}>
                    This is the Contact Screen.
                </Text>
                <Button onPress={() => props.navigation.navigate("Submit")}>
                    Submit
                </Button>
                <Button onPress={() => props.navigation.navigate("Cancel")}>
                    Cancel
                </Button>
            </View>
        </SafeAreaView>
    )
}
export default ContactScreen;