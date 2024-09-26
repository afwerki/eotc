import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const AdminDashboard = ({ navigation }) => {
    const [pendingAlerts, setPendingAlerts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPendingAlerts = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('Retrieved token:', token);  // Check the retrieved token
                
                if (!token) {
                    setError('No token found, please log in again.');
                    Alert.alert("Session Expired", "No token found, please log in again.", [
                        { text: "OK", onPress: () => navigation.replace('Auth') }
                    ]);
                    return;
                }

                // Decode token to check expiration
                const decodedToken = jwt_decode(token);
                console.log('Decoded Token:', decodedToken);

                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // Token has expired
                    setError('Session expired, please log in again.');
                    Alert.alert("Session Expired", "Session expired, please log in again.", [
                        { text: "OK", onPress: () => navigation.replace('Auth') }
                    ]);
                    return;
                }

                const response = await axios.get('https://6a80-92-236-121-121.ngrok-free.app/api/alerts/pending', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPendingAlerts(response.data);
            } catch (err) {
                console.error('Error fetching pending alerts:', err);
                setError('Error fetching pending alerts. Please try again.');
            }
        };

        fetchPendingAlerts();
    }, [navigation]);

    const handleAlertAction = async (alertId, action) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`https://6a80-92-236-121-121.ngrok-free.app/api/alerts/${alertId}/${action}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPendingAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
        } catch (err) {
            console.error(`Error ${action}ing alert:`, err);
            setError(`Error ${action}ing the alert. Please try again.`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>Pending Alerts for Approval</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <FlatList
                data={pendingAlerts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.alertItem}>
                        <Text style={styles.alertTitle}>{item.title}</Text>
                        <Text>{item.body}</Text>
                        <Text>Type: {item.alert_type}</Text>
                        <Text>End Date: {new Date(item.end_date).toLocaleDateString()}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Approve" color="green" onPress={() => handleAlertAction(item.id, 'approve')} />
                            <Button title="Reject" color="red" onPress={() => handleAlertAction(item.id, 'reject')} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    alertItem: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default AdminDashboard;
