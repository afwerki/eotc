import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useAuth } from '../screens/context/AuthContext'; // Importing useAuth
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Accessing login function from AuthContext

  const { width, height } = Dimensions.get('window'); // To set dimensions for SVG

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch('https://ce43-92-236-121-121.ngrok-free.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log('API Response:', result); // Log the full response for debugging

      if (response.status === 200) {
        await AsyncStorage.setItem('userId', result.userId.toString());
        await AsyncStorage.setItem('username', result.username);
        
        if (result.token) {
          await AsyncStorage.setItem('token', result.token); // Store the token
          console.log('Stored token:', result.token); // Log the stored token
        } else {
          console.error('Token is missing in the response');
          Alert.alert("Error", "Login successful but no token received.");
          return;
        }

        login(result.username, result.role); // Store username and role in AuthContext
        navigation.replace('Main'); // Navigate to MainTabNavigator
      } else {
        Alert.alert("Error", result.message || "Login failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login.");
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Svg height={height * 0.3} width={width} style={styles.svg}>
        <Circle cx={width * 0.3} cy={-height * 0.1} r={height * 0.3} fill="#82d7f7" />
        <Circle cx={width * 0.5} cy={height * 0.05} r={height * 0.2} fill="#82d7f7" opacity="0.5" />
      </Svg>
      <Text style={styles.welcomeText}>Welcome back</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Username"
        placeholderTextColor='#999'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='#999'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.signinButton}>
        <Text style={styles.signinText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signinButton: {
    height: 50,
    backgroundColor: '#82d7f7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
