import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const AppointmentDashboard = () => {
  const [tokens, setTokens] = useState([]);
  const navigation = useNavigation(); 

  const fetchTokens = async () => {
    try {
      const response = await fetch('http://192.168.31.145:7002/v1/appointments/tokens');
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

  const handleTokenPress = (token) => {
    navigation.navigate('../Home', { token });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/Logo1.png')} style={styles.logo} />
        <Text style={styles.headerText}>Appointment Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {tokens.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tokenBox}
              onPress={() => handleTokenPress(item.tokens)}
            >
              <Text style={styles.tokenText}>{item.tokens}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppointmentDashboard;

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#FF4545",
    width: width,
    position: "absolute",
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 60,
    marginTop: 40,
    marginLeft: 300,
  },
  headerText: {
    fontSize: 30,
    marginTop: 10,
    color: "white",
    textAlign: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    elevation: 5,
  },
  tokenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
