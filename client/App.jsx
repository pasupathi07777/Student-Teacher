import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/auth/Login';
import Signup from './src/screens/auth/Signup';
import EmailVerify from './src/screens/auth/EmailVerify';
import Home from './src/screens/Home';
import FirstLoaderScreen from './src/screens/FirstLoaderScreen';
import VerifyOtp from './src/screens/auth/VerifyOtp';
import ResetPassword from './src/screens/auth/ResetPassword';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white', 
    text: 'black',
    color: 'black', 
  },
};

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#42f44b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}>
      
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
      
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="firstLoaderScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="EmailVerify" component={EmailVerify} />
      <Stack.Screen name="verifyOtp" component={VerifyOtp} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="firstLoaderScreen" component={FirstLoaderScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
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
