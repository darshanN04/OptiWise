import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput } from 'react-native';
import React from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import "../../assets/images/Logo.png";

const { width } = Dimensions.get('window'); // Get the screen width

const MedicalHistory = () => {
  const { patientId } = useLocalSearchParams(); // Retrieve the patientId from query params

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
  <Text>Patient Name</Text>
  <Text>fetched</Text>
</View>

        {/* Medical Information Sections */}
        <View style={{ alignItems: 'center' }}>
          {/* Existing Medical Condition */}
          <View style={styles.inputContainer}>
            <Text>Existing Medical Condition</Text>
            <TextInput
              style={styles.input}
              multiline={true}
            />
          </View>

          {/* Current Medication */}
          <View style={styles.inputContainer}>
            <Text>Current Medication</Text>
            <TextInput
              style={styles.input}
              multiline={true}
            />
          </View>

          {/* Allergies */}
          <View style={{ marginBottom: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(155, 219, 255, 1)", borderRadius: 40, margin: 15, paddingBottom: 20, elevation: 10, width: width * 0.8 }}>
            <Text>Allergies</Text>
            <TextInput
              style={styles.input}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Link href="../(patientdetails)/patientform" style={styles.button}>
            <Text>Search</Text>
          </Link>
          <Link href="" style={styles.button}>
            <Text>Go back</Text>
          </Link>
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
    backgroundColor: "rgba(155, 219, 255, 1)", // Adjust the background opacity
    borderRadius: 40,
    margin: 15,
    paddingBottom: 20,
    elevation: 10,
    width: width * 0.8, // Make sure the width adapts to the screen width
    marginBottom: 10
  },
  input: {
    height: 200,
    width: 250,
    backgroundColor: "white",
    textAlignVertical: "top", // Ensure text starts from the top
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