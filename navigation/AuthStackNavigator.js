import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
      setIsFirstLaunch(hasSeenWelcome === null);
    };

    checkIfFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Optionally, return a loading screen here
  }

  return (
    <Stack.Navigator initialRouteName={isFirstLaunch ? 'Welcome' : 'Login'}>
      {isFirstLaunch && (
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
