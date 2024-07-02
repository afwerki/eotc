import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizzingScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        const response = await fetch(`https://c8df-92-236-121-121.ngrok-free.app/api/questions?userId=${userId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to load questions');
        }
        console.log('Fetched questions:', data);
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerPress = (answerId) => {
    setSelectedAnswerId(answerId);
    setShowAnswer(true);
    const correctAnswerId = questions[currentQuestionIndex].correct_answer_id;
    console.log('Selected answer ID:', answerId);
    console.log('Correct answer ID:', correctAnswerId);

    // Ensure both IDs are treated as numbers for comparison
    if (Number(correctAnswerId) === Number(answerId)) {
      setScore(score + 1);
      Alert.alert('Correct!', 'You got it right!');
    } else {
      Alert.alert('Wrong!', 'Better luck next time.');
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerId(null);
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestionsText}>No questions available.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question_text}</Text>
      <FlatList
        data={currentQuestion.answers}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.answerButton,
              showAnswer && item.id === currentQuestion.correct_answer_id ? styles.correctAnswer : {},
              showAnswer && item.id !== currentQuestion.correct_answer_id ? styles.incorrectAnswer : {},
            ]}
            onPress={() => handleAnswerPress(item.id)}
            disabled={showAnswer}
          >
            <Text style={styles.answerText}>{item.answer_text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {showAnswer && (
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion}>
            <Text style={styles.navButtonText}>Next Question</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  answerText: {
    color: '#fff',
    fontSize: 16,
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  incorrectAnswer: {
    backgroundColor: 'red',
  },
  navigationButtons: {
    marginTop: 20,
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scoreText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noQuestionsText: {
    fontSize: 18,
    color: '#333',
  },
});

export default QuizzingScreen;
