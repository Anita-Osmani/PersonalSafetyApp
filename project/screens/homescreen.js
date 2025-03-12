import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Shield, Bell, MapPin, Phone, TriangleAlert as AlertTriangle, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '../ThemeContext'; // Importo useTheme nga ThemeContext
import { home } from '@lucide/lab';

export default function HomeScreen({ navigation }) {
  const { colors, isDarkMode, toggleTheme } = useTheme(); // Merr ngjyrat dhe funksionin e ndërrimit të temës

  const safetyTips = [
    "Share your location with trusted contacts",
    "Keep emergency numbers on speed dial",
    "Stay in well-lit areas when walking at night",
    "Let someone know your travel plans",
    "Trust your instincts - if something feels wrong, it probably is"
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.borderColor }]}>
        <Shield color={colors.primaryColor} size={32} />
        <Text style={[styles.headerText, { color: colors.headerText }]}>Personal Safety</Text>
        
        {/* Butoni për ndërrimin e Dark Mode */}
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          {isDarkMode ? <Sun color={colors.text} size={24} /> : <Moon color={colors.text} size={24} />}
        </TouchableOpacity>
      </View>

      <View style={styles.heroContainer}>
        <Image 
          source={require('../assets/home.jpg')} 
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Stay Safe Anywhere</Text>
          <Text style={styles.heroSubtitle}>Your personal safety companion</Text>
        </View>
      </View>

      <View style={[styles.quickActions, { backgroundColor: colors.contactBackground, shadowColor: colors.contactShadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.buttonBackground }]} 
            onPress={() => navigation.navigate('SOS')}
          >
            <AlertTriangle color={colors.buttonText} size={24} />
            <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>SOS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.buttonBackground }]} 
            onPress={() => navigation.navigate('Tracking')}
          >
            <MapPin color={colors.buttonText} size={24} />
            <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>Track</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.buttonBackground }]} 
            onPress={() => navigation.navigate('Contacts')}
          >
            <Phone color={colors.buttonText} size={24} />
            <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.safetyTipsContainer, { backgroundColor: colors.contactBackground, shadowColor: colors.contactShadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Safety Tips</Text>
        {safetyTips.map((tip, index) => (
          <View key={index} style={[styles.tipItem, { borderBottomColor: colors.borderColor }]}>
            <Bell color={colors.primaryColor} size={20} />
            <Text style={[styles.tipText, { color: colors.text }]}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.statusCard, { backgroundColor: colors.secondaryColor }]}>
        <Text style={[styles.statusCardTitle, { color: colors.buttonText }]}>Your Safety Status</Text>
        <TouchableOpacity 
          style={[styles.statusButton, { backgroundColor: colors.buttonText }]}
          onPress={() => navigation.navigate('Status')}
        >
          <Text style={[styles.statusButtonText, { color: colors.secondaryColor }]}>Check Status</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 10,
  },
  heroContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
  },
  quickActions: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  actionButtonText: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  safetyTipsContainer: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 16,
  },
  statusCard: {
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  statusCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  statusButtonText: {
    fontWeight: 'bold',
  },
});
