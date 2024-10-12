import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const PrescriptionView = () => {
  const { prescriptionId } = useLocalSearchParams(); // Get the prescription ID from the URL
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.31.145:7002/v1/prescription/${prescriptionId}`);
        setPrescriptionDetails(response.data);
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log('Data:', err.response.data);
          console.log('Status:', err.response.status);
          console.log('Headers:', err.response.headers);
          setError(`Error: ${err.response.status} - ${err.response.data.message}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          setError('No response received from server.');
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error:', err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchPrescriptionDetails();
  }, [prescriptionId]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4545" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!prescriptionDetails) {
    return <Text style={styles.error}>No prescription details found.</Text>;
  }

  const { prescription, leftEye, rightEye } = prescriptionDetails;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prescription Details</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Prescription Info</Text>
        <Text>Prescription ID: {prescription.id}</Text>
        <Text>Patient ID: {prescription.patient_id}</Text>
        <Text>Doctor ID: {prescription.doctor_id}</Text>
        <Text>IPD: {prescription.ipd} mm</Text>
        <Text>Created At: {new Date(prescription.created_at).toLocaleString()}</Text>
        <Text>Bifocal: {prescription.bifocal}</Text>
        <Text>Colour: {prescription.colour}</Text>
        <Text>Remarks: {prescription.remarks}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Left Eye Details</Text>
        <Text>Without DV: {leftEye.without_dv}</Text>
        <Text>Without NV: {leftEye.without_nv}</Text>
        <Text>With DV: {leftEye.with_dv}</Text>
        <Text>With NV: {leftEye.with_nv}</Text>
        <Text>Sphere DV: {leftEye.sphere_dv}</Text>
        <Text>Cyl DV: {leftEye.cyl_dv}</Text>
        <Text>Axis DV: {leftEye.axis_dv}</Text>
        <Text>Vision DV: {leftEye.vision_dv}</Text>
        <Text>Sphere NV: {leftEye.sphere_nv}</Text>
        <Text>Cyl NV: {leftEye.cyl_nv}</Text>
        <Text>Axis NV: {leftEye.axis_nv}</Text>
        <Text>Vision NV: {leftEye.vision_nv}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Right Eye Details</Text>
        <Text>Without DV: {rightEye.without_dv}</Text>
        <Text>Without NV: {rightEye.without_nv}</Text>
        <Text>With DV: {rightEye.with_dv}</Text>
        <Text>With NV: {rightEye.with_nv}</Text>
        <Text>Sphere DV: {rightEye.sphere_dv}</Text>
        <Text>Cyl DV: {rightEye.cyl_dv}</Text>
        <Text>Axis DV: {rightEye.axis_dv}</Text>
        <Text>Vision DV: {rightEye.vision_dv}</Text>
        <Text>Sphere NV: {rightEye.sphere_nv}</Text>
        <Text>Cyl NV: {rightEye.cyl_nv}</Text>
        <Text>Axis NV: {rightEye.axis_nv}</Text>
        <Text>Vision NV: {rightEye.vision_nv}</Text>
      </View>
    </ScrollView>
  );
};

export default PrescriptionView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF4545',
  },
  card: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
