import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import cal from "../../assets/icons/calender.png";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';


const { width } = Dimensions.get('window'); // Get the screen width

const Prescription = () => {
  const [prescription, setPrescription] = useState({
    pres_date: "",
    pres_patientno: "",
    pres_patientname: "",
    pres_patientid: 0,
  });
  const [selectedRightDV, setSelectedRightDV] = useState({});
  const [selectedRightNV, setSelectedRightNV] = useState({});
  const [selectedLeftDV, setSelectedLeftDV] = useState({});
  const [selectedLeftNV, setSelectedLeftNV] = useState({});
  const data = [
    { id: 1, visualAcuity: 'Unaided Visual Acuity (Without glasses)', rightDV: '20/30', rightNV: '20/40', leftDV: '20/25', leftNV: '20/35' },
    { id: 2, visualAcuity: 'Best corrected Visual Acuity (With old glasses)', rightDV: '20/20', rightNV: '20/30', leftDV: '20/40', leftNV: '20/50' },
    { id: 3, visualAcuity: 'Corrected Visual Acuity (With new correction)', rightDV: '20/20', rightNV: '20/30', leftDV: '20/40', leftNV: '20/50' },
  ];
  const visualOptions = ['6/5', '6/6', '6/12', '6/24', '6/36', '6/48', '6/60', '3/60', '2/60', '1/60', 'HM', 'PL', 'NPL'];
  const handlePickerChange = (side, type, value, id) => {
    switch (side) {
      case 'right':
        if (type === 'DV') setSelectedRightDV({ ...selectedRightDV, [id]: value });
        else setSelectedRightNV({ ...selectedRightNV, [id]: value });
        break;
      case 'left':
        if (type === 'DV') setSelectedLeftDV({ ...selectedLeftDV, [id]: value });
        else setSelectedLeftNV({ ...selectedLeftNV, [id]: value });
        break;
    }
  };

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
            <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 10 }}>Patient Name: </Text>
            <View style={{width: width*.82,maxHeight: 50,borderRadius: 5,borderColor: 'black',borderWidth: 2,paddingLeft: 5,flexDirection: "row",alignItems: "center",marginBottom: 15,}}>
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
            <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 0 }}>ID: </Text>
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

          {/* Visual Acuity Table */}

          <View>
            <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>Visual Acuity</Text>
          </View>
          <ScrollView horizontal={true} style={{ flex: 1, marginTop: 20, paddingHorizontal: 0 , marginRight: width*0.03}}>
            <View style={{ borderWidth: 1, borderColor: 'black' }}>
              {/* Table Header */}
              <View style={{ flexDirection: 'row', backgroundColor: '#f8f8f8', borderBottomWidth: 1, borderColor: '#000' }}>
                <Text style={{ fontWeight: 'bold', padding: 10, borderWidth: 1, borderColor: 'transparent', width: 100, textAlign: 'center', alignSelf: 'center' }}>Visual Acuity</Text>
                <View style={{ width: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' }}>
                  <Text style={{ fontWeight: 'bold', paddingVertical: 5 }}>Right</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', width: 150, textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>DV</Text>
                    <Text style={{ fontWeight: 'bold', width: 150, textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>NV</Text>
                  </View>
                </View>
                <View style={{ width: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' }}>
                  <Text style={{ fontWeight: 'bold', paddingVertical: 5 }}>Left</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', width: 150, textAlign: 'center', borderWidth: 1, borderColor: '#000' }}>DV</Text>
                    <Text style={{ fontWeight: 'bold', width: 150, textAlign: 'center', borderWidth: 1, borderColor: '#000' }}>NV</Text>
                  </View>
                </View>
              </View>

              {/* Table Rows */}
              {data.map((item) => (
                <View key={item.id} style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                  <Text style={{ padding: 10, borderWidth: 1, borderColor: '#000', width: 100, textAlign: 'center', fontSize: 10 }}>{item.visualAcuity}</Text>

                  {/* Right Eye Pickers */}
                  <Picker
                    selectedValue={selectedRightDV[item.id] || visualOptions[0]}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(value) => handlePickerChange('right', 'DV', value, item.id)}
                  >
                    {visualOptions.map((option, index) => (
                      <Picker.Item key={index} label={option} value={option} />
                    ))}
                  </Picker>

                  <Picker
                    selectedValue={selectedRightNV[item.id] || visualOptions[0]}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(value) => handlePickerChange('right', 'NV', value, item.id)}
                  >
                    {visualOptions.map((option, index) => (
                      <Picker.Item key={index} label={option} value={option} />
                    ))}
                  </Picker>

                  {/* Left Eye Pickers */}
                  <Picker
                    selectedValue={selectedLeftDV[item.id] || visualOptions[0]}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(value) => handlePickerChange('left', 'DV', value, item.id)}
                  >
                    {visualOptions.map((option, index) => (
                      <Picker.Item key={index} label={option} value={option} />
                    ))}
                  </Picker>

                  <Picker
                    selectedValue={selectedLeftNV[item.id] || visualOptions[0]}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(value) => handlePickerChange('left', 'NV', value, item.id)}
                  >
                    {visualOptions.map((option, index) => (
                      <Picker.Item key={index} label={option} value={option} />
                    ))}
                  </Picker>
                </View>
              ))}
            </View>
          </ScrollView>


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
    color: "black",
    
  },
});
