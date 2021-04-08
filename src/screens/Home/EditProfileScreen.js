import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

const EditProfileScreen = (props) => {
    return(
        <View styles={styles.container}>
            <Text>Hello</Text>
        </View>

    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})