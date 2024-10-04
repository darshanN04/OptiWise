import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_URL, PORT } from '@env';
const { width } = Dimensions.get('window');

const patientReg = () => {
  const [details, setDetails] = useState({
    name: "",
    gender: "",
    dob: "",
    father_name: "",
    phone_no: "",
    aadhaar_no: "",
    occupation: "",
    email: "hi@gmail.com",
    photograph: "NULL",
    address: "",
    emergency_name: "",
    emergency_phone: "",
    emergency_relation: ""
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    father_name: "",
    gender: "",
    phone_no: "",
    aadhaar_no: "",
    address: "",
    emergency_name: "",
    emergency_phone: "",
    emergency_relation: ""
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDetails({ ...details, dob: currentDate.toLocaleDateString() });
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (details.name.length < 2) newErrors.name = "Full name must be at least 2 characters long.";
    if (details.father_name.length < 2) newErrors.father_name = "Father's name is required.";
    if (!details.gender) newErrors.gender = "Gender must be selected.";
    if (details.phone_no.length < 10) newErrors.phone_no = "Phone number must be at least 10 digits.";
    if (details.aadhaar_no.length < 12) newErrors.aadhaar_no = "Aadhaar number must be 12 digits.";
    if (details.address.length < 3) newErrors.address = "Address is required";
    if (details.emergency_name.length < 3) newErrors.emergency_name = "Emergency contact name is required";
    if (details.emergency_phone.length < 10) newErrors.emergency_phone = "Emergency phone number must be at least 10 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post(`http://192.168.0.170:${PORT}/v1/patients/register`, details);
        console.log(details);
        if (response.status === 200) {
          alert(`Patient Registered Successfully. Patient ID: ${response.data.patient_id}`);
        } else {
          alert('Failed to register patient. ' + response.data.message);
        }
      } catch (error) {
        console.error('Error details:', error.response ? error.response.data : error.message);
        alert('Error connecting to the server. Please try again.');
      }}

  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <View>
          <Image source={require('../../assets/images/Logo1.png')} style={{ width: 70, height: 60, marginTop: 40, marginLeft: 300, marginBottom: 0 }} />
          <Text style={{ fontSize: 30, alignSelf: 'center', marginTop: 10, color: "white" }}>Patient Registration</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 200, zIndex: 4, paddingLeft: 20, gap: 30 }}>
          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Personal Information :</Text>

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
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View>
            <Text style={{ fontSize: 16 }}>Date of Birth: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Select Date"
                value={details.dob}
                onFocus={showDatePickerHandler}
              />
              <TouchableOpacity onPress={showDatePickerHandler}>
                <Image source={require('../../assets/icons/calender.png')} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
            </View>
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
            {errors.father_name ? <Text style={styles.errorText}>{errors.father_name}</Text> : null}
          </View>

          <View>
            <Text style={{ fontSize: 16 }}>Gender: </Text>
            <View style={styles.inputContainer3}>
              <Picker
                selectedValue={details.gender}
                style={styles.inputField}
                onValueChange={(itemValue) => setDetails({ ...details, gender: itemValue })}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
          </View>

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
            {errors.phone_no ? <Text style={styles.errorText}>{errors.phone_no}</Text> : null}
          </View>

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
            {errors.aadhaar_no ? <Text style={styles.errorText}>{errors.aadhaar_no}</Text> : null}
          </View>

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

          <View>
            <Text style={{ fontSize: 16 }}>Address: </Text>
            <View style={styles.inputContainer1}>
              <TextInput
                style={styles.inputField1}
                placeholder="Enter"
                value={details.address}
                onChangeText={(e) => setDetails({ ...details, address: e })}
              />
            </View>
            {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
          </View>

          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Additional Information :</Text>

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
            {errors.emergency_name ? <Text style={styles.errorText}>{errors.emergency_name}</Text> : null}
          </View>

          <View>
            <Text style={{ fontSize: 16 }}>Emergency Contact Number: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter"
                keyboardType="numeric"
                value={details.emergency_phone}
                onChangeText={(e) => setDetails({ ...details, emergency_phone: e })}
              />
            </View>
            {errors.emergency_phone ? <Text style={styles.errorText}>{errors.emergency_phone}</Text> : null}
          </View>

          <View>
            <Text style={{ fontSize: 16 }}>Emergency Contact Relation: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter"
                value={details.emergency_relation}
                onChangeText={(e) => setDetails({ ...details, emergency_relation: e })}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: 0,
    marginBottom: 0, // Reduced margin to close gap between input and error
  },
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: 0,
    marginBottom: 0, // Apply same here if needed
  },
  inputContainer3: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 0, // Reduced padding for the gender box
    marginRight: 10,
    marginLeft: 0,
    marginBottom: 2,
  },
  inputField: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
  },
  inputField1: {
    paddingVertical: 5,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 80,
    margin: 10,
    width: 140,
    marginTop: 10,
    marginBottom:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginTop: 2, // Reduce the space above the error message
    fontSize: 12,
  },
});


export default patientReg;
