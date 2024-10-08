import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const PrescriptionView = () => {
  const { prescriptionId } = useLocalSearchParams(); // Get the prescription ID from the URL
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.0.170:7002/v1/prescription/${prescriptionId}`);
        setPrescriptionDetails(response.data);
      } catch (err) {
        if (err.response) {
          console.log('Data:', err.response.data);
          console.log('Status:', err.response.status);
          console.log('Headers:', err.response.headers);
          setError(`Error: ${err.response.status} - ${err.response.data.message}`);
        } else if (err.request) {
          console.log(err.request);
          setError('No response received from server.');
        } else {
          console.log('Error:', err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptionDetails();
  }, [prescriptionId]);

  const generatePDF = async () => {
    if (!prescriptionDetails) return;

    const { prescription, leftEye, rightEye } = prescriptionDetails;

    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { padding: 20px; }
          .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
          .section { margin-bottom: 20px; }
          .section-title { font-size: 20px; font-weight: bold; color: #FF4545; margin-bottom: 10px; }
          .card { padding: 15px; background-color: #f8f8f8; border: 1px solid #ddd; border-radius: 8px; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .table, .th, .td { border: 1px solid #ddd; }
          .th, .td { padding: 8px; text-align: left; }
          .th { background-color: #f2f2f2; }
          .end{margin-left: 15px}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="title">Prescription Details</div>
          
          <!-- Prescription Information Section -->
          <div class="section">
            <div class="section-title">Prescription Info</div>
            <p>Prescription ID: ${prescription.id}</p>
            <p>Patient ID: ${prescription.patient_id}</p>
            <p>Doctor ID: ${prescription.doctor_id}</p>
            <p>Created At: ${new Date(prescription.created_at).toLocaleString()}</p>
            
          </div>
          
          <!-- Visual Acuity Table -->
          <div class="section">
            <div class="section-title">Visual Acuity Table</div>
            <table class="table">
              <thead>
                <tr>
                  <th class="th">Eye</th>
                  <th class="th">Without DV</th>
                  <th class="th">Without NV</th>
                  <th class="th">With DV</th>
                  <th class="th">With NV</th>
                  <th class="th">Vision DV</th>
                  <th class="th">Vision NV</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td">Left Eye</td>
                  <td class="td">${leftEye.without_dv}</td>
                  <td class="td">${leftEye.without_nv}</td>
                  <td class="td">${leftEye.with_dv}</td>
                  <td class="td">${leftEye.with_nv}</td>
                  <td class="td">${leftEye.vision_dv}</td>
                  <td class="td">${leftEye.vision_nv}</td>
                </tr>
                <tr>
                  <td class="td">Right Eye</td>
                  <td class="td">${rightEye.without_dv}</td>
                  <td class="td">${rightEye.without_nv}</td>
                  <td class="td">${rightEye.with_dv}</td>
                  <td class="td">${rightEye.with_nv}</td>
                  <td class="td">${rightEye.vision_dv}</td>
                  <td class="td">${rightEye.vision_nv}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

          <!-- Refractive Error Table -->
          <div class="section">
            <div class="section-title">Refractive Error Table</div>
            <table class="table">
              <thead>
                <tr>
                  <th class="th">Eye</th>
                  <th class="th">Sphere</th>
                  <th class="th">Cyl</th>
                  <th class="th">Axis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td">Left Eye (Distance)</td>
                  <td class="td">${leftEye.sphere_dv}</td>
                  <td class="td">${leftEye.cyl_dv}</td>
                  <td class="td">${leftEye.axis_dv}</td>
                </tr>
                <tr>
                  <td class="td">Left Eye (Near)</td>
                  <td class="td">${leftEye.sphere_nv}</td>
                  <td class="td">${leftEye.cyl_nv}</td>
                  <td class="td">${leftEye.axis_nv}</td>
                </tr>
                <tr>
                  <td class="td">Right Eye (Distance)</td>
                  <td class="td">${rightEye.sphere_dv}</td>
                  <td class="td">${rightEye.cyl_dv}</td>
                  <td class="td">${rightEye.axis_dv}</td>
                </tr>
                <tr>
                  <td class="td">Right Eye (Near)</td>
                  <td class="td">${rightEye.sphere_nv}</td>
                  <td class="td">${rightEye.cyl_nv}</td>
                  <td class="td">${rightEye.axis_nv}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="endpart">
            <div class="section-title">Other Details</div>
            <p>IPD: ${prescription.ipd} mm</p>
            <p>Bifocal: ${prescription.bifocal}</p>
            <p>Colour: ${prescription.colour}</p>
            <p>Remarks: ${prescription.remarks}</p>
          </div>
          
      </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
  };

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
      <Button title="Generate PDF" onPress={generatePDF} color="#FF4545" />

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
