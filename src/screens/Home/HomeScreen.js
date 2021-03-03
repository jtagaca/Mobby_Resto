import React from 'react';
import { SafeAreaView, Text, View, Button } from 'react-native';

const HomeScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30 }}>
                    This is the Home Screen.
                </Text>
                <Button onPress={() => props.navigation.navigate("Register")}>
                    Go to Register Screen
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;