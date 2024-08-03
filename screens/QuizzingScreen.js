import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert, SectionList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizzingScreen = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        const response = await fetch(`https://12a1-92-236-121-121.ngrok-free.app/api/questions`);
        const responseText = await response.text();
        console.log('Raw response:', responseText);  // Log raw response
        const data = JSON.parse(responseText);  // Parse JSON from the raw response
        if (!response.ok) {
          throw new Error(data.message || 'Failed to load questions');
        }
        console.log('Fetched question sets:', data);

        if (!Array.isArray(data)) {
          throw new Error('Unexpected response format');
        }

        // Sort data by upload_time in descending order
        const sortedData = data.sort((a, b) => new Date(b.upload_time) - new Date(a.upload_time));
        // Group data by username
        const groupedData = sortedData.reduce((acc, item) => {
          const { username } = item;
          if (!acc[username]) {
            acc[username] = [];
          }
          acc[username].push(item);
          return acc;
        }, {});

        // Convert grouped data to section list format
        const sections = Object.keys(groupedData).map((username) => ({
          title: username,
          data: groupedData[username],
        }));

        setQuestionSets(sections);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSetSelect = (setIndex, sectionIndex) => {
    setSelectedSetIndex({ setIndex, sectionIndex });
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswers({});
    setShowAnswer(false);
    setCompleted(false);
  };

  const handleAnswerPress = (answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answerId,
    }));
    setShowAnswer(true);

    const { questions } = questionSets[selectedSetIndex.sectionIndex].data[selectedSetIndex.setIndex];
    const correctAnswerId = questions[currentQuestionIndex]?.correct_answer_id;
    console.log('Selected answer ID:', answerId);
    console.log('Correct answer ID:', correctAnswerId);

    if (Number(correctAnswerId) === Number(answerId)) {
      setScore(score + 1);
      Alert.alert('Correct!', 'You got it right!');
    } else {
      Alert.alert('Wrong!', 'Better luck next time.');
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => {
      const { questions } = questionSets[selectedSetIndex.sectionIndex].data[selectedSetIndex.setIndex];
      if (prev + 1 < questions.length) {
        return prev + 1;
      } else {
        setCompleted(true);
        return prev;
      }
    });
  };

  const handleSubmitAnswers = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const { questions } = questionSets[selectedSetIndex.sectionIndex].data[selectedSetIndex.setIndex];
    const answers = questions.map((question, index) => ({
      questionId: question.question_id,
      answerId: selectedAnswers[index],
      isCorrect: Number(question.correct_answer_id) === Number(selectedAnswers[index]),
    }));

    // Check for any null answerId before sending to the backend
    const hasNullAnswerId = answers.some(answer => answer.answerId === undefined || answer.answerId === null);
    if (hasNullAnswerId) {
      Alert.alert('Error', 'Some answers are missing. Please answer all questions before submitting.');
      return;
    }

    try {
      const response = await fetch('https://0d51-92-236-121-121.ngrok-free.app/api/submit-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, answers }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Answers submitted successfully!');
      } else {
        Alert.alert('Error', result.message || 'Error submitting answers.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error submitting answers.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!questionSets || questionSets.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestionsText}>No questions available.</Text>
      </View>
    );
  }

  if (selectedSetIndex === null) {
    return (
      <View style={styles.container}>
        <SectionList
          sections={questionSets}
          renderItem={({ item, index, section }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSetSelect(index, questionSets.indexOf(section))}
              key={`${item.set_id}-${index}`}  // Ensure unique key
            >
              <Text style={styles.cardTitle}>Set {index + 1}</Text>
              <Text style={styles.cardText}>Uploaded by: {item.username}</Text>
              <Text style={styles.cardText}>Upload time: {new Date(item.upload_time).toLocaleString()}</Text>
              <Text style={styles.cardText}>Number of questions: {item.questions.length}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          keyExtractor={(item, index) => `${item.set_id}-${index}`}
        />
      </View>
    );
  }

  const { questions } = questionSets[selectedSetIndex.sectionIndex].data[selectedSetIndex.setIndex];
  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestionsText}>No questions available in this set.</Text>
        <TouchableOpacity style={styles.navButton} onPress={() => setSelectedSetIndex(null)}>
          <Text style={styles.navButtonText}>Back to Sets</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      {completed ? (
        <View style={styles.container}>
          <Text style={styles.summaryText}>You have completed the quiz!</Text>
          <Text style={styles.summaryText}>Score: {score} / {questions.length}</Text>
          <TouchableOpacity style={styles.navButton} onPress={handleSubmitAnswers}>
            <Text style={styles.navButtonText}>Submit Answers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => setSelectedSetIndex(null)}>
            <Text style={styles.navButtonText}>Back to Sets</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.questionText}>{currentQuestion?.question_text}</Text>
          <FlatList
            data={currentQuestion?.answers || []}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.answerButton,
                  showAnswer && item.answer_id === currentQuestion?.correct_answer_id ? styles.correctAnswer : {},
                  showAnswer && item.answer_id !== currentQuestion?.correct_answer_id ? styles.incorrectAnswer : {},
                ]}
                onPress={() => handleAnswerPress(item.answer_id)}
                disabled={showAnswer}
                key={`${item.answer_id}`}  // Ensure unique key
              >
                <Text style={styles.answerText}>{item.answer_text}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item.answer_id}`}  // Ensure unique key
          />
          {showAnswer && (
            <View style={styles.navigationButtons}>
              {currentQuestionIndex + 1 < questions.length ? (
                <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion}>
                  <Text style={styles.navButtonText}>Next Question</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.navButton} onPress={() => setCompleted(true)}>
                  <Text style={styles.navButtonText}>Finish Quiz</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </>
      )}
      <Text style={styles.scoreText}>Score: {score}</Text>
      <TouchableOpacity style={styles.navButton} onPress={() => setSelectedSetIndex(null)}>
        <Text style={styles.navButtonText}>Back to Sets</Text>
      </TouchableOpacity>
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
    marginVertical: 10,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default QuizzingScreen;
