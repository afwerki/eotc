import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { width, height } = Dimensions.get('window');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch('https://d4f7-92-236-121-121.ngrok-free.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert("Success", "Login successful!");
        navigation.replace('Main'); // Navigate to the main screen
      } else {
        Alert.alert("Error", result.message || "Login failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login.");
      console.error('Error during login:', error);
    }
  };

  const clearAsyncStorageAndNavigate = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Welcome'); // Navigate to Welcome screen after clearing storage
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <Svg height={height * 0.3} width={width} style={styles.svg}>
        <Circle cx={width * 0.3} cy={-height * 0.1} r={height * 0.3} fill="#82d7f7" />
        <Circle cx={width * 0.5} cy={height * 0.05} r={height * 0.2} fill="#82d7f7" opacity="0.5" />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <View style={styles.imagePlaceholder}>
          {/*<Image source = {require("../assets/eotc.jpeg")}/>*/}
        </View>

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
        <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.signinButton}>
          <Text style={styles.signinText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.signuplink}>
          <Text style={styles.signupText}>Don't have an account? Register here</Text>
        </TouchableOpacity>

        {/* Button to clear AsyncStorage and navigate to Welcome screen */}
        <View style={styles.clearButtonContainer}>
          <Button title="Clear Storage" onPress={clearAsyncStorageAndNavigate} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#82d7f7',
    marginBottom: 30,
  },
  signinButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#82d7f7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signinText: {
    color: '#fff',
    fontSize: 18,
  },
  signupText: {
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clearButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
