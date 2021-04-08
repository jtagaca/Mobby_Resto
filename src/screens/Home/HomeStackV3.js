// //ontesting
// import React, { useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { 
//   NavigationContainer, 
//   DefaultTheme as NavigationDefaultTheme,
//   DarkTheme as NavigationDarkTheme
// } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import { 
//   Provider as PaperProvider, 
//   DefaultTheme as PaperDefaultTheme,
//   DarkTheme as PaperDarkTheme 
// } from 'react-native-paper';

// import { DrawerContent } from './screens/Home/DrawerContent';

// // import MainTabScreen from './screens/MainTabScreen';
// // import SupportScreen from './screens/SupportScreen';
// // import SettingsScreen from './screens/SettingsScreen';
// // import BookmarkScreen from './screens/BookmarkScreen';

// import { AuthContext } from './components/context';

// import RootStackScreen from './screens/RootStackScreen';

// import AsyncStorage from '@react-native-community/async-storage';

// const Drawer = createDrawerNavigator();


// function HomeStackV3(props) {
//     return (
//         <PaperProvider theme={theme}>
//         <NavigationContainer theme={theme}>
//           { loginState.userToken !== null ? (
//             <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
//               <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
//               <Drawer.Screen name="SupportScreen" component={SupportScreen} />
//               <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
//               <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
//             </Drawer.Navigator>
//           )
//         :
//           <RootStackScreen/>
//         }
//         </NavigationContainer>
//         </PaperProvider>
//       );
// }

// export default HomeStackV3;