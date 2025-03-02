import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Vibration, Platform } from 'react-native';
import { TriangleAlert as AlertTriangle, Phone, MessageSquare, Volume2, MapPin } from 'lucide-react-native';
import { useTheme } from '../ThemeContext'; // Importo useTheme nga ThemeContext

export default function SOSScreen() {
  const [countdown, setCountdown] = useState(null);
  const [sosActive, setSosActive] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
          // Vibrate on each countdown second
          Vibration.vibrate(200);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // Countdown reached zero, activate SOS
        activateSOS();
      }
    }
  }, [countdown]);
  
  useEffect(() => {
    if (sosActive) {
      // Start pulsing animation when SOS is active
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Vibrate with pattern when SOS is active
      const pattern = [0, 300, 200, 300, 200, 300];
      Vibration.vibrate(pattern, true);
    } else {
      // Stop animation and vibration when SOS is deactivated
      pulseAnim.setValue(1);
      Vibration.cancel();
    }
    
    return () => {
      Vibration.cancel();
    };
  }, [sosActive]);
  
  const startCountdown = () => {
    Alert.alert(
      'SOS Activation',
      'SOS will be activated in 5 seconds. Tap Cancel to stop.',
      [
        {
          text: 'Cancel',
          onPress: () => setCountdown(null),
          style: 'cancel',
        },
        { text: 'Continue', onPress: () => setCountdown(5) },
      ]
    );
  };
  
  const activateSOS = () => {
    setSosActive(true);
    setCountdown(null);
    
    // Simulate sending alerts to emergency contacts
    Alert.alert(
      'SOS Activated',
      'Emergency alerts have been sent to your contacts with your current location.',
      [{ text: 'OK' }]
    );
  };
  
  const deactivateSOS = () => {
    Alert.alert(
      'Deactivate SOS',
      'Are you sure you want to deactivate the SOS alert?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { 
          text: 'Deactivate', 
          onPress: () => {
            setSosActive(false);
            Alert.alert('SOS Deactivated', 'Your emergency contacts have been notified that you are safe.');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const sosActions = [
    {
      icon: <Phone color="#fff" size={24} />,
      title: 'Call Emergency',
      onPress: () => {
        Alert.alert('Calling Emergency Services', 'This would dial your emergency number.');
      },
    },
    {
      icon: <MessageSquare color="#fff" size={24} />,
      title: 'Send SOS Text',
      onPress: () => {
        Alert.alert('SOS Text Sent', 'Emergency text messages have been sent to your contacts.');
      },
    },
    {
      icon: <Volume2 color="#fff" size={24} />,
      title: 'Sound Alarm',
      onPress: () => {
        Alert.alert('Alarm Activated', 'This would sound a loud alarm.');
      },
    },
    {
      icon: <MapPin color="#fff" size={24} />,
      title: 'Share Location',
      onPress: () => {
        Alert.alert('Location Shared', 'Your current location has been shared with your emergency contacts.');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AlertTriangle color="#e74c3c" size={24} />
        <Text style={styles.headerText}>Emergency SOS</Text>
      </View>
      
      <View style={styles.sosContainer}>
        {countdown !== null ? (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownTitle}>SOS Activating in</Text>
            <Text style={styles.countdownNumber}>{countdown}</Text>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setCountdown(null)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : sosActive ? (
          <View style={styles.activeSOSContainer}>
            <Animated.View 
              style={[
                styles.sosActiveIndicator,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <AlertTriangle color="#fff" size={48} />
            </Animated.View>
            <Text style={styles.sosActiveText}>SOS ACTIVE</Text>
            <Text style={styles.sosActiveSubtext}>
              Emergency contacts have been notified with your location
            </Text>
            <TouchableOpacity 
              style={styles.deactivateButton}
              onPress={deactivateSOS}
            >
              <Text style={styles.deactivateButtonText}>Deactivate SOS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.sosButton}
            onPress={startCountdown}
          >
            <AlertTriangle color="#fff" size={48} />
            <Text style={styles.sosButtonText}>PRESS FOR SOS</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          {sosActions.map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.actionButton}
              onPress={action.onPress}
            >
              {action.icon}
              <Text style={styles.actionButtonText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>SOS Information</Text>
        <Text style={styles.infoText}>
          When you activate SOS, your emergency contacts will receive:
        </Text>
        <View style={styles.infoItem}>
          <AlertTriangle color="#e74c3c" size={16} />
          <Text style={styles.infoItemText}>An emergency alert message</Text>
        </View>
        <View style={styles.infoItem}>
          <MapPin color="#e74c3c" size={16} />
          <Text style={styles.infoItemText}>Your current location</Text>
        </View>
        <View style={styles.infoItem}>
          <Volume2 color="#e74c3c" size={16} />
          <Text style={styles.infoItemText}>Continuous location updates</Text>
        </View>
      </View>
    </View>
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
  sosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  sosButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  sosButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  countdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  countdownNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#7f8c8d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeSOSContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosActiveIndicator: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sosActiveText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  sosActiveSubtext: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  deactivateButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deactivateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionsContainer: {
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
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#3498db',
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoContainer: {
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  infoText: {
    color: '#7f8c8d',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoItemText: {
    marginLeft: 10,
    color: '#2c3e50',
  },
});