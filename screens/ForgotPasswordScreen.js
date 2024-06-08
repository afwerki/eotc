import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const { width, height } = Dimensions.get('window');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      const response = await fetch('https://ad56-148-252-146-234.ngrok-free.app/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert('Success', 'Temporary password has been sent to your email.');
        navigation.navigate('Login'); // Navigate to login screen
      } else {
        Alert.alert('Error', result.message || 'Failed to send temporary password.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending temporary password.');
      console.error('Error during forgot password:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Svg height={height * 0.3} width={width} style={styles.svg}>
        <Circle cx={width * 0.3} cy={-height * 0.1} r={height * 0.3} fill="#82d7f7" />
        <Circle cx={width * 0.5} cy={height * 0.05} r={height * 0.2} fill="#82d7f7" opacity="0.5" />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.instructions}>
          Enter your email address and we'll send you a temporary password.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor='#999'
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
          <Text style={styles.buttonText}>Send Temporary Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#82d7f7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#82d7f7',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
