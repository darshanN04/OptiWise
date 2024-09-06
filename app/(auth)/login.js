import { View, Text, StyleSheet } from 'react-native';
import FormField from '../../components/FormField.js';
export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>
      <FormField 
        title="Email"
        placeholder="Enter Email"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});