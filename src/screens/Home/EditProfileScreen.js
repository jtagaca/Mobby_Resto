import React, {useState, useEffect}from 'react';
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../../global/';
import { themeSwitch } from '../../redux/actions/ThemeActions';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';


export default function EditProfileScreen(props) {

  const [name, setName] = useState();
  const [bio, setBio] = useState();


  const save = async() => {
    try {
      await AsyncStorage.setItem("myName", name);
      await AsyncStorage.setItem("myBio", bio);

      
    } catch (error) {
      alert(console.error());
      
    }
  }

  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("myName")
      let bio = await AsyncStorage.getItem("myBio")


      if(name !== null){
        setName(name);
      }
      if(bio !== null){
        setBio(bio);
      }
      
    } catch (error) {
      alert(console.error());
      
    }
  }

  useEffect(() => {
    load();
  },[]);


  const dispatch = useDispatch()
  const switchTheme = (payload) => {
      dispatch(themeSwitch(payload))
  }

  let nextTheme
  const theme = useSelector(state => state.theme.theme)
    return(
        <View style={{ flex: 1, alignItems: "center", backgroundColor: theme.colors.background }}>
          <Text style={{height: 20}}> Name: {name} </Text>
            <Text style={styles.innerText}>Edit Name</Text>
          
          <TextInput style={styles.inputText} onChangeText={(text) => setName(text)}></TextInput>
          
          <TouchableOpacity style={styles.button} onPress= { () => save()}>
            <Text style={{color: "white"}}>
              Save Name
            </Text>
          </TouchableOpacity>

          <Text style={{height: 20}}> Biography: {bio} </Text>
            <Text style={styles.innerText}>Edit Biography</Text>
          
          <TextInput style={styles.inputText} onChangeText={(text) => setBio(text)}></TextInput>
          
          <TouchableOpacity style={styles.button} onPress= { () => save()}>
            <Text style={{color: "white"}}>
              Save Biography
            </Text>
          </TouchableOpacity>
        </View>

    );
};

//export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  innerText: {
    fontSize: 24,
    fontWeight: "300",
  },

  inputText: {
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "stretch",
    margin: 16,
    height: 64,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "300",
  },

  button: {
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 32,
    marginHorizontal: 32,
    borderRadius: 6,

  },
})