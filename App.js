import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './src/screens/Home/HomeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const AppStack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack.Navigator headerMode="none" >
      
          <AppStack.Screen name="HomeStack" component={HomeStack} />
          {/* <AppStack.Screen name="AuthStack" component={AuthStack} /> */}
    
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}
