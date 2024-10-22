import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegistrationScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState(''); // Username field added here
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [location, setLocation] = useState(null); // Store location data

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getLocation(); // Automatically fetch location when permission is granted
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to register.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert('Error', 'An error occurred while requesting location permissions.');
    }
  };

  const getLocation = async () => {
    try {
      const locationData = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
      console.log('Location obtained:', locationData); // For debugging
    } catch (error) {
      Alert.alert('Error', 'Unable to get location. Please try again.');
      console.error('Location Error:', error);
    }
  };

  const handleRegister = async () => {
    console.log('Location state right before validation:', location); // For debugging
  
    // Ensure all fields are filled, and location has valid latitude and longitude
    if (!email || !password || !firstName || !lastName || !age || !username || !location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
      Alert.alert("Error", "Please fill out all fields and allow location access.");
      return;
    }
  
    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      age: age,
      username: username,
      password: password,
      gender: gender,
      marital_status: maritalStatus,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  
    try {
      const response = await fetch('https://079f-92-236-121-121.ngrok-free.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate('Login');
      } else {
        Alert.alert("Error", result.message || "Registration failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during registration.");
      console.error('Error during registration:', error);
    }
  };
  

  // Step 1: Login Access Form
  const loginAccess = () => (
    <View>
      <Text style={styles.title}>Login Access</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <View style={styles.formAction}>
        <TouchableOpacity style={styles.btnNext} onPress={() => setStep(2)}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Step 2: First and Last Names + Username
  const first_last_names = () => (
    <View>
      <Text style={styles.title}>Enter Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"  // Username input field added
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.formAction}>
        <TouchableOpacity style={styles.btnBack} onPress={() => setStep(1)}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNext} onPress={() => setStep(3)}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Step 3: Age and Marital Status
  const age_maritalStatus = () => (
    <View>
      <Text style={styles.title}>Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Marital Status"
        value={maritalStatus}
        onChangeText={setMaritalStatus}
      />
      <View style={styles.formAction}>
        <TouchableOpacity style={styles.btnBack} onPress={() => setStep(2)}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNext} onPress={handleRegister}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Register</Text>
            <Image
              source={require("../assets/eotc.jpeg")}
              style={styles.logo}
            />
          </View>
          {step === 1 && loginAccess()}
          {step === 2 && first_last_names()}
          {step === 3 && age_maritalStatus()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    marginVertical: 36,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  formAction: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnBack: {
    backgroundColor: "#007aff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  btnNext: {
    backgroundColor: "#007aff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});

export default RegistrationScreen;
