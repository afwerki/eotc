import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, ScrollView, SafeAreaView } from 'react-native';

const ProjectsScreen = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://079f-92-236-121-121.ngrok-free.app/projects')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const openModal = (index) => {
    setSelectedProject(items[index]);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Function to trim the description to 10 words
  const trimDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  };

  // Function to format the description text with line breaks
  const formatDescription = (description) => {
    if (!description) return ''; // Return empty string if description is null or undefined
    return description.replace(/\./g, '.\n').replace(/:/g, ':\n').replace(/::/g, '::\n\n').replace(/፤/g, '፤\n');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Projects</Text>

        {items.map(({ label, badget, description}, index) => {
          const isActive = value === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setValue(index);
                openModal(index);
              }}>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                <View style={styles.radioTop}>
                  <Text style={styles.radioLabel}>{label}</Text>
                  <Text style={styles.radioUsers}>Budget $ {badget}</Text>
                </View>
                <Text style={styles.radioDescription}>{trimDescription(description)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedProject && selectedProject.label}</Text>
              <ScrollView contentContainerStyle={styles.modalScrollView}>
                <Text style={styles.modalDescription}>{formatDescription(selectedProject && selectedProject.description)}</Text>
              </ScrollView>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e6f0fa",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  /** Radio */
  radio: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  radioActive: {
    borderColor: '#0069fe',
  },
  radioTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  radioUsers: {
    fontSize: 16,
    color: '#666',
  },
  radioDescription: {
    fontSize: 16,
    color: '#999',
  },
  // Modal styles
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
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default ProjectsScreen;
