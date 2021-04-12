import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../../global/';
import { themeSwitch } from '../../redux/actions/ThemeActions';

const SettingsScreen = (props) => {
    let nextTheme
    const theme = useSelector(state => state.theme.theme)
    return (
        <SafeAreaView style={{ flex: 1,  backgroundColor: theme.colors.background  }}>
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