import React, { useState, useRef } from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback, SafeAreaView, View, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { registerWithUsernameAndPassword } from '../../redux/actions/AuthActions';


const RegisterScreen = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const dispatch = useDispatch()

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const register = ({ username, email, password, rePassword }) => {
        Keyboard.dismiss()

        if (regEmail.test(email) === false) {
            alert('Not a valid Email Address')
            return
        }
        if (regPassword.test(password) === false) {
            alert('Password must be at least 8 characters and must contain a special character, a number, a lowercase, and an uppercase')
            return
        }
        if (password !== rePassword) {
            alert("Passwords don't match");
            return
        }
        
        try {
            dispatch(registerWithUsernameAndPassword(username, email, password))
        } catch (error) {
            alert(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30 }}>
                        This is the Register Screen.
                    </Text>

                    <TextInput style={styles.textInput}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        autoCorrect={false}
                        label='Username'
                        value={username}
                        onChangeText={username => setUsername(username)}
                        onSubmitEditing={() => ref_input2.current.focus()}  
                    />
                    <TextInput style={styles.textInput}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label='Email'
                        value={email}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={email => setEmail(email)}
                        onSubmitEditing={() => ref_input3.current.focus()}
                        ref={ref_input2}
                    />
                    <TextInput style={styles.textInput}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label='Password'
                        value={password}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={password => setPassword(password)}
                        onSubmitEditing={() => ref_input4.current.focus()}
                        secureTextEntry
                        ref={ref_input3}
                    />
                    <TextInput style={styles.textInput}
                        label='Re-enter Password'
                        value={rePassword}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={rePassword => setRePassword(rePassword)}
                        onSubmitEditing={() => register({ username, email, password, rePassword })}
                        secureTextEntry
                        ref={ref_input4}
                    />
                    <Button mode='contained' style={styles.button} onPress={() => register({ username, email, password, rePassword })} >
                        Sign up
                    </Button>

                    <Button onPress={() => props.navigation.goBack()}>
                        Go Back
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 8,
        marginVertical: 14
    },
});

export default RegisterScreen;