import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const RegisterScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30 }}>
                    This is the Register Screen.
                </Text>
                <Button onPress={() => props.navigation.goBack()}>
                    Go Back
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen;