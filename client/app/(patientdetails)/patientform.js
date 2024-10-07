import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window'); // Get the screen width

const PatientForm = () => {
  const { patientId } = useLocalSearchParams(); // Retrieve the patientId from query params
  const [patientData, setPatientData] = useState(null); // State to hold patient data
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Function to fetch patient details from the backend API
  const fetchPatientDetails = async () => {
    try {
      console.log(`Fetching patient details for patient ID: ${patientId}`); // Debugging statement to log patient ID

      const response = await fetch(`http://192.168.31.145:7002/v1/patients/${patientId}`); // Use the getPatientWithDetails API
      const data = await response.json();

      console.log('Raw response data:', data); // Debugging statement to log raw response data

      if (response.ok) {
        setPatientData(data); // Set the patient data received from the API
        console.log('Patient data set successfully:', data); // Debugging statement to confirm data is set
      } else {
        console.error('Error fetching patient details:', data);
      }

      setLoading(false); // Stop loading
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setLoading(false); // Stop loading on error
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    if (patientId) {
      fetchPatientDetails(); // Fetch patient data when patientId is available
    }
  }, [patientId]);

  // Show loading indicator while fetching data
  if (loading) {
    return <ActivityIndicator size="large" color="#FF4545" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  // If no patient data, show error message
  if (!patientData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Patient not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <Link href="../(profile)/profile" style={{ height: 100, left: width * 0.05, top: 25 }}>
          <Image source={require('../../assets/images/Logo.png')} style={{ width: 60, height: 50 }} />
        </Link>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Patient Log</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 200, zIndex: 4, paddingLeft: 20, gap: 30 }}>
          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Personal Information :</Text>

          {/* Patient ID */}
          <View>
            <Text style={{ fontSize: 16 }}>Patient ID: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.patient_id.toString()}</Text>
            </View>
          </View>

          {/* Full Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Full Name: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.name}</Text>
            </View>
          </View>

          {/* Date of Birth */}
          <View>
            <Text style={{ fontSize: 16 }}>Date of Birth: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.dob}</Text>
            </View>
          </View>

          {/* Father's Name */}
          <View>
            <Text style={{ fontSize: 16 }}>Father's Name: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.father_name}</Text>
            </View>
          </View>

          {/* Gender */}
          <View>
            <Text style={{ fontSize: 16 }}>Gender: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.gender}</Text>
            </View>
          </View>

          {/* Phone Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Phone Number: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.phone_no}</Text>
            </View>
          </View>

          {/* Aadhaar Number */}
          <View>
            <Text style={{ fontSize: 16 }}>Aadhaar Number: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.aadhaar_no}</Text>
            </View>
          </View>

          {/* Occupation */}
          <View>
            <Text style={{ fontSize: 16 }}>Occupation: </Text>
            <View style={styles.inputContainer}>
              <Text>{patientData.occupation}</Text>
            </View>
          </View>

          {/* Address */}
          <View>
            <Text style={{ fontSize: 16 }}>Address: </Text>
            <View style={styles.addcontainer}>
              <Text>{patientData.address}</Text>
            </View>
          </View>

          {/* Medical History */}
          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Medical History :</Text>
          <View>
            <Text>Existing Medical Conditions:</Text>
            <Text>{patientData.additional_details?.medical_history || 'None'}</Text>
          </View>
          <View>
            <Text>Medications:</Text>
            <Text>{patientData.additional_details?.current_medication || 'None'}</Text>
          </View>
          <View>
            <Text>Allergies:</Text>
            <Text>{patientData.additional_details?.allergies || 'None'}</Text>
          </View>

          {/* Emergency Contact */}
          <Text style={{ fontSize: 20, marginBottom: 0, textDecorationLine: 'underline' }}>Additional Information :</Text>
          <View>
            <Text>Emergency Contact Name:</Text>
            <Text>{patientData.additional_details?.emergency_name || 'None'}</Text>
          </View>
          <View>
            <Text>Emergency Phone Number:</Text>
            <Text>{patientData.additional_details?.emergency_phone || 'None'}</Text>
          </View>
          <View>
            <Text>Relationship with Emergency Contact:</Text>
            <Text>{patientData.additional_details?.emergency_relation || 'None'}</Text>
          </View>

          {/* Links for other actions */}
          <View style={styles.buttonContainer}>
            <Link 
              href={`../(patientdetails)/medicalhistory?patientId=${patientId}`}  // Pass patientId as a query parameter
              style={styles.button}
            >
              <Text>Medical History</Text>
            </Link>
          </View>

          <View style={styles.buttonContainer}>
            <Link 
            href={`../(patientdetails)/prescriptionhistory?patientId=${patientId}`}
             style={styles.button}
             >
              <Text>View Prescription History</Text>
            </Link>
          </View>

          <View style={styles.buttonContainer}>
            <Link href="../(tabs)Patient Details" style={styles.button}>
              <Text>Submit</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientForm;

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
    width: 200,
    marginTop: 20,
    fontSize: 15
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  inputField: {
    fontSize: 16,
    color: '#333',
  },
  addcontainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  }
});
