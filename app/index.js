import { Link } from 'expo-router';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import "../assets/images/Logo.png";
export default function Home() {
  return (
    <LinearGradient
      colors={['#BB8CF9', '#58008E']}
      style={styles.gradient}
    >
      <Image source={require('../assets/images/Logo.png')} style={styles.logo} />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>OptiWise doctor</Text>

        <View style={styles.buttonContainer}>
          <Link href="./(auth)/login" style={styles.button}>
            <Text>Login</Text>
          </Link>
          
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 60,
    marginTop: 60,
    marginLeft: 30,
    marginBottom: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 34,
    marginBottom: 0,
    color: 'white',
    fontWeight: 'bold',
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