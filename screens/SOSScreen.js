import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';

const SOSScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const sendSOS = async () => {
    if (location) {
      const message = `SOS! I need help! My current location is: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(['EMERGENCY_CONTACT_NUMBER'], message);
      } else {
        alert('SMS is not available on this device.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Alert</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          <Button title="Send SOS" onPress={sendSOS} />
        </View>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'pink',
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
});

export default SOSScreen;
