// src/screens/SegmentationScreen.js

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const SegmentationScreen = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [totalContacts, setTotalContacts] = useState(null);  // State to hold total contacts

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/segment', {
        gender,
        age: age ? parseInt(age) : undefined,
      });

      setTotalContacts(response.data.totalContacts);  // Set the total contacts in state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter maximum age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {/* Display the total number of contacts */}
      {totalContacts !== null && (
        <Text style={styles.resultText}>
          Total Contacts: {totalContacts}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SegmentationScreen;
