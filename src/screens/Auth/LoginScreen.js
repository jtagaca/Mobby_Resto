import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Props } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithUsernameAndPassword } from '../../redux/actions/AuthActions';


const LoginScreen = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const ref_input2 = useRef();

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoggingIn)

    const login = () => {
        Keyboard.dismiss()
        dispatch(loginWithUsernameAndPassword(username, password))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>

                    <Text style={{ fontSize: 30 }}>
                        This is the Login Screen.
                    </Text>

                    <TextInput style={styles.textInput}
                        returnKeyType={"next"}
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
                        value={password}
                        onChangeText={password => setPassword(password)}
                        onSubmitEditing={login}
                        secureTextEntry
                        ref={ref_input2}
                    />


                    <Button onPress={login} >
                        Log in
                    </Button>

                    <Button onPress={() => props.navigation.navigate("Register")} >
                        Sign up
                    </Button>

                    {isLoading &&
                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.5, left: 0, right: 0, top: 0, bottom: 0 }}>
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