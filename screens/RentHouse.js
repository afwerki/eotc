import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';  // Expo Image Picker

const RentHouse = () => {
  const [places, setPlaces] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [formData, setFormData] = useState({
    img: '',
    name: '',
    dates: '',
    price: '',
    rating: '',
    reviews: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState(null);

  const apiUrl = 'https://6a80-92-236-121-121.ngrok-free.app/api/rent-house'; // Replace with your actual API URL

  useEffect(() => {
    fetchPlaces();
  }, []);

  // Fetch all houses
  const fetchPlaces = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();

      // Normalize data field names
      const normalizedData = data.map(item => ({
        id: item.id,
        name: item.name,
        img: item.img,
        dates: item.dates,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews
      }));

      setPlaces(normalizedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
      setLoading(false);
    }
  };

  // Handle saving a house to saved list
  const handleSave = useCallback(
    id => {
      if (saved.includes(id)) {
        setSaved(saved.filter(val => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved]
  );

  // Open the modal to add a new house
  // Open the modal to add a new house or edit an existing one
const openDetailsModal = (house = null) => {
  if (house) {
    setFormData({
      img: house.img || '', // Populate the image path
      name: house.name || '', // Populate the house name
      dates: house.dates || '',
      price: house.price || '', // Populate the price
      rating: house.rating || '',
      reviews: house.reviews || ''
    });
    setIsEditing(true);
    setSelectedHouseId(house.id);
  } else {
    // Clear form data for adding a new house
    setFormData({
      img: '',
      name: '',
      dates: '',
      price: '',
      rating: '',
      reviews: ''
    });
    setIsEditing(false);
    setSelectedHouseId(null);
  }
  setDetailsModalVisible(true);
};


  // Close the add/edit house modal
  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
  };

  // Handle image selection from the phone's library using expo-image-picker
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, img: result.assets[0].uri });
    }
  };

  // Handle form submission to add or edit a house
  const handleFormSubmit = async () => {
    const { img, name, dates, price, rating, reviews } = formData;
  
    if (!img || !name || !dates || !price || !rating || !reviews) {
      Alert.alert("Please fill in all fields.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('dates', dates);
    formDataToSend.append('price', price);
    formDataToSend.append('rating', rating);
    formDataToSend.append('reviews', reviews);
  
    if (img) {
      const uriParts = img.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formDataToSend.append('img', {
        uri: img,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
  
    try {
      const response = await fetch(
        isEditing ? `${apiUrl}/${selectedHouseId}` : apiUrl,
        {
          method: isEditing ? 'PUT' : 'POST',
          body: formDataToSend, // Send form data
          headers: {
            Accept: 'application/json',
          }
        }
      );
  
      if (response.ok) {
        fetchPlaces(); // Refresh the list
        closeDetailsModal();
        Alert.alert('Success', isEditing ? 'House updated successfully!' : 'House added successfully!');
      } else {
        const errorData = await response.json();
        Alert.alert('Failed', errorData.message);
      }
    } catch (error) {
      console.error('Error during house submission:', error.message);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };
  
  // Handle deleting a house
  const handleDeleteHouse = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPlaces(); // Refresh the list
        Alert.alert('Success', 'House deleted successfully!');
      } else {
        Alert.alert('Failed', 'Unable to delete the house.');
      }
    } catch (error) {
      console.error('Error during deletion:', error.message);
      Alert.alert('Error', 'An error occurred while deleting the house.');
    }
  };

  // Handle submitting a comment
  const handleCommentSubmit = async (houseId) => {
    if (!comment) {
      Alert.alert('Please enter a comment.');
      return;
    }

    // Perform your logic to handle comment submission here
    Alert.alert('Success', `Comment submitted for house ID: ${houseId}`);
    setComment('');
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.addButton} onPress={() => openDetailsModal()}>
            <Text style={styles.addButtonText}>Add House</Text>
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search houses"
              value={searchText}
              onChangeText={setSearchText}
            />
            <FeatherIcon name="map-pin" size={24} color="#000" />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.headerTitle}>Available Houses</Text>
          {places.map((house) => {
            const { id, img, name, dates, price, rating, reviews } = house;
            const isSaved = saved.includes(id);

            // Check if img is external URL or a local path, and construct the full URL
            const fullImageUrl = img.startsWith('http') ? img : `https://6a80-92-236-121-121.ngrok-free.app${img}`;
            console.log(`Image URL: ${fullImageUrl}`); // Log the image URL

            return (
              <View key={id} style={styles.card}>
                <View style={styles.cardLikeWrapper}>
                  <TouchableOpacity onPress={() => handleSave(id)}>
                    <View style={styles.cardLike}>
                      <FontAwesome
                        color={isSaved ? '#ea266d' : '#222'}
                        name="heart"
                        solid={isSaved}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardTop}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    style={styles.cardImg}
                    source={{ uri: fullImageUrl }} // Use the correct image URL
                  />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{name}</Text>

                    <FontAwesome
                      color="#ea266d"
                      name="star"
                      solid={true}
                      size={12}
                      style={{ marginBottom: 2 }}
                    />

                    <Text style={styles.cardStars}>{rating}</Text>

                    <Text style={{ color: '#595a63' }}>
                      ({reviews} reviews)
                    </Text>
                  </View>

                  <Text style={styles.cardDates}>{dates}</Text>

                  <Text style={styles.cardPrice}>
                    <Text style={{ fontWeight: '600' }}>${price} </Text>/ night
                  </Text>

                  {/* Comment Input */}
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Leave a comment..."
                    value={comment}
                    onChangeText={setComment}
                  />
                  <TouchableOpacity style={styles.commentButton} onPress={() => handleCommentSubmit(id)}>
                    <Text style={styles.commentButtonText}>Submit Comment</Text>
                  </TouchableOpacity>

                  {/* Edit and Delete Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.editButton} onPress={() => openDetailsModal(house)}>
                      <FeatherIcon name="edit" size={24} color="#4CAF50" />
                      <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteHouse(id)}>
                      <FeatherIcon name="trash" size={24} color="#f44336" />
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Add/Edit House Modal */}
      <Modal
        visible={detailsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDetailsModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEditing ? 'Edit House' : 'Add a New House'}</Text>

            {/* Image Picker Button */}
            <TouchableOpacity onPress={handleSelectImage} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerButtonText}>Pick Image</Text>
            </TouchableOpacity>

            {/* Display selected image */}
            {formData.img ? (
              <Image source={{ uri: formData.img }} style={styles.selectedImage} />
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="House Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Available Dates"
              value={formData.dates}
              onChangeText={(text) => setFormData({ ...formData, dates: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price per night"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating"
              keyboardType="numeric"
              value={formData.rating}
              onChangeText={(text) => setFormData({ ...formData, rating: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Reviews"
              keyboardType="numeric"
              value={formData.reviews}
              onChangeText={(text) => setFormData({ ...formData, reviews: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleFormSubmit}>
              <Text style={styles.submitButtonText}>{isEditing ? 'Save Changes' : 'Add House'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeDetailsModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: '500',
    color: '#232425',
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: '#595a63',
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: '#232425',
  },
  commentInput: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  commentButton: {
    marginTop: 10,
    backgroundColor: '#82d7f7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    alignItems: 'center',
  },
  deleteButton: {
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePickerButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default RentHouse;
