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
      {/* Logo centered above the text */}
      <View style={styles.container}>
        <Image source={require('../assets/images/Logo1.png')} style={styles.logo} />

        {/* <Text style={styles.title}>Welcome to</Text> */}
        <Text style={styles.title}>OptiwisE</Text>

        {/* Button moved towards the bottom */}
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
    marginTop: -30, // Slightly reduce the top margin
  },
  logo: {
    width: 200, // Increased width
    height: 180, // Increased height
    marginBottom: 30, // Add space between the logo and the text
  },
  title: {
    fontSize: 40, // Increased font size
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30, // Move the button towards the bottom of the screen
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 80,
    margin: 10,
    width: 65, // Slightly larger button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center', // Center the icon in the button
  },
  icon: {
    // No additional styles needed for the icon
  },
});
