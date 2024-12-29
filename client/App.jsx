// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Login from './src/screens/auth/Login';
// import Signup from './src/screens/auth/Signup';
// import ResetPassword from './src/screens/auth/ResetPassword';
// import Home from './src/screens/Home';
// import FirstLoaderScreen from './src/screens/FirstLoaderScreen';

// const Stack = createNativeStackNavigator();
// function RootStack() {

//   return (
//     <Stack.Navigator
//       initialRouteName="login"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="login" component={Login} />
//       <Stack.Screen name="signup" component={Signup} />
//       <Stack.Screen name="resetPassword" component={ResetPassword} />
//       <Stack.Screen name="home" component={Home} />
//       <Stack.Screen name="firstLoderScreen" component={FirstLoaderScreen} />
//     </Stack.Navigator>
//   );
  
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }

import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/auth/Login';
import Signup from './src/screens/auth/Signup';
import ResetPassword from './src/screens/auth/ResetPassword';
import Home from './src/screens/Home';
import FirstLoaderScreen from './src/screens/FirstLoaderScreen';

// Create a custom theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white', // Set background to white
    text: 'black',   
    color:"black"    // Set text color to black
  },
};

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="resetPassword" component={ResetPassword} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="firstLoaderScreen" component={FirstLoaderScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack />
    </NavigationContainer>
  );
}





