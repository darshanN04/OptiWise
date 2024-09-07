import { View, Text, StyleSheet } from 'react-native';
import FormField from '../../components/FormField.js';
import { useState } from 'react';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

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
        />

        <View style={styles.buttonContainer}>
          <Link href="../(tabs)/Registration" style={styles.button}>
            <Text>Submit</Text>
          </Link>
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
    color: 'white',
    textAlign: 'center',
    borderRadius: 5,
    margin: 10,
    width: 100,
    marginTop: 50,
    fontSize: 15
  },
});