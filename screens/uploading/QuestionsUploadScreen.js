import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const QuestionsUploadScreen = () => {
  const [questions, setQuestions] = useState([{ questionText: '', answers: ['', '', '', ''], correctAnswerIndex: null }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: ['', '', '', ''], correctAnswerIndex: null }]);
  };

  const handleQuestionChange = (text, index) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = text;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (text, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = text;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerIndexChange = (text, index) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswerIndex = parseInt(text);
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    // Handle submitting the questions
    console.log('Questions:', questions);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://www.publicdomainpictures.net/pictures/30000/nahled/plain-christian-cross.jpg' }} // URL of a cross image
        style={styles.crossImage}
      />
      <Text style={styles.title}>Upload Questions</Text>
      
      {questions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your question"
            value={question.questionText}
            onChangeText={text => handleQuestionChange(text, questionIndex)}
          />
          {question.answers.map((answer, answerIndex) => (
            <TextInput
              key={answerIndex}
              style={styles.input}
              placeholder={`Answer ${answerIndex + 1}`}
              value={answer}
              onChangeText={text => handleAnswerChange(text, questionIndex, answerIndex)}
            />
          ))}
          <TextInput
            style={styles.input}
            placeholder="Correct Answer Index (0-3)"
            keyboardType="numeric"
            value={question.correctAnswerIndex !== null ? question.correctAnswerIndex.toString() : ''}
            onChangeText={text => handleCorrectAnswerIndexChange(text, questionIndex)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
        <Text style={styles.addButtonText}>Add Another Question</Text>
      </TouchableOpacity>

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    paddingTop: 50, // push content towards the top
  },
  crossImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  questionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuestionsUploadScreen;
