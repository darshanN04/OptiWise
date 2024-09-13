import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import FormField from '../../constants/FormField.js';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../sb/spClient.js';
import { router } from 'expo-router'

export default function Login({ navigation }) { 
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

    const logIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;}
        Alert.alert('Login Success', 'You are now logged in!');
        router.push('../(tabs)/Registration')
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Login Error', error.message);
    }
  };

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
          border_c={"red"}
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
    paddingBottom: 50
  },
  login: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    margin: 10,
    width: 100,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
});
