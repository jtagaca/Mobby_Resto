import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './screens/Home/HomeStackV2';
import AuthStack from './screens/Auth/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';


const AppStack = createStackNavigator();

// const theme = {
  
 
//   colors: {
//     colors:'white',
//     primary: '#3498db',
//     accent: '#f1c40f',
//   },
// };

export default function AppContent() {
  const jwt = useSelector(state => state.auth.jwt)
  const theme = useSelector(state => state.theme.theme)

  return (
    <PaperProvider theme={theme} >
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <AppStack.Navigator headerMode="none" >
                        {jwt ? (
                            <AppStack.Screen name="HomeStack" component={HomeStack} />
                            ) : (
                            <AppStack.Screen name="AuthStack" component={AuthStack} />
                        )}
                    </AppStack.Navigator>
                </NavigationContainer>  
            </SafeAreaView>
        </SafeAreaProvider>
    </PaperProvider>
  );
}
