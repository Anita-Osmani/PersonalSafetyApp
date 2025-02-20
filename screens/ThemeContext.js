import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Krijo kontekstin për temën
export const ThemeContext = createContext();

// Krijo një provider për temën
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Ngarko gjendjen e temës nga AsyncStorage kur komponenti mountohet
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Gabim gjatë ngarkimit të temës:', error);
      }
    };

    loadTheme();
  }, []);

  // Ruaj gjendjen e temës në AsyncStorage kur ndryshohet
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.error('Gabim gjatë ruajtjes së temës:', error);
      }
    };

    saveTheme();
  }, [isDarkMode]);

  // Funksioni për të ndryshuar temën
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
