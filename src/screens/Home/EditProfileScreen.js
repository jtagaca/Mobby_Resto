import React, {useState, useEffect}from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialIcons,Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../../global/';
import { themeSwitch } from '../../redux/actions/ThemeActions';
import { bindActionCreators } from 'redux';
import {Text, TextInput} from 'react-native-paper';
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImagePickerIOS,
} from 'react-native';


export default function EditProfileScreen(props) {

  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [loc, setLoc] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();


  const save = async() => {
    try {
      await AsyncStorage.setItem("myName", name);
      await AsyncStorage.setItem("myBio", bio);
      await AsyncStorage.setItem("myLoc", loc);
      await AsyncStorage.setItem("myPhone", phone);
      await AsyncStorage.setItem("myEmail", email);

      
    } catch (error) {
      alert(console.error());
      
    }
  }

  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("myName")
      let bio = await AsyncStorage.getItem("myBio")
      let loc = await AsyncStorage.getItem("myLoc")
      let phone = await AsyncStorage.getItem("myPhone")
      let email = await AsyncStorage.getItem("myEmail")


      if(name !== null){
        setName(name);
      }
      if(bio !== null){
        setBio(bio);
      }
      if(loc !== null){
        setLoc(loc);
      }
      if(phone !== null){
        setPhone(phone);
      }
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


  const dispatch = useDispatch()
  const switchTheme = (payload) => {
      dispatch(themeSwitch(payload))
  }

  let nextTheme
  const theme = useSelector(state => state.theme.theme)
    return(
        <View style={[styles.container]}>
            <ScrollView style={styles.scroll, { backgroundColor: theme.colors.background }}>
            <View style={styles.row}>
              <MaterialIcons name="face" size={30} color="limegreen"/>
              <Text style={styles.innerText}>Edit Name</Text>
            </View>
            <Text style={{height: 20}}> New Name: {name} </Text>

          <TextInput style={styles.inputText} onChangeText={(text) => setName(text)}></TextInput>
          
          <TouchableOpacity style={styles.button} onPress= { () => save(alert('Name Saved!'))}>
            <Text style={{color: "white"}}>
              Save Name
            </Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <MaterialIcons name="description" size={30} color="lightblue"/>
            <Text style={styles.innerText}>Edit Biography</Text>
          </View>
            <Text style={{height: 20}}> New Biography: {bio} </Text>

          
          <TextInput style={styles.inputText} onChangeText={(text) => setBio(text)}></TextInput>
          
          <TouchableOpacity style={styles.button} onPress= { () => save(alert('Biography Saved!'))}>
            <Text style={{color: "white"}}>
              Save Biography
            </Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <MaterialIcons name="location-pin" size={30} color="red"/>
            <Text style={styles.innerText}>Edit Location</Text>
          </View>
            <Text style={{height: 20}}> New Location: {loc} </Text>          
          <TextInput style={styles.inputText} onChangeText={(text) => setLoc(text)}></TextInput>
          
          <TouchableOpacity style={styles.button} onPress= { () => save(alert('Location Saved'))}>
            <Text style={{color: "white"}}>
              Save Location
            </Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <MaterialIcons name="phone" size={30} color="yellowgreen"/>
            <Text style={styles.innerText}>Edit Phone</Text>
          </View>
          <Text style={{height: 20}}> 
              New Phone: {phone} 
          </Text>          
          <TextInput style={styles.inputText}
            keyboardType = 'number-pad' 
            onChangeText={(text) => setPhone(text)}>
          </TextInput>
          
          <TouchableOpacity 
            style={styles.button} onPress= { () => save(alert('Phone Saved!'))}
          >
            <Text style={{color: "white"}}>Save Phone</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <MaterialIcons name="email" size={30} color="lightblue"/>
            <Text style={styles.innerText}>Edit email</Text>
          </View>
            <Text style={{height: 20}}> New email: {email} </Text>          
          <TextInput 
          style={styles.inputText}
          keyboardType = 'email-address' 
          onChangeText={(text) => setEmail(text)}
          />
          
          <TouchableOpacity style={styles.button} onPress= { () => save(alert('Email Saved!'))}>
            <Text style={{color: "white"}}>
              Save email
            </Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
    );
};

//export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },

  innerText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  inputText: {
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "stretch",
    margin: 16,
    height: 40,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "300",
  },

  button: {
    backgroundColor: "#009387",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 1,
    marginHorizontal: 32,
    borderRadius: 6,
  },

  scroll: {
    flex: 1,
    marginHorizontal: 60,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10,
},
})