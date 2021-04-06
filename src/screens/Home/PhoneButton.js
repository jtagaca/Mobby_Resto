import React, { Component } from "react";
import {Linking,Platform,TouchableOpacity,Text} from "react-native";
export default class MakeCall extends Component {

 dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };
};
