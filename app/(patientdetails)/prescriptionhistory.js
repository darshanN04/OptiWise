import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window'); // Get the screen width

const PrescriptionHistory = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <Link href="../(profile)/profile" style={{ height: 100, left: width * 0.05, top: 25 }}>
          <Image 
            source={require('../../assets/images/Logo.png')} 
            style={{ width: 60, height: 50 }} 
          />
        </Link>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Prescription History</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} 
        style={{ paddingTop: 200, width: width }}
      >
        {/* Patient Information */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text>Patient No.</Text>
          <Text>fetched</Text>
          <Text>Patient Name</Text>
          <Text>fetched</Text>
        </View>
        
      </ScrollView>
    </View>
  );
};

export default PrescriptionHistory;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
    borderRadius: 5,
    margin: 10,
    width: 100,
    marginTop: 20,
    fontSize: 15
  },
});
