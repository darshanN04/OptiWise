import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const PatientDetails = () => {
  const [searchDetails, setSearchDetails] = useState({
    patientName: '',
    patientPhone: '',
  });
  const [patientResults, setPatientResults] = useState([]);
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const handleSearchSubmit = async () => {
    try {
      const { patientName, patientPhone } = searchDetails;
  
      if (!patientName && !patientPhone) {
        return;
      }
  
      let query = [];
      if (patientName) {
        query.push(`name=${patientName}`);
      }
      if (patientPhone) {
        query.push(`phone_no=${patientPhone}`);
      }
  
      const queryString = query.join('&');
  
      const response = await fetch(`http://192.168.31.145:7002/v1/patients/search?${queryString}`);
      const data = await response.json();
  
      if (response.ok) {
        if (data.length > 0) {
          setPatientResults(data);  // Patients found
        } else {
          setPatientResults(null);  // No patients found
        }
        setResultModalVisible(true);
      } else {
        setPatientResults(null); // Ensure no patients found logic is triggered
        setResultModalVisible(true);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

  const renderPatient = ({ item }) => (
    <View key={item.patient_id} style={styles.patientResult}>
      <Text style={styles.resultText}>Patient ID: {item.patient_id}</Text>
      <Text style={styles.resultText}>Name: {item.name}</Text>
      <Text style={styles.resultText}>DOB: {item.dob}</Text>
      <Text style={styles.resultText}>Gender: {item.gender}</Text>
      <Text style={styles.resultText}>Father's Name: {item.father_name}</Text>
      <Text style={styles.resultText}>Phone No: {item.phone_no}</Text>
      <Text style={styles.resultText}>Occupation: {item.occupation}</Text>
      <Text style={styles.resultText}>Address: {item.address}</Text>
    </View>
  );

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
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Patient Details</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 220 }}>
          <Text style={styles.label}>Search Patient</Text>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="black" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Patient Name"
              value={searchDetails.patientName}
              onChangeText={(text) => setSearchDetails({ ...searchDetails, patientName: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="black" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Patient Phone No."
              value={searchDetails.patientPhone}
              onChangeText={(text) => setSearchDetails({ ...searchDetails, patientPhone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          <Link href="" style={styles.button}>
            <Text>Go back</Text>
          </Link>

          {/* Result Modal */}
{/* Result Modal */}
<Modal
  animationType="slide"
  transparent={true}
  visible={resultModalVisible}
  onRequestClose={() => setResultModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Patient Search Results</Text>

      {patientResults === null ? (
        // Display this if no patients found
        <View>
          <Text style={styles.noPatientText}>No patient found</Text>
        </View>
      ) : (
        // Display the list of patients if found
        <FlatList
          data={patientResults}
          renderItem={renderPatient}
          keyExtractor={(item) => item.patient_id.toString()}
          style={styles.resultsContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Pressable style={styles.modalCloseButton} onPress={() => setResultModalVisible(false)}>
        <Text style={styles.modalCloseButtonText}>Close</Text>
      </Pressable>
    </View>
  </View>
</Modal>

        </View>
      </ScrollView>
    </View>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  searchButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,
    fontSize: 15,
    width: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  resultsContainer: {
    width: '100%',
    maxHeight: 440, // Ensure to fit only three records
  },
  patientResult: {
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
  },
  noPatientText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
