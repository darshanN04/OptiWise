import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL, PORT } from '@env';

const { width } = Dimensions.get('window');

const Profile = ({ doctor }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [email, setEmail] = useState(''); // Added state variable for email

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const storedEmail = await AsyncStorage.getItem('doctorEmail');
        setAccessToken(token);
        setEmail(storedEmail);
        // Removed console.warn statements
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    };
    getAccessToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}:${PORT}/v1/doctor/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setModalVisible(true);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('doctorEmail');
        setTimeout(() => {
          navigation.navigate('login');
        }, 2000);
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.error || 'Logout failed'));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{doctor?.name}</Text>

          <Text style={styles.label}>Doctor ID</Text>
          <Text style={styles.value}>{doctor?.doctor_id}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{doctor?.role}</Text>

          <Text style={styles.label}>Email</Text>
<Text style={styles.value}>{email}</Text>
{/* Displaying stored email */}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.passwordButton]}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Logged Out Successfully</Text>
            <Text style={styles.modalMessage}>You have been logged out of your account.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: '#FF4545',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  logo: {
    width: 70,
    height: 60,
    position: 'absolute',
    top: 40,
    right: 20,
  },
  headerTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 230,
    paddingHorizontal: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3333',
  },
  passwordButton: {
    backgroundColor: '#007bff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
