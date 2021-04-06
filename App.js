import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './src/screens/Home/HomeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import configureStore from './src/redux/store';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import styled from 'styled-components/native'


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
      <PaperProvider >
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <AppStack.Navigator headerMode="none" >
            
                <AppStack.Screen name="HomeStack" component={HomeStack} />
                {/* <AppStack.Screen name="AuthStack" component={AuthStack} /> */}
          
              </AppStack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
