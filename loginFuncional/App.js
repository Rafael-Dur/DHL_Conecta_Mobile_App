import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ValidateMailScreen from './screens/ValidateMailScreen';
import SecurityCodeScreen from './screens/SecurityCodeScreen';
import HomeScreen from './screens/HomeScreen';
import NewShipment from './components/NewShipment';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Delivery: require('./assets/fonts/Delivery_A_CdBlk.ttf'),
      Delivery2: require('./assets/fonts/Delivery_A_CdLt.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Validate_Mail" component={ValidateMailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Security_Code" component={SecurityCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reset_Password" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewShipment" component={NewShipment} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});