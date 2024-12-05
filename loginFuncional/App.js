import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ValidateMailScreen from './screens/ValidateMailScreen';
import SecurityCodeScreen from './screens/SecurityCodeScreen';
import HomeScreen from './screens/HomeScreen';
import NewShipment from './components/NewShipment';
import ServiceSelection from './screens/ServiceSelection';
import ShipmentPage from './screens/ShipmentPage';
import PaymentMethodScreen from './screens/PaymentMethodScreen';

import ShipmentForm4 from './screens/ShipmentForm4';

const Stack = createStackNavigator();

// Mantener visible el splash screen mientras se cargan los recursos
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Cargar fuentes personalizadas
        await Font.loadAsync({
          Delivery: require('./assets/fonts/Delivery_A_CdBlk.ttf'),
          Delivery2: require('./assets/fonts/Delivery_A_CdLt.ttf'),
        });
        // Simular una carga lenta (puedes eliminarlo si no lo necesitas)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // No renderizar nada hasta que la app esté lista
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Validate_Mail"
              component={ValidateMailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Security_Code"
              component={SecurityCodeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reset_Password"
              component={ResetPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewShipment"
              component={NewShipment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ServiceSelection"
              component={ServiceSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShipmentPage"
              component={ShipmentPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentMethodScreen"
              component={PaymentMethodScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShipmentForm4"
              component={ShipmentForm4}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
