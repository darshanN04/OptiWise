import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import cal from "../../assets/icons/calender.png";
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window'); // Get the screen width

const Prescription = () => {
  const [prescription, setPrescription] = useState({
    pres_date: "",
    pres_patientno: "",
    pres_patientname: "",
    pres_patientid: 0,
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Close the picker after selection
    setDate(currentDate);
    setPrescription({ ...prescription, pres_date: currentDate.toLocaleDateString() }); // Update the date in state
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true); // Open the date picker
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <View>
          <Image source={require('../../assets/images/Logo.png')} style={{ width: 70, height: 60, marginTop: 40, marginLeft: 300, marginBottom: 0 }} />
          <Text style={{ fontSize: 30, alignSelf: 'center', marginTop: 10, color: "white" }}>Prescription</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 200, zIndex: 4, gap: 10, marginLeft: width*.08 }}>

          {/* Date and Patient No. */}
          <View style={{ flex: 1, flexDirection: "row", gap:20 }}>
            <View>
              <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 10 }}>Date: </Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={showDatePickerHandler} style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Select Date"
                    value={prescription.pres_date} // Show selected date
                    editable={false} // Prevent keyboard from opening
                  />
                  <Image source={cal} style={{ height: 20, width: 20, marginLeft: 10 }} />
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

            {/* Patient No. */}
            <View>
              <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 10 }}>Patient No: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder=""
                  keyboardType="numeric" // Specify numeric input for patient number
                  value={prescription.pres_patientno.toString()}
                  onChangeText={(e) => setPrescription({ ...prescription, pres_patientno: e })}
                />
              </View>
            </View>
          </View>

          {/* Patient Name */}
          <View>
            <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 10 }}>Name: </Text>
            <View style={{width: width*.8,maxHeight: 50,borderRadius: 5,borderColor: 'black',borderWidth: 2,paddingLeft: 5,flexDirection: "row",alignItems: "center",marginBottom: 15,}}>
              <TextInput
                style={styles.inputField}
                placeholder=""
                value={prescription.pres_patientname}
                onChangeText={(e) => setPrescription({ ...prescription, pres_patientname: e })}
              />
            </View>
          </View>

          {/* Patient ID */}
          <View>
            <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 10 }}>ID: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder=""
                keyboardType="numeric" // Specify numeric input for patient ID
                value={prescription.pres_patientid.toString()}
                onChangeText={(e) => setPrescription({ ...prescription, pres_patientid: e })}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default Prescription;

const styles = StyleSheet.create({
  inputContainer: {
    width: 150,
    maxHeight: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  inputField: {
    fontSize: 18,
    flex: 1,
    flexDirection: "row",
    color: "black"
  },
});
