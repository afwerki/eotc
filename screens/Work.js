import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

const places = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Staff Software Engineer - Backend',
    company: 'OpenAsset',
    location: 'London',
    type: 'Full-time',
    schedule: 'Monday to Friday',
    posted: '12 days ago',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Dynamics & Power Platform Developer with power pages',
    company: 'NTT Data UK',
    location: 'London',
    rating: 3.5,
    type: 'Full-time',
    schedule: '',
    posted: '6 days ago',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Database Developer',
    company: 'Formula 1',
    location: 'Biggin Hill',
    rating: 4.4,
    type: 'Full-time',
    schedule: '',
    posted: '30+ days ago',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Database Developer',
    company: 'Formula 1',
    location: 'Biggin Hill',
    rating: 4.4,
    type: 'Full-time',
    schedule: '',
    posted: '30+ days ago',
  },
];

const Work = ({ navigation }) => {
  const [saved, setSaved] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSave = useCallback(
    id => {
      if (saved.includes(id)) {
        setSaved(saved.filter(val => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FeatherIcon name="map-pin" size={24} color="#000" />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.headerTitle}>For you</Text>
          <Text style={styles.headerSubtitle}>Jobs based on your activity on EOTC</Text>
          {places.map(({ id, img, name, company, location, type, schedule, posted }) => {
            const isSaved = saved.includes(id);
            return (
              <View key={id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.jobTitle}>{name}</Text>
                  <TouchableOpacity onPress={() => handleSave(id)}>
                    <FontAwesome name={isSaved ? 'bookmark' : 'bookmark'} size={24} color={isSaved ? '#000' : '#ccc'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.company}>{company}</Text>
                <Text style={styles.location}>{location}</Text>
                <View style={styles.tags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{type}</Text>
                  </View>
                  {schedule ? (
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{schedule}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.posted}>{posted}</Text>
              </View>
            );
          })}
        </ScrollView>
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginRight: 10,
  },
  content: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#e0ffe0',
    padding: 5,
    borderRadius: 5,
    marginRight: 8,
  },
  tagText: {
    color: '#000',
  },
  posted: {
    fontSize: 14,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
  },
});

export default Work;
