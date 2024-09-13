import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'; // Import axios

const { width } = Dimensions.get('window'); // Get the screen width

const patientReg = () => {
  const [details, setDetails] = useState({
    name: "",
    gender: "",
    dob: "",
    father_name: "",
    phone_no: "",
    aadhaar_no: "",
    occupation: "",
    email :"hi@gmail.com",
    photograph:"hihihh",
    address: "",
    emergency_name: "",
    emergency_phone: "",
    emergency_relation: ""
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDetails({ ...details, dob: currentDate.toLocaleDateString() });
  };

  // Show the date picker
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:7000/v1/patients/register', details 
        
      );
      console.log(details);
      
      if (response.status === 200) {
        alert('Patient Registered Successfully');
      } else {
        alert('Error registering patient.');
      }
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      alert('Error connecting to the server. Please try again.');
    }
  };

  const testConnection = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:7000/test');
      console.log(response.data);
      alert('Connection test successful');
    } catch (error) {
      console.error('Test connection error:', error.response || error.message);
      alert('Error connecting to the server.');
    }
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
                value={details.name}
                onChangeText={(e) => setDetails({ ...details, name: e })}
              />
            </View>
          </View>

          {/* Date of Birth */}
          <View>
            <Text style={{ fontSize: 16 }}>Date of Birth: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Select Date"
                value={details.dob} // Show selected date
                onFocus={showDatePickerHandler} // Show date picker when focused
              />
              {/* Touchable Image */}
              <TouchableOpacity onPress={showDatePickerHandler}>
                <Image source={require('../../assets/icons/calender.png')} style={{ height: 20, width: 20 }} />
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
                maximumDate={new Date()} 
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
                value={details.father_name}
                onChangeText={(e) => setDetails({ ...details, father_name: e })}
              />
            </View>
          </View>

          {/* Gender */}
          <View>
            <Text style={{ fontSize: 16 }}>Gender: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder=""
                value={details.gender}
                onChangeText={(e) => setDetails({ ...details, gender: e })}
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
                value={details.phone_no}
                onChangeText={(e) => setDetails({ ...details, phone_no: e })}
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
                value={details.aadhaar_no}
                onChangeText={(e) => setDetails({ ...details, aadhaar_no: e })}
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
                value={details.occupation}
                onChangeText={(e) => setDetails({ ...details, occupation: e })}
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
                value={details.address}
                onChangeText={(e) => setDetails({ ...details, address: e })}
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
                value={details.emergency_name}
                onChangeText={(e) => setDetails({ ...details, emergency_name: e })}
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
                value={details.emergency_phone}
                onChangeText={(e) => setDetails({ ...details, emergency_phone: e })}
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
                value={details.emergency_relation}
                onChangeText={(e) => setDetails({ ...details, emergency_relation: e })}
              />
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
          </View>

          {/* Test Connection Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={testConnection} style={styles.button}>
              <Text style={{ color: 'white', fontSize: 18 }}>Test Connection</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
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
