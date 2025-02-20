import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusScreen = () => {
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prevStatus) => (prevStatus === 'Active' ? 'Inactive' : 'Active'));
    }, 5000); // Toggle status every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Status</Text>
      <Text style={styles.status}>Current Status: {status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'pink',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
  },
});

export default StatusScreen;
// In the StatusScreen component, we have a simple status screen that displays the current status of the user. The status is toggled between 'Active' and 'Inactive' every 5 seconds using the setInterval function. We clear the interval using the return statement in the useEffect hook to prevent memory leaks.