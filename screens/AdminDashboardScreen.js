import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      {/* Example functionalities */}
      <Button title="Manage Users" onPress={() => console.log('Navigating to user management...')} />
      <Button title="View Reports" onPress={() => console.log('Navigating to reports...')} />
      <Button title="Settings" onPress={() => console.log('Navigating to settings...')} />
      {/* More administrative functionalities can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default AdminDashboardScreen;
