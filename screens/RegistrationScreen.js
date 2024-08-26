import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

const RegistrationScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePick = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image pick cancelled by user');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName || !age || !username || !profileImage) {
      Alert.alert("Error", "Please fill out all fields and add a profile picture.");
      return;
    }

    const registrationData = new FormData();
    registrationData.append('first_name', firstName);
    registrationData.append('last_name', lastName);
    registrationData.append('email', email);
    registrationData.append('age', age);
    registrationData.append('username', username);
    registrationData.append('password', password);
    registrationData.append('gender', gender);
    registrationData.append('marital_status', maritalStatus);
    registrationData.append('profile_image', {
      uri: profileImage.uri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });

    try {
      const response = await fetch('https://ce43-92-236-121-121.ngrok-free.app/api/register', {
        method: 'POST',
        body: registrationData,
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

  const loginAccess = () => (
    <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.form}>
      <View style={styles.input}>
        <Icon name="user" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Username"
          style={styles.inputControl}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.input}>
        <Icon name="envelope" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email address"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.input}>
        <Icon name="lock" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCorrect={false}
          placeholder="Create Password"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.formAction}>
        <TouchableOpacity onPress={() => setStep(2)} style={styles.btnNext}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const first_last_names = () => (
    <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.form}>
      <View style={styles.input}>
        <Icon name="user" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="First Name"
          style={styles.inputControl}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.input}>
        <Icon name="user" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Last Name"
          style={styles.inputControl}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.input}>
        <Icon name="transgender" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Gender"
          style={styles.inputControl}
          value={gender}
          onChangeText={setGender}
        />
      </View>

      <View style={styles.formAction}>
        <TouchableOpacity onPress={() => setStep(1)} style={styles.btnBack}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(3)} style={styles.btnNext}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const age_maritalStatus = () => (
    <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.form}>
      <View style={styles.input}>
        <Icon name="calendar" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Age"
          style={styles.inputControl}
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.input}>
        <Icon name="heart" size={20} color="#007aff" style={styles.icon} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Marital Status"
          style={styles.inputControl}
          value={maritalStatus}
          onChangeText={setMaritalStatus}
        />
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        <Text style={styles.imagePickerText}>Pick a Profile Picture</Text>
        {profileImage && <Image source={profileImage} style={styles.profileImage} />}
      </TouchableOpacity>

      <View style={styles.formAction}>
        <TouchableOpacity onPress={() => setStep(2)} style={styles.btnBack}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={styles.btnNext}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.formFooter}>
          Already have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.footerLink}
        >
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  form: {
    marginBottom: 24,
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
  icon: {
    marginLeft: 10,
  },
  inputControl: {
    flex: 1,
    height: 44,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  imagePickerText: {
    color: '#007aff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  formAction: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#007aff",
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
  formFooter: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },
  footerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#007aff",
  },
});

export default RegistrationScreen;
