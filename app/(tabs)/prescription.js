import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import "../../assets/images/Logo.png";



const { width } = Dimensions.get('window'); // Get the screen width

const prescription = () => {
  return (
    <View style={{ flex: 1 }}>

      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <View>
          <Image source={require('../../assets/images/Logo.png')} style={{ width: 70, height: 60, marginTop: 40, marginLeft: 300, marginBottom: 0 }} />
          <Text style={{ fontSize: 30, alignSelf: 'center', marginTop: 10, color: "white" }}>Prescription</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
      </ScrollView>
    </View>
  )
}

export default prescription

const styles = StyleSheet.create({})