import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {Link} from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import "../../assets/images/Logo.png";
import cal from "../../assets/icons/calender.png"


const { width } = Dimensions.get('window'); // Get the screen width

const patientform = () => {
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
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Patient Registration</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 200, zIndex: 4, paddingLeft: 20, gap: 30 }}>
          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Personal Information :</Text>

          {/* Full Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Full Name: </Text>
            <View style={styles.inputContainer}>
                <Text>fetched</Text>
              {/* <TextInput
                style={styles.inputField}
                placeholder=""
                value={details.p_name}
                onChangeText={(e) => setDetails({ ...details, p_name: e })}
              /> */}
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 16 }}>Date of Birth: </Text>
            <View style={styles.inputContainer}>
                <Text>fetched</Text>
              {/* <TextInput
                style={styles.inputField}
                placeholder="Select Date"
                value={details.p_dob} // Show selected date
                onFocus={showDatePickerHandler} // Show date picker when focused
              /> */}
              {/* Touchable Image */}
              
            </View>

            
          </View>

          {/* Father's Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Father's Name: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>
              {/* <TextInput
                style={styles.inputField}
                placeholder=""
                value={details.p_fathername}
                onChangeText={(e) => setDetails({ ...details, p_fathername: e })}
              /> */}
            </View>
          </View>

          {/* Gender */}
          <View>
            <Text style={{ fontSize: 16 }}>Gender: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField}
                placeholder=""
                value={details.p_gender}
                onChangeText={(e) => setDetails({ ...details, p_gender: e })}
              /> */}
            </View>
          </View>

          {/* Phone Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Phone Number: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField}
                placeholder=""
                keyboardType="numeric"
                value={details.p_phoneno}
                onChangeText={(e) => setDetails({ ...details, p_phoneno: e })}
              /> */}
            </View>
          </View>

          {/* Aadhaar Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Aadhaar Number: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField}
                placeholder="Enter"
                keyboardType="numeric"
                value={details.p_aadhaar}
                onChangeText={(e) => setDetails({ ...details, p_aadhaar: e })}
              /> */}
            </View>
          </View>

          {/* Occupation */}
          <View>
            <Text style={{ fontSize: 16 }}>Occupation: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField}
                placeholder="Enter"
                value={details.p_occupation}
                onChangeText={(e) => setDetails({ ...details, p_occupation: e })}
              /> */}
            </View>
          </View>

          {/* Address */}
          <View>
            <Text style={{ fontSize: 16 }}>Address: </Text>
            <View style={styles.addcontainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField1}
                placeholder="Enter"
                value={details.p_address}
                onChangeText={(e) => setDetails({ ...details, p_address: e })}
              /> */}
            </View>
          </View>

          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Medical History :</Text>
          <Text>Existing Medical Conditions</Text>
          <Text>Fetched</Text>
          <Text>Medications</Text>
          <Text>fetched</Text>
          <Text>Allergies</Text>
          <Text>fetched</Text>
          <View style={{flexDirection: 'row',justifyContent: 'center',width: '100%',marginBottom: 40}}>
              <Link href="../(patientdetails)/medicalhistory" style={{padding: 10,
        backgroundColor: '#007bff',
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        margin: 10,
        width: 200,
        marginTop: 20,
        fontSize: 15}}>
                <Text>Medical History</Text>
              </Link>
          </View>


        

          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Additional Information :</Text>
          {/* Emergency Contact Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Emergency Contact Name: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField}
                placeholder="Enter"
                value={details.p_emergencyname}
                onChangeText={(e) => setDetails({ ...details, p_emergencyname: e })}
              /> */}
            </View>
          </View>

          {/* Emergency Contact Phone Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Emergency Phone Number: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField}
                placeholder="Enter"
                keyboardType="numeric"
                value={details.p_emergencyphno}
                onChangeText={(e) => setDetails({ ...details, p_emergencyphno: e })}
              /> */}
            </View>
          </View>

          {/* Emergency Relationship */}
          <View>
            <Text style={{ fontSize: 16 }}>Relationship with Emergency Contact: </Text>
            <View style={styles.inputContainer}>
            <Text>fetched</Text>

              {/* <TextInput
                style={styles.inputField}
                placeholder="Enter"
                value={details.p_emergencyrlsp}
                onChangeText={(e) => setDetails({ ...details, p_emergencyrlsp: e })}
              /> */}
            </View>
          </View>

          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Prescription History :</Text>
          <View style={styles.buttonContainer}>
              <Link href="../(patientdetails)/prescriptionhistory" style={{padding: 10,
                                                                            backgroundColor: '#007bff',
                                                                            color: 'white',
                                                                            textAlign: 'center',
                                                                            borderRadius: 5,
                                                                            margin: 10,
                                                                            width: 250,
                                                                            marginTop: 20,
                                                                            fontSize: 15}}>
                <Text>View Prescription History</Text>
              </Link>
          </View>

          <View style={styles.buttonContainer}>
              <Link href="../(auth)/login" style={styles.button}>
                <Text>Submit</Text>
              </Link>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default patientform

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