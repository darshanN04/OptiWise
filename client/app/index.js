import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
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
        <Text style={styles.title}>OptiWise</Text>

        <View style={styles.buttonContainer}>
          <Link href="./(auth)/login" style={styles.button}>
            <Ionicons name="arrow-forward-outline" size={30} color="white" style={styles.icon} />
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
    flexDirection: 'row', // Keep items in a row
    alignItems: 'center', // Center items vertically
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 80,
    margin: 10,
    width: 80,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center', // Center the icon in the button
  },
  icon: {
    // No additional styles needed for icon
  },
});
