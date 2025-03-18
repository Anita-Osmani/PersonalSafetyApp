import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Phone, Plus, Trash2, CreditCard as Edit2, User } from 'lucide-react-native';
import { useTheme } from '../ThemeContext'; // Importo useTheme nga ThemeContext

export default function EmergencyContact() {
  const { colors } = useTheme(); // Merr ngjyrat nga tema

  const [contacts, setContacts] = useState([
    { id: '1', name: 'Emergency Services', phone: '911', isPrimary: true },
    { id: '2', name: 'John Doe', phone: '555-123-4567', isPrimary: false },
    { id: '3', name: 'Jane Smith', phone: '555-987-6543', isPrimary: false },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addContact = () => {
    if (newName.trim() === '' || newPhone.trim() === '') {
      Alert.alert('Error', 'Please enter both name and phone number');
      return;
    }

    if (editingId) {
      // Update existing contact
      setContacts(
        contacts.map((contact) =>
          contact.id === editingId
            ? { ...contact, name: newName, phone: newPhone }
            : contact
        )
      );
      setEditingId(null);
    } else {
      // Add new contact
      const newContact = {
        id: Date.now().toString(),
        name: newName,
        phone: newPhone,
        isPrimary: false,
      };
      setContacts([...contacts, newContact]);
    }

    setNewName('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const deleteContact = (id) => {
    const contactToDelete = contacts.find((c) => c.id === id);
    if (contactToDelete.isPrimary) {
      Alert.alert('Cannot Delete', 'You cannot delete your primary emergency contact');
      return;
    }

    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts(contacts.filter((contact) => contact.id !== id));
          },
        },
      ]
    );
  };

  const editContact = (contact) => {
    setNewName(contact.name);
    setNewPhone(contact.phone);
    setEditingId(contact.id);
    setShowAddForm(true);
  };

  const setPrimaryContact = (id) => {
    setContacts(
      contacts.map((contact) => ({
        ...contact,
        isPrimary: contact.id === id,
      }))
    );
  };

  const renderContactItem = ({ item }) => (
    <View style={[styles.contactItem, { backgroundColor: colors.contactBackground }]}>
      <View style={styles.contactInfo}>
        <View style={[styles.contactIcon, item.isPrimary && styles.primaryContactIcon]}>
          <User color={item.isPrimary ? '#fff' : colors.primaryColor} size={20} />
        </View>
        <View>
          <Text style={[styles.contactName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.contactPhone, { color: colors.textSecondary }]}>{item.phone}</Text>
          {item.isPrimary && <Text style={[styles.primaryLabel, { color: colors.primaryColor }]}>Primary Contact</Text>}
        </View>
      </View>

      <View style={styles.contactActions}>
        {!item.isPrimary && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setPrimaryContact(item.id)}
          >
            <Text style={[styles.setAsPrimaryText, { color: colors.secondaryColor }]}>Set as Primary</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => editContact(item)}
        >
          <Edit2 color={colors.secondaryColor} size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => deleteContact(item.id)}
        >
          <Trash2 color={colors.primaryColor} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <Phone color={colors.primaryColor} size={24} />
          <Text style={[styles.headerText, { color: colors.headerText }]}>Emergency Contacts</Text>
        </View>

        <Text style={[styles.description, { color: colors.textSecondary, backgroundColor: colors.headerBackground }]}>
          Add contacts who should be notified in case of emergency. Your primary contact will be called first.
        </Text>

        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contactsList}
        />

        {showAddForm ? (
          <View style={[styles.addForm, { backgroundColor: colors.contactBackground }]}>
            <Text style={[styles.formTitle, { color: colors.text }]}>{editingId ? 'Edit Contact' : 'Add New Contact'}</Text>

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.inputBorder }]}
              placeholder="Contact Name"
              placeholderTextColor={colors.textSecondary}
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.inputBorder }]}
              placeholder="Phone Number"
              placeholderTextColor={colors.textSecondary}
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
            />

            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton, { backgroundColor: colors.buttonBackground }]}
                onPress={() => {
                  setShowAddForm(false);
                  setNewName('');
                  setNewPhone('');
                  setEditingId(null);
                }}
              >
                <Text style={[styles.cancelButtonText, { color: colors.buttonText }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton, { backgroundColor: colors.primaryColor }]}
                onPress={addContact}
              >
                <Text style={[styles.saveButtonText, { color: colors.buttonText }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primaryColor }]}
            onPress={() => setShowAddForm(true)}
          >
            <Plus color="#fff" size={24} />
            <Text style={[styles.addButtonText, { color: colors.buttonText }]}>Add New Contact</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  contactsList: {
    paddingHorizontal: 15,
  },
  contactItem: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderWidth: 1,
  },
  primaryContactIcon: {
    backgroundColor: '#e74c3c',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 16,
  },
  primaryLabel: {
    fontWeight: 'bold',
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 10,
  },
  setAsPrimaryText: {
    fontWeight: 'bold',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 15,
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  addForm: {
    padding: 15,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cancelButton: {
    marginRight: 10,
  },
  saveButton: {},
  cancelButtonText: {
    fontWeight: 'bold',
  },
  saveButtonText: {
    fontWeight: 'bold',
  },
});