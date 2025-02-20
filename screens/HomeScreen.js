import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Përdorim ikona nga Expo
import { ThemeContext } from './ThemeContext'; // Importo ThemeContext

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext); // Merr gjendjen e temës

  // Stilet e kushtëzuara bazuar në temën
  const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const textStyle = isDarkMode ? styles.darkText : styles.lightText;
  const inputStyle = isDarkMode ? styles.darkInput : styles.lightInput;
  const buttonStyle = isDarkMode ? styles.darkButton : styles.lightButton;
  const socialButtonStyle = isDarkMode ? styles.darkSocialButton : styles.lightSocialButton;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Butoni Hamburger Menu në anën e majtë lart */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color={isDarkMode ? '#fff' : '#333'} />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../assets/logo.png')} // Përdorni rrugën e saktë për logo
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={[styles.welcomeText, textStyle]}>Welcome to Women Safety App</Text>

      {/* Login Container */}
      <View style={styles.loginContainer}>
        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, textStyle]}>Phone Number</Text>
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder="Enter your phone number"
            placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
            keyboardType="phone-pad"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, textStyle]}>Password</Text>
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder="Enter your password"
            placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
            secureTextEntry={true}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={[styles.button, buttonStyle]}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={[styles.button, styles.signUpButton, buttonStyle]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Social Login Options */}
        <Text style={[styles.orText, textStyle]}>Or continue with</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={[styles.socialButton, socialButtonStyle]}>
            <Text style={[styles.socialButtonText, textStyle]}>Gmail</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, socialButtonStyle]}>
            <Text style={[styles.socialButtonText, textStyle]}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, socialButtonStyle]}>
            <Text style={[styles.socialButtonText, textStyle]}>iCloud</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fff', // Sfondi në Light Mode
  },
  darkContainer: {
    backgroundColor: '#333', // Sfondi në Dark Mode
  },
  menuButton: {
    position: 'absolute', // Pozicion absolut për të vendosur butonin në cep
    top: 40, // Lartësia nga maja
    left: 20, // Distanca nga e majta
    zIndex: 1, // Siguro që butoni të jetë mbi përmbajtjen
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  lightText: {
    color: '#333', // Teksti në Light Mode
  },
  darkText: {
    color: '#fff', // Teksti në Dark Mode
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  lightInput: {
    borderColor: '#ccc', // Kufiri i inputit në Light Mode
    backgroundColor: '#fff', // Sfondi i inputit në Light Mode
    color: '#333', // Teksti i inputit në Light Mode
  },
  darkInput: {
    borderColor: '#555', // Kufiri i inputit në Dark Mode
    backgroundColor: '#444', // Sfondi i inputit në Dark Mode
    color: '#fff', // Teksti i inputit në Dark Mode
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  lightButton: {
    backgroundColor: '#ff69b4', // Butoni në Light Mode
  },
  darkButton: {
    backgroundColor: '#555', // Butoni në Dark Mode
  },
  signUpButton: {
    backgroundColor: '#ff1493', // Ngjyra më e errët rozë për butonin e regjistrimit
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  lightSocialButton: {
    backgroundColor: '#e0e0e0', // Butonat sociale në Light Mode
  },
  darkSocialButton: {
    backgroundColor: '#555', // Butonat sociale në Dark Mode
  },
  socialButtonText: {
    fontSize: 14,
  },
});

export default HomeScreen;