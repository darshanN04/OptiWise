import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import cal from "../../assets/icons/calender.png";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Button, CheckBox } from 'react-native-elements';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';






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
  const visualOptions = ['NA', '6/5', '6/6', '6/12', '6/24', '6/36', '6/48', '6/60', '3/60', '2/60', '1/60', 'HM', 'PL', 'NPL'];
  
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

  const [dvrightSphere, setDVRightSphere] = useState(0);
  const [dvleftSphere, setDVLeftSphere] = useState(0);
  const [dvrightCylinder, setDVRightCylinder] = useState(0);
  const [dvleftCylinder, setDVLeftCylinder] = useState(0);
  const [dvrightAxis, setDVRightAxis] = useState(0);
  const [dvleftAxis, setDVLeftAxis] = useState(0);
  const [nvrightSphere, setNVRightSphere] = useState(0);
  const [nvleftSphere, setNVLeftSphere] = useState(0);
  const [nvrightCylinder, setNVRightCylinder] = useState(0);
  const [nvleftCylinder, setNVLeftCylinder] = useState(0);
  const [nvrightAxis, setNVRightAxis] = useState(0);
  const [nvleftAxis, setNVLeftAxis] = useState(0);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [checked10, setChecked10] = useState(false);
  const [checked11, setChecked11] = useState(false);

  const [doctorNumber, setDoctorNumber] = useState('');

  const generatePDF = async () => {
    const { pres_date, pres_patientno, pres_patientname } = prescription;
    
    const visualAcuityData = data.map(item => ({
      visualAcuity: item.visualAcuity,
      rightDV: selectedRightDV[item.id] || 'NA',
      rightNV: selectedRightNV[item.id] || 'NA',
      leftDV: selectedLeftDV[item.id] || 'NA',
      leftNV: selectedLeftNV[item.id] || 'NA',
    }));

    const refractiveError = {
      right: {
        DV: {
          sphere: dvrightSphere.toFixed(2),
          cylinder: dvrightCylinder.toFixed(2),
          axis: dvrightAxis,
        },
        NV: {
          sphere: nvrightSphere.toFixed(2),
          cylinder: nvrightCylinder.toFixed(2),
          axis: nvrightAxis,
        },
      },
      left: {
        DV: {
          sphere: dvleftSphere.toFixed(2),
          cylinder: dvleftCylinder.toFixed(2),
          axis: dvleftAxis,
        },
        NV: {
          sphere: nvleftSphere.toFixed(2),
          cylinder: nvleftCylinder.toFixed(2),
          axis: nvleftAxis,
        },
      },
    };

    const bifocalOptions = [
      checked1 && "KR",
      checked2 && "Exec",
      checked3 && "D",
      checked4 && "Tri",
      checked5 && "Omni",
      checked6 && "Progressive",
    ].filter(Boolean).join(", ");

    const colorOptions = [
      checked7 && "White",
      checked8 && "Sp2Alpha",
      checked9 && "Photogrey",
      checked10 && "Photosun",
      checked11 && "Photobrown",
    ].filter(Boolean).join(", ");

    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; color: #333; }
          .section { margin-bottom: 20px; }
          .section h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          th { background-color: #f2f2f2; }
          .sub-section { margin-top: 10px; }
        </style>
      </head>
      <body>
        <h1>Prescription</h1>

        <div class="section">
          <h2>Patient Information</h2>
          <p><strong>Date:</strong> ${pres_date}</p>
          <p><strong>Patient No:</strong> ${pres_patientno}</p>
          <p><strong>Patient Name:</strong> ${pres_patientname}</p>
        </div>

        <div class="section">
          <h2>Visual Acuity</h2>
          <table>
            <tr>
              <th>Visual Acuity</th>
              <th colspan="2">Right Eye</th>
              <th colspan="2">Left Eye</th>
            </tr>
            <tr>
              <th></th>
              <th>DV</th>
              <th>NV</th>
              <th>DV</th>
              <th>NV</th>
            </tr>
            ${visualAcuityData.map(row => `
              <tr>
                <td>${row.visualAcuity}</td>
                <td>${row.rightDV}</td>
                <td>${row.rightNV}</td>
                <td>${row.leftDV}</td>
                <td>${row.leftNV}</td>
              </tr>
            `).join('')}
          </table>
        </div>

        <div class="section">
          <h2>Refractive Error</h2>
          <table>
            <tr>
              <th rowspan="2">Eye</th>
              <th colspan="3">DV</th>
              <th colspan="3">NV</th>
            </tr>
            <tr>
              <th>Sphere</th>
              <th>Cylinder</th>
              <th>Axis</th>
              <th>Sphere</th>
              <th>Cylinder</th>
              <th>Axis</th>
            </tr>
            <tr>
              <td>Right</td>
              <td>${refractiveError.right.DV.sphere}</td>
              <td>${refractiveError.right.DV.cylinder}</td>
              <td>${refractiveError.right.DV.axis}</td>
              <td>${refractiveError.right.NV.sphere}</td>
              <td>${refractiveError.right.NV.cylinder}</td>
              <td>${refractiveError.right.NV.axis}</td>
            </tr>
            <tr>
              <td>Left</td>
              <td>${refractiveError.left.DV.sphere}</td>
              <td>${refractiveError.left.DV.cylinder}</td>
              <td>${refractiveError.left.DV.axis}</td>
              <td>${refractiveError.left.NV.sphere}</td>
              <td>${refractiveError.left.NV.cylinder}</td>
              <td>${refractiveError.left.NV.axis}</td>
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Bifocal Options</h2>
          <p>${bifocalOptions || 'None'}</p>
        </div>

        <div class="section">
          <h2>Color Options</h2>
          <p>${colorOptions || 'None'}</p>
        </div>

        <div class="section">
          <h2>Doctor Information</h2>
          <p><strong>Doctor No:</strong> ${doctorNumber || 'N/A'}</p>
        </div>
      </body>
    </html>
  `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Share your prescription' });
      console.log('PDF generated and shared successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  const [isSliderActive, setIsSliderActive] = useState(false);
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
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Prescription</Text>
        </View>
        <Button title="Generate PDF" onPress={generatePDF} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 200, zIndex: 4, gap: 10 }}>

          {/* Date and Patient No. */}
          <View style={{ flex: 1, flexDirection: "row", gap:20,marginLeft: width*.08 }}>
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
          <View style={{marginLeft: width*.08}}>
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

          
          <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>Visual Acuity :</Text>

          {/* -----------------------Visual Acuity Table----------------------- */}
          <ScrollView horizontal={true} style={{flex:1, flexDirection: "row"}} scrollEnabled={!isSliderActive}>
            <View>
          {/* Right EYE */}
              <View style={{backgroundColor: "rgba(255,218,185,45)", flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 40, margin: 15, paddingBottom: 30,elevation: 10}}>
                  <View>
                    <Text style={{ fontSize: 30, marginBottom: 0, marginTop: 20, textAlign: "center", textDecorationLine:"underline" }}>Right :</Text>
                  </View>
                  <ScrollView horizontal={true} style={{ height: "auto", flex: 1, marginTop: 20, paddingHorizontal: 0 }}>
                    <View style={{ borderWidth: 1, borderColor: 'black' }}>

                      {/* Table Header */}
                      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                        <Text style={{ fontWeight: 'bold', padding: 10, borderWidth: 0, borderColor: 'transparent', width: 100, textAlign: 'center', alignSelf: 'center' }}>Visual Acuity</Text>
                        <View style={{ width: 240, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderColor: '#000' }}>
                          <Text style={{ fontWeight: 'bold', paddingVertical: 5 }}>Right</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', width: 120, textAlign: 'center', borderTopWidth: 1, borderColor: 'black' }}>DV</Text>
                            <Text style={{ fontWeight: 'bold', width: 120, textAlign: 'center', borderTopWidth: 1, borderColor: 'black', borderLeftWidth: 1 }}>NV</Text>
                          </View>
                        </View>
                      </View>

                      {/* Table Rows */}
                      {data.map((item) => (
                        <View key={item.id} style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                          <Text style={{ padding: 10, borderWidth: 1, borderColor: '#000', width: 100, textAlign: 'center', fontSize: 12, borderBottomWidth: 0,borderRightWidth: 2 }}>{item.visualAcuity}</Text>

                          {/* Right Eye Pickers */}
                          <Picker
                            selectedValue={selectedRightDV[item.id] || visualOptions[0]}
                            style={{ height: 50, width: 120, alignSelf: 'center',flex: 1, justifyContent:'center' }}
                            onValueChange={(value) => handlePickerChange('right', 'DV', value, item.id)}
                          >
                            {visualOptions.map((option, index) => (
                              <Picker.Item key={index} label={option} value={option} />
                            ))}
                          </Picker>

                          <Picker
                            selectedValue={selectedRightNV[item.id] || visualOptions[0]}
                            style={{ height: 50, width: 120, alignSelf: 'center' }}
                            onValueChange={(value) => handlePickerChange('right', 'NV', value, item.id)}
                          >
                            {visualOptions.map((option, index) => (
                              <Picker.Item key={index} label={option} value={option} />
                            ))}
                          </Picker>                  
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                
              {/* -----------------------Range Slider----------------------- */}
              
                {/* DV */}
                  {/* Right Eye Sphere */}
                  
                    <View>
                      <Text style={{ fontSize: 20, marginBottom: 0, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>Refractive Error :</Text>
                      <Text style={{ fontSize: 20, marginBottom: 0, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>DV :</Text>
                    </View>
                    <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.valueText}>Sphere Value: {dvrightSphere.toFixed(2)}</Text>
                      <Slider
                        style={styles.rangeSlider}
                        minimumValue={-10}   // Min value of slider
                        maximumValue={10}    // Max value of slider
                        step={0.25}         // Step size for the slider
                        value={0}           // Initial value
                        onValueChange={(val) => setDVRightSphere(val)} // Update the value as slider moves
                        minimumTrackTintColor="#358D9C"  // Color for the left side of the slider
                        maximumTrackTintColor="#358D9C"  // Color for the right side of the slider
                        thumbTintColor="#358D9C"         // Color of the slider thumb
                        onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                      />
                    </View>
                    
                  {/* Right Eye Cylinder */}
                    <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.valueText}>Cylinder Value: {dvrightCylinder.toFixed(2)}</Text>
                      <Slider
                        style={styles.rangeSlider}
                        minimumValue={-6}
                        maximumValue={6}
                        step={0.25}
                        value={0}
                        onValueChange={(val) => setDVRightCylinder(val)}
                        minimumTrackTintColor="#358D9C"
                        maximumTrackTintColor="#358D9C"
                        thumbTintColor="#358D9C"
                        onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                      />
                    </View>
                      
                  {/* Right Eye Axis */}
                    <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.valueText}>Axis Value: {dvrightAxis.toFixed(2)}</Text>
                      <Slider
                        style={styles.rangeSlider}
                        minimumValue={0}
                        maximumValue={180}
                        step={1}
                        value={0}
                        onValueChange={(val) => setDVRightAxis(val)}
                        minimumTrackTintColor="#358D9C"
                        maximumTrackTintColor="#358D9C"
                        thumbTintColor="#358D9C"
                        onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                      />
                    </View>
                {/* NV */}
                  {/* Right Eye Sphere NV */}
                      <View>
                        <Text style={{ fontSize: 20, marginBottom: 0, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>NV :</Text>
                      </View>
                      <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.valueText}>Sphere Value: {nvrightSphere.toFixed(2)}</Text>
                        <Slider
                          style={styles.rangeSlider}
                          minimumValue={-10}   // Min value of slider
                          maximumValue={10}    // Max value of slider
                          step={0.25}         // Step size for the slider
                          value={0}           // Initial value
                          onValueChange={(val) => setNVRightSphere(val)} // Update the value as slider moves
                          minimumTrackTintColor="#F52D2D"  // Color for the left side of the slider
                          maximumTrackTintColor="#F52D2D"  // Color for the right side of the slider
                          thumbTintColor="#F52D2D"         // Color of the slider thumb
                          onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                        />
                      </View>
                    
                  {/* Right Eye Cylinder NV */}
                    <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.valueText}>Cylinder Value: {nvrightCylinder.toFixed(2)}</Text>
                      <Slider
                        style={styles.rangeSlider}
                        minimumValue={-6}
                        maximumValue={6}
                        step={0.25}
                        value={0}
                        onValueChange={(val) => setNVRightCylinder(val)}
                        minimumTrackTintColor="#F52D2D"
                        maximumTrackTintColor="#F52D2D"
                        thumbTintColor="#F52D2D"
                        onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                      />
                    </View>
                      
                  {/* Right Eye Axis */}
                    <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.valueText}>Axis Value: {nvrightAxis.toFixed(2)}</Text>
                      <Slider
                        style={styles.rangeSlider}
                        minimumValue={0}
                        maximumValue={180}
                        step={1}
                        value={0}
                        onValueChange={(val) => setNVRightAxis(val)}
                        minimumTrackTintColor="#F52D2D"
                        maximumTrackTintColor="#F52D2D"
                        thumbTintColor="#F52D2D"
                        onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                      />
                    </View>
            </View>
          </View>

          {/* ___LEFT EYE____ */}
          <View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(125, 249, 255, 12)", borderRadius: 40, margin: 15, paddingBottom: 30,elevation: 10}}>
            <View>
            <Text style={{ fontSize: 30, marginBottom: 0, marginTop: 20, textAlign: "center", textDecorationLine:"underline" }}>Left :</Text>
            </View>
            <ScrollView horizontal={true} style={{ height: "auto", flex: 1, marginTop: 20, paddingHorizontal: 0 }}>
              <View style={{ borderWidth: 1, borderColor: 'black' }}>

              {/* Table Header */}
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                  <Text style={{ fontWeight: 'bold', padding: 10, borderWidth: 0, borderColor: 'transparent', width: 100, textAlign: 'center', alignSelf: 'center' }}>Visual Acuity</Text>
                  <View style={{ width: 240, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderColor: '#000' }}>
                    <Text style={{ fontWeight: 'bold', paddingVertical: 5 }}>Left</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold', width: 120, textAlign: 'center', borderTopWidth: 1, borderColor: 'black' }}>DV</Text>
                      <Text style={{ fontWeight: 'bold', width: 120, textAlign: 'center', borderTopWidth: 1, borderColor: 'black', borderLeftWidth: 1 }}>NV</Text>
                    </View>
                  </View>
                </View>

              {/* Table Rows */}
                {data.map((item) => (
                  <View key={item.id} style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                    <Text style={{ padding: 10, borderWidth: 1, borderColor: '#000', width: 100, textAlign: 'center', fontSize: 12, borderBottomWidth: 0,borderRightWidth: 2 }}>{item.visualAcuity}</Text>

                    {/* Right Eye Pickers */}
                    <Picker
                      selectedValue={selectedLeftDV[item.id] || visualOptions[0]}
                      style={{ height: 50, width: 120, alignSelf: 'center' }}
                      onValueChange={(value) => handlePickerChange('left', 'DV', value, item.id)}
                    >
                      {visualOptions.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option} />
                      ))}
                    </Picker>

                    <Picker
                      selectedValue={selectedLeftNV[item.id] || visualOptions[0]}
                      style={{ height: 50, width: 120, alignSelf: 'center' }}
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
            
          {/* -----------------------Range Slider----------------------- */}
          
            {/* DV */}
              {/* Left Eye Sphere */}
               
                <View>
                  <Text style={{ fontSize: 20, marginBottom: 0, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>Refractive Error :</Text>
                  <Text style={{ fontSize: 20, marginBottom: 0, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>DV :</Text>
                </View>
                <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.valueText}>Sphere Value: {dvleftSphere.toFixed(2)}</Text>
                  <Slider
                    style={styles.rangeSlider}
                    minimumValue={-10}   // Min value of slider
                    maximumValue={10}    // Max value of slider
                    step={0.25}         // Step size for the slider
                    value={0}           // Initial value
                    onValueChange={(val) => setDVLeftSphere(val)} // Update the value as slider moves
                    minimumTrackTintColor="#1E90FF"  // Color for the left side of the slider
                    maximumTrackTintColor="#D3D3D3"  // Color for the right side of the slider
                    thumbTintColor="#1E90FF"         // Color of the slider thumb
                    onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                  />
                </View>
                
              {/* Left Eye Cylinder */}
                <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.valueText}>Cylinder Value: {dvleftCylinder.toFixed(2)}</Text>
                  <Slider
                    style={styles.rangeSlider}
                    minimumValue={-6}
                    maximumValue={6}
                    step={0.25}
                    value={0}
                    onValueChange={(val) => setDVLeftCylinder(val)}
                    minimumTrackTintColor="#1E90FF"
                    maximumTrackTintColor="#D3D3D3"
                    thumbTintColor="#1E90FF"
                    onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                    onTouchEnd={() => setIsSliderActive(false)}

                  />
                </View>
                  
              {/* Left Eye Axis */}
                <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.valueText}>Axis Value: {dvleftAxis.toFixed(2)}</Text>
                  <Slider
                    style={styles.rangeSlider}
                    minimumValue={0}
                    maximumValue={180}
                    step={1}
                    value={0}
                    onValueChange={(val) => setDVLeftAxis(val)}
                    minimumTrackTintColor="#1E90FF"
                    maximumTrackTintColor="#D3D3D3"
                    thumbTintColor="#1E90FF"
                    onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                    onTouchEnd={() => setIsSliderActive(false)}

                  />
                </View>
            {/* NV */}
              {/* Left Eye Sphere NV */}
                  <View>
                    <Text style={{ fontSize: 20, marginBottom: 0, marginTop: 10, textAlign: "center", textDecorationLine:"underline" }}>NV :</Text>
                  </View>
                  <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.valueText}>Sphere Value: {nvleftSphere.toFixed(2)}</Text>
                    <Slider
                      style={styles.rangeSlider}
                      minimumValue={-10}   // Min value of slider
                      maximumValue={10}    // Max value of slider
                      step={0.25}         // Step size for the slider
                      value={0}           // Initial value
                      onValueChange={(val) => setNVLeftSphere(val)} // Update the value as slider moves
                      minimumTrackTintColor="#F52D2D"  // Color for the left side of the slider
                      maximumTrackTintColor="#F52D2D"  // Color for the right side of the slider
                      thumbTintColor="#F52D2D"         // Color of the slider thumb
                      onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                      onTouchEnd={() => setIsSliderActive(false)}

                    />
                  </View>
                
              {/* Left Eye Cylinder NV */}
              <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.valueText}>Cylinder Value: {nvleftCylinder.toFixed(2)}</Text>
                  <Slider
                    style={styles.rangeSlider}
                    minimumValue={-6}
                    maximumValue={6}
                    step={0.25}
                    value={0}
                    onValueChange={(val) => setNVLeftCylinder(val)}
                    minimumTrackTintColor="#F52D2D"
                    maximumTrackTintColor="#F52D2D"
                    thumbTintColor="#F52D2D"
                    onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                        onTouchEnd={() => setIsSliderActive(false)}

                  />
                </View>
                  
              {/* Left Eye Axis */}
                <View style={{borderBottom: 0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.valueText}>Axis Value: {nvleftAxis.toFixed(2)}</Text>
                  <Slider
                    style={styles.rangeSlider}
                    minimumValue={0}
                    maximumValue={180}
                    step={1}
                    value={0}
                    onValueChange={(val) => setNVLeftAxis(val)}
                    minimumTrackTintColor="#F52D2D"
                    maximumTrackTintColor="#F52D2D"
                    thumbTintColor="#F52D2D"
                    onTouchStart={() => setIsSliderActive(true)} // Disable ScrollView scrolling
                    onTouchEnd={() => setIsSliderActive(false)}

                  />
                </View>
          </View>
        </View>
      </ScrollView>

          {/* -----------------------OTHER DETAILS----------------------- */}

          {/*Bifocal*/ }  
          <View style={{margin: 10}}>
              <Text style={{fontSize: 20}}>Bifocal:</Text>
              
              <CheckBox
                title="KR"
                checked={checked1}
                onPress={() => setChecked1(!checked1)}
              />
              <CheckBox
                title="Exec"
                checked={checked2}
                onPress={() => setChecked2(!checked2)}
              />
              <CheckBox
                title="D"
                checked={checked3}
                onPress={() => setChecked3(!checked3)}
              />
              <CheckBox
                title="Tri"
                checked={checked4}
                onPress={() => setChecked4(!checked4)}
              />
              <CheckBox
                title="Omni"
                checked={checked5}
                onPress={() => setChecked5(!checked5)}
              />
              <CheckBox
                title="Progressive"
                checked={checked6}
                onPress={() => setChecked6(!checked6)}
              />
            </View>

          {/*Colour*/ }  
            <View style={{margin: 10}}>
              <Text style={{fontSize: 20}}>Colour:</Text>
              
              <CheckBox
                title="White"
                checked={checked7}
                onPress={() => setChecked7(!checked7)}
              />
              <CheckBox
                title="Sp2Alpha"
                checked={checked8}
                onPress={() => setChecked8(!checked8)}
              />
              <CheckBox
                title="Photogrey"
                checked={checked9}
                onPress={() => setChecked9(!checked9)}
              />
              <CheckBox
                title="Photosun"
                checked={checked10}
                onPress={() => setChecked10(!checked10)}
              />
              <CheckBox
                title="Photobrown"
                checked={checked11}
                onPress={() => setChecked11(!checked11)}
              />
            </View>


          {/* -----------------------Doctor Number----------------------- */}
          
          <View style={{margin: 20, flex: 1, flexDirection: 'row', justifyContent: "space-around"}}>
            <Text style={{fontSize: 20, paddingTop: 3}}>Doctor No:</Text>
            <TextInput style={{borderColor: "black", borderWidth: 1, width: 200, paddingLeft: 10, fontSize: 16, height: 40}} onChangeText={(e) => setDoctorNumber(e)}></TextInput>
          </View>

          {/* -----------------------Submit Button----------------------- */}

          <View style={styles.buttonContainer}>
            <Link href="" style={styles.button}>
              <Text>Submit</Text>
            </Link>
            <Link href="" style={styles.button}>
              <Text>Go back</Text>
            </Link>
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
    color: "black",
  },
  
  valueText: {
    fontSize: 20,
    marginBottom: 20,
  },
  rangeSlider: {
    width: 350,
    height: 10,
    marginBottom: 15,
    elevation: 20
  },
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
});
