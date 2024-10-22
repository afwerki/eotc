import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://079f-92-236-121-121.ngrok-free.app/api/mezmur";  // Replace with your backend API URL

const MezmurScreen = () => {
  const [mezmurs, setMezmurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMezmur, setSelectedMezmur] = useState(null);
  const [formData, setFormData] = useState({ title: "", lyrics: "", zemari: "", user_id: 1 });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [lastTap, setLastTap] = useState(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  
  useEffect(() => {
    if (userId !== null) {
      fetchMezmurs();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      setUserId(parseInt(id));
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
    }
  };

  const fetchMezmurs = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMezmurs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mezmurs:", error);
      setLoading(false);
    }
  };

  const openModal = (mezmur = null, editMode = false) => {
    if (!mezmur) {
      setFormData({
        title: '',
        lyrics: '',
        zemari: '',
        user_id: userId,
      });
    } else {
      setFormData({
        title: mezmur.title || '',
        lyrics: mezmur.lyrics || '',
        zemari: mezmur.zemari || 'ሰንበት ትምህርት ቤት',
        user_id: mezmur.user_id || userId,
      });
    }
    setSelectedMezmur(mezmur || null);
    setModalVisible(true);
    setIsEditing(editMode);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMezmur(null);
    setIsEditing(false);
  };

  const handleDeleteMezmur = async (mezmurId) => {
    const mezmur = mezmurs.find(m => m.id === mezmurId);
    if (!mezmur || mezmur.user_id !== userId) {
      Alert.alert('Error', 'You can only delete mezmurs you have uploaded.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/${mezmurId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }), // Include user_id in the request body
      });
  
      if (response.ok) {
        fetchMezmurs();
        closeModal();
      } else {
        alert('Failed to delete mezmur. Please try again.');
      }
    } catch (error) {
      console.error('Error during mezmur deletion:', error.message);
      alert('An error occurred. Please try again.');
    }
  };
  

  const handleFormSubmit = async () => {
    const { title, lyrics, zemari } = formData;

    if (!title || !lyrics || !zemari) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      let response;
      if (isEditing && selectedMezmur) {
        response = await fetch(`${API_URL}/${selectedMezmur.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        fetchMezmurs();
        closeModal();
      } else {
        alert('Failed to update mezmur. Please try again.');
      }
    } catch (error) {
      console.error('Error during mezmur submission:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDoubleTap = (mezmur) => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      openModal(mezmur, true);
    } else {
      setLastTap(now);
    }
  };

  const filterItems = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setFilteredItems([]);
      return;
    }
    const filtered = mezmurs.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lyrics.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.zemari.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#82d7f7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => openModal()} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Mezmur</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <FeatherIcon color="#778599" name="search" size={17} style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#778599"
          style={styles.searchInput}
          onChangeText={filterItems}
          value={searchTerm}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
  {(searchTerm ? filteredItems : mezmurs).map((item, index) => (
    <TouchableOpacity key={index} onPress={() => handleDoubleTap(item)} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.user_id === userId && (
          <TouchableOpacity onPress={() => openModal(item, true)}>
            <FeatherIcon name="edit" size={20} color="green" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.cardBody}>{item.lyrics}</Text>
      <Text style={styles.cardZemari}>በዘማሪ {item.zemari}</Text>
      <View style={styles.cardFooter}>
        {/* Display first_name instead of user_id */}
        <Text style={styles.cardDate}>መዝሙሩ የተጫነው በ{item.first_name} ነው</Text>
        {item.user_id === userId && (
          <TouchableOpacity onPress={() => handleDeleteMezmur(item.id)}>
            <FeatherIcon name="trash" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  ))}
</ScrollView>



      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Mezmur Title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Mezmur Lyrics"
              value={formData.lyrics}
              onChangeText={(text) => setFormData({ ...formData, lyrics: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Zemari"
              value={formData.zemari}
              onChangeText={(text) => setFormData({ ...formData, zemari: text })}
              style={styles.input}
            />
            <Button title={isEditing ? "Update Mezmur" : "Add Mezmur"} onPress={handleFormSubmit} />
            {isEditing && (
              <Button title="Delete Mezmur" onPress={() => handleDeleteMezmur(selectedMezmur?.id)} />
            )}
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  scrollContainer: {
    flex: 1,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  cardZemari: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  input: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default MezmurScreen;
