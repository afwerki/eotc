import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Alert = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [alertType, setAlertType] = useState('local');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
          setUserId(storedUserId);
        } else {
          console.error('User ID not found in storage');
        }
      } catch (error) {
        console.error('Failed to retrieve user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('https://ce43-92-236-121-121.ngrok-free.app/api/alerts', {
        title,
        body,
        alert_type: alertType,
        end_date: endDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        user_id: userId,
      });

      if (response.status === 200) {
        alert('Alert added successfully');
      } else {
        alert('Failed to add alert');
      }
    } catch (error) {
      console.error('Error submitting alert:', error);
      alert('An error occurred while adding the alert');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Logo at the top */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image link
              style={styles.logo}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Add Alert</Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.input}>
              <TextInput
                clearButtonMode="while-editing"
                placeholder="Title"
                style={styles.inputControl}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.input}>
              <TextInput
                style={styles.textArea}
                placeholder="Body"
                multiline={true}
                numberOfLines={6}
                value={body}
                onChangeText={setBody}
              />
            </View>

            {/* Date Picker for End Date */}
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>To:</Text>
              <TouchableOpacity
                onPress={() => setShowEndDatePicker(true)}
                style={styles.datePicker}
              >
                <Text style={styles.dateText}>
                  {endDate.toDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="spinner"
                onChange={onEndDateChange}
              />
            )}

            {/* Alert Type Picker */}
            <Text style={styles.dateLabel}>Alert Type:</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={alertType}
                onValueChange={(itemValue) => setAlertType(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Local Alert" value="local" />
                <Picker.Item label="Global Alert" value="global" />
              </Picker>
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <Text style={styles.btnText}>Submit Alert</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  textArea: {
    height: 120,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  datePicker: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#4B0082',
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4B0082',
    marginTop: 20,
  },
  footerLink: {
    color: '#4B0082',
    fontWeight: '600',
  },
});

export default Alert;
