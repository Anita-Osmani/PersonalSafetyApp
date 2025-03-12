import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Platform } from 'react-native';
import { MapPin, Clock, Share2, Users, Shield } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps'; // Shto MapView dhe Marker
import * as Location from 'expo-location'; // Shto expo-location për vendndodhjen

export default function SmartTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [trackingDuration, setTrackingDuration] = useState(30); // minutes
  const [elapsedTime, setElapsedTime] = useState(0);
  const [location, setLocation] = useState(null); // Shto gjendje për vendndodhjen

  // Merr vendndodhjen aktuale
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Kontrollo kohën e gjurmimit
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          if (prev >= trackingDuration * 60) {
            clearInterval(interval);
            setIsTracking(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => clearInterval(interval);
  }, [isTracking, trackingDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = (trackingDuration * 60) - elapsedTime;

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const selectDuration = (minutes) => {
    setTrackingDuration(minutes);
    if (isTracking) {
      setElapsedTime(0);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MapPin color="#e74c3c" size={24} />
        <Text style={styles.headerText}>Smart Tracking</Text>
      </View>

      {/* Zëvendëso Image me MapView */}
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.mapImage}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          </MapView>
        )}
        {isTracking && (
          <View style={styles.trackingOverlay}>
            <Text style={styles.trackingText}>Tracking Active</Text>
            <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
          </View>
        )}
      </View>

      {/* Pjesa tjetër e komponentit */}
      <View style={styles.trackingControls}>
        <Text style={styles.sectionTitle}>Location Tracking</Text>

        <TouchableOpacity
          style={[
            styles.trackingButton,
            isTracking ? styles.stopButton : styles.startButton
          ]}
          onPress={toggleTracking}
        >
          <Text style={styles.trackingButtonText}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>

        <View style={styles.durationSelector}>
          <Text style={styles.durationTitle}>
            <Clock color="#2c3e50" size={16} /> Tracking Duration
          </Text>

          <View style={styles.durationButtons}>
            {[15, 30, 60, 120].map(mins => (
              <TouchableOpacity
                key={mins}
                style={[
                  styles.durationButton,
                  trackingDuration === mins && styles.activeDurationButton
                ]}
                onPress={() => selectDuration(mins)}
              >
                <Text
                  style={[
                    styles.durationButtonText,
                    trackingDuration === mins && styles.activeDurationText
                  ]}
                >
                  {mins} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.sharingOptions}>
        <Text style={styles.sectionTitle}>Sharing Options</Text>

        <View style={styles.optionItem}>
          <View style={styles.optionInfo}>
            <Share2 color="#2c3e50" size={20} />
            <Text style={styles.optionText}>Share Location with Contacts</Text>
          </View>
          <Switch
            value={shareLocation}
            onValueChange={setShareLocation}
            trackColor={{ false: '#ecf0f1', true: '#e74c3c' }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : shareLocation ? '#fff' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.contactsButton}>
          <Users color="#3498db" size={20} />
          <Text style={styles.contactsButtonText}>Select Contacts to Share With</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.safetyFeatures}>
        <Text style={styles.sectionTitle}>Safety Features</Text>

        <View style={styles.featureItem}>
          <Shield color="#e74c3c" size={24} />
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Safe Arrival Notification</Text>
            <Text style={styles.featureDescription}>
              Automatically notify your emergency contacts when you arrive at your destination
            </Text>
            <TouchableOpacity style={styles.setupButton}>
              <Text style={styles.setupButtonText}>Set Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Clock color="#e74c3c" size={24} />
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Check-in Reminders</Text>
            <Text style={styles.featureDescription}>
              Get periodic reminders to check in with your emergency contacts
            </Text>
            <TouchableOpacity style={styles.setupButton}>
              <Text style={styles.setupButtonText}>Set Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2c3e50',
  },
  mapContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 15,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  trackingOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(231, 76, 60, 0.9)',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  trackingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trackingControls: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  trackingButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#e74c3c',
  },
  stopButton: {
    backgroundColor: '#7f8c8d',
  },
  trackingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  durationSelector: {
    marginTop: 10,
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  activeDurationButton: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  durationButtonText: {
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  activeDurationText: {
    color: '#fff',
  },
  sharingOptions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  contactsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  contactsButtonText: {
    marginLeft: 10,
    color: '#3498db',
    fontWeight: 'bold',
  },
  safetyFeatures: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 15,
  },
  featureInfo: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  featureDescription: {
    color: '#7f8c8d',
    marginBottom: 10,
  },
  setupButton: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  setupButtonText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
}); 