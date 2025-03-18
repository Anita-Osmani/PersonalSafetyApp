import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Krijo kontekstin për temën
const ThemeContext = createContext();

// Tema Light dhe Dark
const lightTheme = {
  background: '#f5f6fa',
  text: '#2c3e50',
  textSecondary: '#95a5a6', // Ngjyra e tekstit sekondar
  headerBackground: '#fff',
  headerText: '#2c3e50',
  tabBarBackground: '#fff', // Ngjyra e sfondit të tab bar
  borderColor: '#ecf0f1', // Ngjyra e kufirit
  inputBackground: '#f8f9fa',
  inputBorder: '#ecf0f1',
  buttonBackground: '#e74c3c',
  buttonText: '#fff',
  contactBackground: '#fff',
  contactShadow: '#000',
  primaryColor: '#e74c3c', // Ngjyra primare
  secondaryColor: '#3498db', // Ngjyra sekondare
};

const darkTheme = {
  background: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#7f8c8d', // Ngjyra e tekstit sekondar
  headerBackground: '#2c3e50',
  headerText: '#ffffff',
  tabBarBackground: '#2c3e50', // Ngjyra e sfondit të tab bar
  borderColor: '#444444', // Ngjyra e kufirit
  inputBackground: '#333333',
  inputBorder: '#444444',
  buttonBackground: '#e74c3c',
  buttonText: '#ffffff',
  contactBackground: '#333333',
  contactShadow: '#000',
  primaryColor: '#e74c3c', // Ngjyra primare
  secondaryColor: '#3498db', // Ngjyra sekondare
};

// Krijo një provider për temën
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Ngarko preferencën e temës kur aplikacioni hapet
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      }
    };
    loadTheme();
  }, []);

  // Ruaj preferencën e temës kur ndryshohet
  useEffect(() => {
    AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Funksioni për të ndryshuar temën
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Vlerat e temës (Light dhe Dark)
  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? darkTheme : lightTheme, // Përdor temën e duhur
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Krijo një hook për të përdorur temën
export const useTheme = () => useContext(ThemeContext);