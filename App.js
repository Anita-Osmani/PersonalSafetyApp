import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from './screens/ThemeContext'; // Importo ThemeProvider

import HomeScreen from './screens/HomeScreen';
import EmergencyContactsScreen from './screens/EmergencyContactsScreen';
import SOSScreen from './screens/SOSScreen';
import StatusScreen from './screens/StatusScreen';
import SmartTrackingScreen from './screens/SmartTrackingScreen';
import DrawerContent from './screens/DrawerContent'; // Importo DrawerContent

// Krijo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Emergency Contacts') {
            iconName = 'heart-outline';
          } else if (route.name === 'SOS') {
            iconName = 'alert-circle-outline';
          } else if (route.name === 'Status') {
            iconName = 'checkmark-circle-outline';
          } else if (route.name === 'Smart Tracking') {
            iconName = 'location-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'pink',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: { backgroundColor: 'white' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Emergency Contacts" component={EmergencyContactsScreen} />
      <Tab.Screen name="SOS" component={SOSScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Smart Tracking" component={SmartTrackingScreen} />
    </Tab.Navigator>
  );
};

// Krijo Drawer Navigator
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />} // Përdor DrawerContent si menynë anësore
          screenOptions={{
            headerShown: false, // Fsheh header-in e parazgjedhur
          }}
        >
          <Drawer.Screen name="Main" component={TabNavigator} /> {/* Përdor TabNavigator brenda Drawer */}
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;