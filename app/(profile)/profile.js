import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import "../../assets/images/Logo.png";
import { Link } from 'expo-router';




const { width } = Dimensions.get('window'); // Get the screen width

const AppointmentDashboard = () => {
  return (
    <View style={{ flex: 1 }}>

      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
<<<<<<<< HEAD:app/(tabs)/Appointment Dashboard.js
        <View>
          <Image source={require('../../assets/images/Logo.png')} style={{ width: 70, height: 60, marginTop: 40, marginLeft: 300, marginBottom: 0 }} />
          <Text style={{ fontSize: 30, alignSelf: 'center', marginTop: 10, color: "white" }}>Appointment Dashboard</Text>
========
        <Link href="../(profile)/profile" style={{height: 100, left: width*0.05, top: 25}}>
          <Image 
            source={require('../../assets/images/Logo.png')} 
            style={{ width: 60, height: 50 }} 
          />
        </Link>
        <View style={{ flex: 1}}>
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Profile</Text>
>>>>>>>> f89166e701e9e808aef183bc61d933d8e2d133ef:app/(profile)/profile.js
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
      </ScrollView>
    </View>
  )
}

export default AppointmentDashboard

const styles = StyleSheet.create({})