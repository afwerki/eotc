// screens/uploading/QuestionsUploadScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestionsUploadScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Upload Questions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionsUploadScreen;
