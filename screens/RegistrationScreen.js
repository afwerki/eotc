import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from "react-native";

const RegistrationScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName || !age || !username) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      email,
      age,
      username,
      password,
      gender,
      marital_status: maritalStatus,
    };

    try {
      const response = await fetch('https://ff16-92-236-121-121.ngrok-free.app/register', {
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ተዋህዶ</Text>
          <Text style={styles.subtitle}>
            እዚህ ላይ የሚሰጡንመረጃ ጠቃሚ ሰለሆነ በጥንቃቄ ይሙሉት
          </Text>
        </View>

        <View style={styles.form}>
        <View style={styles.input}>
            <Text style={styles.inputLabel}>username</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputControl}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Create Password</Text>
            <Text style={{ color: "gray", fontSize: 12 }}>
              የማይረሳ የይለፍ ቃል ያስገቡ
            </Text>

            <TextInput
              autoCorrect={false}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="afe.programmer@gmail.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          

          <View style={styles.input}>
            <Text style={styles.inputLabel}>ስም/first name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputControl}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>የአባት ስም/last name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputControl}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>ፆታ/gender</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputControl}
              value={gender}
              onChangeText={setGender}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>እድሜ/age</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputControl}
              value={age}
              onChangeText={setAge}
            />
          </View>
         

          <View style={styles.input}>
            <Text style={styles.inputLabel}>ጋብቻ/marital status</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputControl}
              value={maritalStatus}
              onChangeText={setMaritalStatus}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={handleRegister}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.formFooter}>
              Already have an account?{" "}
              <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /**form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },
  /**Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  /**button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
export default RegistrationScreen;
