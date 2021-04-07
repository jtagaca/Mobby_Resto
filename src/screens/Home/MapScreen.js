//npm install --save react-native-open-maps
import openMap from 'react-native-open-maps';
import React, { Component } from 'react';
import { Button } from 'react-native';
//to do:
//1. set start and end points
//2. try to make this a function with string parameter so directions button can directly open it
export default class App extends Component {
  _goToYosemite() {
    openMap({ latitude: 37.865101, longitude: -119.538330 });
  }
  
  render() {
    return (
      <Button

        color={'#bdc3c7'}
        onPress={this._goToYosemite}
        title="Open Maps" />
    );
  }

}
/*
        color={'#bdc3c7'}
        onPress={this._goToYosemite}
        title="Click To Open Maps 🗺"
        */