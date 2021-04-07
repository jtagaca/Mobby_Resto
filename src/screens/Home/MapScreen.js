//npm install --save react-native-open-maps
import openMap from 'react-native-open-maps';
import React, { Component } from 'react';
import { Button } from 'react-native';
 
export default class App extends Component {
  _goToYosemite() {
    openMap({ latitude: 37.865101, longitude: -119.538330 });
  }
  
  render() {
    return (
      <Button
        color={'#bdc3c7'}
        onPress={this._goToYosemite}
        title="Click To Open Maps 🗺" />
    );
  }
}
