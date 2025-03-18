import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { IconName } from 'lucide-react-native';

import { Chrome as Home, MapPin, Phone, TriangleAlert as AlertTriangle, Activity } from 'lucide-react-native';

// Importo ThemeProvider dhe useTheme
import { ThemeProvider, useTheme } from './ThemeContext';

// Importo skenat nga folderi screens
import HomeScreen from './screens/homescreen';
import EmergencyContact from './screens/emergencycontact';
import SmartTracking from './screens/smarttracking';
import SOSScreen from './screens/sosscreen';
import StatusScreen from './screens/statusscreen';
import MapScreen from './screens/MapScreen'; // Importo MapScreen

const Tab = createBottomTabNavigator();

// Krijo një komponent për Tab.Navigator që përdor temën
const TabNavigator = () => {
  const { colors } = useTheme(); // Merr ngjyrat nga tema

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.headerText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Tracking" 
        component={SmartTracking} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MapPin color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="SOS" 
        component={SOSScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AlertTriangle color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={EmergencyContact} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Phone color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Status" 
        component={StatusScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Activity color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Komponenti kryesor i aplikacionit
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigator /> {/* Përdor TabNavigator në vend të View dhe Text */}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App; // Eksporto App si komponent kryesor