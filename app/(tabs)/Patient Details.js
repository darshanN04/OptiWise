import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import "../../assets/images/Logo.png";



const { width } = Dimensions.get('window'); // Get the screen width

const PatientDetails = () => {
  return (
    <View style={{ flex: 1 }}>

      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <Link href="../(profile)/profile" style={{height: 100, left: width*0.05, top: 25}}>
          <Image 
            source={require('../../assets/images/Logo.png')} 
            style={{ width: 60, height: 50 }} 
          />
        </Link>
        <View style={{ flex: 1}}>
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Patient Details</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
          <Text>
            Search Patient
          </Text>
          <View style={styles.buttonContainer}>
            <Link href="../(patientdetails)/patientform" style={styles.button}>
              <Text>Search</Text>
            </Link>
            <Link href="" style={styles.button}>
              <Text>Go back</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default PatientDetails

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
})