import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const LoginScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30 }}>
                    This is the Login Screen.
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;