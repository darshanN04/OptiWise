import { ScrollView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router'; // Import Link from expo-router

const { width } = Dimensions.get('window');

const AppointmentDashboard = () => {
  const [tokens, setTokens] = useState([]);

  const fetchTokens = async () => {
    try {
      const response = await fetch('http://10.52.4.152:7002/v1/appointments/tokens');
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
  );
};

export default AppointmentDashboard;

const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    backgroundColor: "#FF4545",
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
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    color: 'white',
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
  },
  tokenBox: {
    width: width * 0.20,
    height: width * 0.20,
    backgroundColor: '#FFCCCB',
    paddingLeft: 10,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    elevation: 5,
  },
  tokenText: {
    fontSize: 24,
    fontWeight: 'bold',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
