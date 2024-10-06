import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import "../../assets/images/Logo.png";
import { Link } from 'expo-router';




const { width } = Dimensions.get('window'); // Get the screen width

const appointment = () => {
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
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Profile</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
      </ScrollView>
    </View>
  )
}

export default appointment

const styles = StyleSheet.create({})