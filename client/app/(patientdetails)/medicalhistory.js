import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import "../../assets/images/Logo.png";

const { width } = Dimensions.get('window'); // Get the screen width

const MedicalHistory = () => {
  const { patientId } = useLocalSearchParams(); // Retrieve the patientId from query params

  // State variables for medical details
  const [medicalCondition, setMedicalCondition] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');
  const [allergies, setAllergies] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.165.145:7002/v1/prescriptions/updateMedicalDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_id: patientId,
          medical_history: medicalCondition,
          current_medication: currentMedication,
          allergies: allergies,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit medical details');
      }

      console.log('Medical details submitted successfully:', data);

      // Show success alert
      Alert.alert('Success', 'Medical details updated successfully!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

    } catch (error) {
      console.error('Error submitting medical details:', error);
      Alert.alert('Error', 'Failed to update medical details. Please try again later.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <Link href="../(profile)/profile" style={{ height: 100, left: width * 0.05, top: 25 }}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={{ width: 60, height: 50 }}
          />
        </Link>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Medical History</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        style={{ paddingTop: 200, width: width }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text>Patient No.</Text>
          <Text>{patientId}</Text>
        </View>

        {/* Medical Information Sections */}
        <View style={{ alignItems: 'center' }}>
          {/* Existing Medical Condition */}
          <View style={styles.inputContainer}>
            <Text>Existing Medical Condition</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              value={medicalCondition}
              onChangeText={setMedicalCondition} // Update state on change
            />
          </View>

          {/* Current Medication */}
          <View style={styles.inputContainer}>
            <Text>Current Medication</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              value={currentMedication}
              onChangeText={setCurrentMedication} // Update state on change
            />
          </View>

          {/* Allergies */}
          <View style={{ marginBottom: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(155, 219, 255, 1)", borderRadius: 40, margin: 15, paddingBottom: 20, elevation: 10, width: width * 0.8 }}>
            <Text>Allergies</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              value={allergies}
              onChangeText={setAllergies} // Update state on change
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="SUBMIT" onPress={handleSubmit} color="#007bff" />
        </View>
      </ScrollView>
    </View>
  );
}

export default MedicalHistory;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(155, 219, 255, 1)",
    borderRadius: 40,
    margin: 15,
    paddingBottom: 20,
    elevation: 10,
    width: width * 0.8,
    marginBottom: 10
  },
  input: {
    height: 200,
    width: 250,
    backgroundColor: "white",
    textAlignVertical: "top",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 200
  },
});
