import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const SettingsScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30 }}>
                    Settings Screen
                </Text>
                <Button onPress={() => props.navigation.goBack()}>
                    Go Back
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen;