import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';

const Upload_mezmur = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handleBodyChange = (newBody) => {
    setBody(newBody);
  };

  const handleUserIdChange = (newUserId) => {
    setUserId(newUserId);
  };

  const handleSubmit = () => {
    // Send the data to your backend API
    fetch('https://cc13-92-236-121-121.ngrok-free.app/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, user_id: parseInt(userId) }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data successfully sent:', data);
        // Optionally, do something after successful submission
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        // Handle errors here
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={[styles.input, { height: 200 }]}
        multiline={true}
        placeholder="Enter body with line breaks"
        value={body}
        onChangeText={handleBodyChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter user ID"
        keyboardType="numeric"
        value={userId}
        onChangeText={handleUserIdChange}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{`Title: ${title}\nBody: ${body}\nUser ID: ${userId}`}</Text>
      </View>
    </ScrollView>
  );
}

export default Upload_mezmur;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  displayContainer: {
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  displayText: {
    fontSize: 16,
  },
});