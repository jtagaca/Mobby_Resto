import React, {useState, useEffect}from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { themeSwitch } from '../../redux/actions/ThemeActions';
import {Text, TextInput} from 'react-native-paper';
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImagePickerIOS,
} from 'react-native';
import { setBio, setLocation } from '../../redux/actions/UserActions';


export default function EditProfileScreen(props) {
  const dispatch = useDispatch()
  
  const [bioText, setBioText] = useState('');
  const [locText, setLocText] = useState('');


  const bio = useSelector(state => state.user.bio)
  const loc = useSelector(state => state.user.location)

  console.log(bio)
  console.log(loc)

  const saveLocation = () => {
    if (!locText)
    {
      alert('Please enter a location');
      return;
    }
    dispatch(setLocation(locText));
  }

  const saveBiography = () => {
    if (!bioText)
    {
      alert('Please enter a bio');
      return;
    }
    dispatch(setBio(bioText));
  }


  const save = () => {
    saveLocation();
    saveBiography();
  }

  const theme = useSelector(state => state.theme.theme)
  
    return(
        <View style={[styles.container]}>
            <ScrollView style={styles.scroll, { backgroundColor: theme.colors.background }}>

          <View style={styles.row}>
            <MaterialIcons name="description" size={30} color="lightblue"/>
            <Text style={styles.innerText}>Edit Biography</Text>
          </View>
            <Text style={{height: 20, flex: 1, flexWrap: 'wrap'}}> Current Biography: {bio} </Text>

          
          <TextInput 
            style={styles.inputText} 
            value={bioText}
            onChangeText={(text) => setBioText(text)}
          />
          
          <TouchableOpacity style={styles.button} onPress= { () => saveBiography()}>
            <Text style={{color: "white"}}>
              Save Biography
            </Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <MaterialIcons name="location-pin" size={30} color="red"/>
            <Text style={styles.innerText}>Edit Location</Text>
          </View>
            <Text style={{height: 20}}> Current Location: {loc} </Text>    

          <TextInput 
            style={styles.inputText} 
            value={locText}
            onChangeText={(text) => setLocText(text)}
          />

          
          <TouchableOpacity style={styles.button} onPress= { () => saveLocation()}>
            <Text style={{color: "white"}}>
              Save Location
            </Text>
          </TouchableOpacity>

          <View style={styles.saverow}>
            <MaterialIcons name="save" size={30} color="lightgreen"/>
            <Text style={styles.innerText}>Save All New Changes</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress= { () => save()}>
            <Text style={{color: "white"}}>
              Save All
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

saverow: {
  flexDirection: 'row',
  marginBottom: 10,
  marginTop: 50,
  marginLeft: 80,
},
})