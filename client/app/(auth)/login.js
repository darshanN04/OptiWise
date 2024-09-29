import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import FormField from '../../constants/FormField.js';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();  // Keep the splash screen visible

export default function Login({ navigation }) { 
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [fontsLoaded, setFontsLoaded] = useState(true); 

  // Hide the splash screen immediately
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const logIn = async (email, password) => {
    try {
      const response = await fetch('http://192.168.0.170:7002/v1/doctor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Login Success', 'You are now logged in!');
        router.push('../(tabs)/Registration'); 
      } else {
        Alert.alert('Login Error', result.error); 
      }
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Login Error', error.message);
    }
  };

  // Show a loading indicator while fonts are loading (not needed here, but keeping for structure)
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#BB8CF9" />;
  }

  return (
    <LinearGradient
      colors={['#BB8CF9', '#58008E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.login}>Login</Text>

        <FormField
          placeholder="Enter Email"
          value={form.email}
          border_c={"#ddd"}
          handleChangeText={(e) => setForm({ ...form, email: e })}
        />

        <FormField
          placeholder="Enter Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => logIn(form.email, form.password)} 
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </View>
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
    paddingBottom: 50,
  },
  login: {
    fontSize: 30,
    marginBottom: 40,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    margin: 10,
    width: 120,
    marginTop: 50,
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
});
