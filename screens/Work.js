import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity,
  Text, TextInput, Modal, ActivityIndicator, Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatTimeAgo } from './utils';

const Work = ({ navigation }) => {
  const [saved, setSaved] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [replies, setReplies] = useState({});
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    location: '',
    type: '',
    schedule: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [repliesVisible, setRepliesVisible] = useState({});
  const [lastTap, setLastTap] = useState(null);

  const apiUrl = 'https://6a80-92-236-121-121.ngrok-free.app';

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchJobListings();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      setUserId(parseInt(id));
      console.log('Logged-in userId:', id);
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
    }
  };

  const fetchJobListings = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/job-listings`);
      const data = await response.json();
      setPlaces(data);
      const initialReplies = data.reduce((acc, job) => {
        acc[job.id] = [];
        return acc;
      }, {});
      setReplies(initialReplies);

      data.forEach(job => {
        fetchReplies(job.id);
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job listings:', error.message);
      setLoading(false);
    }
  };

  const fetchReplies = async (jobId) => {
    try {
      const response = await fetch(`${apiUrl}/api/replies/${jobId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setReplies(prev => ({ ...prev, [jobId]: data }));
      } else {
        setReplies(prev => ({ ...prev, [jobId]: [] }));
      }
    } catch (error) {
      console.error('Error fetching replies:', error.message);
      setReplies(prev => ({ ...prev, [jobId]: [] }));
    }
  };

  const truncateDescription = (description, maxWords = 30) => {
    const wordsArray = description.split(' ');
    if (wordsArray.length > maxWords) {
      return wordsArray.slice(0, maxWords).join(' ') + '...';
    }
    return description;
  };

  const handleDeleteJob = async (jobId) => {
    const job = places.find(job => job.id === jobId);
    if (!job || job.created_by !== userId) {
      Alert.alert('Error', 'You can only delete jobs you have uploaded.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchJobListings();
        closeDetailsModal();
      } else {
        const errorData = await response.json();
        alert('Failed to delete job listing. Please try again.');
      }
    } catch (error) {
      console.error('Error during job deletion:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const openDetailsModal = (job, editMode = false) => {
    if (!job) {
      setFormData({
        name: '',
        company: '',
        location: '',
        type: '',
        schedule: '',
        description: '',
      });
    } else {
      setFormData({
        name: job.name || '',
        company: job.company || '',
        location: job.location || '',
        type: job.type || '',
        schedule: job.schedule || '',
        description: job.description || '',
      });
    }
    setSelectedJob(job || null);
    setDetailsModalVisible(true);
    setIsEditing(editMode);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedJob(null);
    setIsEditing(false);
  };

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

  const handleReplyChange = (jobId, text) => {
    setReplies(prev => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        newReply: text,
      },
    }));
  };

  const handleReplySubmit = async (jobId) => {
    const replyText = replies[jobId]?.newReply;
    if (!replyText) return;

    try {
      const response = await fetch(`${apiUrl}/api/add-reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: jobId,
          userId: userId,
          replyText: replyText,
        }),
      });

      if (response.ok) {
        fetchReplies(jobId);
        setReplies(prev => ({
          ...prev,
          [jobId]: {
            ...prev[jobId],
            newReply: '',
          },
        }));
      }
    } catch (error) {
      console.error('Error during reply submission:', error.message);
    }
  };

  const handleDoubleTap = (job) => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      openDetailsModal(job);
    } else {
      setLastTap(now);
    }
  };

  const handleFormSubmit = async () => {
    const { name, company, location, type, schedule, description } = formData;

    if (!name || !company || !location || !type || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      let response;
      if (isEditing && selectedJob) {
        response = await fetch(`${apiUrl}/api/jobs/${selectedJob.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name, company, location, type, schedule, description,
          }),
        });
      } else {
        response = await fetch(`${apiUrl}/api/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name, company, location, type, schedule, description,
            created_by: userId,
          }),
        });
      }

      if (response.ok) {
        fetchJobListings();
        closeDetailsModal();
      } else {
        const errorData = await response.json();
        alert('Failed to update job listing. Please try again.');
      }
    } catch (error) {
      console.error('Error during job submission:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleRepliesVisible = (jobId) => {
    setRepliesVisible(prev => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const filteredPlaces = places.filter(
    (job) =>
      job.name.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#82d7f7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.addButton} onPress={() => openDetailsModal()}>
            <Text style={styles.addButtonText}>Add Job</Text>
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
            />
            <FeatherIcon name="map-pin" size={24} color="#000" />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.headerTitle}>For you</Text>
          <Text style={styles.headerSubtitle}>Jobs based on your activity on EOTC</Text>
          {filteredPlaces.map((job) => {
            const { id, name, description, company, location, type, schedule, posted, created_by } = job;
            const isOwner = created_by === userId;
            const isSaved = saved.includes(id);
            const areRepliesVisible = repliesVisible[id] || false;

            return (
              <TouchableOpacity
                key={id}
                onPress={() => handleDoubleTap(job)}
                style={styles.card}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.jobTitle}>{name}</Text>
                  <TouchableOpacity onPress={() => handleSave(id)}>
                    <FontAwesome name="bookmark" solid={isSaved} size={24} color={isSaved ? '#000' : '#ccc'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.company}>{company}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.description}>{truncateDescription(description)}</Text>
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
                <Text style={styles.posted}>{formatTimeAgo(posted)}</Text>
                <Text style={styles.uploadedBy}>Uploaded by: {job.uploaded_by}</Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => toggleRepliesVisible(id)} style={styles.actionButton}>
                    <FontAwesome name="comment" size={24} color="#82d7f7" />
                  </TouchableOpacity>
                  {isOwner && (
                    <>
                      <TouchableOpacity style={styles.actionButton} onPress={() => openDetailsModal(job, true)}>
                        <FeatherIcon name="edit" size={24} color="#4CAF50" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteJob(id)}>
                        <FeatherIcon name="trash" size={24} color="#f44336" />
                      </TouchableOpacity>
                    </>
                  )}
                </View>

                {areRepliesVisible && (
                  <>
                    <ScrollView style={styles.repliesContainer}>
                      {(Array.isArray(replies[id]) ? replies[id] : []).map(reply => (
                        <View key={reply.id} style={styles.reply}>
                          <Text style={styles.replyUsername}>{reply.username}</Text>
                          <Text style={styles.replyText}>{reply.reply_text}</Text>
                          <Text style={styles.replyTimestamp}>{formatTimeAgo(reply.created_at)}</Text>
                        </View>
                      ))}
                    </ScrollView>
                    <View style={styles.replyInputContainer}>
                      <TextInput
                        style={styles.replyInput}
                        placeholder="Reply to this job"
                        value={replies[id]?.newReply || ''}
                        onChangeText={text => handleReplyChange(id, text)}
                      />
                      <TouchableOpacity onPress={() => handleReplySubmit(id)}>
                        <FeatherIcon name="send" size={24} color="#82d7f7" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <Modal
        visible={detailsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDetailsModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedJob ? (
              <>
                {isEditing ? (
                  <>
                    <Text style={styles.modalTitle}>Edit Job</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Job Name"
                      value={formData.name}
                      onChangeText={(text) => setFormData({ ...formData, name: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Company"
                      value={formData.company}
                      onChangeText={(text) => setFormData({ ...formData, company: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Location"
                      value={formData.location}
                      onChangeText={(text) => setFormData({ ...formData, location: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Job Type"
                      value={formData.type}
                      onChangeText={(text) => setFormData({ ...formData, type: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Schedule"
                      value={formData.schedule}
                      onChangeText={(text) => setFormData({ ...formData, schedule: text })}
                    />
                    <TextInput
                      style={[styles.input, styles.largeInput]}
                      placeholder="Description"
                      value={formData.description}
                      onChangeText={(text) => setFormData({ ...formData, description: text })}
                      multiline
                      numberOfLines={4}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleFormSubmit}>
                      <Text style={styles.submitButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalTitle}>{selectedJob.name}</Text>
                    <Text style={styles.modalCompany}>{selectedJob.company}</Text>
                    <Text style={styles.modalLocation}>{selectedJob.location}</Text>
                    <Text style={styles.modalDescription}>{selectedJob.description}</Text>
                    <Text style={styles.modalPosted}>{formatTimeAgo(selectedJob.posted)}</Text>
                  </>
                )}
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Add Job</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Job Name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Company"
                  value={formData.company}
                  onChangeText={(text) => setFormData({ ...formData, company: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Job Type"
                  value={formData.type}
                  onChangeText={(text) => setFormData({ ...formData, type: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Schedule"
                  value={formData.schedule}
                  onChangeText={(text) => setFormData({ ...formData, schedule: text })}
                />
                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Description"
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  multiline
                  numberOfLines={4}
                />
                <TouchableOpacity style={styles.addButtonModal} onPress={handleFormSubmit}>
                  <Text style={styles.submitButtonText}>Add Job</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.cancelButton} onPress={closeDetailsModal}>
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#ff6347', // Tomato color for appeal
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
  description: {
    fontSize: 14,
    color: '#333',
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
  uploadedBy: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
    width: 120,
  },
  editIcon: {
    marginHorizontal: 10,
  },
  deleteIcon: {
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50', // Green for save
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonModal: {
    backgroundColor: '#ff6347', // Tomato color for appeal in modal
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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
  messageIcon: {
    marginTop: 10,
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
  largeInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  repliesContainer: {
    maxHeight: 200,
    width: '100%',
    marginTop: 10,
  },
  reply: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  replyUsername: {
    fontWeight: 'bold',
  },
  replyText: {
    color: '#333',
  },
  replyTimestamp: {
    fontSize: 12,
    color: '#999',
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
  modalCompany: {
    fontSize: 18,
    color: '#666',
  },
  modalLocation: {
    fontSize: 16,
    color: '#666',
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  modalPosted: {
    fontSize: 14,
    color: '#666',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-around', // Ensure equal spacing
    width: '100%', // Full width of parent container
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, // Width for each action button
  },
  saveButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#82d7f7',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonModal: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  replyInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Work;
