import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MezmurScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mezmur Screen</Text>
      {/* Add more content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default MezmurScreen;
