import { ScrollView, StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const { width } = Dimensions.get('window'); // Get the screen width

const PrescriptionHistory = () => {
  const { patientId } = useLocalSearchParams();
  const [prescriptionIds, setPrescriptionIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch prescription history when the component mounts
  useEffect(() => {
    const fetchPrescriptionHistory = async () => {
      try {
        const response = await axios.get(`http://192.168.31.145:7002/v1/prescriptions/patient/${patientId}`);
        console.log(response.data.prescription_ids)
        setPrescriptionIds(response.data.prescription_ids);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptionHistory();
  }, [patientId]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <Link href="../(profile)/profile" style={{ height: 100, left: width * 0.05, top: 25 }}>
          <Image 
            source={require('../../assets/images/Logo.png')} 
            style={{ width: 60, height: 50 }} 
          />
        </Link>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Prescription History</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} 
        style={{ paddingTop: 200, width: width }}
      >
        {/* Patient Information */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text>Patient No.</Text>
          <Text>{patientId}</Text>
          <Text>Patient Name</Text>
          <Text>fetched</Text>
        </View>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#FF4545" />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        ) : (
          prescriptionIds.length > 0 ? (
            prescriptionIds.map((id, index) => (
              <View key={index} style={styles.prescriptionItem}>
                <Text style={styles.prescriptionText}>Prescription ID: {id}</Text>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center' }}>No prescriptions found for this patient.</Text>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default PrescriptionHistory;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
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
    fontSize: 15,
  },
  prescriptionItem: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    width: '90%', // or any width you want
    alignSelf: 'center',
  },
  prescriptionText: {
    fontSize: 16,
  },
});
