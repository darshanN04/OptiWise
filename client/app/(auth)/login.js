import { View, Text, StyleSheet, Pressable, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, PORT } from '@env';


SplashScreen.preventAutoHideAsync();

export default function Login({ navigation }) { 
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  const logIn = async (email, password) => {
    console.log('logIn function called with:', email, password); // Debugging log

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setErrorModalVisible(true);
      router.push('../(tabs)/Registration');
      return;
    }
    
    try {
      const response = await fetch(`http://192.168.31.145:${PORT}/v1/doctor/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();


      if (response.ok) {
        console.log('Login successful'); 
        await AsyncStorage.setItem('accessToken', result.accessToken);
        await AsyncStorage.setItem('doctorEmail', result.email);

        setSuccessModalVisible(true); 
        setTimeout(() => {
          setSuccessModalVisible(false);
          router.push('../(tabs)/Registration');
        }, 2000); 
      } else {
        console.log('Login failed:', result.error); 
        setErrorMessage(result.error);
        setErrorModalVisible(true); 
      }
    } catch (error) {
      console.log('Error during login:', error.message); 
      setErrorMessage(error.message);
      setErrorModalVisible(true); 
    }
  };

  return (
    <LinearGradient
    colors={['#FFFFFF', '#7DF9FF']}
    start={[0.5, 0]}
    end={[0.5, 1]}
    locations={[0.268, 1]}
    style={styles.container}
  >
      <View style={styles.content}>
        <Text style={styles.welcomeBackText}>Welcome Back</Text>
        <Text style={styles.loginInstructionText}>Please login to your account</Text>

        <Text style={styles.label}>EMAIL</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={form.email}
            onChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            style={styles.inputField}
            placeholder="Enter your email"
            placeholderTextColor="gray"
          />
        </View>

        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={form.password}
            onChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            secureTextEntry={!showPassword}
            style={styles.inputField}
            placeholder="Enter your password"
            placeholderTextColor="gray"
          />
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword);
          }} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              logIn(form.email, form.password);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Login Successful!</Text>
            <Ionicons name="checkmark-circle" size={40} color="green" />
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Pressable
              onPress={() => setErrorModalVisible(false)} 
              style={styles.errorButton}
            >
              <Text style={styles.errorButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    paddingTop: 50,
  },
  welcomeBackText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto', 
    fontWeight: 'normal',
  },
  loginInstructionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  label: {
    alignSelf: 'flex-start',
    color: 'black',
    marginBottom: 5,
    marginLeft: '10%',
    fontFamily: 'Roboto',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    padding: 0,
    color: 'black', 
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 80,
    margin: 10,
    width: 150,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 21,
  },
  errorButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});