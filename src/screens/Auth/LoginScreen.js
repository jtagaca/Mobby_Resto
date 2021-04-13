import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithUsernameAndPassword } from '../../redux/actions/AuthActions';


const LoginScreen = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const ref_input2 = useRef();

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoggingIn)
    const theme = useSelector(state => state.theme.theme)

    const login = () => {
        Keyboard.dismiss()
        dispatch(loginWithUsernameAndPassword(username, password))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>

                    <View style={{ flex: 0.5 }} />

                    <View style={{ flex: 1, alignItems: 'center'}}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require("../../../assets/templogo.png")}
                        />
                        <Text style={{ fontSize: 30 }}>
                            Sign in
                        </Text>
                    </View>

                    <View style={{ flex: 4 }}>
                        <TextInput style={styles.textInput}
                            returnKeyType={"next"}
                            mode='outlined'
                            autoCapitalize='none'
                            autoCorrect={false}
                            blurOnSubmit={false}
                            label='Username'
                            value={username}
                            onChangeText={username => setUsername(username)}
                            onSubmitEditing={() => ref_input2.current.focus()}
                        />
                        <TextInput style={styles.textInput}
                            label='Password'
                            mode='outlined'
                            value={password}
                            onChangeText={password => setPassword(password)}
                            onSubmitEditing={login}
                            secureTextEntry
                            ref={ref_input2}
                        />
                        <Button onPress={login} mode="contained" style={styles.textInput} color={ theme.colors.primary } >
                            Sign in
                        </Button>

                        <Button onPress={() => props.navigation.navigate("Register")} >
                            Sign up
                        </Button>
                    </View>


                    {isLoading &&
                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.2, left: 0, right: 0, top: 0, bottom: 0 }}>
                            <ActivityIndicator size='large' />
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 8,
        marginBottom: 14
    },
});

export default LoginScreen;