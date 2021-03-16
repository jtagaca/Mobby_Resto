import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './src/screens/Home/HomeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import configureStore from './src/redux/store';
import { Provider } from 'react-redux';



const { store, persistor } = configureStore()

const AppStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
