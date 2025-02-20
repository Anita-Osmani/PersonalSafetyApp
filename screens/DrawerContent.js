import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext'; // Importo useTheme

const DrawerContent = (props) => {
  const { isDarkMode, toggleTheme } = useTheme(); // Merr gjendjen e temës dhe funksionin për ta ndërruar

  // Stilet e kushtëzuara bazuar në temën
  const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const textStyle = isDarkMode ? styles.darkText : styles.lightText;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.menuTitle, textStyle]}>Menu</Text>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
        <Text style={textStyle}>
          Ndrysho në {isDarkMode ? 'Dritë' : 'Errësirë'}
        </Text>
      </TouchableOpacity>
      
      {/* Shtoni butona për ekranet tjera */}
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.menuButton}>
        <Text style={textStyle}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Emergency Contacts')} style={styles.menuButton}>
        <Text style={textStyle}>Emergency Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('SOS')} style={styles.menuButton}>
        <Text style={textStyle}>SOS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Status')} style={styles.menuButton}>
        <Text style={textStyle}>Status</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Smart Tracking')} style={styles.menuButton}>
        <Text style={textStyle}>Smart Tracking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column', // Ndryshoni në 'column' për të vendosur elementet në kolonë
  },
  lightContainer: {
    backgroundColor: '#fff', // Sfondi në Light Mode
  },
  darkContainer: {
    backgroundColor: '#333', // Sfondi në Dark Mode
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: '#000', // Teksti në Light Mode
  },
  darkText: {
    color: '#fff', // Teksti në Dark Mode
  },
  themeToggleButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff69b4', // Ngjyra e butonit
    alignItems: 'center',
    marginBottom: 10, // Shtoni distancë poshtë butonit të temës
  },
  menuButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#ff69b4', // Ngjyra e butonave të menu
    alignItems: 'center',
  },
});

export default DrawerContent;
