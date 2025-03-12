import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, Platform } from 'react-native';
import { Activity, Check, Clock, Bell, Shield, MessageSquare } from 'lucide-react-native';
import { useTheme } from '../ThemeContext'; // Importo useTheme nga ThemeContext


export default function StatusScreen() {
  const [status, setStatus] = useState('safe');
  const { theme, colors } = useTheme(); // Merr temën dhe ngjyrat nga konteksti i temës
  const [customMessage, setCustomMessage] = useState('');
  const [autoCheckIn, setAutoCheckIn] = useState(true);
  const [checkInInterval, setCheckInInterval] = useState(60); // minutes
  const [notifyContacts, setNotifyContacts] = useState(true);
  
  const statusOptions = [
    { id: 'safe', label: 'I\'m Safe', color: '#2ecc71' },
    { id: 'caution', label: 'Caution', color: '#f39c12' },
    { id: 'emergency', label: 'Emergency', color: '#e74c3c' },
  ];
  
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    
    // If emergency status is selected, show confirmation
    if (newStatus === 'emergency') {
      // In a real app, you would show a confirmation dialog here
      // and potentially trigger emergency protocols
    }
  };
  
  const handleUpdateStatus = () => {
    // In a real app, this would update the status on the server
    // and notify emergency contacts if necessary
    alert(`Status updated to: ${statusOptions.find(opt => opt.id === status).label}`);
  };
  
  const renderStatusButton = (option) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.statusButton,
        { backgroundColor: status === option.id ? option.color : '#f8f9fa' },
      ]}
      onPress={() => handleStatusChange(option.id)}
    >
      {status === option.id && (
        <Check color="#fff" size={20} style={styles.checkIcon} />
      )}
      <Text
        style={[
          styles.statusButtonText,
          { color: status === option.id ? '#fff' : '#2c3e50' },
        ]}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  );
  
  const intervalOptions = [15, 30, 60, 120];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Activity color="#e74c3c" size={24} />
        <Text style={styles.headerText}>Status Update</Text>
      </View>
      
      <View style={styles.statusContainer}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        <View style={styles.statusButtons}>
          {statusOptions.map(renderStatusButton)}
        </View>
        
        <View style={styles.customMessageContainer}>
          <Text style={styles.customMessageLabel}>Add a custom message (optional)</Text>
          <TextInput
            style={styles.customMessageInput}
            placeholder="E.g., Running late, will be there in 20 minutes"
            value={customMessage}
            onChangeText={setCustomMessage}
            multiline
          />
        </View>
        
        <TouchableOpacity 
          style={styles.updateButton}
          onPress={handleUpdateStatus}
        >
          <Text style={styles.updateButtonText}>Update Status</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.checkInSettings}>
        <Text style={styles.sectionTitle}>Check-in Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell color="#2c3e50" size={20} />
            <Text style={styles.settingText}>Automatic Check-in Reminders</Text>
          </View>
          <Switch
            value={autoCheckIn}
            onValueChange={setAutoCheckIn}
            trackColor={{ false: '#ecf0f1', true: '#e74c3c' }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : autoCheckIn ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        {autoCheckIn && (
          <View style={styles.intervalSelector}>
            <Text style={styles.intervalLabel}>
              <Clock color="#2c3e50" size={16} /> Reminder Interval
            </Text>
            
            <View style={styles.intervalButtons}>
              {intervalOptions.map(mins => (
                <TouchableOpacity 
                  key={mins}
                  style={[
                    styles.intervalButton,
                    checkInInterval === mins && styles.activeIntervalButton
                  ]}
                  onPress={() => setCheckInInterval(mins)}
                >
                  <Text 
                    style={[
                      styles.intervalButtonText,
                      checkInInterval === mins && styles.activeIntervalText
                    ]}
                  >
                    {mins} min
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MessageSquare color="#2c3e50" size={20} />
            <Text style={styles.settingText}>Notify Emergency Contacts</Text>
          </View>
          <Switch
            value={notifyContacts}
            onValueChange={setNotifyContacts}
            trackColor={{ false: '#ecf0f1', true: '#e74c3c' }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : notifyContacts ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.statusHistory}>
        <Text style={styles.sectionTitle}>Status History</Text>
        
        <View style={styles.historyItem}>
          <View style={[styles.statusIndicator, { backgroundColor: '#2ecc71' }]} />
          <View style={styles.historyInfo}>
            <Text style={styles.historyStatus}>Safe</Text>
            <Text style={styles.historyTime}>Today, 2:30 PM</Text>
            <Text style={styles.historyMessage}>Arrived at the office</Text>
          </View>
        </View>
        
        <View style={styles.historyItem}>
          <View style={[styles.statusIndicator, { backgroundColor: '#f39c12' }]} />
          <View style={styles.historyInfo}>
            <Text style={styles.historyStatus}>Caution</Text>
            <Text style={styles.historyTime}>Today, 12:15 PM</Text>
            <Text style={styles.historyMessage}>Taking an unfamiliar route</Text>
          </View>
        </View>
        
        <View style={styles.historyItem}>
          <View style={[styles.statusIndicator, { backgroundColor: '#2ecc71' }]} />
          <View style={styles.historyInfo}>
            <Text style={styles.historyStatus}>Safe</Text>
            <Text style={styles.historyTime}>Yesterday, 8:45 PM</Text>
            <Text style={styles.historyMessage}>Reached home</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.safetyTips}>
        <View style={styles.tipHeader}>
          <Shield color="#e74c3c" size={24} />
          <Text style={styles.tipHeaderText}>Safety Tip</Text>
        </View>
        <Text style={styles.tipText}>
          Regular status updates help your emergency contacts know you're safe. 
          Set up automatic check-ins for longer journeys or when visiting unfamiliar places.
        </Text>
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
  statusContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
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
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  checkIcon: {
    marginRight: 5,
  },
  statusButtonText: {
    fontWeight: 'bold',
  },
  customMessageContainer: {
    marginBottom: 20,
  },
  customMessageLabel: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
  },
  customMessageInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkInSettings: {
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  intervalSelector: {
    marginBottom: 15,
  },
  intervalLabel: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  intervalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intervalButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  activeIntervalButton: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  intervalButtonText: {
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  activeIntervalText: {
    color: '#fff',
  },
  statusHistory: {
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
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 5,
    marginRight: 15,
  },
  historyInfo: {
    flex: 1,
  },
  historyStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  historyTime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  historyMessage: {
    fontSize: 14,
    color: '#2c3e50',
  },
  safetyTips: {
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
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#e74c3c',
  },
  tipText: {
    color: '#2c3e50',
    lineHeight: 20,
  },
});