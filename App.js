import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import configureStore from './src/redux/store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import AppContent from './src/index';



const { store, persistor } = configureStore()

const AppStack = createStackNavigator();

// const theme = {
  
 
//   colors: {
//     colors:'white',
//     primary: '#3498db',
//     accent: '#f1c40f',
//   },
// };


export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
