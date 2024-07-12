import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const lessons = [
  {
    img: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2404&q=80',
    name: 'Squat',
    cal: 22,
    duration: 10,
  },
  // ... other lessons
];

const TopUsersScreen = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch('https://43ff-92-236-121-121.ngrok-free.app/api/top-users');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to load top users');
        }
        setTopUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', error.message);
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Top 10 Users</Text>
        <FlatList
          data={topUsers}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.correctAnswers}>Correct Answers: {item.correct_answers}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
        />

        <Text style={styles.subtitle}>Day 1 💪</Text>
        {lessons.map(({ name, cal, duration, img }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.card}>
              <Image
                alt=""
                resizeMode="cover"
                style={styles.cardImg}
                source={{ uri: img }}
              />
              <View>
                <Text style={styles.cardTitle}>{name}</Text>
                <View style={styles.cardStats}>
                  <View style={styles.cardStatsItem}>
                    <FeatherIcon color="#636a73" name="clock" />
                    <Text style={styles.cardStatsItemText}>{duration} mins</Text>
                  </View>
                  <View style={styles.cardStatsItem}>
                    <FeatherIcon color="#636a73" name="zap" />
                    <Text style={styles.cardStatsItemText}>{cal} cals</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardAction}>
                <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  correctAnswers: {
    fontSize: 16,
    marginTop: 5,
  },
  flatList: {
    marginBottom: 20,
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  cardStats: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardStatsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  cardStatsItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#636a73',
    marginLeft: 2,
  },
  cardAction: {
    marginLeft: 'auto',
  },
});

export default TopUsersScreen;
