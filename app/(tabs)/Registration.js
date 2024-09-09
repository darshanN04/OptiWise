import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {Link} from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import "../../assets/images/Logo.png";
import cal from "../../assets/icons/calender.png"

const { width } = Dimensions.get('window'); // Get the screen width

const patientReg = () => {
  const [details, setDetails] = useState({
    p_name: "",
    p_gender: "",
    p_dob: "",
    p_fathername: "",
    p_phoneno: "",
    p_aadhaar: "",
    p_occupation: "",
    p_address: "",
    p_emergencyname: "",
    p_emergencyphno: "",
    p_emergencyrlsp: ""
  });


  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDetails({ ...details, p_dob: currentDate.toLocaleDateString() });
  };

  // Show the date picker
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };
  return (
    <View style={{ flex: 1 }}>

      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <View>
          <Image source={require('../../assets/images/Logo.png')} style={{ width: 70, height: 60, marginTop: 40, marginLeft: 300, marginBottom: 0 }} />
          <Text style={{ fontSize: 30, alignSelf: 'center', marginTop: 10, color: "white" }}>Patient Registration</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 200, zIndex: 4, paddingLeft: 20, gap: 30 }}>
          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Personal Information :</Text>

          {/* Full Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Full Name: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder=""
                value={details.p_name}
                onChangeText={(e) => setDetails({ ...details, p_name: e })}
              />
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 16 }}>Date of Birth: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Select Date"
                value={details.p_dob} // Show selected date
                onFocus={showDatePickerHandler} // Show date picker when focused
              />
              {/* Touchable Image */}
              <TouchableOpacity onPress={showDatePickerHandler}>
                <Image source={cal} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
            </View>

            {/* DateTimePicker */}
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                maximumDate={new Date()} // Ensure future dates can't be selected
              />
            )}
          </View>

          {/* Father's Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Father's Name: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder=""
                value={details.p_fathername}
                onChangeText={(e) => setDetails({ ...details, p_fathername: e })}
              />
            </View>
          </View>

          {/* Phone Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Phone Number: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder=""
                keyboardType="numeric"
                value={details.p_phoneno}
                onChangeText={(e) => setDetails({ ...details, p_phoneno: e })}
              />
            </View>
          </View>

          {/* Aadhaar Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Aadhaar Number: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter"
                keyboardType="numeric"
                value={details.p_aadhaar}
                onChangeText={(e) => setDetails({ ...details, p_aadhaar: e })}
              />
            </View>
          </View>

          {/* Occupation */}
          <View>
            <Text style={{ fontSize: 16 }}>Occupation: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter"
                value={details.p_occupation}
                onChangeText={(e) => setDetails({ ...details, p_occupation: e })}
              />
            </View>
          </View>

          {/* Address */}
          <View>
            <Text style={{ fontSize: 16 }}>Address: </Text>
            <View style={styles.addcontainer}>
              <TextInput
                style={styles.inputField1}
                placeholder="Enter"
                value={details.p_address}
                onChangeText={(e) => setDetails({ ...details, p_address: e })}
              />
            </View>
          </View>
          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Additional Information :</Text>
          {/* Emergency Contact Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Emergency Contact Name: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter"
                value={details.p_emergencyname}
                onChangeText={(e) => setDetails({ ...details, p_emergencyname: e })}
              />
            </View>
          </View>

          {/* Emergency Contact Phone Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Emergency Phone Number: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter"
                keyboardType="numeric"
                value={details.p_emergencyphno}
                onChangeText={(e) => setDetails({ ...details, p_emergencyphno: e })}
              />
            </View>
          </View>

          {/* Emergency Relationship */}
          <View>
            <Text style={{ fontSize: 16 }}>Relationship with Emergency Contact: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter"
                value={details.p_emergencyrlsp}
                onChangeText={(e) => setDetails({ ...details, p_emergencyrlsp: e })}
              />
            </View>
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

export default patientReg;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    maxHeight: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 15
  },
  addcontainer: {
    width: 300,
    height: 100,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 15,
    padding: 10
  },
  inputField: {
    fontSize: 18,
    flex: 1,
    flexDirection: "row",
  },
  inputField1:{
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    color: 'white',
    flex: 1,
    alignItems: "center",
    textAlign: 'center',
    justifyContent: "center",
    borderRadius: 50,
    margin: 40,
    width: 200,
    height: 60,
    marginBottom: 100,
    fontSize: 18
  },
});
