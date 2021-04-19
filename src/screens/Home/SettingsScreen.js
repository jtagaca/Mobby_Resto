import React, {useEffect, useState} from 'react';
import{StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../../global/';
import { themeSwitch } from '../../redux/actions/ThemeActions';
import { AUTH_LOGOUT } from '../../redux/actions/types';
import { Button } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

export default function SettingsScreen(props) {
    const dispatch = useDispatch()
    const switchTheme = (payload) => {
        dispatch(themeSwitch(payload))
    }
    const logout = () => {
        dispatch({ type: AUTH_LOGOUT })
    }
  
    let nextTheme
    const theme = useSelector(state => state.theme.theme)
    return (
        <SafeAreaView style={{ flex: 1,  backgroundColor: theme.colors.background  }}>
        <View style={styles.root}>
            <LinearGradient
                colors={["#009387","white"]}
                style={{height: "20%"}}
            />
            <View style={{alignItems:"center"}}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 70,
                        marginTop: -125,
                    }}
                    source={require("../../../assets/templogo.png")}
                />
            </View>

            <View style={{alignItems: "center"}}>
                <Title style={{fontSize: 25, fontWeight: "900"}}> Settings </Title>
            </View>

            <TouchableOpacity
                style={styles.ScreenButton}
                onPress={() => {(!theme.dark) ? nextTheme = darkTheme : nextTheme = lightTheme; switchTheme(nextTheme) }}
                underlayColor='#fff'>
                <Text style={styles.text}> Theme Toggle </Text>
            </TouchableOpacity>

           {/* <Card style={styles.myCard}>
                <View style={styles.cardContents}>
                    <MaterialIcons name="credit-card" size={32} color="black"/>
                    <Button onPress={logout} >
                    Log out
                </Button>
                </View>
            </Card> */}

            <TouchableOpacity
                style={styles.ScreenButton}
                onPress={logout}
                underlayColor='#fff'>
                <Text style={styles.text}> Logout </Text>
            </TouchableOpacity>


        {/* END OF MAIN VIEW */}
        </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    root:{
        flex: 1,
    },
    myCard: {
        margin: 3,
    },
    cardContents: {
        flexDirection: "row",
        padding: 8,
    },
    myText: {
        fontSize: 30,
        alignItems: "center",
        fontWeight: "100",
    },
    ScreenButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#009387',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      text:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontSize: 30
      }
})

//export default SettingsScreen;