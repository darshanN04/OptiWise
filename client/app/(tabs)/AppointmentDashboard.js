import { ScrollView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router'; // Import Link from expo-router

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const AppointmentDashboard = () => {
  const [tokens, setTokens] = useState([]);

  const fetchTokens = async () => {
    try {
      const response = await fetch('http://192.168.0.170:7002/v1/appointments/tokens');
      const data = await response.json();
      setTokens(data.tokens); 
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#0ACDD6']}
      locations={[0.10, 1]}
      style={styles.container}
    >
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Link href="../(profile)/profile" style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo1.png")}
            style={styles.logo}
          />
        </Link>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Appointment Dashboard</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {tokens.map((item, index) => (
            <Link
              key={index}
              href={`../prescription?token=${item.tokens}`} // Set href to navigate to prescription page with token
              style={styles.tokenBox}
            >
              <Text style={styles.tokenText}>{item.tokens}</Text>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
    </LinearGradient>
  );
};

export default AppointmentDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 150,
    backgroundColor: "transparent",
    width: width,
    position: "absolute",
    zIndex: 10,
  },
  logoContainer: {
    height: 100,
    left: width * 0.05,
    top: 25,
  },
  logo: {
    width: 70,
    height: 60,
    position: 'absolute',
    top: 50,
    left: 20,
  },
  headerText: {
    fontSize: 25,
    color: "#450F81",
    alignSelf: "center",
    fontWeight: 'bold',
    marginTop: 20
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 220,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Aligns items to the left
    padding: 10,
    height: 1000
  },
  tokenBox: {
    width: (width -20) * 0.25 - 20,
    height: (width -20) * 0.25 - 20,
    backgroundColor: '#00E6FB',
    borderWidth: 0,
    shadowColor: 'transparent',
    // borderWidth: 0,
    // shadowColor: '#000',
    elevation: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  tokenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "black"
  },
});
