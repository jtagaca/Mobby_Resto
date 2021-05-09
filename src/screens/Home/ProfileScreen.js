import React, {useEffect, useState} from 'react';
import{StyleSheet, View, Image, SafeAreaView} from 'react-native';
import { Button } from 'react-native-paper';
import { Title, Card, Avatar, Caption, Text, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../../global/';
import { themeSwitch } from '../../redux/actions/ThemeActions';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_LOGOUT } from '../../redux/actions/types';


export default function ProfileScreen(props){
    const dispatch = useDispatch()
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [loc, setLoc] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();;

    const load = async () => {
        try {
          let name = await AsyncStorage.getItem("myName")
          {/*let bio = await AsyncStorage.getItem("myBio")
          let loc = await AsyncStorage.getItem("myLoc")
          let phone = await AsyncStorage.getItem("myPhone")
        */}
          let email = await AsyncStorage.getItem("myEmail")
    
    
          if(name !== null){
            setName(name);
          }
          {/* if(bio !== null){
            setBio(bio);
          }
          if(loc !== null){
            setLoc(loc);
          }
         if(phone !== null){
          setPhone(phone);
         }
        */}
          if(email !== null){
            setEmail(email);
          }
          
        } catch (error) {
          alert(console.error());
          
        }
    }
      
      useEffect(() => {
        load();
      },[]);
    const switchTheme = (payload) => {
        dispatch(themeSwitch(payload))
    }
    const logout = () => {
        dispatch({ type: AUTH_LOGOUT })
    }
  
    let nextTheme
    const theme = useSelector(state => state.theme.theme)

        // grabbing user from redux (state management)
        // api call for user info made on the homescreen so we're ready for it here
    const user = useSelector(state => state.user.user)
    console.log(user)
    if (!user) {
        return (
        <View
            style={{
              flex: 1,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.5,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )
    }
    else {
        return(
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={styles.userInfo}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Avatar.Image 
                        source={require("../../../assets/templogo.png")}>
                        </Avatar.Image>
                        <View style={{marginLeft: 20}}>
                            <Title style={[styles.title, {marginTop: 15, marginBottom: 5,}]}>
                                {user.userName}
                            </Title>
                        <Text style={{marginLeft: 20}}>
                            {user.email}
                        </Text>
                            {/*<Caption style={styles.Caption}>
                                {bio}
                            </Caption>
                            */}
                        </View>
                    </View>
                </View>
                {/* 
                <View style={styles.userInfo}>
                    <View style={styles.row}>
                    <MaterialIcons name="location-pin" size={20} color="grey"/>
                        <Text style={{marginLeft: 20}}>
                            {loc}
                        </Text>
                    </View>
                    <View style={styles.row}>
                    <MaterialIcons name="phone" size={20} color="grey"/>
                        <Text style={{marginLeft: 20}}>
                            {phone}
                        </Text>
                    </View>
                    <View style={styles.row}>
                    <MaterialIcons name="email" size={20} color="grey"/>
                        <Text style={{marginLeft: 20}}>
                            {user.email}
                        </Text>
                    </View>
                </View>
                */}
    
                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() =>{}}>
                        <View style={styles.menuItem}>
                        <MaterialIcons name="star" size={20} color="gold" size={25}/>
                            <Text style={styles.menuItemText}>
                                Favorite Restraunts
                            </Text>
                        </View>
                    </TouchableRipple>
    
                    <TouchableRipple onPress={() => props.navigation.navigate("Contact")}>
                        <View style={styles.menuItem}>
                        <MaterialIcons name="person-outline" size={20} color="red" size={25}/>
                            <Text style={styles.menuItemText}>
                                Customer Support
                            </Text>
                        </View>
                    </TouchableRipple>
    
                    <TouchableRipple onPress={() => props.navigation.navigate("EditProfileScreen")}>
                        <View style={styles.menuItem}>
                        <MaterialIcons name="edit" size={20} color="orange" size={25}/>
                            <Text style={styles.menuItemText}>
                                Edit Profile
                            </Text>
                        </View>
                    </TouchableRipple >
    
                    <TouchableRipple onPress={() => props.navigation.navigate("Settings")}>
                        <View style={styles.menuItem}>
                        <MaterialIcons name="settings" size={20} color="grey" size={25}/>
                            <Text style={styles.menuItemText}>
                                Settings
                            </Text>
                        </View>
                    </TouchableRipple >
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', 
        alignItems: 'center',
    },

    userInfo:{
        paddingHorizontal: 30,
        marginBottom: 25,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },

    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    infoWrap: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,

        borderTopColor: 'black',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },

    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },
      text:{
        color: 'black'
      }
})
//export default ProfileScreen;